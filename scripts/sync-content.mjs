import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const configArgIndex = process.argv.indexOf("--config");
const configPath = resolve(
  root,
  configArgIndex >= 0 ? process.argv[configArgIndex + 1] : "content-sync.config.json",
);

const IMAGE_EXTENSIONS = {
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/svg+xml": ".svg",
  "image/webp": ".webp",
};

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);

  const [headers = [], ...dataRows] = rows;
  return dataRows.map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header.trim(), values[index]?.trim() ?? ""]),
    ),
  );
}

function splitList(value = "") {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJson(value, label) {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${label} のJSON形式が正しくありません。`);
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} はJSON配列にしてください。`);
  return value;
}

function isVisible(row) {
  return !["false", "0", "no", "非表示"].includes(row.visible?.toLowerCase());
}

function required(row, keys, label) {
  const missing = keys.filter((key) => !row[key]);
  if (missing.length) {
    throw new Error(`${label}: 必須項目 ${missing.join(", ")} が空です。`);
  }
}

function safeName(value) {
  return (
    value
      .normalize("NFKD")
      .replace(/[^\w-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "item"
  );
}

function googleDriveDownloadUrl(value) {
  const pathMatch = value.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (pathMatch) return `https://drive.google.com/uc?export=download&id=${pathMatch[1]}`;

  const url = new URL(value);
  const id = url.hostname === "drive.google.com" ? url.searchParams.get("id") : null;
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : value;
}

async function readSource(source) {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`CSV取得失敗: ${response.status} ${source}`);
    return response.text();
  }

  return readFile(resolve(root, source), "utf8");
}

async function localizeImage(value, group, id, label) {
  if (!value || !/^https?:\/\//.test(value)) return value;
  if (dryRun) return value;

  const sourceUrl = googleDriveDownloadUrl(value);
  const response = await fetch(sourceUrl, { redirect: "follow" });
  if (!response.ok) throw new Error(`画像取得失敗: ${response.status} ${value}`);

  const contentType = response.headers.get("content-type")?.split(";")[0];
  const urlExtension = extname(new URL(response.url).pathname).toLowerCase();
  const disposition = response.headers.get("content-disposition") || "";
  const dispositionExtension = extname(
    disposition.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i)?.[1] || "",
  ).toLowerCase();
  const extension =
    IMAGE_EXTENSIONS[contentType] ||
    ([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(urlExtension)
      ? urlExtension
      : [".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(dispositionExtension)
        ? dispositionExtension
      : null);

  if (!extension) {
    throw new Error(`画像として取得できませんでした: ${value}`);
  }

  const shortHash = createHash("sha1").update(value).digest("hex").slice(0, 8);
  const relativeDir = `images/cms/${safeName(group)}/${safeName(id)}`;
  const filename = `${safeName(label)}-${shortHash}${extension}`;
  await mkdir(resolve(root, "public", relativeDir), { recursive: true });
  await writeFile(resolve(root, "public", relativeDir, filename), Buffer.from(await response.arrayBuffer()));

  return `/${relativeDir}/${filename}`;
}

async function parseNews(rows) {
  const result = [];
  for (const row of rows.filter(isVisible)) {
    required(row, ["id", "date", "category", "title", "content"], `news/${row.id || "unknown"}`);
    result.push({
      id: row.id,
      date: row.date,
      category: row.category,
      title: row.title,
      mainImage: row.mainImage
        ? await localizeImage(row.mainImage, "news", row.id, "main")
        : undefined,
      content: row.content,
    });
  }
  return result;
}

async function parseMembers(rows) {
  const result = [];
  for (const row of rows.filter(isVisible)) {
    required(row, ["id", "name", "nameJp", "role", "image", "description"], `members/${row.id || "unknown"}`);
    const gallerySub = [];
    for (const [index, image] of splitList(row.gallerySub).entries()) {
      gallerySub.push(await localizeImage(image, "members", row.id, `gallery-${index + 1}`));
    }

    result.push({
      id: row.id,
      name: row.name,
      nameJp: row.nameJp,
      role: row.role,
      roleLeft: row.roleLeft || undefined,
      roleRight: row.roleRight || undefined,
      image: await localizeImage(row.image, "members", row.id, "portrait"),
      heroImage: row.heroImage
        ? await localizeImage(row.heroImage, "members", row.id, "hero")
        : undefined,
      galleryMain: row.galleryMain
        ? await localizeImage(row.galleryMain, "members", row.id, "gallery-main")
        : undefined,
      gallerySub,
      description: row.description,
      influence: row.influence || undefined,
      extra: row.extra || undefined,
    });
  }
  return result;
}

async function parseWorks(rows) {
  const result = [];
  for (const row of rows.filter(isVisible)) {
    required(
      row,
      ["id", "client", "title", "overview", "mainImage", "deliverables", "members"],
      `works/${row.id || "unknown"}`,
    );
    const deliverables = requireArray(
      parseJson(row.deliverables, `works/${row.id}/deliverables`),
      `works/${row.id}/deliverables`,
    );
    const members = requireArray(
      parseJson(row.members, `works/${row.id}/members`),
      `works/${row.id}/members`,
    );

    for (const [index, deliverable] of deliverables.entries()) {
      required(deliverable, ["name", "thumbnail", "description"], `works/${row.id}/deliverables/${index + 1}`);
      deliverable.thumbnail = await localizeImage(
        deliverable.thumbnail,
        "works",
        row.id,
        `deliverable-${index + 1}`,
      );
    }
    for (const [index, member] of members.entries()) {
      required(member, ["role", "name", "image"], `works/${row.id}/members/${index + 1}`);
      member.image = await localizeImage(member.image, "works", row.id, `member-${index + 1}`);
    }

    result.push({
      id: row.id,
      client: row.client,
      title: row.title,
      overview: row.overview,
      mainImage: await localizeImage(row.mainImage, "works", row.id, "main"),
      categories: splitList(row.categories),
      tags: splitList(row.tags),
      deliverables,
      members,
      voice: row.voice || undefined,
      relatedIds: splitList(row.relatedIds),
    });
  }
  return result;
}

const FILE_TEMPLATES = {
  news: (items) => `export type NewsCategory = string;

export type NewsItem = {
  id: string;
  date: string;
  category: NewsCategory;
  title: string;
  mainImage?: string;
  content: string;
};

// Generated by npm run content:sync. Edit the spreadsheet instead of this array.
export const NEWS_ITEMS: NewsItem[] = ${JSON.stringify(items, null, 2)};
`,
  works: (items) => `export type Member = {
  role: string;
  name: string;
  image: string;
};

export type Deliverable = {
  thumbnail: string;
  name: string;
  description: string;
  link?: string;
};

export type Work = {
  id: string;
  client: string;
  title: string;
  overview: string;
  mainImage: string;
  categories: string[];
  tags: string[];
  deliverables: Deliverable[];
  members: Member[];
  voice?: string;
  relatedIds: string[];
};

// Generated by npm run content:sync. Edit the spreadsheet instead of this array.
export const WORKS: Work[] = ${JSON.stringify(items, null, 2)};
`,
  members: (items) => `export type Member = {
  id: string;
  name: string;
  nameJp: string;
  role: string;
  roleLeft?: string;
  roleRight?: string;
  image: string;
  heroImage?: string;
  galleryMain?: string;
  gallerySub?: string[];
  description: string;
  influence?: string;
  extra?: string;
};

// Generated by npm run content:sync. Edit the spreadsheet instead of this array.
export const MEMBERS: Member[] = ${JSON.stringify(items, null, 2)};
`,
};

async function writeAtomic(path, content) {
  const target = resolve(root, path);
  const temporary = `${target}.syncing`;
  await writeFile(temporary, content);
  await rename(temporary, target);
}

async function main() {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  required(config, ["news", "works", "members"], "content-sync.config.json");

  const [newsRows, workRows, memberRows] = await Promise.all([
    readSource(config.news).then(parseCsv),
    readSource(config.works).then(parseCsv),
    readSource(config.members).then(parseCsv),
  ]);
  const [news, works, members] = await Promise.all([
    parseNews(newsRows),
    parseWorks(workRows),
    parseMembers(memberRows),
  ]);

  if ([news, works, members].every((items) => items.length === 0)) {
    console.log("公開対象の行がないため、Git管理ファイルは変更しませんでした。");
    return;
  }

  for (const [name, items] of Object.entries({ news, works, members })) {
    if (!items.length) throw new Error(`${name} に公開対象の行がありません。更新を中止しました。`);
    const ids = items.map((item) => item.id);
    if (new Set(ids).size !== ids.length) {
      throw new Error(`${name} に重複したidがあります。更新を中止しました。`);
    }
  }

  if (!dryRun) {
    await Promise.all([
      writeAtomic("src/config/news.ts", FILE_TEMPLATES.news(news)),
      writeAtomic("src/config/works.ts", FILE_TEMPLATES.works(works)),
      writeAtomic("src/config/members.ts", FILE_TEMPLATES.members(members)),
    ]);
  }

  console.log(
    `${dryRun ? "確認完了" : "同期完了"}: news ${news.length}件 / works ${works.length}件 / members ${members.length}件`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const dataModule = readFileSync('src/lib/content/data.ts', 'utf8');
const all = {};
let images = new Set();
function inspect(value, key = '') {
  if (typeof value === 'string') {
    assert(!value.startsWith('$'), `Unresolved source value: ${key}`);
    if (/image|gallery/i.test(key) && value) {
      assert(value.startsWith('/images/'), `Image must be local: ${key}`);
      const path = resolve('public', '.' + value);
      assert(path.startsWith(resolve('public') + '/'), 'Invalid image path');
      assert(existsSync(path), `Missing image: ${value}`);
      images.add(value);
    }
  } else if (Array.isArray(value)) value.forEach(v => inspect(v, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => inspect(v, k));
}
for (const kind of ['work', 'news', 'members']) {
  const ids = new Set();
  all[kind] = readdirSync(`content/${kind}`).filter(f => f.endsWith('.json')).map(file => {
    const path = `content/${kind}/${file}`;
    assert(dataModule.includes(`../../../${path}"`), `Add ${path} to src/lib/content/data.ts`);
    const item = JSON.parse(readFileSync(path, 'utf8'));
    assert.equal(file, `${item.slug}.json`);
    assert(/^[a-zA-Z0-9_-]+$/.test(item.slug), `Invalid slug: ${file}`);
    assert(!ids.has(item.id), `Duplicate ID: ${file}`); ids.add(item.id);
    assert.equal(typeof item.featured, 'boolean');
    assert(Number.isFinite(item.sortOrder), `Set sortOrder: ${file}`);
    if (kind === 'news') {
      assert.equal(typeof item.content, 'string');
      assert(!item.publishedAt || Number.isFinite(Date.parse(item.publishedAt)), `Invalid date: ${file}`);
    }
    inspect(item); return item;
  });
}
const members = new Set(all.members.map(m => m.slug));
for (const work of all.work) for (const slug of work.members) assert(members.has(slug), `Unknown member: ${slug}`);
console.log(`Content OK: ${all.work.length} works, ${all.news.length} news, ${all.members.length} members, ${images.size} local images`);

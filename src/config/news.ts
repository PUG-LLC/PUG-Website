export type NewsCategory = "ALUA" | "Office" | "PUG Creative Studio";

export type NewsItem = {
  id: string;
  date: string;
  category: NewsCategory;
  title: string;
  mainImage?: string;
  content: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    date: "2025/10/9",
    category: "ALUA",
    title: "ALUAから新ブランド『叙事話院』が登場",
    mainImage: "/images/works/work1_main.png", // Using an existing image as placeholder
    content: `ここにニュースの内容が入る。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`,
  },
  {
    id: "2",
    date: "2025/10/9",
    category: "Office",
    title: "合同会社ZENと業務提携を開始",
    content:
      "合同会社ZENとクリエイティブ領域における業務提携を締結いたしました。",
  },
  {
    id: "3",
    date: "2025/10/9",
    category: "PUG Creative Studio",
    title: "映画『SENSEKI』新ポスターデザインが公開",
    content:
      "近日公開予定の映画『SENSEKI』のメインビジュアルが解禁されました。",
  },
  {
    id: "4",
    date: "2025/10/9",
    category: "Office",
    title: "合同会社ZENと業務提携を開始",
    content:
      "合同会社ZENとクリエイティブ領域における業務提携を締結いたしました。",
  },
  {
    id: "5",
    date: "2025/10/9",
    category: "PUG Creative Studio",
    title: "映画『SENSEKI』新ポスターデザインが公開",
    content:
      "近日公開予定の映画『SENSEKI』のメインビジュアルが解禁されました。",
  },
  {
    id: "6",
    date: "2025/10/9",
    category: "Office",
    title: "合同会社ZENと業務提携を開始",
    content:
      "合同会社ZENとクリエイティブ領域における業務提携を締結いたしました。",
  },
  {
    id: "7",
    date: "2025/10/9",
    category: "Office",
    title: "合同会社ZENと業務提携を開始",
    content:
      "合同会社ZENとクリエイティブ領域における業務提携を締結いたしました。",
  },
  {
    id: "8",
    date: "2025/10/9",
    category: "PUG Creative Studio",
    title: "映画『SENSEKI』新ポスターデザインが公開",
    content:
      "近日公開予定の映画『SENSEKI』のメインビジュアルが解禁されました。",
  },
  {
    id: "9",
    date: "2025/10/9",
    category: "Office",
    title: "合同会社ZENと業務提携を開始",
    content:
      "合同会社ZENとクリエイティブ領域における業務提携を締結いたしました。",
  },
  {
    id: "10",
    date: "2025/10/9",
    category: "PUG Creative Studio",
    title: "映画『SENSEKI』新ポスターデザインが公開",
    content:
      "近日公開予定の映画『SENSEKI』のメインビジュアルが解禁されました。",
  },
];

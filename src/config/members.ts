export type Member = {
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

export const MEMBERS: Member[] = [
  {
    id: "taichi-suwa",
    name: "Taichi Suwa",
    nameJp: "諏訪 太一",
    role: "CEO / Director",
    roleLeft: "CEO",
    roleRight: "DIRECTOR",
    image: "/images/members/taichi_suwa01.png",
    heroImage: "/images/members/taichi_suwa02.png",
    galleryMain: "/images/members/taichi_suwa03.png",
    gallerySub: [
      "/images/members/taichi_suwa_galary01.png",
      "/images/members/taichi_suwa_galary02.png",
      "/images/members/taichi_suwa_galary03.png",
      "/images/members/taichi_suwa_galary04.png",
    ],
    description:
      "学生時代にクリエイティブチーム『Verph』を結成。2022年にヴェネチア国際映画祭への衣装出展や2025年にディズニーマーベル社の映画広告クリエイティブのビジュアルコンセプト設計を担当。2025年からリゾートや複合施設のディレクションを複数担当。2026年に合同会社PUGを設立。",
    influence: "「」",
    extra:
      "ここなんか入れたい。ちょいちょいでもよさそ。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "shouhi-ide",
    name: "Shouhi Ide",
    nameJp: "井手 翔陽",
    role: "CTO / Engineer",
    image: "/images/members/shouhi_ide.png",
    heroImage: "/images/members/shouhi_ide02.png",
    galleryMain: "/images/members/shouhi_ide03.png",
    gallerySub: [
      "/images/members/shouhi_ide_galary01.png",
      "/images/members/shouhi_ide_galary02.png",
      "/images/members/shouhi_ide_galary03.png",
      "/images/members/shouhi_ide_galary04.png",
    ],
    description:
      "学生時代にコンピューターサークル『Tech.Uni』を創設。Yahoo! JAPAN、楽天グループなど複数企業でソフトウェアエンジニアインターンを経験。2022年にエンジニアバー『HACK.BAR』を創業。その後、Hinome Inc.、NOT A HOTEL Inc.にソフトウェアエンジニアとして参画。2023年にZEN LLC.創業。2024年にawabar Kobeを創業。",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "cotomi-naka",
    name: "Cotomi Naka",
    nameJp: "中 琴美",
    role: "Director / Designer / General affairs",
    image: "/images/members/cotomi_naka.png",
    heroImage: "/images/members/cotomi_naka02.png",
    galleryMain: "/images/members/cotomi_naka03.png",
    gallerySub: [
      "/images/members/cotomi_naka_galary01.png",
      "/images/members/cotomi_naka_galary02.png",
      "/images/members/cotomi_naka_galary03.png",
      "/images/members/cotomi_naka_galary04.png",
    ],
    description:
      "2021年に学生向けスクール事業に携わり、デザインの基礎指導やプロジェクト運営に従事。Webデザインを主軸としながら、ロゴや印刷物などメディアを問わず、デザイン全般を幅広く担当。前職であるコンサルティングファームでの制作や、飲食店のブランディングなど、ビジネスの現場に即した制作を経験。2026年1月合同会社PUGに参画。",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "nanase-shigeta",
    name: "Nanase Shigeta",
    nameJp: "繁田 七瀬",
    role: "Director / Designer",
    image: "/images/members/nanase_shigeta.png",
    heroImage: "/images/members/nanase_shigeta02.png",
    galleryMain: "/images/members/nanase_shigeta03.png",
    gallerySub: [
      "/images/members/nanase_shigeta_galary01.png",
      "/images/members/nanase_shigeta_galary02.png",
      "/images/members/nanase_shigeta_galary03.png",
      "/images/members/nanase_shigeta_galary04.png",
    ],
    description:
      "独創的な視点から、ブランドの核心を突くビジュアルを構築します。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "ryoji-gondo",
    name: "Ryoji Gondo",
    nameJp: "権藤 崚志",
    role: "3D Model Designer / Animator",
    image: "/images/members/ryoji_gondo.png",
    heroImage: "/images/members/ryoji_gondo02.png",
    galleryMain: "/images/members/ryoji_gondo03.png",
    gallerySub: [
      "/images/members/ryoji_gondo_galary01.png",
      "/images/members/ryoji_gondo_galary02.png",
      "/images/members/ryoji_gondo_galary03.png",
      "/images/members/ryoji_gondo_galary04.png",
    ],
    description:
      "3D空間における表現を追求し、静止画では伝えきれない情緒を映像に吹き込みます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "mei-iida",
    name: "Mei Iida",
    nameJp: "飯田 芽生",
    role: "Contents Planner",
    image: "/images/members/mei_iida.png",
    heroImage: "/images/members/mei_iida02.png",
    galleryMain: "/images/members/mei_iida03.png",
    gallerySub: [
      "/images/members/mei_iida_galary01.png",
      "/images/members/mei_iida_galary02.png",
      "/images/members/mei_iida_galary03.png",
      "/images/members/taichi_suwa_galary04.png",
    ],
    description:
      "言葉と体験を設計し、ユーザーの心に響くコンテンツを企画します。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
];

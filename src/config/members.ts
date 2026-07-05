export type Member = {
  id: string;
  name: string;
  nameJp: string;
  role: string;
  roleLeft?: string;
  roleRight?: string;
  /** 一覧ページ（/members グリッド）で表示する大文字ロール表記 */
  listRole: string;
  /** 一覧ページで表示する識別コード（例: #001107） */
  code: string;
  image: string;
  /** 一覧ページのグリッドで使うポートレート画像 */
  listImage: string;
  heroImage?: string;
  galleryMain?: string;
  gallerySub?: string[];
  description: string;
  influence?: string;
  extra?: string;
};

// NOTE: メンバー情報の唯一のデータソース。
// トップページ(Members) / 一覧(/members) / 詳細(/members/[id]) はすべてこの配列を参照する。
// 配列順 = 表示順（leadership-first: CEO → CTO → ...）。
export const MEMBERS: Member[] = [
  {
    id: "taichi-suwa",
    name: "Taichi Suwa",
    nameJp: "諏訪 太一",
    role: "CEO / Director",
    roleLeft: "CEO",
    roleRight: "DIRECTOR",
    listRole: "CEO DIRECTOR",
    code: "#001107",
    image: "/images/members/taichi_suwa01.png",
    listImage: "/images/members/taichi_suwa01.png",
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
    listRole: "CTO ENGINEER",
    code: "#000922",
    image: "/images/members/shouhi_ide.png",
    listImage: "/images/members/shouhi_ide01.png",
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
    listRole: "DIRECTOR DESIGNER GENERAL AFFAIRS",
    code: "#990915",
    image: "/images/members/cotomi_naka.png",
    listImage: "/images/members/cotomi_naka01.png",
    heroImage: "/images/members/cotomi_naka02.png",
    galleryMain: "/images/members/cotomi_naka03.png",
    gallerySub: [
      "/images/members/cotomi_naka_galary01.png",
      "/images/members/cotomi_naka_galary02.png",
      "/images/members/cotomi_naka_galary03.png",
      "/images/members/cotomi_naka_galary04.png",
    ],
    description:
      "2021年に学生向けスクール事業に携わり、デザインの基礎指導やプロジェクト運営に従事。Webデザインを主軸としながら、ロゴや印刷物などメディアを問わず、デザイン全般を幅広く担当。前職であるコンサルティングファームでの制作や、飲食店のブランディングなど、ビジネスの現場に即した制作を経験。",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "nanase-shigeta",
    name: "Nanase Shigeta",
    nameJp: "繁田 七瀬",
    role: "Director / Designer",
    listRole: "DIRECTOR DESIGNER",
    code: "#001015",
    image: "/images/members/nanase_shigeta.png",
    listImage: "/images/members/nanase_shigeta01.png",
    heroImage: "/images/members/nanase_shigeta02.png",
    galleryMain: "/images/members/nanase_shigeta03.png",
    gallerySub: [
      "/images/members/nanase_shigeta_galary01.png",
      "/images/members/nanase_shigeta_galary02.png",
      "/images/members/nanase_shigeta_galary03.png",
      "/images/members/nanase_shigeta_galary04.png",
    ],
    description:
      "学生時代よりファッションショーや雑誌制作などのイベント・メディア領域でデザイン制作、イベント演出に従事。2022〜24年に学生向け事業にて70名規模のマネジメント、クリエイティブの制作指導を行い、企画設計から進行管理、アウトプットまで一貫して担当。その後toC領域の商品・サービスブランディングデザインを軸に、コンセプト設計からビジュアル開発、デザイン制作までを行う。",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "ryoji-gondo",
    name: "Ryoji Gondo",
    nameJp: "権藤 崚志",
    role: "3D Model Designer / Animator",
    listRole: "3D MODEL DESIGNER ANIMATOR",
    code: "#000831",
    image: "/images/members/ryoji_gondo.png",
    listImage: "/images/members/ryoji_gondo01.png",
    heroImage: "/images/members/ryoji_gondo02.png",
    galleryMain: "/images/members/ryoji_gondo03.png",
    gallerySub: [
      "/images/members/ryoji_gondo_galary01.png",
      "/images/members/ryoji_gondo_galary02.png",
      "/images/members/ryoji_gondo_galary03.png",
      "/images/members/ryoji_gondo_galary04.png",
    ],
    description:
      "デザインおよびプログラミングの経験を経て、3Dモデリングを主軸に活動。アニメーションや空間設計まで一貫して手掛け、Youtubeタレントの3Dフィギュアの制作や、没入感のある3Dウェブサイトの構築など、デジタルとリアルの境界を横断したクリエイティブに従事。",
    influence: "「」",
    extra: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "mei-iida",
    name: "Mei Iida",
    nameJp: "飯田 芽生",
    role: "Contents Planner",
    listRole: "CONTENTS PLANNER",
    code: "#020801",
    image: "/images/members/mei_iida.png",
    listImage: "/images/members/mei_iida01.png",
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

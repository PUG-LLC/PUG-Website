export type TeamMember = {
  id: string;
  name: string;
  nameJp: string;
  role: string;
  image: string;
  description: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "taichi-suwa",
    name: "Taichi Suwa",
    nameJp: "諏訪 太一",
    role: "CEO / Director",
    image: "/images/team/taichi_suwa.png",
    description:
      "学生時代にクリエイティブチーム『Verph』を結成。2022年にヴェネチア国際映画祭への衣装出展や2025年にディズニーマーベル社の映画広告クリエイティブのビジュアルコンセプト設計を担当。2025年からリゾートや複合施設のディレクションを複数担当。2026年に合同会社PUGを設立。",
  },
  {
    id: "shouhi-ide",
    name: "Shouhi Ide",
    nameJp: "井手 翔陽",
    role: "CTO / Engineer",
    image: "/images/team/shouhi_ide.png",
    description:
      "学生時代にコンピューターサークル『Tech.Uni』を創設。Yahoo! JAPAN、楽天グループなど複数企業でソフトウェアエンジニアインターンを経験。2022年にエンジニアバー『HACK.BAR』を創業。その後、Hinome Inc.、NOT A HOTEL Inc.にソフトウェアエンジニアとして参画。2023年にZEN LLC.創業。2024年にawabar Kobeを創業。",
  },
  {
    id: "cotomi-naka",
    name: "Cotomi Naka",
    nameJp: "中 琴美",
    role: "Director / Designer / General affairs",
    image: "/images/team/cotomi_naka.png",
    description:
      "2021年に学生向けスクール事業に携わり、デザインの基礎指導やプロジェクト運営に従事。Webデザインを主軸としながら、ロゴや印刷物などメディアを問わず、デザイン全般を幅広く担当。前職であるコンサルティングファームでの制作や、飲食店のブランディングなど、ビジネスの現場に即した制作を経験。2026年1月合同会社PUGに参画。",
  },
  {
    id: "nanase-shigeta",
    name: "Nanase Shigeta",
    nameJp: "繁田 七瀬",
    role: "Director / Designer",
    image: "/images/team/nanase_shigeta.png",
    description:
      "独創的な視点から、ブランドの核心を突くビジュアルを構築します。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "ryoji-gondo",
    name: "Ryoji Gondo",
    nameJp: "権藤 崚志",
    role: "3D Model Designer / Animator",
    image: "/images/team/ryoji_gondo.png",
    description:
      "3D空間における表現を追求し、静止画では伝えきれない情緒を映像に吹き込みます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    id: "mei-iida",
    name: "Mei Iida",
    nameJp: "飯田 芽生",
    role: "Contents Planner",
    image: "/images/team/mei_iida.png",
    description:
      "言葉と体験を設計し、ユーザーの心に響くコンテンツを企画します。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
];

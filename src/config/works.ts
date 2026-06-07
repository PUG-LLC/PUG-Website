export type Member = {
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

export const WORKS: Work[] = [
  {
    id: "1",
    client: "吉野建設株式会社 様",
    title: "神戸天空プロジェクト ブランド設計",
    overview:
      "神戸市北区の山の中腹にあるリゾート施設「神戸天空」。\nこの場所を未来に残すべく、ブランド価値の整理をご一緒させていただきました。",
    mainImage: "/images/works/work1_main.png",
    categories: ["Branding", "Web", "Movie"],
    tags: ["ブランディング", "コンセプト設計", "Web", "撮影", "ロゴ"],
    deliverables: [
      {
        name: "ブランドブック",
        thumbnail: "/images/works/work1_1.png",
        description:
          "この土地の歴史から設立、運営開始までの経緯、理念や提供価値をまとめた一冊のブランドブックを制作させていただきました。月に一度、一週間の現地滞在をしながら現場業務のお手伝いをさせていただき、フォールドワークでは近辺の寺社仏閣や山系を周りながら施設のある土地に関連する歴史や地域の伝承などの聞き込みを行い、マクロな時間軸においてどのような役割、位置付けとして存在してきた場所なのかを紐解いていきました。",
        link: "https://example.com",
      },
      {
        name: "サウンドプレイヤー",
        thumbnail: "/images/works/work1_2.png",
        description:
          "フィールドワークの際、サウンドレコーダーを用いて施設内や近辺の環境音を録音し、「各時代にこの場所で流れていた音を聴けるラジオ」というUXのWebアプリを制作いたしました。",
      },
      {
        name: "神戸天空プロジェクト ロゴ",
        thumbnail: "/images/works/work1_3.png",
        description:
          "神戸天空でのコンテンツ開発とリゾート価値のさらなる向上を目的として発足した『神戸天空プロジェクト』のロゴを制作いたしました。現場で",
      },
    ],
    members: [
      {
        role: "Director",
        name: "Taichi Suwa",
        image: "/images/members/taichi_suwa.png",
      },
      {
        role: "Designer",
        name: "Cotomi Naka",
        image: "/images/members/cotomi_naka.png",
      },
      {
        role: "Engineer",
        name: "Shouhi Ide",
        image: "/images/members/shouhi_ide.png",
      },
      {
        role: "3D Model Designer",
        name: "Ryoji Gondo",
        image: "/images/members/ryoji_gondo.png",
      },
    ],
    voice:
      "ここにクライアントの声が入る。短くても全然いいかと。回収が厳しそうであればなくても良さそう。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    relatedIds: ["2", "3", "4"],
  },
  {
    id: "2",
    client: "敷栄神所霊園 様",
    title: "『五神獣』パッケージ背面デザイン",
    overview:
      "歴史ある霊園の新しい取り組みとして、守護獣をモチーフにしたパッケージデザインを担当。伝統の中に現代的な解釈を加えたビジュアルを制作しました。",
    mainImage: "/images/works/work2.png",
    categories: ["Graphic"],
    tags: ["パッケージデザイン"],
    deliverables: [
      {
        name: "Package Design",
        thumbnail: "/images/works/work2.png",
        description:
          "五神獣を繊細なイラストレーションで表現。金箔押しを用いることで、供養品としての品格を保ちつつ、手に取った時の喜びも感じられるデザインを目指しました。",
      },
    ],
    members: [
      {
        role: "Dir / Design",
        name: "Taichi Suwa",
        image: "/images/members/taichi_suwa.png",
      },
      {
        role: "Illustration",
        name: "Nanase Shigeta",
        image: "/images/members/cotomi_naka.png",
      },
    ],
    voice:
      "非常に丁寧なヒアリングから、私たちが大切にしている文脈をしっかり汲み取っていただけました。完成したデザインは、まさに私たちが求めていたそのものでした。",
    relatedIds: ["1", "3", "5"],
  },
  {
    id: "3",
    client: "クレー株式会社 様",
    title: "コーポレートサイト制作",
    overview:
      "テクノロジーと人間味の融合を掲げる企業のコーポレートサイトを刷新。ミニマルながらも細部までこだわったタイポグラフィとアニメーションで構築しました。",
    mainImage: "/images/works/work4.png",
    categories: ["Web"],
    tags: ["Web"],
    deliverables: [
      {
        name: "Web Design",
        thumbnail: "/images/works/work3.png",
        description:
          "フロントエンドからバックエンドまで、一貫した技術スタックで構築。パフォーマンスとアクセシビリティを両立した設計を行なっています。",
      },
    ],
    members: [
      {
        role: "Digital Design",
        name: "Nanase Shigeta",
        image: "/images/members/cotomi_naka.png",
      },
      {
        role: "Frontend",
        name: "Shouhi Ide",
        image: "/images/members/shouhi_ide.png",
      },
    ],
    relatedIds: ["1", "4", "6"],
  },
  {
    id: "4",
    client: "合同会社ZEN(提携)",
    title: "企業HP",
    overview:
      "次世代のプロジェクト管理ツールのUI/UX設計。複雑な機能をシンプルにまとめ、直感的な操作感を実現しました。",
    mainImage: "/images/works/work4.png",
    categories: ["Web", "Application"],
    tags: ["UI", "UX", "Web"],
    deliverables: [
      {
        name: "UI Design",
        thumbnail: "/images/works/work4.png",
        description:
          "ダークモードを基調とした、集中力を高める配色設計。グリッドシステムと緻密なスペーシングにより、情報の階層を明確化しています。",
      },
    ],
    members: [
      {
        role: "UX Design",
        name: "Nanase Shigeta",
        image: "/images/members/cotomi_naka.png",
      },
      {
        role: "Product Manager",
        name: "Taichi Suwa",
        image: "/images/members/taichi_suwa.png",
      },
    ],
    relatedIds: ["3", "1", "2"],
  },
  {
    id: "5",
    client: "赤城山荘プロジェクト 様",
    title: "初期コンセプト設計",
    overview:
      "霊園の四季折々の風景を記録するスチール撮影。静謐さと生命力をテーマに、場所の持つエネルギーを視覚化しました。",
    mainImage: "/images/works/work5.png",
    categories: ["Branding"],
    tags: ["撮影", "ロゴ"],
    deliverables: [
      {
        name: "Photography",
        thumbnail: "/images/works/work5.png",
        description:
          "自然光を活かしたライティングにより、場所の空気感をそのまま封じ込めました。カタログやWebサイトで使用されています。",
      },
    ],
    members: [
      {
        role: "Photographer",
        name: "Shouhi Ide",
        image: "/images/members/shouhi_ide.png",
      },
      {
        role: "Art Direction",
        name: "Taichi Suwa",
        image: "/images/members/taichi_suwa.png",
      },
    ],
    relatedIds: ["2", "1", "4"],
  },
];

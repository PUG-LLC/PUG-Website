// src/components/sections/.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Caret from "../ui/Caret";

type Member = {
  id: string;
  role: string;
  name: string;
  bio: string;
  image: string;
};

const MEMBERS: Member[] = [
  {
    id: "so-nakanishi",
    role: "CEO",
    name: "So Nakanishi",
    image: "/images/team/so-nakanishi.jpg",
    bio: "学生時代に海外留学やWebデザインやアプリケーション開発を経験。2014年から約2年間バンコクに居住し、東南アジアをターゲットとした旅行サービスを創業。2016年に帰国後は国内大手旅行会社に事業開発。2016年12月にStudioA社、2017年6月に代表取締役就任。2024年1月にStudio Technologies, Inc. CEO就任。",
  },
  {
    id: "taichi-suwa",
    role: "COO",
    name: "Taichi Suwa",
    image: "/images/team/taichi_suwa.jpg",
    bio: "学生時代に海外留学やWebデザインやアプリケーション開発を経験。2014年から約2年間バンコクに居住し、東南アジアをターゲットとした旅行サービスを創業。2016年に帰国後は国内大手旅行会社に事業開発。2016年12月にStudioA社、2017年6月に代表取締役就任。2024年1月にStudio Technologies, Inc. COO就任。",
  },
  {
    id: "nanase-shigeta",
    role: "CEO",
    name: "Nanase Shigeta",
    image: "/images/team/nanase-shigeta.jpg",
    bio: "学生時代に海外留学やWebデザインやアプリケーション開発を経験。2014年から約2年間ベンコンに在籍し、東南アジアをターゲットとしたM＆Aサポートを経験。2016年に帰国後は国内大手商社に在籍し事業開発。2016年12月にStudioA社、2017年6月に代表取締役就任。2024年1月にSStudio Technologies, Inc. CEO就任。",
  },
  {
    id: "mei-iida",
    role: "CEO",
    name: "Mei Iida",
    image: "/images/team/mei-iida.jpg",
    bio: "学生時代に海外留学やWebデザインやアプリケーション開発を経験。2014年から約2年間ベンコンに在籍し、東南アジアをターゲットとしたM＆Aサポートを経験。2016年に帰国後は国内大手商社に在籍し事業開発。2016年12月にStudioA社、2017年6月に代表取締役就任。2024年1月にSStudio Technologies, Inc. CEO就任。",
  },
  {
    id: "shouhi-ide",
    role: "CTO",
    name: "Shouhi Ide",
    image: "/images/team/shouhi_ide.jpg",
    bio: "学生時代に海外留学やWebデザインやアプリケーション開発を経験。2014年から約2年間ベンコンに在籍し、東南アジアをターゲットとしたM＆Aサポートを経験。2016年に帰国後は国内大手商社に在籍し事業開発。2016年12月にStudioA社、2017年6月に代表取締役就任。2024年1月にSStudio Technologies, Inc. CTO就任。",
  },
];

export default function Team() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#1B1B1B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {/* Header */}
        <header className="max-w-3xl">
          <h2 className="font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-white/95">
            -Team
          </h2>
          <p className="mt-5 text-[13.5px] leading-[2.1] tracking-[0.02em] text-white/75">
            Coalisは、ファイナンシャルアドバイザリーサービス（FAS）やグローズ/バイアウトファンドを通じ、
            スタートアップエコシステムの発展に貢献し、日本における新しい産業の成長（グロース）を支援します。
            <Caret />
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-[12.5px] tracking-wide text-white/90 transition-colors hover:bg-white hover:text-black"
            >
              Team Page <span aria-hidden>↗</span>
            </Link>
          </div>
        </header>

        {/* Members */}
        <ul className="mt-14 grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
          {MEMBERS.map((m) => (
            <li key={m.id} className="relative flex flex-col gap-2">
              {/* 行レイアウト：左アバター 96px、右テキスト */}
              <div className="flex justify-between">
                <div className="flex items-start gap-6">
                  {/* Avatar（常に正方形） */}
                  <div className="relative h-[96px] w-[96px] overflow-hidden rounded-[3px] border border-white/15 bg-white/5">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  {/* Texts */}
                  <div className="min-w-0">
                    {/* 役職（小さめ・大文字） */}
                    <p className="text-[11px] uppercase leading-tight tracking-[0.18em] text-white/60">
                      {m.role}
                    </p>

                    {/* 氏名 */}
                    <p className="mt-1.5 text-[22px] text-white">{m.name}</p>
                  </div>
                </div>
                {/* 赤ドット：役職行の高さ・右端 */}
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[#FF3B00]"
                />
              </div>
              {/* 経歴：横幅を絞って読みやすく */}
              <p className="mt-3 text-[13px] leading-[1.9] text-white/75">
                {m.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 上下ビネット（ごく薄く） */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_40px_80px_-40px_rgba(0,0,0,0.6),inset_0_-40px_80px_-40px_rgba(0,0,0,0.6)]" />
    </section>
  );
}

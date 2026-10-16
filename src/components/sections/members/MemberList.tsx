"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// メンバー情報はサーバーから props で受け取る（Notion or 静的フォールバック）。
// 一覧グリッド用の表記は listRole / code / listImage を使用する。
import type { Member } from "@/lib/content/types";

export default function MemberList({ members }: { members: Member[] }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#ebebeb]">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Row 1 / Initial Members */}
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-square lg:aspect-[3/4] overflow-hidden"
            >
              <Link
                href={`/members/${member.slug}`}
                className="block w-full h-full relative"
              >
                {/* Red Marker */}
                <div className="absolute top-5 left-5 z-30 w-2 h-2 rounded-full bg-red-600" />

                <Image
                  src={member.listImage}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 bg-gradient-to-t from-black/60 to-transparent text-center">
                  <h3 className="text-white text-[22px] lg:text-[28px] font-bold mb-0">
                    {member.name}
                    <span className="text-[12px] lg:text-[14px] relative -top-[1em] ml-0.5 opacity-80">
                      ®
                    </span>
                  </h3>
                  <p className="text-white/80 text-[10px] lg:text-[12px] tracking-wider font-medium uppercase truncate">
                    {member.listRole}{" "}
                    <span className="ml-1 opacity-70">{member.code}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Special LLC Block (Spans 2 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group relative col-span-2 aspect-[2/1] lg:aspect-[3/2] overflow-hidden"
          >
            <Image
              src="/images/members/team03.png"
              alt="PUG LLC."
              fill
              className="object-cover"
            />

            {/* LLC Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-[8%] lg:p-12 text-white bg-black/20">
              <div className="relative top-[15%] -left-[5%] lg:top-4 lg:-left-10">
                <Image
                  src="/images/logo_light.svg"
                  alt="PUG LLC."
                  width={340}
                  height={24}
                  className="h-[2vw] lg:h-[14px] w-auto min-h-[10px]"
                />
              </div>

              <div className="flex self-end gap-x-[15%] lg:gap-x-8 text-[1.8vw] lg:text-[12px] font-medium tracking-wide opacity-90">
                <div className="">
                  <p>Brand Strategy</p>
                  <p>Design</p>
                  <p>App Development</p>
                </div>
                <div className="">
                  <p>3D Modeling</p>
                  <p>Video Production</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

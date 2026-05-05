"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Message() {
  return (
    <section className="relative pb-16 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        {/* Section Title */}
        <div className="flex flex-col gap-4 mb-24">
          <h2 className="font-serif text-[clamp(32px,5vw,52px)] font-normal leading-none text-[#1a1a1a]">
            -Message
          </h2>
          <p className="text-[11px] tracking-[0.3em] text-[#888] uppercase font-medium">
            ご挨拶
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.h3
              className="text-[clamp(24px,3.5vw,32px)] font-semibold leading-tight my-18 [font-feature-settings:'palt'] text-[#111]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              しっぽを振ってあなたの元へ
            </motion.h3>

            <motion.div
              className="text-[14.5px] lg:text-[15px] tracking-[0.05em] text-[#333] space-y-4 [font-feature-settings:'palt']"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p>
                PUGは、クリエイティブであなたの世界を少し素敵にする会社です。
              </p>

              <p>
                世界は、人々を魅了するたくさんの素敵なクリエイティブたちで溢れています。
                <br />
                穀物が入ればいい土器にすら紋様を刻む。そんな衝動やワクワクに抗えない人間という種に生まれて、つくることを生業とできることを心から幸せに思います。
              </p>

              <p>
                だからこそ、
                <br />
                重い荷物を持っている人がいたら、一緒に持ちたいです。
                <br />
                道に迷っている人がいたら、教えてあげたいです。
                <br />
                お腹を空かせた人がいるなら、食べ物を分けてあげたいです。
              </p>

              <p>
                今日を頑張る理由が必要なら、楽しみを届けたいです。
                <br />
                不安で眠れない人がいるなら、逃げ込める世界をつくりたいです。
                <br />
                それはすべて、私がしてもらったことです。
              </p>

              <p>
                素敵な瞬間はいつも、有機的な出来事の連鎖のなかにあるように感じます。
                <br />
                世界の端から端まで、そのきっかけをクリエイティブで。
                <br />
                私たちは、ないよりはあったほうがよかった素敵な瞬間を引き起こしていきます。
              </p>

              <div className="pt-4">
                <p className="text-[15px] font-medium tracking-widest text-[#1a1a1a]">
                  代表 諏訪太一
                </p>
              </div>
            </motion.div>
          </div>

          {/* Representative Image */}
          <motion.div
            className="order-1 lg:order-2 relative aspect-[3/4] w-full max-w-[500px] lg:max-w-none mx-auto overflow-hidden bg-neutral-100"
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/members/taichi_suwa_message.png"
              alt="Taichi Suwa"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

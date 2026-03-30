"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const MEMBERS = [
  {
    id: "taichi-suwa",
    name: "Taichi Suwa",
    role: "CEO DIRECTOR",
    code: "#001107",
    image: "/images/team/taichi_suwa01.png",
  },
  {
    id: "cotomi-naka",
    name: "Cotomi Naka",
    role: "DIRECTOR DESIGNER GENERAL AFFAIRS",
    code: "#990915",
    image: "/images/team/cotomi_naka01.png",
  },
  {
    id: "shouhi-ide",
    name: "Shouhi Ide",
    role: "CTO ENGINEER",
    code: "#000922",
    image: "/images/team/shouhi_ide01.png",
  },
  {
    id: "nanase-shigeta",
    name: "Nanase Shigeta",
    role: "DIRECTOR DESIGNER",
    code: "#001015",
    image: "/images/team/nanase_shigeta01.png",
  },
  {
    id: "mei-iida",
    name: "Mei Iida",
    role: "CONTENTS PLANNER",
    code: "#020801",
    image: "/images/team/mei_iida01.png",
  },
  {
    id: "ryoji-gondo",
    name: "Ryoji Gondo",
    role: "3D MODEL DESIGNER ANIMATOR",
    code: "#000831",
    image: "/images/team/ryoji_gondo01.png",
  },
];

export default function MemberList() {
  return (
    <section className="relative w-full overflow-hidden bg-[#ebebeb]">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Row 1 / Initial Members */}
          {MEMBERS.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-square lg:aspect-[3/4] overflow-hidden"
            >
              <Link
                href={`/team/${member.id}`}
                className="block w-full h-full relative"
              >
                {/* Red Marker */}
                <div className="absolute top-5 left-5 z-30 w-2 h-2 rounded-full bg-red-600" />

                <Image
                  src={`${member.image}`}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 bg-gradient-to-t from-black/60 to-transparent text-center">
                  <h3 className="text-white text-[22px] lg:text-[28px] font-bold tracking-tighter mb-0">
                    {member.name}
                    <span className="text-[12px] lg:text-[14px] relative -top-[1em] ml-0.5 opacity-80">
                      ®
                    </span>
                  </h3>
                  <p className="text-white/80 text-[10px] lg:text-[12px] tracking-wider font-medium uppercase truncate">
                    {member.role}{" "}
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
            <div className="absolute top-2 left-2 z-30 w-1.5 h-1.5 rounded-full bg-red-600" />

            <Image
              src="/images/team/team03.png"
              alt="PUG LLC."
              fill
              className="object-cover"
            />

            {/* LLC Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 text-white bg-black/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-600" />
                <h3 className="text-[20px] lg:text-[24px] font-bold tracking-tighter">
                  PUG{" "}
                  <span className="text-[12px] font-normal tracking-normal opacity-80">
                    LLC.
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px] lg:text-[12px] font-medium tracking-wide opacity-90">
                <div className="space-y-1">
                  <p>Brand Strategy</p>
                  <p>Design</p>
                  <p>App Development</p>
                </div>
                <div className="space-y-1 text-right lg:text-left">
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

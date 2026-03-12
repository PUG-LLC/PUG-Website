"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/config/team";

export default function MemberList() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 lg:pb-56">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 lg:gap-y-24">
        {TEAM_MEMBERS.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group"
          >
            <Link href={`/team/${member.id}`} className="block h-full">
              <div className="relative aspect-[3/4] w-full overflow-hidden grayscale mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-[18px] lg:text-[20px] font-bold tracking-tight">
                  {member.name}
                </h2>
                <p className="text-[11px] font-medium text-[#666] tracking-widest uppercase opacity-80 leading-relaxed">
                  {member.role}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

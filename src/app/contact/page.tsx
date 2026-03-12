import Image from "next/image";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import CTA from "@/components/sections/CTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <div className="relative">
        {/* 背景画像エリア: コンタクトタイトルから「ご担当者名」付近までカバーするように高さを設定 */}
        <div className="absolute top-0 left-0 w-full h-[950px] lg:h-[1250px] z-0 overflow-hidden">
          <Image
            src="/images/backgroundImage.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10">
          <ContactHero />
          <ContactForm />
        </div>
      </div>
      <CTA />
    </main>
  );
}

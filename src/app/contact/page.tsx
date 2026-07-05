import Image from "next/image";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import CTA from "@/components/sections/CTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <div className="relative">
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

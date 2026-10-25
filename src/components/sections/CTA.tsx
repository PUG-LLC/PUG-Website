import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

type CardProps = {
  title: string;
  desc: string;
  href: string;
  label: string;
  download?: string;
};

function CTACard({ title, desc, href, label, download }: CardProps) {
  const className = "group relative block overflow-hidden rounded-sm bg-[#161617] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  const content = (
    <>
      <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_80px_rgba(0,0,0,0.35)]" />
      <div className="flex items-start justify-between gap-6 p-8 sm:p-10 lg:p-12">
        <div className="min-w-0 max-w-[46ch]">
          <h2 className="font-serif text-[clamp(18px,2.4vw,24px)] leading-tight text-white/95">
            {title}
          </h2>
          <p className="mt-6 whitespace-pre-wrap text-[13px] leading-[2] tracking-[0.02em] text-white/70">
            {desc}
          </p>
          {download && <p className="mt-3 text-[12px] text-white/70">会社紹介資料（PDF）</p>}
        </div>
        <span aria-hidden="true" className="mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/15 text-white/80 transition-colors group-hover:border-white/30 group-hover:text-white">
          {download ? <Download className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </span>
      </div>
    </>
  );

  return download ? (
    <a href={href} download={download} aria-label={label} className={className}>{content}</a>
  ) : (
    <Link href={href} aria-label={label} className={className}>{content}</Link>
  );
}

export default function CTA() {
  return (
    <section aria-label="お問い合わせ・資料ダウンロード" className="relative isolate w-full bg-black py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:gap-8 md:grid-cols-2">
        <CTACard
          title="-Contact"
          href="/contact"
          label="お問い合わせフォームへ"
          desc={"ぼんやり、ふわっと、なんとなく。\nそんな思いの丈を、壺に向かって話す気分でお聞かせください。"}
        />
        <CTACard
          title="-Document download"
          href="/documents/pug-company-profile.pdf"
          download="合同会社PUG会社紹介資料.pdf"
          label="合同会社PUGの会社紹介資料をダウンロード（PDF）"
          desc="パグはあなたになら、お腹を見せてもいいかも。"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_24px_60px_-36px_rgba(0,0,0,0.9),inset_0_-24px_60px_-36px_rgba(0,0,0,0.9)]" />
    </section>
  );
}

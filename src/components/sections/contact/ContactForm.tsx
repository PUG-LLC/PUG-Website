"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type ContactFormData = {
  company: string;
  company_kana: string;
  department: string;
  name: string;
  name_kana: string;
  email: string;
  tel: string;
  message: string;
  policy: boolean;
};

export default function ContactForm() {
  const { register, handleSubmit } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    alert("このフォームはデモ用です。実際の送信は行われません。");
  };

  const inputClass =
    "w-full bg-transparent border-b border-black/20 py-3 text-[14px] lg:text-[15px] focus:outline-none focus:border-black transition-colors placeholder:text-black/30 placeholder:text-[13px]";
  const labelClass =
    "text-[12px] font-bold tracking-widest text-[#1a1a1a] mb-2 inline-block uppercase";

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 lg:py-40">
      <div className="mb-20 lg:mb-32 space-y-4 max-w-2xl">
        <p className="text-[14px] lg:text-[15px] leading-relaxed [font-feature-settings:'palt']">
          見積もり依頼・ご相談などのお問い合わせは、必要事項を入力の上、送信ください。
        </p>
        <p className="text-[12px] text-[#666] leading-relaxed [font-feature-settings:'palt']">
          ※セールスなどのお問い合わせ、ご案内は一切お断りしておりますので、ご遠慮ください。
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 lg:space-y-16"
      >
        <div className="grid grid-cols-1 gap-x-16 gap-y-12">
          {/* Company Name */}
          <div className="flex flex-col">
            <label className={labelClass}>会社名</label>
            <input
              {...register("company")}
              placeholder="合同会社PUG"
              className={inputClass}
            />
          </div>

          {/* Company Name (Kana) */}
          <div className="flex flex-col">
            <label className={labelClass}>会社名(カナ)</label>
            <input
              {...register("company_kana")}
              placeholder="ゴウドウガイシャパグ"
              className={inputClass}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className={labelClass}>部署名</label>
            <input
              {...register("department")}
              placeholder="企画部"
              className={inputClass}
            />
          </div>

          {/* Contact Person Name */}
          <div className="flex flex-col">
            <label className={labelClass}>ご担当者名</label>
            <input
              {...register("name")}
              placeholder="犬養 剛"
              className={inputClass}
            />
          </div>

          {/* Contact Person Name (Kana) */}
          <div className="flex flex-col">
            <label className={labelClass}>ご担当者名(カナ)</label>
            <input
              {...register("name_kana")}
              placeholder="イヌカイ パグ"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className={labelClass}>メールアドレス</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@pug-cx.com"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className={labelClass}>電話番号</label>
            <input
              {...register("tel")}
              type="tel"
              placeholder="080-9939-8383"
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className={labelClass}>お問い合わせ内容</label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="こちらにご記入ください"
            className={inputClass}
          />
        </div>

        {/* Policy Agreement */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="flex items-center gap-4 mb-20 lg:mb-24">
            <input
              type="checkbox"
              id="policy"
              className="w-4 h-4 rounded-full border border-black/30 appearance-none checked:bg-black checked:border-black transition-all cursor-pointer relative after:content-[''] after:hidden checked:after:block after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-white after:rounded-full"
              {...register("policy")}
            />
            <label
              htmlFor="policy"
              className="text-[12px] tracking-widest font-medium cursor-pointer"
            >
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 hover:opacity-50"
              >
                プライバシーポリシー
              </Link>
              に同意する
            </label>
          </div>

          <button
            type="submit"
            className="group relative flex items-center gap-12 px-16 py-4 border border-black/40 rounded-full text-[13px] tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            送信
            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

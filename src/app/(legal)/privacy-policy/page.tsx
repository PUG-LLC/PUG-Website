import CTA from "@/components/sections/CTA";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:pt-48 lg:pb-24">
        <p lang="en" className="font-serif text-[clamp(48px,12vw,160px)] leading-none">
          Privacy policy
        </p>
        <h1 className="mt-8 text-2xl lg:text-3xl font-bold">プライバシーポリシー</h1>
        <p className="mt-10 max-w-3xl text-[14px] lg:text-[15px] leading-[2]">合同会社PUG（以下「当社」といいます。）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令を遵守するとともに、以下の方針に基づき、個人情報を適切に取り扱います。</p>
      </section>
      <div className="mx-auto max-w-7xl px-6 pb-32 lg:pb-56 space-y-16 lg:space-y-24">
        <section aria-labelledby="policy-section-1" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-1" className="text-[15px] font-bold leading-relaxed">1. 個人情報の取得</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、お問い合わせフォーム等を通じて、以下の個人情報を取得する場合があります。</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>会社名、部署名</li>
              <li>氏名、フリガナ</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>お問い合わせ内容に含まれるその他の個人情報</li>
            </ul>
          </div>
        </section>
        <section aria-labelledby="policy-section-2" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-2" className="text-[15px] font-bold leading-relaxed">2. 個人情報の利用目的</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>お問い合わせ、ご相談、ご依頼への回答および対応</li>
              <li>お見積もりの作成、業務に関するご連絡およびご提案</li>
              <li>契約の締結、業務の遂行および取引先との連絡</li>
              <li>当社サービスの改善および品質向上</li>
              <li>その他、上記の利用目的に付随する業務</li>
            </ol>
            <p>当社は、法令により認められる場合を除き、ご本人の同意なく、上記の目的の達成に必要な範囲を超えて個人情報を利用しません。</p>
          </div>
        </section>
        <section aria-labelledby="policy-section-3" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-3" className="text-[15px] font-bold leading-relaxed">3. 個人情報の第三者提供</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、法令に基づく場合その他法令により認められる場合を除き、ご本人の同意なく個人データを第三者に提供しません。</p>
            <p>なお、業務遂行に必要な範囲で個人データの取扱いを外部事業者に委託する場合があります。この場合、委託先に対して必要かつ適切な監督を行います。</p>
          </div>
        </section>
        <section aria-labelledby="policy-section-4" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-4" className="text-[15px] font-bold leading-relaxed">4. 個人情報の安全管理</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、個人情報の漏えい、紛失、改ざん、不正アクセス等を防止するため、必要かつ適切な安全管理措置を講じます。</p>
            <p>また、個人情報を取り扱う従業者および業務委託先に対して、適切な監督を行います。</p>
          </div>
        </section>
        <section aria-labelledby="policy-section-5" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-5" className="text-[15px] font-bold leading-relaxed">5. 個人情報の開示・訂正・利用停止等</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、ご本人から保有個人データの開示、訂正、追加、削除、利用停止、消去または第三者提供の停止等について請求があった場合、法令に従い適切に対応します。</p>
            <p>ご請求に際しては、ご本人確認をお願いする場合があります。</p>
          </div>
        </section>
        <section aria-labelledby="policy-section-6" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-6" className="text-[15px] font-bold leading-relaxed">6. プライバシーポリシーの変更</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>当社は、法令の改正や事業内容の変更等に応じて、本プライバシーポリシーを変更する場合があります。</p>
            <p>変更後の内容は、当社Webサイトへの掲載をもって公表します。</p>
          </div>
        </section>
        <section aria-labelledby="policy-section-7" className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
          <h2 id="policy-section-7" className="text-[15px] font-bold leading-relaxed">7. 個人情報に関するお問い合わせ</h2>
          <div className="md:col-span-3 max-w-3xl space-y-6 text-[14px] lg:text-[15px] leading-[2]">
            <p>個人情報の取扱いに関するお問い合わせ、開示等のご請求は、当社Webサイトのお問い合わせフォームよりご連絡ください。</p>
            <p><strong>事業者名：合同会社PUG</strong></p>
            <p>Webサイト：<a href="https://www.pug-cs.com/" className="underline underline-offset-4 break-all focus-visible:outline-2 focus-visible:outline-offset-4">https://www.pug-cs.com/</a></p>
          </div>
        </section>
      </div>
      <CTA />
    </main>
  );
}

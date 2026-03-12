import CTA from "@/components/sections/CTA";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "法令等の遵守",
      content: (
        <p className="text-[14px] lg:text-[15px] leading-[2] [font-feature-settings:'palt']">
          一旦サンプルテキスト。。当社は、「個人情報の保護に関する法律」、その他個人情報の取扱いについて定められた適用ある法令、関係省庁のガイドライン、社内規程等を遵守いたします。
        </p>
      ),
    },
    {
      title: "個人情報の取得・利用",
      content: (
        <div className="space-y-6 text-[14px] lg:text-[15px] leading-[2] [font-feature-settings:'palt']">
          <p>
            当社は、業務を遂行する上で、お客様の氏名、住所、電話番号等の個人情報を取得させていただいております。<br />
            当社は、個人情報を以下の目的のために利用します。
          </p>
          <ol className="space-y-1">
            <li>1. （1） お問い合わせなどへの返答</li>
            <li>2. （2） 新規取引のご案内などへの返答</li>
            <li>3. （3） サービス内容の宣伝・告知</li>
            <li>4. （4） 顧客管理</li>
          </ol>
          <p>
            当社はお客様から直接書面等により個人情報を取得する場合、その利用目的を明示するものとし、それ以外の場合についても、その利用目的を通知または公表いたします。当社は、お客様の事前の同意がある場合、または、法令により許される場合でない限り、上記の利用目的の達成に必要な範囲を超えて、個人情報を利用いたしません。
          </p>
        </div>
      ),
    },
    {
      title: "個人情報の管理",
      content: (
        <p className="text-[14px] lg:text-[15px] leading-[2] [font-feature-settings:'palt']">
          当社は、個人情報の漏えい、滅失、き損または不正アクセス等を防止するために、必要な措置を講じ、個人情報を適切に管理いたします。また、当社は、個人情報の取扱いに関して、従業者に対して適切な監督を行うとともに、個人情報の取扱いを委託する際には、委託先に対しても個人情報を適切に管理するよう監督いたします。
        </p>
      ),
    },
    {
      title: "個人情報の開示、訂正、利用停止等",
      content: (
        <p className="text-[14px] lg:text-[15px] leading-[2] [font-feature-settings:'palt']">
          当社は、お客様ご本人から自己の個人情報の開示、訂正、利用停止等の請求がある場合、速やかに対応いたします。その際、ご本人であることが確認できない場合には、これらの請求に応じません。<br />
          当社の個人情報の取り扱いにつきまして、上記の請求・お問い合わせ等がございましたら、お問い合わせフォームよりご連絡ください。
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-48 lg:pb-40">
        <h1 className="font-serif text-[clamp(60px,12vw,160px)] leading-none text-[#1a1a1a]">
          Privacy policy
        </h1>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-6 pb-32 lg:pb-56">
        <div className="space-y-24 lg:space-y-32">
          {sections.map((section, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-12">
              <div className="md:col-span-1">
                <h2 className="text-[13px] font-bold tracking-[0.1em] uppercase">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-3 max-w-3xl">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}

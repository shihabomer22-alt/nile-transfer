import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RateTable } from "@/components/RateTable";
import { BUSINESS_COUNTRIES, PAYOUT_METHODS, WHATSAPP_NUMBER } from "@/lib/constants";
import { t, type Lang } from "@/lib/i18n";

function getLang(searchParams: any): Lang {
  const l = (searchParams?.lang ?? "ar") as Lang;
  return l === "en" ? "en" : "ar";
}

export default function Home({ searchParams }: { searchParams: any }) {
  const lang = getLang(searchParams);
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const wa = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

  return (
    <main dir={dir}>
      <Header lang={lang} />

      <section className="container py-12">
        <div className="card p-8">
          <div className="flex flex-col gap-4">
            <span className="badge">USA based • WhatsApp support</span>
            <img src="/logo.png" alt="Nile Transfer logo" className="h-16 w-16 rounded-2xl border border-slate-200 bg-white object-contain" />
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{d.brand}</h1>
            <p className="text-lg text-slate-600">{d.tagline}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">{d.ctaStart}</a>
              <a className="btn" href={wa} target="_blank" rel="noreferrer">{d.ctaWhatsApp}: {WHATSAPP_NUMBER}</a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold">{d.countriesTitle}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {BUSINESS_COUNTRIES.map((c) => (
                <span key={c.code} className="badge">
                  {lang === "ar" ? c.name_ar : c.name_en}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold">{d.payoutTitle}</h2>
            <p className="text-sm text-slate-600 mt-1">{d.payoutNote}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PAYOUT_METHODS.map((m) => (
                <span key={m.id} className="badge">
                  {lang === "ar" ? m.label_ar : m.label_en}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RateTable lang={lang} />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="card p-6">
            <h3 className="font-bold">{d.how1Title}</h3>
            <p className="text-sm text-slate-600 mt-1">{d.how1Desc}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">{d.how2Title}</h3>
            <p className="text-sm text-slate-600 mt-1">{d.how2Desc}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">{d.how3Title}</h3>
            <p className="text-sm text-slate-600 mt-1">{d.how3Desc}</p>
          </div>
        </div>

      </section>

      <Footer lang={lang} />
    </main>
  );
}

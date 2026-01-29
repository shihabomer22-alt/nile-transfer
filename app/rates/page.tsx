import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { RateTable } from "../../components/RateTable";
import { t, type Lang } from "@/lib/i18n";

function getLang(searchParams: any): Lang {
  const l = (searchParams?.lang ?? "ar") as Lang;
  return l === "en" ? "en" : "ar";
}

export default function Rates({ searchParams }: { searchParams: any }) {
  const lang = getLang(searchParams);
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <main dir={dir}>
      <Header lang={lang} />
      <section className="container py-12">
        <h1 className="text-3xl font-extrabold">{d.ratesTitle}</h1>
        <p className="text-slate-600 mt-2">{d.ratesDesc}</p>
        <div className="mt-6">
          <RateTable lang={lang} />
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  );
}

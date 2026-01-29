import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <header className="border-b border-slate-200" dir={dir}>
      <div className="container flex items-center justify-between py-4">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Nile Transfer logo"
            className="h-9 w-9 rounded-xl border border-slate-200 bg-white object-contain"
          />
          <span className="font-extrabold text-lg tracking-tight">{d.brand}</span>
        </Link>

        <nav className="flex items-center gap-2 flex-wrap justify-end">
          <Link className="btn" href={`/?lang=${lang}`}>{d.navHome}</Link>
          <Link className="btn" href={`/rates?lang=${lang}`}>{d.navRates}</Link>
          <Link className="btn" href={`/contact?lang=${lang}`}>{d.navContact}</Link>
          <Link className="btn" href={`/admin?lang=${lang}`}>{d.adminTitle}</Link>
          <LanguageToggle lang={lang} />
        </nav>
      </div>
    </header>
  );
}

import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const wa = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  return (
    <footer className="border-t border-slate-200 mt-16" dir={dir}>
      <div className="container py-10 text-sm text-slate-600 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-900">{d.brand}</span>
          <span>•</span>
          <a className="underline" href={wa} target="_blank" rel="noreferrer">
            {d.ctaWhatsApp}: {WHATSAPP_NUMBER}
          </a>
        </div>
        <div>© {new Date().getFullYear()} {d.brand}. All rights reserved.</div>
      </div>
    </footer>
  );
}

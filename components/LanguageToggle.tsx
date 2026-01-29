"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";

export function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const nextLang: Lang = lang === "ar" ? "en" : "ar";

  function onSwitch() {
    const params = new URLSearchParams(sp.toString());
    params.set("lang", nextLang);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <button className="btn" onClick={onSwitch} aria-label="Switch language">
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );
}

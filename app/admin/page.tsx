"use client";
import { AdminPanel } from "@/components/AdminPanel";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";

function useLang(): Lang {
  const sp = useSearchParams();
  const l = (sp.get("lang") ?? "ar") as Lang;
  return l === "en" ? "en" : "ar";
}

export default function AdminPage() {
  const lang = useLang();
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <main dir={dir}>
      <Header lang={lang} />
      <section className="container py-12">
        <AdminPanel lang={lang} />
      </section>
      <Footer lang={lang} />
    </main>
  );
}

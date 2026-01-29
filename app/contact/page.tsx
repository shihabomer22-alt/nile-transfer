"use client";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { t, type Lang } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

function useLang(): Lang {
  const sp = useSearchParams();
  const l = (sp.get("lang") ?? "ar") as Lang;
  return l === "en" ? "en" : "ar";
}

export default function ContactPage() {
  const lang = useLang();
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const wa = useMemo(() => `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`, []);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <main dir={dir}>
      <Header lang={lang} />
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h1 className="text-3xl font-extrabold">{d.contactTitle}</h1>
            <p className="text-slate-600 mt-2">{d.contactDesc}</p>

            <div className="mt-4 flex flex-col gap-2">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">
                {d.ctaWhatsApp}: {WHATSAPP_NUMBER}
              </a>
              <p className="text-sm text-slate-600">Main office: USA</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold">Form</h2>
            <p className="text-sm text-slate-600 mt-1">
              (This demo form opens WhatsApp with your message)
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <label className="text-sm">
                Name
                <input className="input mt-1" value={name} onChange={(e)=>setName(e.target.value)} />
              </label>
              <label className="text-sm">
                Message
                <textarea className="input mt-1 min-h-[120px]" value={msg} onChange={(e)=>setMsg(e.target.value)} />
              </label>
              <a
                className="btn btn-primary"
                href={`${wa}?text=${encodeURIComponent(`Name: ${name}\nMessage: ${msg}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Send on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  );
}

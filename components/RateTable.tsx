"use client";
import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";

type RateRow = {
  id: string;
  pair: string;
  rate: number;
  active: boolean;
  updated_at: string;
};

export function RateTable({ lang }: { lang: Lang }) {
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [rows, setRows] = useState<RateRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("exchange_rates")
      .select("id,pair,rate,active,updated_at")
      .eq("active", true)
      .order("pair", { ascending: true });
    if (!error && data) setRows(data as any);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="card p-5" dir={dir}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{d.ratesTitle}</h2>
          <p className="text-sm text-slate-600 mt-1">{d.ratesDesc}</p>
        </div>
        <button className="btn" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-600">
              <th className="text-left py-2">{d.pair}</th>
              <th className="text-left py-2">{d.rate}</th>
              <th className="text-left py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="py-2 font-medium">{r.pair}</td>
                <td className="py-2">{r.rate}</td>
                <td className="py-2 text-slate-600">{new Date(r.updated_at).toLocaleString()}</td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr><td className="py-6 text-slate-600" colSpan={3}>No rates yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

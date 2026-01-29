"use client";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";

type RateRow = { id: string; pair: string; rate: number; active: boolean; updated_at: string };

export function AdminPanel({ lang }: { lang: Lang }) {
  const d = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [session, setSession] = useState<any>(null);
  const [rows, setRows] = useState<RateRow[]>([]);
  const [status, setStatus] = useState<string>("");

  async function refreshSession() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setStatus(d.error);
    await refreshSession();
    await loadRates();
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function loadRates() {
    const { data, error } = await supabase
      .from("exchange_rates")
      .select("id,pair,rate,active,updated_at")
      .order("pair", { ascending: true });
    if (!error && data) setRows(data as any);
  }

  async function upsertRate(row: Partial<RateRow>) {
    setStatus("");
    const payload: any = {
      id: row.id,
      pair: row.pair,
      rate: row.rate,
      active: row.active ?? true,
    };
    const { error } = await supabase.from("exchange_rates").upsert(payload, { onConflict: "id" });
    if (error) { setStatus(d.error); return; }
    setStatus(d.updated);
    await loadRates();
  }

  async function addNew() {
    const tempId = crypto.randomUUID();
    await supabase.from("exchange_rates").insert({ id: tempId, pair: "USD->EGP", rate: 0, active: true });
    await loadRates();
  }

  useEffect(() => {
    refreshSession();
    const { data: sub } = supabase.auth.onAuthStateChange(() => refreshSession());
    loadRates();
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  if (!session) {
    return (
      <div className="card p-6 max-w-lg" dir={dir}>
        <h1 className="text-xl font-extrabold">{d.loginTitle}</h1>
        <p className="text-sm text-slate-600 mt-1">Supabase Auth (email/password)</p>
        <form className="mt-4 flex flex-col gap-3" onSubmit={signIn}>
          <label className="text-sm">
            {d.email}
            <input className="input mt-1" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
          </label>
          <label className="text-sm">
            {d.password}
            <input className="input mt-1" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
          </label>
          <button className="btn btn-primary" type="submit">{d.signIn}</button>
          {status && <div className="text-sm text-slate-700">{status}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir={dir}>
      <div className="card p-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold">{d.adminTitle}</h1>
          <p className="text-sm text-slate-600">Signed in: {session.user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={addNew}>{d.add}</button>
          <button className="btn" onClick={loadRates}>Refresh</button>
          <button className="btn" onClick={signOut}>{d.signOut}</button>
        </div>
      </div>

      {status && <div className="badge">{status}</div>}

      <div className="card p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-600">
              <th className="text-left py-2">{d.pair}</th>
              <th className="text-left py-2">{d.rate}</th>
              <th className="text-left py-2">{d.active}</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <RateRowEditor key={r.id} row={r} onSave={upsertRate} />
            ))}
            {rows.length === 0 && (
              <tr><td className="py-6 text-slate-600" colSpan={4}>No rows.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RateRowEditor({ row, onSave }: { row: RateRow; onSave: (row: Partial<RateRow>) => Promise<void> }) {
  const [pair, setPair] = useState(row.pair);
  const [rate, setRate] = useState(String(row.rate));
  const [active, setActive] = useState(row.active);

  useEffect(() => {
    setPair(row.pair);
    setRate(String(row.rate));
    setActive(row.active);
  }, [row.id, row.pair, row.rate, row.active]);

  return (
    <tr className="border-t border-slate-100">
      <td className="py-2">
        <input className="input" value={pair} onChange={(e)=>setPair(e.target.value)} />
      </td>
      <td className="py-2">
        <input className="input" value={rate} onChange={(e)=>setRate(e.target.value)} inputMode="decimal" />
      </td>
      <td className="py-2">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={active} onChange={(e)=>setActive(e.target.checked)} />
          <span className="text-slate-700">{active ? "On" : "Off"}</span>
        </label>
      </td>
      <td className="py-2">
        <button className="btn btn-primary" onClick={() => onSave({ id: row.id, pair, rate: Number(rate), active })}>
          Save
        </button>
      </td>
    </tr>
  );
}

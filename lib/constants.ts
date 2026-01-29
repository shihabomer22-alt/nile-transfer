export const WHATSAPP_NUMBER = "+15519984555";
export const BUSINESS_COUNTRIES = [
  { code: "USA", name_en: "United States", name_ar: "الولايات المتحدة" },
  { code: "EGY", name_en: "Egypt", name_ar: "مصر" },
  { code: "SDN", name_en: "Sudan", name_ar: "السودان" },
  { code: "KSA", name_en: "Saudi Arabia", name_ar: "السعودية" },
] as const;

export const PAYOUT_METHODS = [
  { id: "zelle", label_en: "Zelle transfer", label_ar: "تحويل Zelle" },
  { id: "cashapp", label_en: "Cash App", label_ar: "Cash App" },
  { id: "cash", label_en: "Cash", label_ar: "كاش" },
] as const;

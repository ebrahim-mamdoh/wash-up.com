import { useTranslations } from "next-intl";
import { CircleCheck, Clock } from "lucide-react";

type Locale = "ar" | "en";

const L = (locale: Locale, ar: string, en: string) => (locale === "ar" ? ar : en);

function Window({ children, path }: { children: React.ReactNode; path: string }) {
  return (
    <div aria-hidden className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[#f6f9fd] text-[#0b1b3a] shadow-[var(--shadow-hero)]">
      <div dir="ltr" className="flex items-center gap-2 border-b border-[#e1e8f1] bg-white px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-md bg-[#eff4fa] px-10 py-1 text-[10px] text-[#5f6b80]">partners.washup.app/{path}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/** Orders list: app, walk-in and phone orders side by side with their status. */
export function OrdersMock({ locale }: { locale: Locale }) {
  const t = useTranslations("partners.dashboard.sources");
  const rows = [
    { no: "CZ-10482", plate: "ق ل م 482", svc: L(locale, "داخلي وخارجي", "Inside & out"), src: "app", status: L(locale, "مؤكد", "Confirmed"), tone: "#1b74f5", total: "180" },
    { no: "CZ-20045", plate: "أ ك ن 5521", svc: L(locale, "غسيل خارجي", "Exterior"), src: "walk_in", status: L(locale, "جارٍ التنفيذ", "In service"), tone: "#7c3aed", total: "85" },
    { no: "CZ-30023", plate: "ب ج د 1290", svc: L(locale, "تنظيف عميق", "Deep clean"), src: "phone", status: L(locale, "بانتظار التأكيد", "Pending"), tone: "#f59e0b", total: "450" },
    { no: "CZ-10479", plate: "س ر ع 731", svc: L(locale, "غسيل داخلي", "Interior"), src: "app", status: L(locale, "مدفوع", "Paid"), tone: "#16a34a", total: "120" },
    { no: "CZ-20044", plate: "ط م ر 802", svc: L(locale, "غسيل خارجي", "Exterior"), src: "walk_in", status: L(locale, "مكتمل", "Completed"), tone: "#0ea5e9", total: "85" },
  ] as const;
  const srcTone = { app: "#1b74f5", walk_in: "#0ea5e9", phone: "#7c3aed" } as const;
  return (
    <Window path="orders">
      <div className="mb-3 flex flex-wrap gap-1.5 text-[10.5px] font-semibold">
        {[L(locale, "النشطة", "Active"), L(locale, "في الانتظار", "Waiting"), L(locale, "جارٍ التنفيذ", "In service"), L(locale, "مدفوعة", "Paid")].map((tab, i) => (
          <span key={tab} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-[#0b1b3a] text-white" : "bg-white text-[#5f6b80]"}`}>
            {tab}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-[#e1e8f1] bg-white">
        {rows.map((r) => (
          <div key={r.no} className="flex items-center gap-3 border-b border-[#eef3f9] px-3 py-2.5 text-[11px] last:border-b-0">
            <span className="num w-[68px] shrink-0 font-bold" dir="ltr">{r.no}</span>
            <span className="shrink-0 rounded border border-[#0b1b3a]/20 px-1 text-[10px] font-bold">{r.plate}</span>
            <span className="min-w-0 flex-1 truncate text-[#45536b]">{r.svc}</span>
            <span className="hidden rounded-full px-2 py-0.5 text-[9.5px] font-bold text-white sm:inline" style={{ background: srcTone[r.src] }}>
              {t(r.src)}
            </span>
            <span className="rounded-full px-2 py-0.5 text-[9.5px] font-bold" style={{ background: `${r.tone}1f`, color: r.tone }}>
              {r.status}
            </span>
            <span className="num w-12 shrink-0 text-end font-bold">
              {r.total} <span className="text-[9px] font-normal text-[#5f6b80]">{L(locale, "ج.م", "EGP")}</span>
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

/** Weekly shifts grid for the team. */
export function TeamMock({ locale }: { locale: Locale }) {
  const days = locale === "ar" ? ["سبت", "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"] : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const team = [
    { name: L(locale, "محمد عادل", "Mohamed Adel"), role: L(locale, "مدير الفرع", "Branch manager"), shifts: [1, 1, 1, 0, 1, 1, 0], tone: "#0f2a66" },
    { name: L(locale, "أحمد سمير", "Ahmed Samir"), role: L(locale, "فني غسيل", "Washer"), shifts: [1, 1, 0, 1, 1, 0, 1], tone: "#1b74f5" },
    { name: L(locale, "كريم حسن", "Karim Hassan"), role: L(locale, "فني غسيل", "Washer"), shifts: [0, 1, 1, 1, 0, 1, 1], tone: "#22b8f0" },
    { name: L(locale, "يوسف علي", "Youssef Ali"), role: L(locale, "كاشير", "Cashier"), shifts: [1, 0, 1, 1, 1, 1, 0], tone: "#7c3aed" },
  ];
  return (
    <Window path="staff/shifts">
      <div className="overflow-hidden rounded-xl border border-[#e1e8f1] bg-white">
        <div className="grid grid-cols-[1.6fr_repeat(7,1fr)] border-b border-[#eef3f9] px-3 py-2 text-[10px] font-bold text-[#5f6b80]">
          <span />
          {days.map((d) => (
            <span key={d} className="text-center">{d}</span>
          ))}
        </div>
        {team.map((m) => (
          <div key={m.name} className="grid grid-cols-[1.6fr_repeat(7,1fr)] items-center gap-1 border-b border-[#eef3f9] px-3 py-2.5 last:border-b-0">
            <span className="flex min-w-0 items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: m.tone }}>
                {m.name.slice(0, 1)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[10.5px] font-bold">{m.name}</span>
                <span className="block truncate text-[9px] text-[#5f6b80]">{m.role}</span>
              </span>
            </span>
            {m.shifts.map((on, i) => (
              <span key={i} className={`mx-auto h-6 w-full max-w-[34px] rounded-md ${on ? "" : "bg-[#eef3f9]"}`} style={on ? { background: `${m.tone}26`, boxShadow: `inset 0 0 0 1px ${m.tone}55` } : undefined} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2 text-[10.5px] font-semibold text-[#15803d]">
        <CircleCheck className="size-4" />
        {L(locale, "تم تسليم وردية الصباح — الفرق 0 ج.م", "Morning shift handed over — difference 0 EGP")}
      </div>
    </Window>
  );
}

/** Finance: revenue, commission, net and a 7-day bar chart. */
export function FinanceMock({ locale }: { locale: Locale }) {
  const bars = [52, 64, 48, 78, 70, 92, 84];
  const kpis = [
    { label: L(locale, "الإيراد", "Revenue"), value: "38,420" },
    { label: L(locale, "العمولة", "Commission"), value: "2,180" },
    { label: L(locale, "الصافي", "Net"), value: "36,240" },
  ];
  return (
    <Window path="finance">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k, i) => (
          <div key={k.label} className={`rounded-xl border p-2.5 ${i === 2 ? "border-transparent bg-brand-grad text-white" : "border-[#e1e8f1] bg-white"}`}>
            <div className={`text-[9.5px] ${i === 2 ? "text-white/80" : "text-[#5f6b80]"}`}>{k.label}</div>
            <div className="num mt-1 text-[16px] font-extrabold">
              {k.value} <span className="text-[9px] font-normal">{L(locale, "ج.م", "EGP")}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-[#e1e8f1] bg-white p-3">
        <div className="mb-2 text-[10.5px] font-bold">{L(locale, "إيراد آخر 7 أيام", "Revenue, last 7 days")}</div>
        {/* RTL time flows right-to-left, like the partner portal's own charts. */}
        <div className="flex h-[120px] items-end gap-2">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#1b74f5] to-[#59b1ff]" style={{ height: `${h}%`, opacity: i === bars.length - 1 ? 1 : 0.55 + i * 0.05 }} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#e1e8f1] bg-white px-3 py-2 text-[10.5px]">
        <Clock className="size-4 text-[#f59e0b]" />
        <span className="flex-1 font-semibold">{L(locale, "دفعة مستحقة — الأحد", "Payout due — Sunday")}</span>
        <span className="num font-bold">
          12,600 <span className="text-[9px] font-normal text-[#5f6b80]">{L(locale, "ج.م", "EGP")}</span>
        </span>
      </div>
    </Window>
  );
}

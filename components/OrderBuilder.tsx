"use client";

import { useMemo, useState } from "react";
import type { MenuItem, Order, OrderLine, OrderType, Settings } from "@/lib/types";
import { formatCOP, uid } from "@/lib/format";
import { isOpenBill, itemCount, orderNumber, subtotal } from "@/lib/orders";
import { ui } from "@/lib/ui";

export interface NewOrder {
  type: OrderType;
  table: number | null;
  customer: string;
  contact: string;
  note: string;
  lines: OrderLine[];
}

interface Props {
  menu: MenuItem[];
  settings: Settings;
  orders: Order[];
  onSubmit: (data: NewOrder) => void;
}

const TYPES: { id: OrderType; label: string }[] = [
  { id: "mesa", label: "Mesa" },
  { id: "llevar", label: "Para llevar" },
  { id: "domicilio", label: "Domicilio" },
];

export default function OrderBuilder({ menu, settings, orders, onSubmit }: Props) {
  const [type, setType] = useState<OrderType>("mesa");
  const [table, setTable] = useState<number | null>(null);
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(menu.map((m) => m.category)))], [menu]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter(
      (m) => (category === "Todos" || m.category === category) && (!q || m.name.toLowerCase().includes(q))
    );
  }, [menu, category, query]);

  // Mesas con una cuenta abierta -> número de comanda
  const busy = useMemo(() => {
    const map = new Map<number, number[]>();
    for (const o of orders) {
      if (o.type !== "mesa" || o.table === null || !isOpenBill(o)) continue;
      map.set(o.table, [...(map.get(o.table) ?? []), o.number]);
    }
    return map;
  }, [orders]);

  const addItem = (it: MenuItem) => {
    setError("");
    setLines((ls) => {
      const i = ls.findIndex((l) => l.itemId === it.id && !l.note);
      if (i >= 0) return ls.map((l, idx) => (idx === i ? { ...l, qty: l.qty + 1 } : l));
      return [...ls, { id: uid(), itemId: it.id, name: it.name, price: it.price, qty: 1, note: "" }];
    });
  };

  const changeQty = (id: string, delta: number) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));

  const setLineNote = (id: string, value: string) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, note: value } : l)));

  const submit = () => {
    if (lines.length === 0) return setError("Agrega al menos un producto a la comanda.");
    if (type === "mesa" && table === null) return setError("Elige la mesa.");
    if (type === "domicilio" && !contact.trim()) return setError("Escribe la dirección o el teléfono del domicilio.");
    setError("");
    onSubmit({ type, table: type === "mesa" ? table : null, customer: customer.trim(), contact: contact.trim(), note: note.trim(), lines });
    setLines([]);
    setOpenNotes({});
    setCustomer("");
    setContact("");
    setNote("");
    setTable(null);
  };

  const sub = subtotal(lines);

  const tableClass = (n: number) => {
    const base = "cursor-pointer rounded-lg border py-2.5 font-semibold";
    if (table === n) return `${base} border-primary bg-primary text-white`;
    if (busy.has(n)) return `${base} border-yellow/35 bg-yellow/10 text-yellow`;
    return `${base} border-border bg-surface-secondary text-foreground hover:border-text-primary`;
  };

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      {lines.length > 0 ? (
        <button
          type="button"
          className="fixed inset-x-3 bottom-3 z-20 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-primary bg-primary px-4 py-3.5 text-white shadow-lg lg:hidden"
          onClick={() => document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          <span>
            {itemCount(lines)} {itemCount(lines) === 1 ? "producto" : "productos"} · {formatCOP(sub)}
          </span>
          <strong>Ver pedido ↓</strong>
        </button>
      ) : null}

      <section className={ui.panel}>
        <div className={ui.panelHead}>
          <h2 className={ui.title}>Menú</h2>
          <input
            type="search"
            className={`${ui.input} sm:w-52.5`}
            placeholder="Buscar producto…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.86rem] ${category === c
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface-secondary text-foreground hover:bg-surface"
                }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {menu.length === 0 ? (
          <p className={ui.muted}>El menú está vacío. Agrega productos en la pestaña “Menú”.</p>
        ) : shown.length === 0 ? (
          <p className={ui.muted}>No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {shown.map((m) => (
              <button
                key={m.id}
                type="button"
                className="grid min-h-21 cursor-pointer content-between gap-1.5 rounded-[10px] border border-border bg-surface-secondary p-3 text-left text-foreground transition-colors duration-100 enabled:hover:border-text-primary enabled:hover:bg-surface enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!m.available}
                onClick={() => addItem(m)}
              >
                <span className="font-semibold leading-tight">{m.name}</span>
                <span className="text-[0.85rem] tabular-nums text-text-muted">
                  {m.available ? formatCOP(m.price) : "Agotado"}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <aside className="grid gap-4 lg:sticky lg:top-4">
        <section className={ui.panel} id="pedido">
          <h2 className={`${ui.title} mb-3`}>Nueva comanda</h2>

          <div className={ui.seg} role="tablist">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={type === t.id}
                className={type === t.id ? ui.segOn : ui.segOff}
                onClick={() => {
                  setType(t.id);
                  setError("");
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {type === "mesa" ? (
            <>
              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {Array.from({ length: settings.tables }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={tableClass(n)}
                    onClick={() => setTable(n)}
                    title={busy.has(n) ? `En curso: ${busy.get(n)!.map(orderNumber).join(", ")}` : "Libre"}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className={ui.hint}>
                {table !== null && busy.has(table)
                  ? `La mesa ${table} ya tiene la comanda ${busy.get(table)!.map(orderNumber).join(", ")} sin cobrar.`
                  : "Las mesas en amarillo tienen una cuenta abierta."}
              </p>
            </>
          ) : null}

          <div className={`${ui.formStack} mt-4.5`}>
            <label className={ui.label}>
              Cliente (opcional)
              <input className={ui.input} value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </label>
            {type === "domicilio" ? (
              <label className={ui.label}>
                Dirección / teléfono
                <input className={ui.input} value={contact} onChange={(e) => setContact(e.target.value)} />
              </label>
            ) : null}
          </div>

          <h3 className={ui.subtitle}>Pedido</h3>
          {lines.length === 0 ? (
            <p className={ui.muted}>Toca un producto del menú para agregarlo.</p>
          ) : (
            <ul className="mb-2 grid gap-2.5">
              {lines.map((l) => (
                <li key={l.id}>
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="h-7 w-7 cursor-pointer rounded-lg border border-border bg-surface text-[1.05rem] leading-none text-foreground hover:bg-primary hover:text-white"
                        aria-label="Quitar uno"
                        onClick={() => changeQty(l.id, -1)}
                      >
                        −
                      </button>
                      <span className="min-w-4.5 text-center font-bold">{l.qty}</span>
                      <button
                        type="button"
                        className="h-7 w-7 cursor-pointer rounded-lg border border-border bg-surface text-[1.05rem] leading-none text-foreground hover:bg-primary hover:text-white"
                        aria-label="Agregar uno"
                        onClick={() => changeQty(l.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="grid gap-px text-[0.92rem]">
                      {l.name}
                      <button
                        type="button"
                        className={`${ui.link} justify-self-start text-[0.78rem]!`}
                        onClick={() => setOpenNotes((o) => ({ ...o, [l.id]: !o[l.id] }))}
                      >
                        {l.note ? "Editar nota" : "+ Nota"}
                      </button>
                    </div>
                    <strong className="text-[0.9rem] tabular-nums">{formatCOP(l.qty * l.price)}</strong>
                  </div>
                  {openNotes[l.id] || l.note ? (
                    <input
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-[0.85rem] text-foreground placeholder:text-text-muted"
                      placeholder="Ej. sin cebolla, término medio…"
                      value={l.note}
                      onChange={(e) => setLineNote(l.id, e.target.value)}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          <label className={`${ui.label} mt-3.5`}>
            Nota general (opcional)
            <input
              className={ui.input}
              placeholder="Ej. alérgico al maní"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <div className={`${ui.totalBox} mb-3 mt-4 bg-background`}>
            <span className={ui.totalLabel}>
              {itemCount(lines)} {itemCount(lines) === 1 ? "producto" : "productos"}
            </span>
            <strong className={ui.totalValue}>{formatCOP(sub)}</strong>
          </div>

          {error ? <p className={ui.alert}>{error}</p> : null}

          <button type="button" className={`${ui.btnPrimary} ${ui.block}`} onClick={submit}>
            Enviar a cocina
          </button>
          {lines.length > 0 ? (
            <button
              type="button"
              className={`${ui.btn} ${ui.block}`}
              onClick={() => {
                setLines([]);
                setOpenNotes({});
              }}
            >
              Vaciar pedido
            </button>
          ) : null}
        </section>
      </aside>
    </div>
  );
}

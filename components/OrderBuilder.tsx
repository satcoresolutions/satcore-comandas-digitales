"use client";

import { useMemo, useState } from "react";
import type { MenuItem, Order, OrderLine, OrderType, Settings } from "@/lib/types";
import { formatCOP, uid } from "@/lib/format";
import { isOpenBill, itemCount, orderNumber, subtotal } from "@/lib/orders";

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

  return (
    <div className="builder">
      {lines.length > 0 ? (
        <button
          type="button"
          className="cart-bar"
          onClick={() => document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          <span>
            {itemCount(lines)} {itemCount(lines) === 1 ? "producto" : "productos"} · {formatCOP(sub)}
          </span>
          <strong>Ver pedido ↓</strong>
        </button>
      ) : null}
      <section className="panel">
        <div className="panel-head wrap">
          <h2>Menú</h2>
          <input
            type="search"
            className="search"
            placeholder="Buscar producto…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="pills spaced-b">
          {categories.map((c) => (
            <button key={c} type="button" className={category === c ? "pill active" : "pill"} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {menu.length === 0 ? (
          <p className="muted">El menú está vacío. Agrega productos en la pestaña “Menú”.</p>
        ) : shown.length === 0 ? (
          <p className="muted">No se encontraron productos.</p>
        ) : (
          <div className="menu-grid">
            {shown.map((m) => (
              <button
                key={m.id}
                type="button"
                className="menu-card"
                disabled={!m.available}
                onClick={() => addItem(m)}
              >
                <span className="menu-name">{m.name}</span>
                <span className="menu-meta">
                  {m.available ? formatCOP(m.price) : "Agotado"}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <aside className="side">
        <section className="panel" id="pedido">
          <h2>Nueva comanda</h2>

          <div className="seg" role="tablist">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={type === t.id}
                className={type === t.id ? "active" : ""}
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
              <div className="table-grid">
                {Array.from({ length: settings.tables }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`table-btn${table === n ? " active" : ""}${busy.has(n) ? " busy" : ""}`}
                    onClick={() => setTable(n)}
                    title={busy.has(n) ? `En curso: ${busy.get(n)!.map(orderNumber).join(", ")}` : "Libre"}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="hint">
                {table !== null && busy.has(table)
                  ? `La mesa ${table} ya tiene la comanda ${busy.get(table)!.map(orderNumber).join(", ")} sin cobrar.`
                  : "Las mesas en naranja tienen una cuenta abierta."}
              </p>
            </>
          ) : null}

          <div className="form-stack spaced">
            <label>
              Cliente (opcional)
              <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </label>
            {type === "domicilio" ? (
              <label>
                Dirección / teléfono
                <input value={contact} onChange={(e) => setContact(e.target.value)} />
              </label>
            ) : null}
          </div>

          <h3 className="ticket-title">Pedido</h3>
          {lines.length === 0 ? (
            <p className="muted">Toca un producto del menú para agregarlo.</p>
          ) : (
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <div className="line-main">
                    <div className="qty">
                      <button type="button" aria-label="Quitar uno" onClick={() => changeQty(l.id, -1)}>
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button type="button" aria-label="Agregar uno" onClick={() => changeQty(l.id, 1)}>
                        +
                      </button>
                    </div>
                    <div className="line-name">
                      {l.name}
                      <button
                        type="button"
                        className="link"
                        onClick={() => setOpenNotes((o) => ({ ...o, [l.id]: !o[l.id] }))}
                      >
                        {l.note ? "Editar nota" : "+ Nota"}
                      </button>
                    </div>
                    <strong className="line-price">{formatCOP(l.qty * l.price)}</strong>
                  </div>
                  {openNotes[l.id] || l.note ? (
                    <input
                      className="line-note"
                      placeholder="Ej. sin cebolla, término medio…"
                      value={l.note}
                      onChange={(e) => setLineNote(l.id, e.target.value)}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          <label className="block">
            Nota general (opcional)
            <input placeholder="Ej. alérgico al maní" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>

          <div className="total-box">
            <span>
              {itemCount(lines)} {itemCount(lines) === 1 ? "producto" : "productos"}
            </span>
            <strong>{formatCOP(sub)}</strong>
          </div>

          {error ? <p className="alert">{error}</p> : null}

          <button type="button" className="btn btn-primary btn-block" onClick={submit}>
            Enviar a cocina
          </button>
          {lines.length > 0 ? (
            <button
              type="button"
              className="btn btn-block"
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

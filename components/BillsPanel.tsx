"use client";

import { useMemo, useState } from "react";
import type { Order, Payment, Settings } from "@/lib/types";
import { PAYMENTS } from "@/lib/types";
import { formatCOP, formatPct } from "@/lib/format";
import {
  STATUS_LABEL,
  isOpenBill,
  orderLabel,
  orderNumber,
  sameDay,
  subtotal,
  suggestedTip,
  summarizeDay,
  timeOf,
} from "@/lib/orders";

interface Props {
  orders: Order[];
  settings: Settings;
  now: number;
  onPay: (o: Order, payment: Payment, tip: number) => void;
  onCancel: (o: Order) => void;
  onPrintBill: (o: Order) => void;
}

type TipMode = "none" | "suggested" | "custom";

export default function BillsPanel({ orders, settings, now, onPay, onCancel, onPrintBill }: Props) {
  const [payingId, setPayingId] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payment>("Efectivo");
  const [tipMode, setTipMode] = useState<TipMode>("suggested");
  const [customTip, setCustomTip] = useState(0);

  const open = useMemo(() => orders.filter(isOpenBill).sort((a, b) => a.createdAt - b.createdAt), [orders]);
  const paidToday = useMemo(
    () =>
      orders
        .filter((o) => o.paid && o.paidAt !== null && sameDay(o.paidAt, now))
        .sort((a, b) => (b.paidAt ?? 0) - (a.paidAt ?? 0)),
    [orders, now]
  );
  const day = useMemo(() => summarizeDay(orders, now), [orders, now]);

  const startPay = (o: Order) => {
    setPayingId(o.id);
    setPayment("Efectivo");
    setTipMode(settings.tipPct > 0 ? "suggested" : "none");
    setCustomTip(0);
  };

  const confirmPay = (o: Order) => {
    const sub = subtotal(o.lines);
    const tip = tipMode === "none" ? 0 : tipMode === "suggested" ? suggestedTip(sub, settings.tipPct) : Math.max(0, customTip);
    onPay(o, payment, tip);
    setPayingId(null);
  };

  const maxDish = Math.max(...day.topDishes.map((d) => d.qty), 0);

  return (
    <div className="stack">
      <section className="kpis kpis-3">
        <div className="kpi kpi-main">
          <span>Ventas cobradas hoy</span>
          <strong>{formatCOP(day.billed)}</strong>
          <small>
            {day.paidCount} {day.paidCount === 1 ? "cuenta" : "cuentas"} · ticket promedio {formatCOP(day.avgTicket)}
          </small>
        </div>
        <div className="kpi">
          <span>Propinas</span>
          <strong>{formatCOP(day.tips)}</strong>
          <small>de hoy</small>
        </div>
        <div className="kpi">
          <span>Por cobrar</span>
          <strong>{formatCOP(day.openAmount)}</strong>
          <small>
            {day.openCount} {day.openCount === 1 ? "cuenta abierta" : "cuentas abiertas"}
          </small>
        </div>
        <div className="kpi">
          <span>Canceladas</span>
          <strong>{day.cancelled}</strong>
          <small>hoy</small>
        </div>
      </section>

      <section className="panel">
        <h2>Cuentas por cobrar</h2>
        {open.length === 0 ? (
          <p className="muted">No hay cuentas abiertas.</p>
        ) : (
          <ul className="bills">
            {open.map((o) => {
              const sub = subtotal(o.lines);
              const tip = tipMode === "none" ? 0 : tipMode === "suggested" ? suggestedTip(sub, settings.tipPct) : Math.max(0, customTip);
              return (
                <li key={o.id} className="bill">
                  <div className="bill-head">
                    <div>
                      <strong>{orderNumber(o.number)}</strong> · {orderLabel(o)}
                      {o.customer ? <span className="muted"> · {o.customer}</span> : null}
                      <div className="muted small">
                        {timeOf(o.createdAt)} · {STATUS_LABEL[o.status]} ·{" "}
                        {o.lines.map((l) => `${l.qty}× ${l.name}`).join(", ")}
                      </div>
                    </div>
                    <strong className="bill-total">{formatCOP(sub)}</strong>
                  </div>

                  {payingId === o.id ? (
                    <div className="pay-form">
                      <div className="grid grid-2">
                        <label>
                          Medio de pago
                          <select value={payment} onChange={(e) => setPayment(e.target.value as Payment)}>
                            {PAYMENTS.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Propina (voluntaria)
                          <select value={tipMode} onChange={(e) => setTipMode(e.target.value as TipMode)}>
                            <option value="none">Sin propina</option>
                            {settings.tipPct > 0 ? (
                              <option value="suggested">
                                Sugerida {settings.tipPct}% ({formatCOP(suggestedTip(sub, settings.tipPct))})
                              </option>
                            ) : null}
                            <option value="custom">Otro valor</option>
                          </select>
                        </label>
                      </div>
                      {tipMode === "custom" ? (
                        <label className="block">
                          Valor de la propina ($)
                          <input
                            type="number"
                            min={0}
                            value={customTip}
                            onChange={(e) => setCustomTip(Math.max(0, Number(e.target.value) || 0))}
                          />
                        </label>
                      ) : null}
                      <div className="total-box">
                        <span>Total a cobrar</span>
                        <strong>{formatCOP(sub + tip)}</strong>
                      </div>
                      <div className="bill-actions">
                        <button type="button" className="btn btn-primary" onClick={() => confirmPay(o)}>
                          Confirmar cobro
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={() => setPayingId(null)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bill-actions">
                      <button type="button" className="btn btn-primary" onClick={() => startPay(o)}>
                        Cobrar
                      </button>
                      <button type="button" className="btn" onClick={() => onPrintBill(o)}>
                        Imprimir cuenta
                      </button>
                      <button type="button" className="link danger" onClick={() => onCancel(o)}>
                        Cancelar comanda
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="grid grid-2 stats-grid">
        <section className="panel">
          <h2>Lo más pedido hoy</h2>
          {day.topDishes.length === 0 ? (
            <p className="muted">Aún no hay pedidos hoy.</p>
          ) : (
            <ul className="hbars">
              {day.topDishes.map((d) => (
                <li key={d.name}>
                  <div className="hrow">
                    <span>{d.name}</span>
                    <strong>{d.qty} un.</strong>
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: `${maxDish > 0 ? (d.qty / maxDish) * 100 : 0}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Cobrado por medio de pago</h2>
          {day.byPayment.length === 0 ? (
            <p className="muted">Aún no hay cobros hoy.</p>
          ) : (
            <ul className="hbars">
              {day.byPayment.map((p) => {
                const total = day.billed + day.tips;
                return (
                  <li key={p.method}>
                    <div className="hrow">
                      <span>{p.method}</span>
                      <strong>{formatCOP(p.total)}</strong>
                    </div>
                    <div className="track">
                      <div className="fill" style={{ width: `${total > 0 ? (p.total / total) * 100 : 0}%` }} />
                    </div>
                    <div className="muted small">
                      {p.count} {p.count === 1 ? "cuenta" : "cuentas"} · {formatPct(total > 0 ? (p.total / total) * 100 : 0)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <section className="panel">
        <h2>Cobradas hoy</h2>
        {paidToday.length === 0 ? (
          <p className="muted">Todavía no has cobrado cuentas hoy.</p>
        ) : (
          <div className="table-wrap">
            <table className="sales">
              <thead>
                <tr>
                  <th>Comanda</th>
                  <th>Hora</th>
                  <th>Pago</th>
                  <th>Subtotal</th>
                  <th>Propina</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {paidToday.map((o) => (
                  <tr key={o.id}>
                    <td className="left">
                      {orderNumber(o.number)} · {orderLabel(o)}
                    </td>
                    <td>{o.paidAt ? timeOf(o.paidAt) : ""}</td>
                    <td>{o.payment}</td>
                    <td>{formatCOP(subtotal(o.lines))}</td>
                    <td>{formatCOP(o.tip)}</td>
                    <td>
                      <strong>{formatCOP(subtotal(o.lines) + o.tip)}</strong>
                    </td>
                    <td className="row-actions">
                      <button type="button" className="link" onClick={() => onPrintBill(o)}>
                        Imprimir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

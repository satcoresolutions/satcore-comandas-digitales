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
import { ui } from "@/lib/ui";

interface Props {
  orders: Order[];
  settings: Settings;
  now: number;
  onPay: (o: Order, payment: Payment, tip: number) => void;
  onCancel: (o: Order) => void;
  onPrintBill: (o: Order) => void;
}

type TipMode = "none" | "suggested" | "custom";

const KPI = "grid gap-0.5 rounded-[10px] border border-border bg-surface-secondary px-4 py-3.5";
const KPI_MAIN =
  "col-span-2 grid gap-0.5 rounded-[10px] border border-primary bg-primary px-4 py-3.5 text-white lg:col-span-3";
const KPI_LABEL = "text-[0.78rem] uppercase tracking-[0.03em] text-text-muted";
const KPI_VALUE = "text-[1.3rem] font-bold tabular-nums";
const KPI_SMALL = "text-[0.8rem] text-text-muted";
const TH = "border-b border-border p-2 text-right text-xs font-semibold uppercase text-text-muted first:text-left";
const TD = "border-b border-border p-2 text-right first:text-left";
const BAR_TRACK = "h-2 overflow-hidden rounded-full bg-background";
const BAR_FILL = "h-full rounded-full bg-secondary";

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
    <div className={ui.stack}>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className={KPI_MAIN}>
          <span className="text-[0.78rem] uppercase tracking-[0.03em] text-white/85">Ventas cobradas hoy</span>
          <strong className="text-[2rem] font-bold tabular-nums leading-tight">{formatCOP(day.billed)}</strong>
          <small className="text-[0.8rem] text-white/85">
            {day.paidCount} {day.paidCount === 1 ? "cuenta" : "cuentas"} · ticket promedio {formatCOP(day.avgTicket)}
          </small>
        </div>
        <div className={KPI}>
          <span className={KPI_LABEL}>Propinas</span>
          <strong className={KPI_VALUE}>{formatCOP(day.tips)}</strong>
          <small className={KPI_SMALL}>de hoy</small>
        </div>
        <div className={KPI}>
          <span className={KPI_LABEL}>Por cobrar</span>
          <strong className={KPI_VALUE}>{formatCOP(day.openAmount)}</strong>
          <small className={KPI_SMALL}>
            {day.openCount} {day.openCount === 1 ? "cuenta abierta" : "cuentas abiertas"}
          </small>
        </div>
        <div className={`${KPI} col-span-2 lg:col-span-1`}>
          <span className={KPI_LABEL}>Canceladas</span>
          <strong className={KPI_VALUE}>{day.cancelled}</strong>
          <small className={KPI_SMALL}>hoy</small>
        </div>
      </section>

      <section className={ui.panel}>
        <h2 className={`${ui.title} mb-3`}>Cuentas por cobrar</h2>
        {open.length === 0 ? (
          <p className={ui.muted}>No hay cuentas abiertas.</p>
        ) : (
          <ul className="grid gap-3">
            {open.map((o) => {
              const sub = subtotal(o.lines);
              const tip = tipMode === "none" ? 0 : tipMode === "suggested" ? suggestedTip(sub, settings.tipPct) : Math.max(0, customTip);
              return (
                <li key={o.id} className="grid gap-2.5 rounded-[10px] border border-border bg-surface p-3.5">
                  <div className="flex justify-between gap-3">
                    <div>
                      <strong>{orderNumber(o.number)}</strong> · {orderLabel(o)}
                      {o.customer ? <span className={ui.muted}> · {o.customer}</span> : null}
                      <div className={ui.mutedSmall}>
                        {timeOf(o.createdAt)} · {STATUS_LABEL[o.status]} ·{" "}
                        {o.lines.map((l) => `${l.qty}× ${l.name}`).join(", ")}
                      </div>
                    </div>
                    <strong className="whitespace-nowrap text-[1.15rem] tabular-nums">{formatCOP(sub)}</strong>
                  </div>

                  {payingId === o.id ? (
                    <div className="grid gap-2.5 rounded-lg border border-border bg-background p-3">
                      <div className={ui.grid2}>
                        <label className={ui.label}>
                          Medio de pago
                          <select className={ui.input} value={payment} onChange={(e) => setPayment(e.target.value as Payment)}>
                            {PAYMENTS.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className={ui.label}>
                          Propina (voluntaria)
                          <select className={ui.input} value={tipMode} onChange={(e) => setTipMode(e.target.value as TipMode)}>
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
                        <label className={`${ui.label} mt-3.5`}>
                          Valor de la propina ($)
                          <input
                            className={ui.input}
                            type="number"
                            min={0}
                            value={customTip}
                            onChange={(e) => setCustomTip(Math.max(0, Number(e.target.value) || 0))}
                          />
                        </label>
                      ) : null}
                      <div className={`${ui.totalBox} bg-surface-secondary`}>
                        <span className={ui.totalLabel}>Total a cobrar</span>
                        <strong className={ui.totalValue}>{formatCOP(sub + tip)}</strong>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button type="button" className={ui.btnPrimary} onClick={() => confirmPay(o)}>
                          Confirmar cobro
                        </button>
                        <button type="button" className={ui.btnGhost} onClick={() => setPayingId(null)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button type="button" className={ui.btnPrimary} onClick={() => startPay(o)}>
                        Cobrar
                      </button>
                      <button type="button" className={ui.btn} onClick={() => onPrintBill(o)}>
                        Imprimir cuenta
                      </button>
                      <button type="button" className={ui.linkDanger} onClick={() => onCancel(o)}>
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

      <div className="grid gap-3 lg:grid-cols-2">
        <section className={ui.panel}>
          <h2 className={`${ui.title} mb-3`}>Lo más pedido hoy</h2>
          {day.topDishes.length === 0 ? (
            <p className={ui.muted}>Aún no hay pedidos hoy.</p>
          ) : (
            <ul className="grid gap-3">
              {day.topDishes.map((d) => (
                <li key={d.name}>
                  <div className="mb-1 flex justify-between gap-2.5 text-[0.9rem]">
                    <span>{d.name}</span>
                    <strong className="tabular-nums">{d.qty} un.</strong>
                  </div>
                  <div className={BAR_TRACK}>
                    <div className={BAR_FILL} style={{ width: `${maxDish > 0 ? (d.qty / maxDish) * 100 : 0}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={ui.panel}>
          <h2 className={`${ui.title} mb-3`}>Cobrado por medio de pago</h2>
          {day.byPayment.length === 0 ? (
            <p className={ui.muted}>Aún no hay cobros hoy.</p>
          ) : (
            <ul className="grid gap-3">
              {day.byPayment.map((p) => {
                const total = day.billed + day.tips;
                return (
                  <li key={p.method}>
                    <div className="mb-1 flex justify-between gap-2.5 text-[0.9rem]">
                      <span>{p.method}</span>
                      <strong className="tabular-nums">{formatCOP(p.total)}</strong>
                    </div>
                    <div className={BAR_TRACK}>
                      <div className={BAR_FILL} style={{ width: `${total > 0 ? (p.total / total) * 100 : 0}%` }} />
                    </div>
                    <div className={ui.mutedSmall}>
                      {p.count} {p.count === 1 ? "cuenta" : "cuentas"} · {formatPct(total > 0 ? (p.total / total) * 100 : 0)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <section className={ui.panel}>
        <h2 className={`${ui.title} mb-3`}>Cobradas hoy</h2>
        {paidToday.length === 0 ? (
          <p className={ui.muted}>Todavía no has cobrado cuentas hoy.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.9rem] tabular-nums">
              <thead>
                <tr>
                  <th className={TH}>Comanda</th>
                  <th className={TH}>Hora</th>
                  <th className={TH}>Pago</th>
                  <th className={TH}>Subtotal</th>
                  <th className={TH}>Propina</th>
                  <th className={TH}>Total</th>
                  <th className={TH} />
                </tr>
              </thead>
              <tbody>
                {paidToday.map((o) => (
                  <tr key={o.id}>
                    <td className={TD}>
                      {orderNumber(o.number)} · {orderLabel(o)}
                    </td>
                    <td className={TD}>{o.paidAt ? timeOf(o.paidAt) : ""}</td>
                    <td className={TD}>{o.payment}</td>
                    <td className={TD}>{formatCOP(subtotal(o.lines))}</td>
                    <td className={TD}>{formatCOP(o.tip)}</td>
                    <td className={TD}>
                      <strong>{formatCOP(subtotal(o.lines) + o.tip)}</strong>
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>
                      <button type="button" className={`${ui.link} ml-2.5`} onClick={() => onPrintBill(o)}>
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

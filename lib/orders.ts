import type { Order, OrderLine, Payment, Status } from "./types";
import { PAYMENTS } from "./types";

export const STATUS_LABEL: Record<Status, string> = {
  pendiente: "Pendiente",
  preparando: "En preparación",
  listo: "Listo para servir",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const NEXT_STATUS: Partial<Record<Status, Status>> = {
  pendiente: "preparando",
  preparando: "listo",
  listo: "entregado",
};

export const ADVANCE_LABEL: Partial<Record<Status, string>> = {
  pendiente: "Empezar a preparar",
  preparando: "Marcar listo",
  listo: "Entregar",
};

export const subtotal = (lines: OrderLine[]): number =>
  lines.reduce((acc, l) => acc + (Number(l.qty) || 0) * (Number(l.price) || 0), 0);

export const itemCount = (lines: OrderLine[]): number => lines.reduce((acc, l) => acc + (Number(l.qty) || 0), 0);

export const orderTotal = (o: Order): number => subtotal(o.lines) + (o.paid ? o.tip : 0);

/** Propina sugerida redondeada a los $100 más cercanos. */
export const suggestedTip = (sub: number, pct: number): number => Math.round((sub * (Number(pct) || 0)) / 100 / 100) * 100;

/** Comanda que sigue en cocina o en servicio. */
export const isActive = (o: Order): boolean => o.status === "pendiente" || o.status === "preparando" || o.status === "listo";

/** Cuenta abierta: aún no se cobra y no está cancelada. */
export const isOpenBill = (o: Order): boolean => !o.paid && o.status !== "cancelado";

export const orderLabel = (o: Pick<Order, "type" | "table">): string =>
  o.type === "mesa" ? `Mesa ${o.table ?? "?"}` : o.type === "llevar" ? "Para llevar" : "Domicilio";

export const orderNumber = (n: number): string => `#${String(n).padStart(3, "0")}`;

export const minutesSince = (from: number, now: number): number => Math.max(0, Math.floor((now - from) / 60_000));

export function elapsed(from: number, now: number): string {
  const m = minutesSince(from, now);
  if (m < 1) return "<1 min";
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${String(m % 60).padStart(2, "0")} min`;
}

export function timeOf(ts: number): string {
  return new Date(ts).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
}

export function sameDay(ts: number, now: number): boolean {
  const a = new Date(ts);
  const b = new Date(now);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export interface DaySummary {
  billed: number; // ventas cobradas (sin propina)
  tips: number;
  paidCount: number;
  avgTicket: number;
  openCount: number;
  openAmount: number;
  cancelled: number;
  byPayment: { method: Payment; total: number; count: number }[];
  topDishes: { name: string; qty: number; total: number }[];
}

export function summarizeDay(orders: Order[], now: number): DaySummary {
  const today = orders.filter((o) => sameDay(o.createdAt, now));
  const paidToday = orders.filter((o) => o.paid && o.paidAt !== null && sameDay(o.paidAt, now));

  const billed = paidToday.reduce((acc, o) => acc + subtotal(o.lines), 0);
  const tips = paidToday.reduce((acc, o) => acc + o.tip, 0);
  const open = orders.filter(isOpenBill);

  const dishes = new Map<string, { name: string; qty: number; total: number }>();
  for (const o of today) {
    if (o.status === "cancelado") continue;
    for (const l of o.lines) {
      const key = l.name.trim().toLowerCase();
      const cur = dishes.get(key) ?? { name: l.name, qty: 0, total: 0 };
      cur.qty += l.qty;
      cur.total += l.qty * l.price;
      dishes.set(key, cur);
    }
  }

  return {
    billed,
    tips,
    paidCount: paidToday.length,
    avgTicket: paidToday.length ? billed / paidToday.length : 0,
    openCount: open.length,
    openAmount: open.reduce((acc, o) => acc + subtotal(o.lines), 0),
    cancelled: today.filter((o) => o.status === "cancelado").length,
    byPayment: PAYMENTS.map((method) => {
      const subset = paidToday.filter((o) => o.payment === method);
      return { method, total: subset.reduce((acc, o) => acc + subtotal(o.lines) + o.tip, 0), count: subset.length };
    }).filter((p) => p.count > 0),
    topDishes: [...dishes.values()].sort((a, b) => b.qty - a.qty).slice(0, 5),
  };
}

import { PAYMENTS, type OrderType, type Payment, type Status } from "./types";

export const ORDER_TYPE_META: Record<OrderType, { label: string; emoji: string }> = {
  mesa: { label: "Mesa", emoji: "🍽️" },
  llevar: { label: "Para llevar", emoji: "🥡" },
  domicilio: { label: "Domicilio", emoji: "🛵" },
};

export const ORDER_TYPES = (Object.keys(ORDER_TYPE_META) as OrderType[]).map((id) => ({
  id,
  label: ORDER_TYPE_META[id].label,
}));

export const PAYMENT_META: Record<Payment, { emoji: string }> = {
  Efectivo: { emoji: "💵" },
  Transferencia: { emoji: "📲" },
  Tarjeta: { emoji: "💳" },
};

/** Columnas del tablero de cocina, en orden */
export const KITCHEN_COLUMNS: Status[] = ["pendiente", "preparando", "listo"];

/** Minutos de espera para pasar a amarillo (warn) y rojo (late) */
export const URGENCY_WARN_MIN = 15;
export const URGENCY_LATE_MIN = 25;

/** Se conservan las cuentas abiertas y los últimos N días */
export const KEEP_DAYS = 60;

// Mismos valores que ya usa la app, para no perder los datos guardados
export const STORAGE_KEYS = {
  menu: "comandas:menu",
  settings: "comandas:ajustes",
  orders: "comandas:pedidos",
} as const;

export const THEME_KEY = "satcore-comandas-theme";

export { PAYMENTS };

/** Clases reutilizables: viven en lib/ui.ts, se reexportan para importar desde aquí */
export { ui } from "./ui";
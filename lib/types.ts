export type OrderType = "mesa" | "llevar" | "domicilio";
export type Status = "pendiente" | "preparando" | "listo" | "entregado" | "cancelado";
export type Payment = "Efectivo" | "Transferencia" | "Tarjeta";

export const PAYMENTS: Payment[] = ["Efectivo", "Transferencia", "Tarjeta"];

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

export interface OrderLine {
  id: string;
  itemId: string;
  name: string;
  price: number; // precio al momento del pedido
  qty: number;
  note: string;
}

export interface Order {
  id: string;
  number: number;
  createdAt: number;
  type: OrderType;
  table: number | null;
  customer: string;
  contact: string; // dirección o teléfono (domicilio)
  note: string;
  lines: OrderLine[];
  status: Status;
  statusAt: Partial<Record<Status, number>>;
  paid: boolean;
  payment: Payment | null;
  tip: number;
  paidAt: number | null;
}

export interface Settings {
  restaurant: string;
  tables: number;
  tipPct: number; // propina sugerida (voluntaria)
}

export const DEFAULT_SETTINGS: Settings = { restaurant: "Mi restaurante", tables: 10, tipPct: 10 };

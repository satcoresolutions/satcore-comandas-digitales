"use client";

import { useEffect, useState } from "react";
import type { MenuItem, Order, Payment, Settings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/types";
import { DEFAULT_MENU } from "@/lib/menu";
import { formatCOP, uid } from "@/lib/format";
import {
  NEXT_STATUS,
  isActive,
  isOpenBill,
  orderLabel,
  orderNumber,
  sameDay,
  subtotal,
} from "@/lib/orders";
import { ui } from "@/lib/ui";
import OrderBuilder, { type NewOrder } from "./OrderBuilder";
import KitchenBoard from "./KitchenBoard";
import BillsPanel from "./BillsPanel";
import MenuEditor from "./MenuEditor";
import Ticket, { type TicketMode } from "./Ticket";

const KEY_MENU = "comandas:menu";
const KEY_SETTINGS = "comandas:ajustes";
const KEY_ORDERS = "comandas:pedidos";
const KEEP_DAYS = 60;

type Tab = "nueva" | "cocina" | "cuentas" | "menu";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

export default function ComandasApp() {
  const [menu, setMenu] = useState<MenuItem[] | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [tab, setTab] = useState<Tab>("nueva");
  const [now, setNow] = useState(0);
  const [message, setMessage] = useState("");
  const [printJob, setPrintJob] = useState<{ order: Order; mode: TicketMode } | null>(null);

  useEffect(() => {
    const t = Date.now();
    setNow(t);
    setMenu(read<MenuItem[] | null>(KEY_MENU, null) ?? DEFAULT_MENU);
    setSettings({ ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(KEY_SETTINGS, {}) });
    // Se conservan las cuentas abiertas y los últimos 60 días para no llenar el almacenamiento
    setOrders(
      read<Order[]>(KEY_ORDERS, []).filter(
        (o) => isOpenBill(o) || isActive(o) || t - o.createdAt < KEEP_DAYS * 86_400_000
      )
    );
  }, []);

  // Reloj para los tiempos de espera
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (menu !== null) write(KEY_MENU, menu);
  }, [menu]);
  useEffect(() => {
    if (settings !== null) write(KEY_SETTINGS, settings);
  }, [settings]);
  useEffect(() => {
    if (orders !== null) write(KEY_ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 2800);
    return () => clearTimeout(t);
  }, [message]);

  // Imprime cuando hay un ticket preparado
  useEffect(() => {
    if (!printJob) return;
    const t = setTimeout(() => {
      window.print();
      setPrintJob(null);
    }, 80);
    return () => clearTimeout(t);
  }, [printJob]);

  if (menu === null || settings === null || orders === null) return <p className={ui.muted}>Cargando…</p>;

  const activeCount = orders.filter(isActive).length;
  const openCount = orders.filter(isOpenBill).length;

  const createOrder = (data: NewOrder) => {
    const t = Date.now();
    const id = uid();
    let number = 1;
    setOrders((list) => {
      const l = list ?? [];
      // La numeración se reinicia cada día
      number = l.filter((o) => sameDay(o.createdAt, t)).reduce((max, o) => Math.max(max, o.number), 0) + 1;
      const order: Order = {
        id,
        number,
        createdAt: t,
        type: data.type,
        table: data.table,
        customer: data.customer,
        contact: data.contact,
        note: data.note,
        lines: data.lines,
        status: "pendiente",
        statusAt: { pendiente: t },
        paid: false,
        payment: null,
        tip: 0,
        paidAt: null,
      };
      return [order, ...l];
    });
    setNow(t);
    setMessage(`Comanda enviada a cocina (${data.type === "mesa" ? `mesa ${data.table}` : data.type === "llevar" ? "para llevar" : "domicilio"}).`);
  };

  const advance = (o: Order) => {
    const next = NEXT_STATUS[o.status];
    if (!next) return;
    const t = Date.now();
    setOrders((l) =>
      (l ?? []).map((x) => (x.id === o.id ? { ...x, status: next, statusAt: { ...x.statusAt, [next]: t } } : x))
    );
    setNow(t);
  };

  const cancel = (o: Order) => {
    if (!window.confirm(`¿Cancelar la comanda ${orderNumber(o.number)} (${orderLabel(o)})?`)) return;
    const t = Date.now();
    setOrders((l) =>
      (l ?? []).map((x) => (x.id === o.id ? { ...x, status: "cancelado", statusAt: { ...x.statusAt, cancelado: t } } : x))
    );
    setMessage(`Comanda ${orderNumber(o.number)} cancelada.`);
  };

  const pay = (o: Order, payment: Payment, tip: number) => {
    const t = Date.now();
    setOrders((l) => (l ?? []).map((x) => (x.id === o.id ? { ...x, paid: true, payment, tip, paidAt: t } : x)));
    setNow(t);
    setMessage(`Cobrado ${formatCOP(subtotal(o.lines) + tip)} (${orderNumber(o.number)}).`);
  };

  const print = (order: Order, mode: TicketMode) => setPrintJob({ order, mode });

  return (
    <>
      {/* Al imprimir solo sale el ticket (antes lo hacía .app-shell > :not(.print-area)) */}
      <div className="print:hidden">
        <div className="mb-4 mt-4.5 flex gap-1 overflow-x-auto border-b border-border" role="tablist">
          {(
            [
              ["nueva", "Nueva comanda", 0],
              ["cocina", "Cocina", activeCount],
              ["cuentas", "Cuentas", openCount],
              ["menu", "Menú y ajustes", 0],
            ] as const
          ).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`-mb-px cursor-pointer whitespace-nowrap border-b-[3px] px-3 py-2.5 text-base sm:px-5 sm:py-3 ${tab === id
                  ? "border-b-text-primary font-semibold text-text-primary"
                  : "border-b-transparent text-text-muted"
                }`}
              onClick={() => setTab(id)}
            >
              {label}
              {count > 0 ? <span className={ui.tabBadge}>{count}</span> : null}
            </button>
          ))}
        </div>

        {message ? <p className={ui.toast}>{message}</p> : null}

        {tab === "nueva" && <OrderBuilder menu={menu} settings={settings} orders={orders} onSubmit={createOrder} />}

        {tab === "cocina" && (
          <KitchenBoard orders={orders} now={now} onAdvance={advance} onCancel={cancel} onPrint={(o) => print(o, "cocina")} />
        )}

        {tab === "cuentas" && (
          <BillsPanel
            orders={orders}
            settings={settings}
            now={now}
            onPay={pay}
            onCancel={cancel}
            onPrintBill={(o) => print(o, "cuenta")}
          />
        )}

        {tab === "menu" && (
          <MenuEditor
            menu={menu}
            settings={settings}
            onMenu={setMenu}
            onSettings={setSettings}
            onReset={() => setMenu(DEFAULT_MENU)}
          />
        )}
      </div>

      {/* Sin aria-hidden: el global.css oculta [aria-hidden="true"] al imprimir */}
      <div className="hidden print:block">
        {printJob ? <Ticket order={printJob.order} settings={settings} mode={printJob.mode} /> : null}
      </div>
    </>
  );
}

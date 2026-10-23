"use client";

import type { Order, Status } from "@/lib/types";
import {
  ADVANCE_LABEL,
  STATUS_LABEL,
  elapsed,
  minutesSince,
  orderLabel,
  orderNumber,
  timeOf,
} from "@/lib/orders";
import { ui } from "@/lib/ui";

interface Props {
  orders: Order[];
  now: number;
  onAdvance: (o: Order) => void;
  onCancel: (o: Order) => void;
  onPrint: (o: Order) => void;
}

const COLUMNS: Status[] = ["pendiente", "preparando", "listo"];

type Urgency = "ok" | "warn" | "late";

function urgency(o: Order, now: number): Urgency {
  const m = minutesSince(o.statusAt.pendiente ?? o.createdAt, now);
  if (o.status === "listo") return "ok";
  return m >= 25 ? "late" : m >= 15 ? "warn" : "ok";
}

const COLUMN_TOP: Partial<Record<Status, string>> = {
  pendiente: "border-t-yellow",
  preparando: "border-t-text-primary",
  listo: "border-t-success",
};

const CARD: Record<Urgency, string> = {
  ok: "border-l-success bg-surface",
  warn: "border-l-yellow bg-surface",
  late: "border-l-danger bg-danger/10",
};

const BADGE: Record<Urgency, string> = {
  ok: "bg-border text-foreground",
  warn: "bg-yellow/15 text-yellow",
  late: "bg-danger/15 text-danger",
};

export default function KitchenBoard({ orders, now, onAdvance, onCancel, onPrint }: Props) {
  const active = orders.filter((o) => COLUMNS.includes(o.status));

  if (active.length === 0) {
    return (
      <section className={ui.panel}>
        <h2 className={`${ui.title} mb-3`}>Cocina</h2>
        <p className={ui.muted}>No hay comandas pendientes. Las nuevas aparecerán aquí al enviarlas desde “Nueva comanda”.</p>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-4 min-[1101px]:grid-cols-3">
      {COLUMNS.map((status) => {
        const list = active
          .filter((o) => o.status === status)
          .sort((a, b) => a.createdAt - b.createdAt);
        return (
          <section
            key={status}
            className={`grid gap-3 rounded-[10px] border border-t-4 border-border bg-surface-secondary p-3.5 ${COLUMN_TOP[status] ?? ""}`}
          >
            <h2 className="text-base font-bold text-foreground">
              {STATUS_LABEL[status]}{" "}
              <span className="ml-1.5 inline-block rounded-full bg-surface px-2 text-[0.8rem] font-normal text-foreground">
                {list.length}
              </span>
            </h2>

            {list.length === 0 ? <p className={ui.mutedSmall}>Sin comandas.</p> : null}

            {list.map((o) => {
              const u = urgency(o, now);
              return (
                <article
                  key={o.id}
                  className={`grid gap-2 rounded-[10px] border border-l-[5px] border-border p-3 ${CARD[u]}`}
                >
                  <header className="flex items-center justify-between gap-2">
                    <div>
                      <strong className="text-[1.15rem]">{orderNumber(o.number)}</strong>
                      <span className="font-semibold"> · {orderLabel(o)}</span>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[0.78rem] font-semibold ${BADGE[u]}`}
                      title={`Creada a las ${timeOf(o.createdAt)}`}
                    >
                      {elapsed(o.createdAt, now)}
                    </span>
                  </header>

                  {o.customer || o.contact ? (
                    <p className={ui.mutedSmall}>{[o.customer, o.contact].filter(Boolean).join(" · ")}</p>
                  ) : null}

                  <ul className="grid gap-1 text-[0.95rem]">
                    {o.lines.map((l) => (
                      <li key={l.id}>
                        <strong>{l.qty}×</strong> {l.name}
                        {l.note ? <div className="text-[0.85rem] italic text-danger">→ {l.note}</div> : null}
                      </li>
                    ))}
                  </ul>

                  {o.note ? (
                    <p className="rounded-md bg-yellow/15 px-2 py-1.5 text-[0.85rem] text-yellow">Nota: {o.note}</p>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-3">
                    <button type="button" className={ui.btnPrimary} onClick={() => onAdvance(o)}>
                      {ADVANCE_LABEL[o.status]}
                    </button>
                    <button type="button" className={ui.link} onClick={() => onPrint(o)}>
                      Imprimir
                    </button>
                    {o.paid ? (
                      <span className={ui.mutedSmall}>Pagada</span>
                    ) : (
                      <button type="button" className={ui.linkDanger} onClick={() => onCancel(o)}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

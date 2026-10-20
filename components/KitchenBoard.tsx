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

interface Props {
  orders: Order[];
  now: number;
  onAdvance: (o: Order) => void;
  onCancel: (o: Order) => void;
  onPrint: (o: Order) => void;
}

const COLUMNS: Status[] = ["pendiente", "preparando", "listo"];

function urgency(o: Order, now: number): "ok" | "warn" | "late" {
  const m = minutesSince(o.statusAt.pendiente ?? o.createdAt, now);
  if (o.status === "listo") return "ok";
  return m >= 25 ? "late" : m >= 15 ? "warn" : "ok";
}

export default function KitchenBoard({ orders, now, onAdvance, onCancel, onPrint }: Props) {
  const active = orders.filter((o) => COLUMNS.includes(o.status));

  if (active.length === 0) {
    return (
      <section className="panel">
        <h2>Cocina</h2>
        <p className="muted">No hay comandas pendientes. Las nuevas aparecerán aquí al enviarlas desde “Nueva comanda”.</p>
      </section>
    );
  }

  return (
    <div className="board">
      {COLUMNS.map((status) => {
        const list = active
          .filter((o) => o.status === status)
          .sort((a, b) => a.createdAt - b.createdAt);
        return (
          <section key={status} className={`board-col col-${status}`}>
            <h2>
              {STATUS_LABEL[status]} <span className="count">{list.length}</span>
            </h2>

            {list.length === 0 ? <p className="muted small">Sin comandas.</p> : null}

            {list.map((o) => (
              <article key={o.id} className={`order-card urgency-${urgency(o, now)}`}>
                <header>
                  <div>
                    <strong className="order-num">{orderNumber(o.number)}</strong>
                    <span className="order-where"> · {orderLabel(o)}</span>
                  </div>
                  <span className="badge" title={`Creada a las ${timeOf(o.createdAt)}`}>
                    {elapsed(o.createdAt, now)}
                  </span>
                </header>

                {o.customer || o.contact ? (
                  <p className="muted small">{[o.customer, o.contact].filter(Boolean).join(" · ")}</p>
                ) : null}

                <ul className="card-lines">
                  {o.lines.map((l) => (
                    <li key={l.id}>
                      <strong>{l.qty}×</strong> {l.name}
                      {l.note ? <div className="card-note">→ {l.note}</div> : null}
                    </li>
                  ))}
                </ul>

                {o.note ? <p className="card-general">Nota: {o.note}</p> : null}

                <div className="card-actions">
                  <button type="button" className="btn btn-primary" onClick={() => onAdvance(o)}>
                    {ADVANCE_LABEL[o.status]}
                  </button>
                  <button type="button" className="link" onClick={() => onPrint(o)}>
                    Imprimir
                  </button>
                  {o.paid ? (
                    <span className="muted small">Pagada</span>
                  ) : (
                    <button type="button" className="link danger" onClick={() => onCancel(o)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}

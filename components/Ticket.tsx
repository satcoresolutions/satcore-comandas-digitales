import type { Order, Settings } from "@/lib/types";
import { formatCOP } from "@/lib/format";
import { orderLabel, orderNumber, subtotal, suggestedTip, timeOf } from "@/lib/orders";

export type TicketMode = "cocina" | "cuenta";

interface Props {
  order: Order;
  settings: Settings;
  mode: TicketMode;
}

/** Ticket para imprimir: "cocina" sin precios, "cuenta" con precios y propina sugerida. */
export default function Ticket({ order, settings, mode }: Props) {
  const sub = subtotal(order.lines);
  const tip = order.paid ? order.tip : suggestedTip(sub, settings.tipPct);

  return (
    <div className={`ticket ticket-${mode}`}>
      <p className="t-center t-strong">{settings.restaurant}</p>
      <p className="t-center">{mode === "cocina" ? "COMANDA" : "CUENTA"}</p>
      <hr />
      <p className="t-big">{orderNumber(order.number)}</p>
      <p className="t-strong">{orderLabel(order)}</p>
      {order.customer ? <p>Cliente: {order.customer}</p> : null}
      {order.contact ? <p>Contacto: {order.contact}</p> : null}
      <p>
        {new Date(order.createdAt).toLocaleDateString("es-CO")} {timeOf(order.createdAt)}
      </p>
      <hr />

      <ul>
        {order.lines.map((l) => (
          <li key={l.id}>
            <div className="t-row">
              <span className={mode === "cocina" ? "t-strong" : ""}>
                {l.qty} × {l.name}
              </span>
              {mode === "cuenta" ? <span>{formatCOP(l.qty * l.price)}</span> : null}
            </div>
            {l.note ? <div className="t-note">→ {l.note}</div> : null}
          </li>
        ))}
      </ul>

      {order.note ? (
        <>
          <hr />
          <p className="t-strong">Nota: {order.note}</p>
        </>
      ) : null}

      {mode === "cuenta" ? (
        <>
          <hr />
          <div className="t-row">
            <span>Subtotal</span>
            <span>{formatCOP(sub)}</span>
          </div>
          <div className="t-row">
            <span>{order.paid ? "Propina" : `Propina sugerida ${settings.tipPct}% (voluntaria)`}</span>
            <span>{formatCOP(tip)}</span>
          </div>
          <div className="t-row t-strong">
            <span>{order.paid ? "TOTAL PAGADO" : "TOTAL CON PROPINA"}</span>
            <span>{formatCOP(sub + tip)}</span>
          </div>
          {order.paid && order.payment ? <p className="t-center">Pagado en {order.payment}</p> : null}
          <hr />
          <p className="t-center">¡Gracias por su visita!</p>
        </>
      ) : null}
    </div>
  );
}

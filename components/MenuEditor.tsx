"use client";

import { useState } from "react";
import type { MenuItem, Settings } from "@/lib/types";
import { formatCOP, uid } from "@/lib/format";
import { ui } from "@/lib/ui";

interface Props {
  menu: MenuItem[];
  settings: Settings;
  onMenu: (menu: MenuItem[]) => void;
  onSettings: (s: Settings) => void;
  onReset: () => void;
}

export default function MenuEditor({ menu, settings, onMenu, onSettings, onReset }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const categories = Array.from(new Set(menu.map((m) => m.category)));
  const grouped = categories.map((c) => ({ category: c, items: menu.filter((m) => m.category === c) }));

  const update = (id: string, patch: Partial<MenuItem>) =>
    onMenu(menu.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const remove = (m: MenuItem) => {
    if (!window.confirm(`¿Quitar "${m.name}" del menú? Las comandas ya registradas no cambian.`)) return;
    onMenu(menu.filter((x) => x.id !== m.id));
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Escribe el nombre del producto.");
    if (!category.trim()) return setError("Escribe o elige una categoría.");
    if (!(price > 0)) return setError("El precio debe ser mayor que 0.");
    setError("");
    onMenu([...menu, { id: uid(), name: name.trim(), category: category.trim(), price, available: true }]);
    setName("");
    setPrice(0);
  };

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="grid gap-4 lg:sticky lg:top-4">
        <section className={ui.panel}>
          <h2 className={`${ui.title} mb-3`}>Ajustes del restaurante</h2>
          <div className={ui.formStack}>
            <label className={ui.label}>
              Nombre (sale en los tickets)
              <input
                className={ui.input}
                value={settings.restaurant}
                onChange={(e) => onSettings({ ...settings, restaurant: e.target.value })}
              />
            </label>
            <div className={ui.grid2}>
              <label className={ui.label}>
                N.º de mesas
                <input
                  className={ui.input}
                  type="number"
                  min={1}
                  max={60}
                  value={settings.tables}
                  onChange={(e) =>
                    onSettings({ ...settings, tables: Math.min(60, Math.max(1, Math.floor(Number(e.target.value)) || 1)) })
                  }
                />
              </label>
              <label className={ui.label}>
                Propina sugerida (%)
                <input
                  className={ui.input}
                  type="number"
                  min={0}
                  max={30}
                  value={settings.tipPct}
                  onChange={(e) => onSettings({ ...settings, tipPct: Math.min(30, Math.max(0, Number(e.target.value) || 0)) })}
                />
              </label>
            </div>
          </div>
          <p className={ui.hint}>La propina es voluntaria: al cobrar puedes quitarla o cambiar el valor.</p>
        </section>

        <form className={ui.panel} onSubmit={add}>
          <h2 className={`${ui.title} mb-3`}>Agregar producto</h2>
          <div className={ui.formStack}>
            <label className={ui.label}>
              Nombre
              <input className={ui.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Lasaña" />
            </label>
            <label className={ui.label}>
              Categoría
              <input
                className={ui.input}
                list="categorias-menu"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ej. Platos fuertes"
              />
              <datalist id="categorias-menu">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className={ui.label}>
              Precio ($)
              <input
                className={ui.input}
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>
          </div>
          {error ? <p className={`${ui.alert} mt-3`}>{error}</p> : null}
          <button type="submit" className={`${ui.btnPrimary} ${ui.block}`}>
            Agregar al menú
          </button>
        </form>
      </aside>

      <section className={ui.panel}>
        <div className={ui.panelHead}>
          <h2 className={ui.title}>Menú</h2>
          <button
            type="button"
            className={ui.linkDanger}
            onClick={() => {
              if (window.confirm("¿Restaurar el menú de ejemplo? Se reemplazará el menú actual.")) onReset();
            }}
          >
            Restaurar menú de ejemplo
          </button>
        </div>

        {menu.length === 0 ? <p className={ui.muted}>No hay productos. Agrega el primero con el formulario.</p> : null}

        {grouped.map((g) => (
          <div key={g.category}>
            <h3 className={ui.subtitle}>{g.category}</h3>
            <ul className="grid gap-2">
              {g.items.map((m) => (
                <li
                  key={m.id}
                  className={`grid grid-cols-2 items-center gap-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)_110px_auto_28px] ${m.available ? "" : "[&_input]:opacity-50"
                    }`}
                >
                  <input
                    className={`${ui.input} col-span-2 lg:col-span-1`}
                    aria-label="Nombre"
                    value={m.name}
                    onChange={(e) => update(m.id, { name: e.target.value })}
                  />
                  <input
                    className={ui.input}
                    aria-label="Categoría"
                    list="categorias-menu"
                    value={m.category}
                    onChange={(e) => update(m.id, { category: e.target.value })}
                  />
                  <input
                    className={ui.input}
                    aria-label="Precio"
                    type="number"
                    min={0}
                    value={m.price}
                    onChange={(e) => update(m.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                  />
                  <button
                    type="button"
                    className={`cursor-pointer whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[0.8rem] ${m.available
                        ? "border-success/30 bg-success/10 text-success"
                        : "border-danger/30 bg-danger/10 text-danger"
                      }`}
                    onClick={() => update(m.id, { available: !m.available })}
                    title="Marca como agotado para que no se pueda pedir"
                  >
                    {m.available ? "Disponible" : "Agotado"}
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-md border-none bg-transparent text-xl text-text-muted hover:bg-danger/15 hover:text-danger"
                    aria-label={`Quitar ${m.name}`}
                    onClick={() => remove(m)}
                  >
                    ×
                  </button>
                  <span className="hidden text-[0.82rem] text-text-muted">{formatCOP(m.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

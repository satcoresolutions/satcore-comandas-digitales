"use client";

import { useState } from "react";
import type { MenuItem, Settings } from "@/lib/types";
import { formatCOP, uid } from "@/lib/format";

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
    <div className="menu-editor">
      <aside className="side">
        <section className="panel">
          <h2>Ajustes del restaurante</h2>
          <div className="form-stack">
            <label>
              Nombre (sale en los tickets)
              <input value={settings.restaurant} onChange={(e) => onSettings({ ...settings, restaurant: e.target.value })} />
            </label>
            <div className="grid grid-2">
              <label>
                N.º de mesas
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={settings.tables}
                  onChange={(e) =>
                    onSettings({ ...settings, tables: Math.min(60, Math.max(1, Math.floor(Number(e.target.value)) || 1)) })
                  }
                />
              </label>
              <label>
                Propina sugerida (%)
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={settings.tipPct}
                  onChange={(e) => onSettings({ ...settings, tipPct: Math.min(30, Math.max(0, Number(e.target.value) || 0)) })}
                />
              </label>
            </div>
          </div>
          <p className="hint">La propina es voluntaria: al cobrar puedes quitarla o cambiar el valor.</p>
        </section>

        <form className="panel" onSubmit={add}>
          <h2>Agregar producto</h2>
          <div className="form-stack">
            <label>
              Nombre
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Lasaña" />
            </label>
            <label>
              Categoría
              <input
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
            <label>
              Precio ($)
              <input type="number" min={0} value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))} />
            </label>
          </div>
          {error ? <p className="alert spaced-t">{error}</p> : null}
          <button type="submit" className="btn btn-primary btn-block">
            Agregar al menú
          </button>
        </form>
      </aside>

      <section className="panel">
        <div className="panel-head wrap">
          <h2>Menú</h2>
          <button
            type="button"
            className="link danger"
            onClick={() => {
              if (window.confirm("¿Restaurar el menú de ejemplo? Se reemplazará el menú actual.")) onReset();
            }}
          >
            Restaurar menú de ejemplo
          </button>
        </div>

        {menu.length === 0 ? <p className="muted">No hay productos. Agrega el primero con el formulario.</p> : null}

        {grouped.map((g) => (
          <div key={g.category} className="menu-group">
            <h3>{g.category}</h3>
            <ul className="menu-rows">
              {g.items.map((m) => (
                <li key={m.id} className={m.available ? "" : "off"}>
                  <input
                    className="m-name"
                    aria-label="Nombre"
                    value={m.name}
                    onChange={(e) => update(m.id, { name: e.target.value })}
                  />
                  <input
                    className="m-cat"
                    aria-label="Categoría"
                    list="categorias-menu"
                    value={m.category}
                    onChange={(e) => update(m.id, { category: e.target.value })}
                  />
                  <input
                    className="m-price"
                    aria-label="Precio"
                    type="number"
                    min={0}
                    value={m.price}
                    onChange={(e) => update(m.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                  />
                  <button
                    type="button"
                    className={m.available ? "chip on" : "chip"}
                    onClick={() => update(m.id, { available: !m.available })}
                    title="Marca como agotado para que no se pueda pedir"
                  >
                    {m.available ? "Disponible" : "Agotado"}
                  </button>
                  <button type="button" className="icon-btn" aria-label={`Quitar ${m.name}`} onClick={() => remove(m)}>
                    ×
                  </button>
                  <span className="m-hint muted small">{formatCOP(m.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

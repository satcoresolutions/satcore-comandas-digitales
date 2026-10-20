import type { MenuItem } from "./types";

const item = (id: string, name: string, category: string, price: number): MenuItem => ({
  id,
  name,
  category,
  price,
  available: true,
});

/** Menú de ejemplo; se puede editar por completo desde la pestaña "Menú". */
export const DEFAULT_MENU: MenuItem[] = [
  item("m01", "Bandeja paisa", "Platos fuertes", 32000),
  item("m02", "Sancocho de gallina", "Platos fuertes", 28000),
  item("m03", "Ajiaco santafereño", "Platos fuertes", 30000),
  item("m04", "Churrasco con papas", "Platos fuertes", 36000),
  item("m05", "Pechuga a la plancha", "Platos fuertes", 26000),
  item("m06", "Mojarra frita", "Platos fuertes", 34000),
  item("m07", "Empanadas (3 un.)", "Entradas", 9000),
  item("m08", "Arepa con queso", "Entradas", 7000),
  item("m09", "Patacones con hogao", "Entradas", 12000),
  item("m10", "Jugo natural", "Bebidas", 7000),
  item("m11", "Limonada de coco", "Bebidas", 9000),
  item("m12", "Gaseosa", "Bebidas", 4500),
  item("m13", "Cerveza", "Bebidas", 6500),
  item("m14", "Agua", "Bebidas", 3500),
  item("m15", "Tres leches", "Postres", 10000),
  item("m16", "Flan de caramelo", "Postres", 8500),
];

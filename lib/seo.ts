/** Configuración central de SEO. Define NEXT_PUBLIC_SITE_URL en producción. */
export const SITE = {
  name: "Comandas Digitales",
  brand: "SatCore Solutions",
  description:
    "Toma pedidos por mesa, para llevar o a domicilio, envíalos a cocina y cóbralos desde una sola pantalla. Tablero de cocina con tiempos de espera, cuentas con propina voluntaria, menú editable, tickets para imprimir e instalación como app en tu celular o tablet.",
  shortDescription:
    "Pedidos, cocina y cobro para restaurantes desde una sola pantalla.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132a8e",
  keywords: [
    "comandas digitales",
    "app de comandas para restaurante",
    "pedidos para restaurante",
    "tablero de cocina",
    "punto de venta para restaurantes",
    "cuentas por mesa y propina",
    "imprimir tickets de cocina",
    "menú digital editable",
    "PWA",
  ],
} as const;

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
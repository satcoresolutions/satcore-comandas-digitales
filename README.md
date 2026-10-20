# Comandas digitales | SatCore Solutions

Microapp para **gestionar pedidos de restaurantes desde una sola pantalla**. Permite registrar comandas, enviarlas a cocina, controlar su preparación, administrar cuentas y registrar pagos.

Desarrollada con **Next.js y TypeScript**, sin necesidad de backend ni base de datos. La información se almacena localmente en el navegador mediante `localStorage`.

> **SatCore Solutions** — Soluciones digitales seguras, accesibles y funcionales para todos.

---

## Funcionalidades

### 🍽️ Registro de comandas

Crea y administra pedidos de manera sencilla.

- Menú organizado por categorías.
- Búsqueda de productos.
- Pedidos para mesa, para llevar o a domicilio.
- Selección de mesa y seguimiento de cuentas abiertas.
- Control de cantidades por producto.
- Notas individuales, como «sin cebolla» o «sin salsa».
- Notas generales para toda la comanda.
- Numeración consecutiva de comandas, reiniciada diariamente.

### 👨‍🍳 Tablero de cocina

Visualiza el estado de preparación de los pedidos mediante un tablero organizado en tres columnas:

- **Pendiente:** pedido recibido.
- **En preparación:** pedido en proceso.
- **Listo:** pedido preparado para entregar.

Cada comanda muestra el tiempo de espera y utiliza indicadores visuales para identificar demoras a partir de los 15 y 25 minutos.

El estado avanza mediante acciones disponibles en el tablero hasta completar la entrega.

### 💳 Administración de cuentas

Gestiona las cuentas pendientes y registra los pagos de cada pedido.

- Consulta de cuentas por cobrar.
- Registro del medio de pago: efectivo, transferencia o tarjeta.
- Gestión de propinas voluntarias.
- Propina sugerida del 10 %, configurable.
- Posibilidad de establecer otro valor o no incluir propina.
- Historial de ventas cobradas del día.
- Total de propinas recibidas.
- Cálculo del ticket promedio.
- Productos más solicitados.
- Resumen de cobros por medio de pago.

### ⚙️ Menú y configuración

Adapta la aplicación a las necesidades del restaurante.

- Configuración del nombre del establecimiento.
- Administración del número de mesas.
- Edición de productos.
- Modificación de precios.
- Creación y edición de categorías.
- Activación y desactivación de productos.
- Marcado de productos agotados.
- Configuración de la propina sugerida.

### 🧾 Impresión de tickets

Genera documentos impresos desde el navegador.

- **Ticket de cocina:** contiene los productos y las indicaciones necesarias para preparar el pedido, sin mostrar precios.
- **Cuenta del cliente:** presenta el detalle de la compra y los valores correspondientes.

La impresión utiliza el diálogo del navegador y permite seleccionar una impresora compatible.

### 📅 Gestión de pedidos e historial

- Numeración de comandas con formato `#001`, `#002`, etc.
- Reinicio diario de la numeración.
- Conservación de las cuentas abiertas.
- Conservación de los últimos 60 días de información.

---

## Tecnologías

- **Next.js:** framework de React.
- **React:** construcción de interfaces.
- **TypeScript:** tipado estático.
- **CSS:** estilos y diseño adaptable.
- **localStorage:** almacenamiento local de información.
- **API de impresión del navegador:** generación de tickets impresos.

La aplicación está diseñada para funcionar sin una infraestructura backend.

---

## Requisitos

Antes de instalar el proyecto, asegúrate de tener:

- Node.js.
- npm.

Comprueba las versiones disponibles:

```bash
node -v
npm -v
```

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/satcoresolutions/satcore-comandas-digitales.git
```

Accede al directorio:

```bash
cd satcore-comandas-digitales
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre la aplicación en el navegador:

```text
http://localhost:3000
```

---

## Ejecución en producción

Genera la compilación de producción:

```bash
npm run build
```

Inicia el servidor:

```bash
npm start
```

---

## Estructura del proyecto

```text
satcore-comandas-digitales/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ComandasApp.tsx
│   ├── OrderBuilder.tsx
│   ├── KitchenBoard.tsx
│   ├── BillsPanel.tsx
│   ├── MenuEditor.tsx
│   └── Ticket.tsx
│
├── lib/
│   ├── types.ts
│   ├── orders.ts
│   ├── menu.ts
│   ├── dates.ts
│   └── format.ts
│
├── public/
│   └── logo.png
│
├── package.json
├── package-lock.json
├── next.config.mjs
├── tsconfig.json
└── README.md
```

_Nota: la estructura anterior es orientativa; los nombres y extensiones deben coincidir con los archivos reales del repositorio._

---

## Personalización del menú

El menú inicial de ejemplo se encuentra en:

```text
lib/menu.ts
```

Puedes modificarlo directamente en el código o administrar los productos desde la interfaz de la aplicación.

Es posible adaptar los productos, las categorías y los precios a distintos tipos de establecimientos, como restaurantes, cafeterías, comidas rápidas y pequeños negocios gastronómicos.

---

## Almacenamiento y privacidad

La aplicación utiliza `localStorage` para guardar la información directamente en el navegador.

Esto implica que:

- No requiere registro de usuario.
- No necesita una base de datos.
- No sincroniza automáticamente la información entre dispositivos.
- Los datos están asociados al navegador y al dispositivo utilizados.
- Limpiar los datos del navegador puede provocar la pérdida de la información guardada.

**Recomendación:** utiliza la aplicación en un dispositivo de confianza y evita borrar los datos del navegador si necesitas conservar las comandas y cuentas registradas.

La versión actual no incorpora copias de seguridad automáticas ni sincronización en la nube.

---

## Limitaciones actuales

Esta versión está orientada a restaurantes y pequeños negocios que necesitan gestionar sus pedidos de forma local.

Actualmente no incluye:

- Backend ni base de datos centralizada.
- Autenticación de usuarios.
- Sincronización entre dispositivos.
- Acceso multiusuario en tiempo real.
- Impresión automática sin intervención del usuario.
- Integración directa con impresoras de cocina.
- Pasarelas de pago.
- Integración con plataformas de domicilios.
- Copias de seguridad automáticas en la nube.

Estas capacidades podrían añadirse en futuras versiones mediante una infraestructura backend y servicios adicionales.

---

## Objetivo del proyecto

**Comandas digitales** busca simplificar el trabajo diario de los pequeños negocios gastronómicos, reuniendo en una sola herramienta el registro de pedidos, el seguimiento en cocina y la gestión de cuentas.

El objetivo es reducir la complejidad operativa y facilitar el control de los pedidos sin necesidad de implementar un sistema de gestión costoso.

---

## Autor

**SatCore Solutions**

Soluciones digitales seguras, accesibles y funcionales para todos.

GitHub: [satcoresolutions](https://github.com/satcoresolutions)

---

## Licencia

Este proyecto no especifica actualmente una licencia de software. Las condiciones de uso y distribución deberán definirse antes de autorizar su reutilización por terceros.

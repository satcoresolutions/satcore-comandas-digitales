 <div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# SatCore Solutions — Comandas Digitales

**Microapp para gestionar pedidos de restaurantes desde una sola pantalla.**

Registra comandas, controla la preparación en cocina, administra cuentas, registra pagos y consulta las ventas del día desde una interfaz digital sencilla, sin necesidad de un backend ni de una base de datos centralizada.

---

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**SATCORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

[![License](https://img.shields.io/badge/License-SCSAL%201.0-000000.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?logo=npm)](https://www.npmjs.com/)

</div>

---

# Sobre el proyecto

**SatCore Solutions — Comandas Digitales** es una microaplicación orientada a la gestión operativa de restaurantes y pequeños negocios gastronómicos, desarrollada dentro del ecosistema de soluciones tecnológicas de **SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**.

Su propósito es simplificar la administración diaria de pedidos mediante una herramienta que centraliza el registro de comandas, el seguimiento de la preparación en cocina, la gestión de cuentas, el registro de pagos y la consulta de indicadores básicos de ventas.

La aplicación permite gestionar pedidos para mesa, para llevar y a domicilio, organizar productos por categorías, registrar indicaciones especiales y controlar el avance de las comandas desde su recepción hasta su preparación y entrega.

También incorpora herramientas para administrar el menú, configurar el establecimiento, registrar propinas, consultar el historial de ventas y generar tickets imprimibles para cocina y clientes.

El proyecto está desarrollado con Next.js, React y TypeScript. La información se almacena localmente en el navegador mediante `localStorage`, por lo que no requiere un backend ni una base de datos centralizada para las funcionalidades descritas.

Este diseño está orientado a establecimientos que necesitan una herramienta sencilla para gestionar sus operaciones desde un dispositivo. Sin embargo, la ausencia de sincronización entre dispositivos implica que no debe considerarse un sistema multiusuario en tiempo real.

---

# SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

**Nombre comercial:** SatCore Solutions

**Eslogan:**

> _Soluciones digitales seguras, accesibles y funcionales para todos._

SatCore Solutions desarrolla soluciones digitales orientadas al software, la automatización, la inteligencia artificial, la ciberseguridad, la formación tecnológica y las herramientas digitales.

El ecosistema se estructura alrededor de cinco áreas principales:

### Desarrollo

Creación de sitios web, aplicaciones, herramientas digitales, plataformas y soluciones de software.

### Automatizador

Automatización de procesos, agentes inteligentes, integración de APIs y sistemas capaces de ejecutar tareas de manera automatizada.

### Seguridad

Ciberseguridad, auditoría, análisis de vulnerabilidades, hardening, monitoreo y protección de sistemas.

### Estudio

Formación, documentación, recursos educativos, tutoriales y proyectos orientados al aprendizaje tecnológico.

### Marketing

Diseño de marca, presencia digital, contenido tecnológico, analítica y herramientas digitales para comunicación y posicionamiento.

Comandas Digitales forma parte principalmente del área de **Desarrollo**, mediante una solución orientada a simplificar procesos comerciales y operativos del sector gastronómico.

---

# Características

## Registro de comandas

La aplicación permite crear y administrar pedidos desde una interfaz centralizada.

- Menú organizado por categorías.
- Búsqueda de productos.
- Pedidos para mesa, para llevar o a domicilio.
- Selección de mesa y seguimiento de cuentas abiertas.
- Control de cantidades por producto.
- Notas individuales por producto, como «sin cebolla» o «sin salsa».
- Notas generales para toda la comanda.
- Numeración consecutiva de comandas con reinicio diario.

## Tablero de cocina

Permite visualizar el estado de preparación de los pedidos mediante un tablero organizado en tres columnas.

- **Pendiente:** pedido recibido y pendiente de preparación.
- **En preparación:** pedido que se encuentra en proceso.
- **Listo:** pedido preparado y pendiente de entrega.

Cada comanda muestra el tiempo de espera y utiliza indicadores visuales para identificar demoras a partir de los 15 y 25 minutos.

El estado del pedido avanza mediante las acciones disponibles en el tablero hasta completar el proceso de entrega.

## Administración de cuentas

Facilita el control de las cuentas pendientes y el registro de pagos.

- Consulta de cuentas por cobrar.
- Registro del medio de pago: efectivo, transferencia o tarjeta.
- Gestión de propinas voluntarias.
- Propina sugerida del 10 %, configurable.
- Posibilidad de establecer otro valor o no incluir propina.
- Historial de ventas cobradas del día.
- Total de propinas recibidas.
- Cálculo del ticket promedio.
- Identificación de los productos más solicitados.
- Resumen de cobros por medio de pago.

Los indicadores dependen de los datos disponibles y de la lógica de cálculo implementada en la aplicación.

## Menú y configuración

Permite adaptar la herramienta a las necesidades de cada establecimiento.

- Configuración del nombre del restaurante.
- Administración del número de mesas.
- Edición de productos.
- Modificación de precios.
- Creación y edición de categorías.
- Activación y desactivación de productos.
- Marcado de productos agotados.
- Configuración de la propina sugerida.

## Impresión de tickets

Permite generar documentos imprimibles mediante el diálogo de impresión del navegador.

- **Ticket de cocina:** presenta los productos y las indicaciones necesarias para preparar el pedido, sin mostrar precios.
- **Cuenta del cliente:** presenta el detalle de la compra y los valores correspondientes.

La impresión requiere la intervención del usuario y permite seleccionar una impresora compatible con el sistema operativo y el navegador.

## Gestión de pedidos e historial

- Numeración de comandas con formato `#001`, `#002` y sucesivos.
- Reinicio diario de la numeración.
- Conservación de las cuentas abiertas.
- Conservación de hasta los últimos 60 días de información, según la política de persistencia implementada.

## Funcionamiento local

- Almacenamiento mediante `localStorage`.
- Sin necesidad de registro de usuario.
- Sin backend propio.
- Sin base de datos centralizada.
- Sin sincronización automática entre dispositivos.

---

# Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- [Next.js](https://nextjs.org/): framework de React para aplicaciones web.
- [React](https://react.dev/): construcción de interfaces de usuario.
- [TypeScript](https://www.typescriptlang.org/): tipado estático y organización del código.
- CSS: estilos de la interfaz y diseño adaptable.
- `localStorage`: persistencia de información en el navegador.
- API de impresión del navegador: generación de tickets mediante el diálogo de impresión.
- [Node.js](https://nodejs.org/): entorno de ejecución utilizado durante el desarrollo y la compilación.
- [npm](https://www.npmjs.com/): instalación de dependencias y ejecución de scripts.
- [Git](https://git-scm.com/): control de versiones.

### Tecnologías principales

| Tecnología       | Función                                               |
| ---------------- | ----------------------------------------------------- |
| Next.js          | Estructura y ejecución de la aplicación web.          |
| React            | Interfaz de usuario y componentes.                    |
| TypeScript       | Tipado y organización del código.                     |
| CSS              | Presentación visual y diseño adaptable.               |
| `localStorage`   | Persistencia de datos en el navegador.                |
| API de impresión | Impresión de tickets de cocina y cuentas de clientes. |

Las versiones exactas de las dependencias deben verificarse en `package.json` y en el archivo de bloqueo del proyecto.

---

# Requisitos

Antes de ejecutar el proyecto, asegúrate de contar con las herramientas necesarias.

- Node.js compatible con la versión de Next.js utilizada.
- npm.
- Git para clonar el repositorio y administrar el código fuente.
- Un navegador moderno compatible con las funcionalidades web utilizadas por la aplicación.

Comprueba las versiones instaladas:

```bash
node -v
npm -v
git --version
```

No se requiere una base de datos ni un servidor backend propio para las funcionalidades locales descritas.

---

# Instalación

Clona el repositorio:

```bash
git clone https://github.com/satcoresolutions/satcore-comandas-digitales.git
```

Accede al directorio del proyecto:

```bash
cd satcore-comandas-digitales
```

Instala las dependencias:

```bash
npm install
```

Una vez finalizada la instalación, podrás ejecutar la aplicación en modo desarrollo.

---

# Configuración

La aplicación utiliza la configuración habitual de un proyecto Next.js con TypeScript.

### Configuración general

Los principales archivos de configuración pueden incluir:

- `package.json`: dependencias y scripts del proyecto.
- `package-lock.json`: versiones resueltas de las dependencias, cuando se utiliza npm con archivo de bloqueo.
- `next.config.mjs`: configuración de Next.js.
- `tsconfig.json`: configuración de TypeScript.
- `app/globals.css`: estilos globales de la interfaz.
- `lib/menu.ts`: definición del menú inicial de ejemplo, según la estructura descrita.

### Variables de entorno

No se han especificado variables de entorno obligatorias para la versión descrita.

Si una versión futura incorpora servicios externos, APIs, autenticación o almacenamiento remoto, las variables requeridas deberán documentarse en esta sección.

**Nunca publiques credenciales, tokens, claves privadas, contraseñas u otros secretos en el repositorio.**

---

# Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Abre la siguiente dirección en el navegador:

```text
http://localhost:3000
```

Desde la interfaz podrás gestionar las comandas, consultar el tablero de cocina, administrar cuentas, registrar pagos y utilizar las opciones de configuración disponibles.

Si el puerto 3000 está ocupado, Next.js puede utilizar otro puerto disponible. En ese caso, utiliza la dirección indicada por la terminal.

Para detener el servidor de desarrollo, utiliza `Ctrl + C` en la terminal.

---

# Producción

Para generar la compilación de producción:

```bash
npm run build
```

Una vez finalizada correctamente la compilación, inicia la aplicación:

```bash
npm start
```

El comando `npm start` requiere que el script correspondiente esté definido en `package.json` y que la compilación de producción se haya generado previamente.

### Verificaciones recomendadas

Antes de publicar una versión, comprueba:

1. El registro y la edición de comandas.
2. La selección de productos y cantidades.
3. El funcionamiento de las notas individuales y generales.
4. La transición de pedidos entre las columnas de cocina.
5. Los indicadores de tiempo de espera.
6. El registro de pagos y propinas.
7. Los indicadores de ventas y ticket promedio.
8. La impresión de tickets de cocina y cuentas de clientes.
9. La persistencia de las cuentas abiertas.
10. La numeración diaria de las comandas.
11. La conservación y eliminación de los registros según la política de 60 días.
12. El comportamiento de la interfaz en diferentes tamaños de pantalla.

---

# Estructura del proyecto

La estructura de referencia proporcionada para la aplicación es la siguiente:

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
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── next.config.mjs
└── tsconfig.json
```

La estructura es orientativa. Los nombres, las extensiones y la ubicación de los archivos deben coincidir con la implementación real del repositorio.

### Directorio `app/`

Contiene la estructura principal de la aplicación Next.js.

- `layout.tsx`: estructura compartida y configuración del diseño.
- `page.tsx`: página principal.
- `globals.css`: estilos globales.

### Directorio `components/`

Agrupa los componentes funcionales de la interfaz.

- `ComandasApp.tsx`: aplicación principal y coordinación de las funcionalidades.
- `OrderBuilder.tsx`: construcción y edición de comandas.
- `KitchenBoard.tsx`: tablero de preparación de pedidos.
- `BillsPanel.tsx`: administración de cuentas y pagos.
- `MenuEditor.tsx`: configuración y administración del menú.
- `Ticket.tsx`: presentación imprimible de los tickets, según la implementación.

### Directorio `lib/`

Contiene las funciones auxiliares y los tipos utilizados por la aplicación.

- `types.ts`: definiciones de tipos de datos.
- `orders.ts`: operaciones relacionadas con las comandas.
- `menu.ts`: definición del menú inicial y sus productos.
- `dates.ts`: funciones relacionadas con fechas y numeración diaria.
- `format.ts`: funciones de formato de valores y datos.

### Directorio `public/`

Contiene recursos estáticos, como el logotipo de SatCore Solutions.

### Archivos de configuración

- `package.json`: scripts y dependencias.
- `package-lock.json`: bloqueo de dependencias.
- `next.config.mjs`: configuración de Next.js.
- `tsconfig.json`: opciones de TypeScript.
- `LICENSE`: licencia aplicable al proyecto.
- `README.md`: documentación principal.

---

# Arquitectura

Comandas Digitales utiliza una arquitectura de aplicación web centrada en el cliente. La interfaz administra las interacciones del usuario, los componentes organizan las operaciones y las funciones auxiliares gestionan las operaciones sobre comandas, menú, fechas y formatos.

La persistencia se realiza en el navegador mediante `localStorage`.

```text
Usuario
   │
   ▼
Interfaz web
Next.js / React
   │
   ▼
ComandasApp
   │
   ├── Gestión de pedidos
   │      └── OrderBuilder
   │
   ├── Seguimiento de cocina
   │      └── KitchenBoard
   │
   ├── Cuentas y pagos
   │      └── BillsPanel
   │
   ├── Administración del menú
   │      └── MenuEditor
   │
   ├── Tickets imprimibles
   │      └── Ticket
   │
   ▼
Funciones auxiliares
lib/
   │
   ▼
Almacenamiento local
localStorage
```

### Interfaz y componentes

Los componentes organizan las funciones de la aplicación y permiten gestionar las operaciones de pedidos, cocina, cuentas y menú.

### Lógica de aplicación

Las funciones auxiliares proporcionan operaciones reutilizables relacionadas con los datos, las fechas, la numeración y el formato de la información.

### Persistencia

Los datos se conservan localmente mediante `localStorage`. Esta solución no ofrece por sí sola sincronización entre dispositivos, concurrencia multiusuario ni recuperación centralizada de la información.

### Impresión

Los tickets se preparan para su impresión desde el navegador. La aplicación no incorpora, según la descripción disponible, una integración directa con impresoras de cocina ni impresión automática en segundo plano.

---

# Datos y privacidad

La aplicación utiliza `localStorage` para conservar información de comandas, cuentas, configuración del establecimiento y otros datos gestionados por la implementación.

Los registros pueden contener información comercial, productos solicitados, cantidades, precios, notas de preparación, medios de pago y resúmenes de ventas.

### Funcionamiento del almacenamiento local

- Los datos permanecen asociados al origen del sitio web y al perfil del navegador utilizado.
- La información no se sincroniza automáticamente entre navegadores o dispositivos.
- No existe una copia de seguridad centralizada proporcionada por la arquitectura descrita.
- Borrar los datos del sitio o limpiar el almacenamiento del navegador puede provocar la pérdida de la información guardada.
- El cambio de dominio u origen puede impedir que el navegador acceda a los datos almacenados en el origen anterior.
- La conservación de los últimos 60 días depende de la implementación de la limpieza y gestión del historial.

### Recomendaciones

Para reducir el riesgo de pérdida o exposición de información:

- utiliza la aplicación en un dispositivo de confianza;
- evita borrar los datos del navegador si necesitas conservar las comandas;
- protege el acceso al dispositivo y al perfil del navegador;
- verifica los registros antes de cerrar cuentas importantes;
- conserva por separado los documentos o registros necesarios para la operación comercial;
- evita introducir datos personales innecesarios en las notas de los pedidos;
- establece procedimientos de respaldo apropiados para el establecimiento.

`localStorage` no debe considerarse cifrado por defecto ni un mecanismo de protección de datos sensibles.

La aplicación no debe utilizarse como sustituto de un sistema centralizado de respaldo, contabilidad o archivo comercial cuando estos sean necesarios para la operación del establecimiento.

Si se incorporan posteriormente APIs, servicios externos, analítica o almacenamiento remoto, deberán documentarse los datos transmitidos, sus finalidades y las medidas de protección aplicables.

---

# Seguridad

La seguridad forma parte de los principios de desarrollo de SatCore Solutions.

Aunque la aplicación no requiere un backend propio, gestiona información operativa y comercial que puede ser importante para el establecimiento.

Se recomienda:

- mantener actualizadas las dependencias;
- revisar las vulnerabilidades conocidas de los paquetes utilizados;
- validar los datos de entrada;
- comprobar los cálculos monetarios y las operaciones de pago;
- evitar almacenar credenciales o secretos en el navegador;
- proteger el dispositivo utilizado para operar el restaurante;
- revisar los registros antes de imprimir o compartir documentos;
- no utilizar datos reales de clientes en pruebas públicas;
- verificar la configuración del despliegue;
- mantener procedimientos externos de respaldo cuando la información sea importante para la continuidad operativa.

El uso de almacenamiento local no garantiza confidencialidad frente a terceros con acceso al dispositivo o a la ejecución de la aplicación.

### Reporte de vulnerabilidades

Si encuentras una vulnerabilidad relacionada con este proyecto, evita publicar detalles técnicos sensibles de forma pública antes de que pueda ser evaluada.

**Email:** satcoresolutions@gmail.com

Incluye, cuando sea posible:

- descripción del problema;
- impacto potencial;
- pasos generales para reproducirlo;
- versión afectada;
- información adicional relevante.

No incluyas credenciales reales ni información personal innecesaria.

---

# Desarrollo y contribuciones

Las contribuciones, correcciones, mejoras y adaptaciones son bienvenidas siempre que respeten las condiciones de licencia aplicables al proyecto.

Se recomienda mantener una arquitectura organizada, utilizar TypeScript de manera consistente y separar las responsabilidades de la interfaz, las operaciones de negocio y la persistencia.

### Recomendaciones para contribuir

1. Revisa la estructura del repositorio y la documentación existente.
2. Identifica los componentes y módulos relacionados con el cambio.
3. Mantén la compatibilidad con la arquitectura del proyecto.
4. Verifica los cálculos de cuentas, descuentos y propinas.
5. Comprueba la numeración diaria y el historial.
6. Prueba el funcionamiento del tablero de cocina.
7. Verifica la impresión de los tickets.
8. Ejecuta la compilación y las comprobaciones disponibles.
9. Documenta las modificaciones funcionales importantes.

Las contribuciones no eliminan ni sustituyen la autoría original de SatCore Solutions.

La integración o redistribución de contribuciones deberá respetar la licencia aplicable y los derechos correspondientes.

---

# Proyectos derivados

Comandas Digitales puede utilizarse como base para desarrollar nuevas soluciones, siempre que se cumplan las condiciones de la licencia que finalmente se incorpore al repositorio.

Dentro de los límites establecidos por dicha licencia, los usos autorizados podrán incluir:

- copiar;
- estudiar;
- modificar;
- adaptar;
- ampliar;
- integrar;
- redistribuir;
- utilizar comercialmente;
- crear proyectos derivados.

Cuando un proyecto derivado utilice una parte sustancial del código, deberá reconocer claramente a SatCore Solutions como fuente original si así lo exige la licencia aplicable.

### Ejemplo de atribución

> Basado en SatCore Solutions — Comandas Digitales, desarrollado originalmente por SatCore Solutions.

**Repositorio original:**

```text
https://github.com/satcoresolutions/satcore-comandas-digitales
```

**Organización:**

```text
https://github.com/satcoresolutions
```

La atribución no deberá presentarse de manera que implique que SatCore Solutions respalda, patrocina, mantiene o garantiza un proyecto derivado cuando dicha relación no exista.

**Importante:** los permisos efectivos de copia, modificación, uso comercial y redistribución dependen de la licencia incorporada al repositorio. Este README no concede por sí solo derechos que no estén previstos en ella.

---

# Atribución

La atribución de la autoría original deberá realizarse de acuerdo con los términos de la licencia aplicable al proyecto.

Si se adopta la **SatCore Solutions Attribution License — SCSAL 1.0**, deberán respetarse los requisitos de atribución establecidos en su texto completo.

Una atribución de referencia puede adoptar la siguiente forma:

> Este proyecto está basado en SatCore Solutions — Comandas Digitales, desarrollado originalmente por SatCore Solutions.

**Proyecto original:**

```text
https://github.com/satcoresolutions/satcore-comandas-digitales
```

**SatCore Solutions:**

```text
https://github.com/satcoresolutions
```

La atribución deberá conservar el reconocimiento de la autoría original sin inducir a confusión sobre la titularidad, el mantenimiento o el respaldo oficial de un proyecto derivado.

Consulta el archivo `LICENSE` para verificar los requisitos aplicables antes de distribuir el código.

---

# Marca y propiedad intelectual

Los derechos aplicables al código fuente de este proyecto deberán determinarse a partir de la licencia efectivamente incorporada al repositorio.

La eventual adopción de la SCSAL 1.0 no transfiere automáticamente derechos sobre:

- SatCore Solutions;
- SOFTWARE AND TECHNOLOGY CORE SOLUTIONS;
- logotipos;
- identidad visual;
- nombres comerciales;
- marcas;
- dominios;
- elementos gráficos;
- otros signos distintivos asociados con SatCore Solutions.

El uso del código no constituye autorización para representar una relación oficial con SatCore Solutions.

La creación de un proyecto derivado tampoco otorga derechos para registrar o reclamar como propios los signos distintivos de SatCore Solutions.

El uso del nombre, logotipo o identidad visual fuera de los usos permitidos deberá evaluarse conforme a los derechos y las autorizaciones correspondientes.

---

# Dependencias de terceros

El proyecto utiliza tecnologías y herramientas de terceros, entre ellas Next.js, React y TypeScript, además de las dependencias adicionales declaradas en `package.json`.

Cada componente de terceros permanece sujeto a su propia licencia y a las condiciones aplicables de distribución y uso.

La eventual SCSAL 1.0 no modifica ni reemplaza las licencias de terceros.

Los usuarios, colaboradores y distribuidores deberán respetar las condiciones correspondientes a las dependencias utilizadas por el proyecto.

Para identificar las dependencias instaladas, sus versiones y sus licencias, consulta:

- `package.json`;
- `package-lock.json`, si existe;
- la documentación oficial de cada dependencia;
- los archivos de licencia distribuidos con los paquetes correspondientes.

La lista de tecnologías de este documento no sustituye una auditoría completa de las dependencias del proyecto.

---

# Despliegue

Comandas Digitales puede desplegarse en plataformas compatibles con aplicaciones Next.js.

Una opción es [Vercel](https://vercel.com), aunque también pueden utilizarse otros proveedores compatibles con la arquitectura del proyecto.

### Procedimiento general

1. Sube el proyecto al repositorio de GitHub.
2. Importa el repositorio en la plataforma de despliegue.
3. Verifica la configuración de compilación y el comando de inicio.
4. Comprueba la versión de Node.js compatible.
5. Configura las variables de entorno necesarias, si existen.
6. Ejecuta el despliegue.
7. Comprueba el funcionamiento de la aplicación publicada.
8. Verifica el almacenamiento local, la gestión de cuentas y la impresión de tickets.

### Consideraciones de producción

- Los datos guardados en `localStorage` pertenecen al origen y al navegador utilizados.
- Los datos almacenados en un entorno de desarrollo no se transfieren automáticamente al dominio de producción.
- El cambio de dominio puede hacer que los registros guardados anteriormente no estén disponibles.
- La aplicación no sincroniza automáticamente las comandas entre dispositivos.
- La impresión depende del navegador, del sistema operativo y de la impresora seleccionada.
- La plataforma de alojamiento y sus servicios permanecen sujetos a sus propios términos y condiciones.

Para establecimientos que necesiten operar desde varios dispositivos con datos compartidos, deberá evaluarse una arquitectura con backend, persistencia centralizada y mecanismos de sincronización.

---

# Estado del proyecto

**Estado:** Por confirmar según la situación real del repositorio.

**Versión:** Por confirmar en la configuración o en los registros de versiones.

**Última actualización:** Consultar la fecha de la última actualización efectiva del proyecto.

Los valores definitivos deberán actualizarse cuando se confirme la versión publicada, el estado de mantenimiento y la fecha correspondiente.

---

# Roadmap

Las siguientes propuestas representan posibles líneas de evolución. No implican que estas funcionalidades estén implementadas actualmente.

- [ ] Mejorar las herramientas de exportación y respaldo de datos.
- [ ] Ampliar la personalización de los tickets de cocina y cuentas de clientes.
- [ ] Fortalecer las validaciones de comandas, cuentas y pagos.
- [ ] Mejorar las herramientas de consulta del historial.
- [ ] Ampliar las opciones de análisis de ventas.
- [ ] Evaluar una arquitectura backend para sincronizar información entre dispositivos.
- [ ] Evaluar mecanismos de autenticación y administración multiusuario.
- [ ] Investigar integraciones futuras con impresoras de cocina y servicios externos.
- [ ] Incorporar pruebas automatizadas para las operaciones comerciales principales.

Las prioridades podrán modificarse de acuerdo con las necesidades del proyecto y los recursos disponibles.

---

# Licencia

La información original del proyecto indica que **todavía no se ha especificado una licencia de software**.

Para mantener la coherencia con la plantilla corporativa de SatCore Solutions, se propone evaluar la adopción de:

## SatCore Solutions Attribution License — SCSAL 1.0

La licencia propuesta contempla condiciones para el uso, estudio, modificación, integración y redistribución del software, conforme a sus términos completos.

**Antes de publicar o distribuir el proyecto, es necesario:**

1. Incorporar el archivo `LICENSE` con el texto completo de la licencia elegida.
2. Verificar que la licencia corresponda efectivamente a la SCSAL 1.0.
3. Confirmar los permisos y obligaciones de atribución.
4. Revisar las licencias de las dependencias de terceros.
5. Actualizar las insignias y la documentación para reflejar el estado legal real.

Hasta que se incorpore y verifique la licencia, no debe afirmarse que el proyecto ya se distribuye formalmente bajo la SCSAL 1.0.

El archivo `LICENSE` deberá ser la referencia principal para conocer las condiciones legales de uso y distribución.

---

# Autoría

## SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

**Proyecto:** SatCore Solutions — Comandas Digitales

**Repositorio del proyecto:**

https://github.com/satcoresolutions/satcore-comandas-digitales

**GitHub:**

https://github.com/satcoresolutions

**Email:**

satcoresolutions@gmail.com

---

<div align="center">

**Desarrollado originalmente por SatCore Solutions.**

**© SatCore Solutions — Todos los derechos reservados, excepto los derechos que se concedan expresamente mediante la licencia aplicable.**

</div>

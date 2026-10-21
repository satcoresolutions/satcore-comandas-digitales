# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios, siguiendo una adaptación de _Keep a Changelog_.

---

## [Unreleased]

### Added

- Espacio reservado para nuevas funcionalidades y mejoras futuras.

### Changed

- Espacio reservado para cambios en funcionalidades existentes.

### Fixed

- Espacio reservado para correcciones de errores.

### Removed

- Espacio reservado para funcionalidades retiradas.

### Security

- Espacio reservado para mejoras de seguridad y privacidad.

---

## [1.1.0] - 2026-10-21

### Added

- Lanzamiento inicial de **Comandas digitales | SatCore Solutions**.
- Registro de comandas para consumo en mesa, para llevar y para domicilio.
- Selección de mesas, gestión de cuentas abiertas y asignación de productos.
- Menú organizado por categorías, búsqueda de productos y configuración de precios.
- Gestión de cantidades, notas individuales por producto y observaciones generales de las comandas.
- Generación de números consecutivos de comandas con reinicio diario.
- Tablero de cocina con tres estados: Pendiente, En preparación y Listo.
- Indicadores visuales de tiempo de espera, con alertas a los 15 y 25 minutos.
- Gestión de cuentas pendientes y registro de pagos en efectivo, transferencia o tarjeta.
- Configuración de propinas sugeridas, incluida la opción del 10 %, valores personalizados y ausencia de propina.
- Historial diario de ventas pagadas, total de propinas, ticket promedio, productos más solicitados y distribución por método de pago.
- Edición del nombre del restaurante, número de mesas, categorías y productos.
- Activación, desactivación y marcación de productos agotados.
- Impresión de comandas para cocina sin precios y cuentas para clientes con el detalle de productos y valores.
- Conservación local de datos mediante `localStorage` y recuperación de la información disponible en el navegador.
- Consulta del historial de comandas y conservación de información de los últimos 60 días, según las reglas de almacenamiento de la aplicación.
- Interfaz desarrollada con Next.js, React, TypeScript y CSS.
- Impresión mediante el diálogo de impresión del navegador, compatible con impresoras configuradas en el dispositivo.

### Changed

- Primera versión pública del proyecto.

### Fixed

- No se registran correcciones específicas para esta versión inicial.

### Removed

- No aplica en la versión inicial.

### Security

- Almacenamiento de información en el navegador mediante `localStorage`, sin requerir una base de datos remota.
- No se incorporan cuentas de usuario ni autenticación en esta versión.
- Se documenta que los datos dependen del navegador y dispositivo utilizados y que borrar los datos del navegador puede ocasionar su pérdida.
- Se advierte que no existe sincronización entre dispositivos ni copia de seguridad automática en la nube.

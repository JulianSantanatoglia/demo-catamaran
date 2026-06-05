# Catamarán Almería — Demo de reservas online

Demo funcional para presentar a clientes el sistema de reservas de excursiones en catamarán.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- React Router
- Vite

## Arrancar la demo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

## Qué incluye la demo

### Web pública
- **Inicio** — Hero, ventajas, experiencias destacadas, mapa de embarque
- **Experiencias** — Catálogo con 3 rutas (Cabo de Gata, Snorkel, Charter privado)
- **Detalle** — Descripción, precios adulto/niño, reserva directa
- **Reserva** — Calendario, franjas horarias, plazas, datos del cliente
- **Pago** — Formulario simulado Stripe (modo test)
- **Confirmación** — Referencia, resumen y email simulado
- **Sobre nosotros**, **FAQ**, **Contacto**
- **Aviso legal**, **Privacidad**, **Cookies**
- Botón flotante de **WhatsApp** y enlaces a redes sociales

### Sistema de reservas
- Calendario con días cerrados (lunes y pasados)
- Franjas horarias con plazas disponibles
- Precio por adulto y niño
- Estados: pendiente, confirmada, cancelada
- Persistencia en localStorage

### Panel admin (`/admin`)
- Contraseña demo: `admin123`
- Listado de reservas con cambio de estado
- Estadísticas básicas

## Flujo de prueba recomendado

1. Navega por la home y las experiencias
2. Pulsa **Reservar** y completa el flujo hasta el pago
3. Usa la tarjeta de prueba `4242 4242 4242 4242`
4. Revisa la confirmación
5. Entra en `/admin` con `admin123` para ver la reserva

## Notas para la venta

Esta demo es un **prototipo funcional** del producto final. En producción se integraría:
- Backend real con base de datos
- Stripe/PayPal en modo live
- Emails transaccionales (Resend, SendGrid, etc.)
- Panel admin con autenticación segura
- CMS para gestionar rutas, horarios y precios
# demo-catamaran

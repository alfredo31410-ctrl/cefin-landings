# Tracking de `primeros-clientes`

## Implementación encontrada y aplicada

- Se utiliza un único píxel de Meta: `733425513099672`, cargado por el `Script`
  de esta landing desde `lib/meta-pixel.ts`.
- `PageView` se envía una sola vez desde la inicialización protegida por
  `window.__cefinMetaPixelInitialized`.
- `ViewContent` se envía una sola vez por montaje de la landing, con el nombre
  del producto y el valor informativo de `$297 MXN`.
- Cada CTA de compra registra únicamente el evento personalizado
  `CheckoutButtonClick` cuando el usuario hace clic intencionalmente.
- La landing no envía `InitiateCheckout`, `Purchase`, eventos de pago pendiente,
  confirmaciones de venta ni eventos de servidor.
- No se agregó una API de Conversiones adicional. La integración Web/API de
  Hotmart permanece fuera de esta landing.

## Parámetros conservados hacia Hotmart

El script global conserva desde la URL y agrega al enlace de Hotmart los
siguientes parámetros: `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`, `fbclid`, `campaign_id`, `adset_id`, `ad_id`,
`placement`, `landing` y `producto`.

## Verificación estática

En esta ruta hay un solo `init` del píxel, un solo `PageView` protegido, un
solo `ViewContent` protegido y tres enlaces CTA que comparten un único handler.
No hay llamadas a `InitiateCheckout` ni `Purchase` en la landing.

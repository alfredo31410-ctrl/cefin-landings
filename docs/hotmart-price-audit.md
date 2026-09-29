# Auditoría de precios y checkouts de Hotmart

Fecha de auditoría: 2026-09-29.

Se localizaron 18 rutas públicas de venta con destino a `pay.hotmart.com` y ninguna con destino a `checkout.hotmart.com`. El conteo de precio corresponde a apariciones visibles del precio real de checkout; no incluye precios comparativos tachados ni valores individuales de bonos.

> El código alfanumérico de la ruta de checkout no es el `productUcode` de la API. Hotmart define `productUcode` como un UUID. La auditoría inicial no contenía esos UUID; posteriormente se descubrieron mediante la API y quedaron documentados en `docs/hotmart-product-discovery.md`. Los UUID públicos de Nómina y Master IA se incorporaron a la configuración; solo Nómina está habilitada para precio automático.

| Ruta pública | Archivo que contiene el checkout | URL base de checkout | Código visible | `off` | Precio actual | Moneda | Apariciones | Navegación | Riesgo |
| --- | --- | --- | --- | --- | ---: | --- | ---: | --- | --- |
| `/landings/academia-contabilidad/inscripcion` | `app/landings/academia-contabilidad/inscripcion/page.tsx` | `https://pay.hotmart.com/J105150710D` | `J105150710D` | `ciu6d3oe` | $1,987 | MXN | 4 | `<a>` nativo | Alto: Client Component y precio duplicado como constante y literales |
| `/landings/academia-contabilidad/live` | `app/landings/academia-contabilidad/live/page.tsx` | `https://pay.hotmart.com/K105150399H` | `K105150399H` | `9ho393qq` | $3,387 | MXN | 2 | `<a>` nativo | Medio: Client Component con configuración local |
| `/landings/asesor-fiscal-pf/inscripcion` | `app/landings/asesor-fiscal-pf/inscripcion/page.tsx` | `https://pay.hotmart.com/R105211548E` | `R105211548E` | `2fonqwf3` | $4,787 | MXN | 4 | `<a>` nativo | Alto: Client Component; precio también alimenta tracking |
| `/landings/auxiliar-contable/retargeting` | `app/landings/auxiliar-contable/retargeting/page.tsx` | `https://pay.hotmart.com/O105327844S` | `O105327844S` | `wnp9zod8` | $4,387 | MXN | 2 | `<a>` nativo | Medio: Client Component; conservar precio comparativo de $6,707 |
| `/landings/constructoras/inscripcion` | `app/landings/constructoras/inscripcion/page.tsx` | `https://pay.hotmart.com/M105254402Q` | `M105254402Q` | `hpfi29f1` | $4,787 | MXN | 1 | `<a>` nativo | Medio: Client Component y tracking numérico separado |
| `/landings/de-cero-a-estratega-fiscal/inscripcion` | `app/landings/de-cero-a-estratega-fiscal/inscripcion/config.ts` | `https://pay.hotmart.com/L107321129X` | `L107321129X` | `hs9wp3t0` | No visible | MXN | 0 | `<a>` nativo en `tracking.tsx` | Bajo para la arquitectura; no hay precio visible que migrar |
| `/landings/despierta-tu-potencial-contable/inscripcion` | `app/landings/despierta-tu-potencial-contable/config.ts` | `https://pay.hotmart.com/L106443767M` | `L106443767M` | `kmo127nh` | $4,787 | MXN | 2 | `<a>` nativo | Alto: configuración compartida con el embudo gratuito y Client Component de venta |
| `/landings/ia-contadores/ecosistema` | `app/landings/ia-contadores/ecosistema/page.tsx` | `https://pay.hotmart.com/V106566733D` | `V106566733D` | `mxynkrmw` | $12,387 | MXN | 2 | `<a>` nativo | Alto: Client Component con muchos valores estáticos de bonos y precio comparativo |
| `/landings/ia-contadores/inscripcion` | `app/landings/ia-contadores/inscripcion/page.tsx` | `https://pay.hotmart.com/S107816962P` | `S107816962P` | `row94rfv` | $587 | MXN | 3 | `<a>` nativo | Alto: Client Component, precio en tracking y cambio local preexistente |
| `/landings/ia-contadores/retargeting` | `app/landings/ia-contadores/retargeting/page.tsx` | `https://pay.hotmart.com/I105503339V` | `I105503339V` | `7l62yrr2` | $3,387 | MXN | 4 | `<a>` nativo | Alto: precio real mezclado con copy y valor comparativo de $22,922 |
| `/landings/low-tickets/cuentas-contables` | `app/landings/low-tickets/cuentas-contables/page.tsx` | `https://pay.hotmart.com/J106299049Q` | `J106299049Q` | `rf1ez41t` | $297 | MXN | 4 | `<a>` nativo | Alto: Client Component, FAQ y múltiples literales |
| `/landings/low-tickets/honorarios-contables` | `app/landings/low-tickets/honorarios-contables/page.tsx` | `https://pay.hotmart.com/D106297950M` | `D106297950M` | `y8s212iw` | $297 | MXN | 3 | `<a>` nativo | Alto: Client Component, FAQ y múltiples literales |
| `/landings/low-tickets/primeros-clientes` | `app/landings/low-tickets/primeros-clientes/page.tsx` | `https://pay.hotmart.com/O105077745K` | `O105077745K` | `60uw7x37` | $297 | MXN | 5 | `<a>` nativo | Alto: Client Component, FAQ y múltiples literales |
| `/landings/low-tickets/servicios-contables` | `app/landings/low-tickets/servicios-contables/page.tsx` | `https://pay.hotmart.com/C106298773X` | `C106298773X` | `lgv68uq8` | $197 | MXN | 4 | `<a>` nativo | Alto: Client Component, FAQ y múltiples literales |
| `/landings/nif/inscripcion` | `app/landings/nif/inscripcion/page.tsx` | `https://pay.hotmart.com/Y105942158X` | `Y105942158X` | `57a4x11n` | $9,987 | MXN | 1 | `<a>` nativo | Medio: Client Component; precio también alimenta tracking |
| `/landings/nif/taller` | `app/landings/nif/taller/page.tsx` | `https://pay.hotmart.com/G106884758Y` | `G106884758Y` | `anbe55e7` | $587 | MXN | 3 | `next/link` externo existente | Medio: Server Component, pero el precio está repetido en FAQ y copy |
| `/landings/nomina/inscripcion` | `app/landings/nomina/inscripcion/page.tsx` | `https://pay.hotmart.com/F107061566L` | `F107061566L` | `rk750909` | $5,987 | MXN | 2 | `<a>` nativo | Bajo: Server Component y solo dos apariciones (piloto) |
| `/landings/restaurantes/inscripcion` | `app/landings/restaurantes/inscripcion/restaurantes-inscripcion-tracking.tsx` | `https://pay.hotmart.com/X106026238J` | `X106026238J` | Ausente | $3,687 | MXN | 3 | `<a>` nativo encapsulado | Alto: no existe `off`, por lo que no se puede seleccionar una oferta exacta |

## Precios y configuración compartida

- `despierta-tu-potencial-contable/config.ts` comparte checkout y precio con su página de inscripción; la landing principal es un registro gratuito y no fue modificada.
- `de-cero-a-estratega-fiscal/inscripcion/config.ts` comparte el checkout con `inscripcion-landing.tsx` y `tracking.tsx`, pero actualmente no muestra un precio.
- Restaurantes divide la presentación en `page.tsx` y el enlace/tracking en `restaurantes-inscripcion-tracking.tsx`.
- Las demás rutas mantienen precio, checkout y tracking dentro de su propia página, con componentes CTA locales en algunos casos.
- Los precios comparativos detectados (`oldPrice`, `OLD_PRICE`, `VALUE`, bonos y valores de referencia) deben permanecer estáticos durante la migración masiva.

## Exclusiones aplicadas

No se incluyeron landings de captación gratuita, formularios, rutas de WhatsApp, páginas de gracias, APIs, páginas informativas ni enlaces de Hotmart que no fueran checkout. La ruta gratuita de `despierta-tu-potencial-contable` solo aparece indirectamente por compartir configuración; únicamente su subruta `/inscripcion` forma parte del inventario de venta.

## Variables y secretos

- `.env.local`, `.env.production` y equivalentes coinciden con `.env*` en `.gitignore`.
- `.env.example` está permitido explícitamente y solo declara nombres vacíos.
- `git ls-files` no encontró archivos `.env`, credenciales, secretos ni llaves privadas versionados.
- `.env.production.check` contiene nombres de variables sensibles, está ignorado y no está versionado. No se leyó ni registró ningún valor.

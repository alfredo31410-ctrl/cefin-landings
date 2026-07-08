# Tracking de UTMs para Hotmart/HotLeads

Las landings conservan automaticamente estos parametros cuando llegan en la URL:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Ejemplo recomendado para Meta Ads:

```text
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

## Como funciona

1. Al cargar la landing, el componente global `HotmartUtmTracking` lee las UTMs de la URL actual.
2. Si encuentra UTMs, las guarda en `sessionStorage` con la llave `cefinHotmartUtmParams`.
3. Cuando el usuario hace clic en un enlace de Hotmart, se construye una URL final con esas UTMs.
4. Si el checkout ya tiene parametros, las UTMs se agregan como parametros adicionales.
5. Si el checkout no tiene parametros, se agregan como la primera query string.
6. El `href` visible no se modifica antes del clic para evitar errores de hidratacion en React.

## Validacion manual

1. Abre una landing de venta directa con UTMs de prueba. Ejemplo:

```text
http://localhost:3000/landings/low-tickets/cuentas-contables?utm_source=meta&utm_medium=paid&utm_campaign=test_campaign&utm_content=test_ad&utm_term=test_adset
```

2. Haz clic en cualquier boton de compra que apunte a Hotmart.
3. En la URL final de Hotmart, confirma que conserva los parametros originales del checkout y ademas:

```text
utm_source=meta&utm_medium=paid&utm_campaign=test_campaign&utm_content=test_ad&utm_term=test_adset
```

4. Si inspeccionas el `href` antes del clic puede verse sin UTMs; lo importante es la URL final abierta despues del clic.

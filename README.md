# Portalia · vista previa del sitio

Sitio compilado de **Portalia** (viernes 4 de diciembre de 2026, Hotel Misión Pachuca) y de **Crea tu Año 2027** (taller de GyMind, sábado 5 de diciembre) para revisión en GitHub Pages.

Es una **vista previa estática**:

- El programa, el directorio de ponentes, los paquetes y el acceso premium salen de una copia de los datos; lo que no está confirmado dice «Por confirmar».
- El registro, el pase con QR y las compras se **simulan en el navegador** de quien mira: lo que se escribe se queda en ese navegador, no se envía a ningún servidor y no se cobra nada. En lugar de Stripe se abre una página de pago simulada y rotulada como tal.
- `pase?c=demo` abre un pase de ejemplo.

El sitio real se publicará en `portaliamx.com` con su API y Stripe Checkout. El código fuente vive en repositorios privados de Code Vector; este repositorio solo contiene el resultado compilado, que se regenera con `pnpm build:preview` desde `portalia-web`.

Desarrollado por [Code Vector](https://codevector.com.mx).

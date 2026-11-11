# Portalia · vista previa del sitio

Sitio compilado de **Portalia** (viernes 4 de diciembre de 2026, Hotel Misión Pachuca) y de **Crea tu Año 2027** (taller de GyMind, sábado 5 de diciembre) para revisión en GitHub Pages.

Es una **vista previa estática**:

- El programa, el directorio de ponentes, los paquetes y el acceso premium salen de una copia de los datos. Donde el dato real aún no existe, la vista previa muestra **contenido de ejemplo** (horarios, títulos, personas ficticias con monograma y contactos en example.com, precio y cupo del premium) para que se entienda cada sección; el sitio real no lo usa.
- El registro, la cuenta (contraseña, entrar, cerrar sesión, «olvidé mi contraseña»), el pase con QR y las compras se **simulan en el navegador** de quien mira: lo que se escribe se queda en ese navegador, no se envía a ningún servidor y no se cobra nada. En lugar de Stripe se abre una página de pago simulada y rotulada como tal, y en lugar del correo de restablecimiento la página muestra la liga.
- Las fotografías de ambiente son de [Pixabay](https://pixabay.com/) (licencia de contenido de Pixabay); los créditos están en `img/creditos.json`.
- `pase?c=demo` abre un pase de ejemplo.

El sitio real se publicará en `portaliamx.com` con su API y Stripe Checkout. El código fuente vive en repositorios privados de Code Vector; este repositorio solo contiene el resultado compilado, que se regenera con `pnpm build:preview` desde `portalia-web`.

Desarrollado por [Code Vector](https://codevector.com.mx).

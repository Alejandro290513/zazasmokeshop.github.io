# 🔥 ZAZA SMOKE SHOP — Catálogo Web

Catálogo interactivo para ZAZA Smoke Shop construido con **Astro + Tailwind CSS**.

## 🚀 Deploy en GitHub Pages

1. Sube este repositorio a GitHub
2. Ve a **Settings → Pages → Source → GitHub Actions**
3. El workflow `.github/workflows/deploy.yml` desplegará automáticamente

## 📱 Funcionalidades

- Catálogo completo organizado por categorías
- Carrito de compras interactivo con slide-up panel
- Redirección a WhatsApp con detalle completo del pedido
- Diseño responsive (móvil + escritorio)
- Animaciones bioluminiscentes inspiradas en el PDF

## ⚙️ Configuración

En `src/pages/index.astro`, cambia el número de WhatsApp:
```js
const WA_NUMBER = "573000000000"; // Reemplaza con tu número
```

En `astro.config.mjs`, cambia la URL del sitio:
```js
site: 'https://TUUSUARIO.github.io',
base: '/NOMBRE-REPO/', // Si no es el repo principal
```

## 🛠 Desarrollo local

```bash
npm install
npm run dev
```

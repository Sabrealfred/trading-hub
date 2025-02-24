
# Crypto Trading Hub

Una plataforma moderna de trading de criptomonedas construida con React, Vite y TailwindCSS.

## 🚀 Requisitos Previos

- Node.js (versión 16 o superior)
- Git
- npm o pnpm

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-de-tu-repositorio>
cd crypto-trading-hub
```

2. Instala las dependencias:
```bash
npm install
# o si usas pnpm
pnpm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:8080`

## 🏗️ Construcción para Producción

Para construir la aplicación para producción:

```bash
npm run build
# o
pnpm build
```

Los archivos de distribución se generarán en el directorio `dist/`.

## 🌟 Características

- 📊 Gráficos de trading en tiempo real
- 💰 Gestión de portafolio
- 📈 Libro de órdenes
- 🔔 Alertas de precio
- 💼 Historial de órdenes
- 📱 Diseño responsive

## ⚙️ Configuración

La aplicación utiliza varios componentes principales:

- `CryptoChart`: Visualización de gráficos de trading
- `PortfolioCard`: Gestión de portafolio
- `OrderBook`: Libro de órdenes en tiempo real
- `TradingForm`: Formulario para realizar operaciones
- `PriceAlerts`: Sistema de alertas de precio

## 🛠️ Tecnologías Utilizadas

- React
- TypeScript
- Vite
- TailwindCSS
- Shadcn/UI
- React Query
- Recharts
- Lucide Icons

## ⚠️ Importante

Para mantener la funcionalidad completa al desplegar en GitHub, asegúrate de que el archivo `index.html` mantenga el siguiente orden en los scripts:

```html
<body>
  <div id="root"></div>
  <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

## 📄 Licencia

MIT


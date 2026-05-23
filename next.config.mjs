/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включает экспорт статического HTML
  images: {
    unoptimized: true,  // GitHub Pages не поддерживает оптимизацию изображений Next.js
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Yakutia-map-site' : undefined,
  trailingSlash: true,  // Рекомендуется для GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
   allowedDevOrigins: [
    '192.168.0.105',     // IP вашего iPhone (замените на актуальный)
    '*.local',           // Для macOS .local адресов
    '*.local-ip.com',    // Альтернативный вариант для локальных IP
  ],
}

export default nextConfig

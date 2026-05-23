/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включает экспорт статического HTML
  basePath: '/Yakutia-map-site', // Указывает имя вашего репозитория для путей страниц
  images: {
    unoptimized: true,  // GitHub Pages не поддерживает оптимизацию изображений Next.js
  },
  trailingSlash: true,  // Рекомендуется для GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включает экспорт статического HTML
  basePath: '/site-test-map', // Указывает имя вашего репозитория для путей страниц
  images: {
    unoptimized: true,  // GitHub Pages не поддерживает оптимизацию изображений Next.js
  },
  trailingSlash: true,  // Рекомендуется для GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

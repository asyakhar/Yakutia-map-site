/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 Включает экспорт статического HTML
  images: {
    unoptimized: true,  // GitHub Pages не поддерживает оптимизацию изображений Next.js
  },
  trailingSlash: true,  // Рекомендуется для GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
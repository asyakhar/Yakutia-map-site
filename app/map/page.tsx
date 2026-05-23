"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation" // Используем Next.js роутер

const AccessibleYakutiaMap = dynamic(
  () => import("@/components/accessible-yakutia-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F3E8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4ECDC4] border-t-transparent" />
          <p className="text-lg text-[#2C3E50]">Загрузка карты...</p>
        </div>
      </div>
    ),
  }
)

export default function MapPage() {
  const router = useRouter()

  // Функция должна принимать string, а не Dispatch
  const handlePlaceSelect = (id: string) => {
    router.push(`/place/${id}`)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F7F3E8]">
      <div className="h-full w-full">
        {/* Передаем только совместимые пропсы */}
        <AccessibleYakutiaMap onPlaceSelect={handlePlaceSelect} />
      </div>
    </div>
  )
}
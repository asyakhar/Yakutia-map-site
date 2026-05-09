"use client"

import { useEffect, useState, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Filter,
  X,
  RotateCcw,
  Phone,
  Globe,
  MapPin,
  Accessibility,
  Eye,
  Ear,
  Utensils,
  Heart,
  Brain,
  Wind,
  Users,
  Sparkles,
  Hospital,
  ChevronDown,
  ChevronUp,
  Building2,
  Hotel,
  UtensilsCrossed,
  Coffee,
  TreePine,
  Theater,
  Stethoscope,
  Flower2,
  Landmark,
  ShoppingBag,
  Dumbbell,
  Mountain,
  Palette,
  Ticket,
  GraduationCap,
  Menu,
} from "lucide-react"

// Types
interface MapObject {
  id: string
  name: string
  category: string
  layers: string[]
  coordinates: [number, number]
  properties: Record<string, boolean>
  description: string
  photos: string[]
  contacts: {
    phone?: string
    website?: string
  }
}

// Configuration
const CONFIG = {
  mapCenter: [62.0355, 129.6755] as [number, number],
  defaultZoom: 11,
  minZoom: 5,
  maxZoom: 18,
}

// Filter colors - modern palette
const FILTER_COLORS: Record<string, string> = {
  inclusive: "#3b82f6",
  vision_impaired: "#8b5cf6",
  hearing_impaired: "#ec4899",
  deaf_mute: "#f97316",
  dietary: "#22c55e",
  cardiovascular: "#ef4444",
  mobility: "#06b6d4",
  mental: "#6366f1",
  respiratory: "#14b8a6",
  family: "#eab308",
  ethnomedicine: "#84cc16",
  health: "#0ea5e9",
}

// Filter definitions
const CATEGORY_FILTERS = [
  { id: "inclusive", name: "Доступная среда", icon: Accessibility },
  { id: "vision_impaired", name: "Нарушения зрения", icon: Eye },
  { id: "hearing_impaired", name: "Нарушения слуха", icon: Ear },
  { id: "deaf_mute", name: "Глухонемые", icon: Ear },
  { id: "dietary", name: "Питание", icon: Utensils },
  { id: "cardiovascular", name: "Сердечно-сосудистые", icon: Heart },
  { id: "mobility", name: "Подвижность", icon: Accessibility },
  { id: "mental", name: "Ментальные особенности", icon: Brain },
  { id: "respiratory", name: "Респираторные", icon: Wind },
  { id: "family", name: "Семьи с детьми", icon: Users },
  { id: "ethnomedicine", name: "Народная медицина", icon: Sparkles },
  { id: "health", name: "Здоровье", icon: Hospital },
]

// Category translations and icons
const CATEGORY_CONFIG: Record<string, { name: string; icon: typeof Building2 }> = {
  museum: { name: "Музей", icon: Building2 },
  hotel: { name: "Гостиница", icon: Hotel },
  restaurant: { name: "Ресторан", icon: UtensilsCrossed },
  cafe: { name: "Кафе", icon: Coffee },
  park: { name: "Парк", icon: TreePine },
  theater: { name: "Театр", icon: Theater },
  medical: { name: "Медицина", icon: Stethoscope },
  spa: { name: "СПА/Оздоровление", icon: Flower2 },
  monument: { name: "Памятник", icon: Landmark },
  shopping: { name: "Торговый центр", icon: ShoppingBag },
  sports: { name: "Спорт", icon: Dumbbell },
  nature: { name: "Природа", icon: Mountain },
  culture: { name: "Культура", icon: Palette },
  entertainment: { name: "Развлечения", icon: Ticket },
  education: { name: "Образование", icon: GraduationCap },
}

// Feature translations
const FEATURE_NAMES: Record<string, string> = {
  ramp: "Пандус",
  wide_doors: "Широкие двери",
  accessible_wc: "Доступный туалет",
  elevator: "Лифт",
  handrail: "Поручни",
  low_curbs: "Низкие бордюры",
  braille: "Шрифт Брайля",
  audio_description: "Аудиоописание",
  tactile_exhibits: "Тактильные экспонаты",
  induction_loop: "Индукционная петля",
  visual_display: "Визуальные табло",
  sign_language_staff: "Персонал со знанием ЖЯ",
  sign_language_guide: "Экскурсовод с ЖЯ",
  visual_menu: "Визуальное меню",
  text_chat: "Текстовый чат",
  diabetic_menu: "Диабетическое меню",
  gluten_free: "Безглютеновое меню",
  exact_ingredients: "Точный состав блюд",
  adapted_national: "Адаптированные блюда",
  near_medical: "Рядом с медучреждением",
  cardio_diet: "Кардио-диета",
  quiet_zone: "Тихая зона",
  sensory_friendly: "Сенсорно-дружественная",
  pictogram_nav: "Пиктограммы",
  quiet_hours: "Тихие часы",
  air_quality_good: "Чистый воздух",
  air_purifier: "Очиститель воздуха",
  clean_zone: "Чистая зона",
  changing_table: "Пеленальный столик",
  kids_menu: "Детское меню",
  mother_child_room: "Комната матери",
  accessible_play: "Игровая зона",
  pediatrician: "Педиатр рядом",
  staff_assist: "Помощь персонала",
  low_frontdesk: "Низкая стойка",
  thermal_spring: "Термальный источник",
  mud_therapy: "Грязелечение",
  diagnostic_center: "Диагностика",
  ethno_herbs: "Травничество",
  ethno_rituals: "Ритуалы исцеления",
  ethno_bonesetter: "Костоправ",
  ethno_banya: "Якутская баня",
}

// Accessibility filters
const ACCESSIBILITY_FILTERS = [
  { id: "ramp", name: "Пандус", group: "mobility" },
  { id: "wide_doors", name: "Широкие двери", group: "mobility" },
  { id: "accessible_wc", name: "Доступный туалет", group: "mobility" },
  { id: "elevator", name: "Лифт", group: "mobility" },
  { id: "handrail", name: "Поручни", group: "mobility" },
  { id: "braille", name: "Шрифт Брайля", group: "vision" },
  { id: "audio_description", name: "Аудиоописание", group: "vision" },
  { id: "tactile_exhibits", name: "Тактильные экспонаты", group: "vision" },
  { id: "induction_loop", name: "Индукционная петля", group: "hearing" },
  { id: "visual_display", name: "Визуальные табло", group: "hearing" },
  { id: "sign_language_staff", name: "Персонал со знанием ЖЯ", group: "deaf_mute" },
  { id: "visual_menu", name: "Визуальное меню", group: "deaf_mute" },
  { id: "diabetic_menu", name: "Диабетическое меню", group: "dietary" },
  { id: "gluten_free", name: "Безглютеновое меню", group: "dietary" },
  { id: "cardio_diet", name: "Кардио-диета", group: "cardiovascular" },
  { id: "near_medical", name: "Рядом с медучреждением", group: "cardiovascular" },
  { id: "quiet_zone", name: "Тихая зона", group: "mental" },
  { id: "sensory_friendly", name: "Сенсорно-дружественная", group: "mental" },
  { id: "air_quality_good", name: "Чистый воздух", group: "respiratory" },
  { id: "air_purifier", name: "Очиститель воздуха", group: "respiratory" },
  { id: "changing_table", name: "Пеленальный столик", group: "family" },
  { id: "kids_menu", name: "Детское меню", group: "family" },
  { id: "mother_child_room", name: "Комната матери", group: "family" },
]

// Create custom marker icon with SVG instead of emoji
function createMarkerIcon(color: string, IconComponent: typeof Building2) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`
  
  return L.divIcon({
    className: "custom-marker-wrapper",
    html: `<div style="
      width: 36px;
      height: 36px;
      background: ${color};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px ${color}80, 0 2px 4px rgba(0,0,0,0.15);
      border: 2.5px solid white;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  })
}

// Create marker icon based on category
function getCategoryMarkerIcon(category: string, color: string) {
  const iconPaths: Record<string, string> = {
    museum: '<path d="M3 22V8l9-6 9 6v14"/><path d="M6 22V11h4v11"/><path d="M14 22V11h4v11"/>',
    hotel: '<path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    restaurant: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    cafe: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>',
    park: '<path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M19 10v.2A3 3 0 0 1 17.9 16v0H14v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M16 16v6"/>',
    theater: '<path d="M2 10s3-3 3-8"/><path d="M22 10s-3-3-3-8"/><path d="M10 2c0 4.4-3.6 8-8 8"/><path d="M14 2c0 4.4 3.6 8 8 8"/><path d="M2 10s2 2 2 5"/><path d="M22 10s-2 2-2 5"/><path d="M8 15h8"/><path d="M2 22v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1"/>',
    medical: '<path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/>',
    spa: '<path d="M12 22c5.5-2.5 7-8.5 7-12a5 5 0 0 0-5-5c-2 0-3.5 1.5-4 3-.5-1.5-2-3-4-3a5 5 0 0 0-5 5c0 3.5 1.5 9.5 7 12l2-1 2 1z"/>',
    monument: '<path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    sports: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/><path d="M2 12h20"/>',
    nature: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    culture: '<path d="M12 2v4"/><path d="m6.8 14-3.5 2"/><path d="m20.7 7-3.5 2"/><path d="M6.8 10 3.3 8"/><path d="m20.7 17-3.5-2"/><circle cx="12" cy="12" r="6"/>',
    entertainment: '<rect width="20" height="12" x="2" y="6" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M18 12h.01"/>',
    education: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  }
  
  const iconPath = iconPaths[category] || '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>'
  
  return L.divIcon({
    className: "custom-marker-wrapper",
    html: `<div style="
      width: 36px;
      height: 36px;
      background: ${color};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px ${color}80, 0 2px 4px rgba(0,0,0,0.15);
      border: 2.5px solid white;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  })
}

// Map bounds controller
function MapBoundsController({ objects }: { objects: MapObject[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (objects.length > 0) {
      const bounds = L.latLngBounds(objects.map(obj => obj.coordinates))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
    }
  }, [objects, map])
  
  return null
}

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})
export default function AccessibleYakutiaMap() {
  const [objects, setObjects] = useState<MapObject[]>([])
  const [activeLayers, setActiveLayers] = useState<string[]>(["inclusive"])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<"categories" | "accessibility" | null>("categories")

  // Load data
  useEffect(() => {
    // Для локальной разработки: '', для GitHub Pages: '/site-test-map'
    const basePath = process.env.NODE_ENV === 'production' 
      ? '/site-test-map'  // GitHub Pages
      : ''                // localhost
      
    fetch(`${basePath}/data/objects.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setObjects(data))
      .catch((err) => console.error("Error loading data:", err))
  }, [])

  // Toggle layer
  const toggleLayer = useCallback((id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    )
  }, [])

  // Toggle filter
  const toggleFilter = useCallback((id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setActiveLayers(["inclusive"])
    setActiveFilters([])
  }, [])

  // Filter objects
  const filteredObjects = objects.filter((obj) => {
    const hasActiveLayer = obj.layers.some((layer) => activeLayers.includes(layer))
    if (!hasActiveLayer) return false

    if (activeFilters.length > 0) {
      return activeFilters.every((filter) => obj.properties[filter] === true)
    }

    return true
  })

  // Get marker color
  const getMarkerColor = useCallback((obj: MapObject) => {
    for (const layer of obj.layers) {
      if (activeLayers.includes(layer) && FILTER_COLORS[layer]) {
        return FILTER_COLORS[layer]
      }
    }
    return FILTER_COLORS.inclusive
  }, [activeLayers])

  // Active filter count
  const activeFilterCount = activeLayers.length + activeFilters.length - 1

  // Sidebar content component
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Фильтры</h2>
            <p className="text-xs text-muted-foreground">
              Найдено: {filteredObjects.length} мест
            </p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Category Filters Section */}
          <div className="rounded-xl border border-border bg-background/50 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === "categories" ? null : "categories")}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">По категориям</span>
                <Badge variant="secondary" className="text-xs">
                  {activeLayers.length}
                </Badge>
              </div>
              {expandedSection === "categories" ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === "categories" && (
              <div className="border-t border-border p-3 space-y-1">
                {CATEGORY_FILTERS.map((filter) => {
                  const IconComponent = filter.icon
                  const isActive = activeLayers.includes(filter.id)
                  return (
                    <button
                      key={filter.id}
                      onClick={() => toggleLayer(filter.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                          isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                        style={isActive ? { backgroundColor: FILTER_COLORS[filter.id] } : {}}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{filter.name}</span>
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-primary" style={{ backgroundColor: FILTER_COLORS[filter.id] }} />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Accessibility Filters Section */}
          <div className="rounded-xl border border-border bg-background/50 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === "accessibility" ? null : "accessibility")}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">По удобствам</span>
                <Badge variant="secondary" className="text-xs">
                  {activeFilters.length}
                </Badge>
              </div>
              {expandedSection === "accessibility" ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === "accessibility" && (
              <div className="border-t border-border p-3 space-y-1">
                {ACCESSIBILITY_FILTERS.map((filter) => {
                  const isActive = activeFilters.includes(filter.id)
                  return (
                    <label
                      key={filter.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <Checkbox
                        checked={isActive}
                        onCheckedChange={() => toggleFilter(filter.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-sm">{filter.name}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4 bg-background/80 backdrop-blur-sm">
        <Button 
          variant="outline" 
          className="w-full gap-2 h-11" 
          onClick={resetFilters}
        >
          <RotateCcw className="h-4 w-4" />
          Сбросить все фильтры
        </Button>
      </div>
    </div>
  )

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1001] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-[320px] z-[1002] transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <SidebarContent onClose={() => setMobileMenuOpen(false)} />
      </div>

      {/* Mobile Header */}
      <header className="absolute left-0 right-0 top-0 z-[1000] lg:hidden">
        <div className="flex items-center justify-between bg-card/95 px-4 py-3 shadow-lg backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Доступная Якутия</h1>
              <p className="text-xs text-muted-foreground">{filteredObjects.length} мест на карте</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="relative h-11 w-11"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-full w-80 flex-shrink-0 flex-col border-r border-border shadow-xl">
        {/* Desktop Header */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary/90 px-5 py-5 text-primary-foreground">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Доступная Якутия</h1>
            <p className="text-sm text-primary-foreground/80">Инклюзивный навигатор</p>
          </div>
        </div>
        <SidebarContent />
      </aside>

      {/* Map */}
      <main className="relative flex-1 pt-[72px] lg:pt-0">
        <MapContainer
          center={CONFIG.mapCenter}
          zoom={CONFIG.defaultZoom}
          minZoom={CONFIG.minZoom}
          maxZoom={CONFIG.maxZoom}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredObjects.map((obj) => (
            <Marker
              key={obj.id}
              position={obj.coordinates}
              icon={getCategoryMarkerIcon(obj.category, getMarkerColor(obj))}
            >
              <Popup maxWidth={320} className="custom-popup">
                <Card className="border-0 shadow-none overflow-hidden -m-3">
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${obj.id}/320/160`}
                      alt={obj.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge 
                        className="mb-2 text-white border-white/30"
                        style={{ backgroundColor: getMarkerColor(obj) }}
                      >
                        {CATEGORY_CONFIG[obj.category]?.name || obj.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-white drop-shadow-lg">{obj.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(obj.properties)
                        .filter(([, value]) => value === true)
                        .slice(0, 5)
                        .map(([key]) => (
                          <Badge key={key} variant="secondary" className="text-xs font-normal">
                            {FEATURE_NAMES[key] || key}
                          </Badge>
                        ))}
                    </div>

                    {/* Contacts */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                      {obj.contacts.phone && (
                        <a
                          href={`tel:${obj.contacts.phone}`}
                          className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                        >
                          <Phone className="h-4 w-4" />
                          {obj.contacts.phone}
                        </a>
                      )}
                      {obj.contacts.website && (
                        <a
                          href={obj.contacts.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                        >
                          <Globe className="h-4 w-4" />
                          Перейти на сайт
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </Popup>
            </Marker>
          ))}

          {filteredObjects.length > 0 && <MapBoundsController objects={filteredObjects} />}
        </MapContainer>

        {/* Floating Stats Badge - Mobile Only */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:hidden">
          <Badge 
            variant="secondary" 
            className="px-4 py-2 text-sm font-medium shadow-lg bg-card/95 backdrop-blur-md border border-border"
          >
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {filteredObjects.length} мест на карте
          </Badge>
        </div>
      </main>
    </div>
  )
}

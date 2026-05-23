'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Phone,
  Globe,
  Navigation,
  Accessibility,
  Eye,
  Ear,
  Utensils,
  Check,
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Типы
interface MapObject {
  id: string;
  name: string;
  category: string;
  layers: string[];
  coordinates: [number, number];
  properties: Record<string, boolean>;
  description: string;
  photos: string[];
  contacts: {
    phone?: string;
    website?: string;
  };
}

// Конфигурация категорий
const CATEGORY_CONFIG: Record<string, { name: string; icon: typeof Building2; color: string }> = {
  museum: { name: "Музей", icon: Building2, color: "#8b5cf6" },
  hotel: { name: "Гостиница", icon: Hotel, color: "#3b82f6" },
  restaurant: { name: "Ресторан", icon: UtensilsCrossed, color: "#22c55e" },
  cafe: { name: "Кафе", icon: Coffee, color: "#f97316" },
  park: { name: "Парк", icon: TreePine, color: "#14b8a6" },
  theater: { name: "Театр", icon: Theater, color: "#ec4899" },
  medical: { name: "Медицина", icon: Stethoscope, color: "#ef4444" },
  spa: { name: "СПА/Оздоровление", icon: Flower2, color: "#06b6d4" },
  monument: { name: "Памятник", icon: Landmark, color: "#6366f1" },
  shopping: { name: "Торговый центр", icon: ShoppingBag, color: "#eab308" },
  sports: { name: "Спорт", icon: Dumbbell, color: "#84cc16" },
  nature: { name: "Природа", icon: Mountain, color: "#0ea5e9" },
  culture: { name: "Культура", icon: Palette, color: "#f43f5e" },
  entertainment: { name: "Развлечения", icon: Ticket, color: "#d946ef" },
  education: { name: "Образование", icon: GraduationCap, color: "#0284c7" },
};

// Названия особенностей
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
};

// ✅ КОМПОНЕНТ ПРИНИМАЕТ id КАК ПРОП
export default function PlaceDetailClient({ id }: { id: string }) {
  const [place, setPlace] = useState<MapObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = process.env.NODE_ENV === 'production' 
      ? '/Yakutia-map-site'
      : ''

    fetch(`${basePath}/data/objects.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: MapObject[]) => {
        const found = data.find((obj) => obj.id === id);
        setPlace(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3E8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-lg text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3E8]">
        <div className="text-center">
          <h2 className="text-2xl text-[#2C3E50] mb-4">Место не найдено</h2>
          <Link href="/map">
            <Button className="bg-[#4ECDC4] hover:bg-[#3DBDB5]">
              Вернуться к карте
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryConfig = CATEGORY_CONFIG[place.category] || CATEGORY_CONFIG.museum;
  const CategoryIcon = categoryConfig.icon;

  const availableFeatures = Object.entries(place.properties)
    .filter(([, value]) => value === true)
    .map(([key]) => ({ key, name: FEATURE_NAMES[key] || key }));

  const mobilityFeatures = availableFeatures.filter(f => 
    ["ramp", "wide_doors", "accessible_wc", "elevator", "handrail", "low_curbs", "staff_assist", "low_frontdesk"].includes(f.key)
  );
  const visionFeatures = availableFeatures.filter(f => 
    ["braille", "audio_description", "tactile_exhibits"].includes(f.key)
  );
  const hearingFeatures = availableFeatures.filter(f => 
    ["induction_loop", "visual_display", "sign_language_staff", "sign_language_guide", "visual_menu", "text_chat"].includes(f.key)
  );
  const dietaryFeatures = availableFeatures.filter(f => 
    ["diabetic_menu", "gluten_free", "exact_ingredients", "adapted_national", "cardio_diet", "kids_menu"].includes(f.key)
  );
  const healthFeatures = availableFeatures.filter(f => 
    ["near_medical", "quiet_zone", "air_quality_good", "air_purifier", "clean_zone", "thermal_spring", "mud_therapy", "diagnostic_center", "ethno_herbs", "ethno_rituals", "ethno_bonesetter", "ethno_banya"].includes(f.key)
  );
  const familyFeatures = availableFeatures.filter(f => 
    ["changing_table", "mother_child_room", "accessible_play", "pediatrician"].includes(f.key)
  );

  return (
    <div className="min-h-screen bg-[#F7F3E8]">
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/map">
            <Button variant="ghost" className="gap-2 text-[#2C3E50] hover:text-[#1B3A5C]">
              <ArrowLeft className="size-5" />
              <span className="hidden sm:inline">На карту</span>
            </Button>
          </Link>
          <h1 className="text-lg md:text-xl text-[#2C3E50] font-semibold flex-1 text-center px-4 line-clamp-1">
            {place.name}
          </h1>
          <Button 
            variant="ghost" 
            className="gap-2 text-[#2C3E50]" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: place.name, url: window.location.href })
              }
            }}
          >
            <Share2 className="size-5" />
            <span className="hidden sm:inline">Поделиться</span>
          </Button>
        </div>
      </header>

      <div className="relative h-64 md:h-96">
        <img
          src={`https://picsum.photos/seed/${place.id}/1200/400`}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge 
            className="mb-2 text-white border-white/30 px-3 py-1 text-sm"
            style={{ backgroundColor: categoryConfig.color }}
          >
            <CategoryIcon className="size-3 mr-1" />
            {categoryConfig.name}
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-3">{place.name}</h1>
          <p className="text-[#2C3E50]/80 leading-relaxed">{place.description}</p>
        </div>

        <Card className="mb-6 p-6 bg-white border-0 shadow-md">
          <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
            <Accessibility className="size-5 text-[#4ECDC4]" />
            Доступная среда
          </h2>
          
          <div className="space-y-4">
            {mobilityFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Для маломобильных посетителей</h3>
                <div className="flex flex-wrap gap-2">
                  {mobilityFeatures.map(f => (
                    <Badge key={f.key} className="bg-green-100 text-green-800 border-green-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {visionFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Eye className="size-3" /> Для слабовидящих
                </h3>
                <div className="flex flex-wrap gap-2">
                  {visionFeatures.map(f => (
                    <Badge key={f.key} className="bg-purple-100 text-purple-800 border-purple-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {hearingFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Ear className="size-3" /> Для слабослышащих
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hearingFeatures.map(f => (
                    <Badge key={f.key} className="bg-pink-100 text-pink-800 border-pink-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {dietaryFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Utensils className="size-3" /> Питание
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dietaryFeatures.map(f => (
                    <Badge key={f.key} className="bg-orange-100 text-orange-800 border-orange-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {healthFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  🏥 Оздоровление
                </h3>
                <div className="flex flex-wrap gap-2">
                  {healthFeatures.map(f => (
                    <Badge key={f.key} className="bg-blue-100 text-blue-800 border-blue-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {familyFeatures.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  👨‍👩‍👧 С семьёй
                </h3>
                <div className="flex flex-wrap gap-2">
                  {familyFeatures.map(f => (
                    <Badge key={f.key} className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Check className="size-3 mr-1" />
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {availableFeatures.length === 0 && (
              <p className="text-gray-500">Информация об особенностях доступности уточняется</p>
            )}
          </div>
        </Card>

        <Card className="mb-6 p-6 bg-white border-0 shadow-md">
          <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Контакты</h2>
          <div className="space-y-3">
            {place.contacts.phone && (
              <a href={`tel:${place.contacts.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="size-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                  <Phone className="size-5 text-[#1B3A5C]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Телефон</div>
                  <div className="text-[#2C3E50] font-medium">{place.contacts.phone}</div>
                </div>
              </a>
            )}

            {place.contacts.website && (
              <a href={place.contacts.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="size-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                  <Globe className="size-5 text-[#1B3A5C]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Сайт</div>
                  <div className="text-[#2C3E50] font-medium truncate">{place.contacts.website}</div>
                </div>
              </a>
            )}

            <a href={`https://maps.google.com/?q=${place.coordinates[0]},${place.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="size-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                <MapPin className="size-5 text-[#1B3A5C]" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Координаты</div>
                <div className="text-[#2C3E50] font-medium">
                  {place.coordinates[0].toFixed(4)}°, {place.coordinates[1].toFixed(4)}°
                </div>
              </div>
            </a>

            <Button 
              className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white rounded-lg py-6 gap-2"
              onClick={() => window.open(`https://maps.google.com/?q=${place.coordinates[0]},${place.coordinates[1]}`)}
            >
              <Navigation className="size-5" />
              Построить маршрут в Google Maps
            </Button>
          </div>
        </Card>
      </div>

      <footer className="bg-[#1B3A5C] text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm opacity-90 mb-2">
            © 2026 Доступная Якутия. Все права защищены.
          </p>
          <p className="text-xs opacity-70">
            Информация на сайте носит ознакомительный характер и не является медицинской
            консультацией. Перед посещением оздоровительных объектов и использованием 
            народной медицины проконсультируйтесь со специалистом.
          </p>
        </div>
      </footer>
    </div>
  );
}
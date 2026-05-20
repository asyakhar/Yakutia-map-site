import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Share2,
  Star,
  MapPin,
  Phone,
  Globe,
  Navigation,
  Accessibility,
  Eye,
  Ear,
  Utensils,
  Check,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { places } from "../data/mockData";

export function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = places.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F7F3E8]">
        <div className="text-center">
          <h2 className="text-2xl text-[#2C3E50] mb-4">Место не найдено</h2>
          <Button onClick={() => navigate("/map")} className="bg-[#4ECDC4] hover:bg-[#3DBDB5]">
            Вернуться к карте
          </Button>
        </div>
      </div>
    );
  }

  const accessibilityFeatures = [
    {
      id: "wheelchair",
      icon: Accessibility,
      label: "Пандусы и лифты",
      description: place.accessibility.features.wheelchair
        ? "Пандусы и лифты есть"
        : "Пандусы и лифты отсутствуют",
      available: place.accessibility.features.wheelchair,
    },
    {
      id: "vision",
      icon: Eye,
      label: "Для незрячих",
      description: place.accessibility.features.braille || place.accessibility.features.audioGuides
        ? "Аудиогиды и тактильные экспонаты"
        : "Специальные средства отсутствуют",
      available: place.accessibility.features.braille || place.accessibility.features.audioGuides,
    },
    {
      id: "hearing",
      icon: Ear,
      label: "Для слабослышащих",
      description: place.accessibility.features.inductionLoop
        ? "Индукционная петля"
        : "Индукционная петля отсутствует",
      available: place.accessibility.features.inductionLoop,
    },
    {
      id: "food",
      icon: Utensils,
      label: "Питание",
      description: place.accessibility.features.glutenFree
        ? "Безглютеновое меню"
        : "Специальное меню отсутствует",
      available: place.accessibility.features.glutenFree,
    },
  ];

  const accessibilityLevelText = {
    high: "Высокая",
    medium: "Средняя",
    low: "Низкая",
  };

  const accessibilityLevelColor = {
    high: "bg-green-100 text-green-800 border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-red-100 text-red-800 border-red-300",
  };

  const similarPlaces = places.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F3E8]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/map")}
            className="gap-2 text-[#2C3E50] hover:text-[#1B3A5C] hover:bg-gray-100"
          >
            <ArrowLeft className="size-5" />
            <span className="hidden sm:inline">Назад</span>
          </Button>
          <h1 className="text-lg md:text-xl text-[#2C3E50] flex-1 text-center px-4">
            {place.name}
          </h1>
          <Button variant="ghost" className="gap-2 text-[#2C3E50] hover:bg-gray-100">
            <Share2 className="size-5" />
            <span className="hidden sm:inline">Поделиться</span>
          </Button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title & Address */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg text-[#2C3E50]">{place.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-[#2C3E50]">{place.distance} от центра</span>
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="size-5 flex-shrink-0 mt-0.5" />
                <span>{place.address}</span>
              </div>
            </div>
          </div>

          {/* Accessibility Badge */}
          <Badge
            className={`${
              accessibilityLevelColor[place.accessibility.level as keyof typeof accessibilityLevelColor]
            } px-4 py-2 text-sm border`}
          >
            <Check className="size-4 mr-2" />
            Доступность: {accessibilityLevelText[place.accessibility.level as keyof typeof accessibilityLevelText]}
          </Badge>
        </div>

        {/* Accessibility Features Grid */}
        <Card className="mb-6 p-6 bg-white border-0 shadow-md">
          <h2 className="text-xl text-[#2C3E50] mb-4">Особенности доступности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessibilityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                    feature.available
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div
                    className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      feature.available ? "bg-green-100" : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        feature.available ? "text-green-600" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#2C3E50]">{feature.label}</h3>
                      {feature.available ? (
                        <Check className="size-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="size-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Description */}
        <Card className="mb-6 p-6 bg-white border-0 shadow-md">
          <h2 className="text-xl text-[#2C3E50] mb-3">Описание</h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">{place.fullDescription}</p>
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#4ECDC4]/10 text-[#1B3A5C] border-[#4ECDC4]/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact Block */}
        <Card className="mb-6 p-6 bg-white border-0 shadow-md">
          <h2 className="text-xl text-[#2C3E50] mb-4">Контакты</h2>
          <div className="space-y-3">
            <a
              href={`tel:${place.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
            >
              <div className="size-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                <Phone className="size-5 text-[#1B3A5C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Телефон</div>
                <div className="text-[#2C3E50]">{place.phone}</div>
              </div>
            </a>

            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
            >
              <div className="size-10 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center">
                <Globe className="size-5 text-[#1B3A5C]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Сайт</div>
                <div className="text-[#2C3E50]">{place.website}</div>
              </div>
            </a>

            <Button className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white rounded-lg py-6 gap-2">
              <Navigation className="size-5" />
              Построить маршрут
            </Button>
          </div>
        </Card>

        {/* Similar Places */}
        <div className="mb-8">
          <h2 className="text-xl text-[#2C3E50] mb-4">Похожие места</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {similarPlaces.map((similarPlace) => (
              <Card
                key={similarPlace.id}
                onClick={() => navigate(`/place/${similarPlace.id}`)}
                className="flex-shrink-0 w-64 bg-white border-0 shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                role="button"
                tabIndex={0}
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={similarPlace.image}
                    alt={similarPlace.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#2C3E50] mb-2 line-clamp-2">
                    {similarPlace.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span>{similarPlace.rating}</span>
                    <span>•</span>
                    <span>{similarPlace.distance}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B3A5C] text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm opacity-90 mb-2">
            © 2026 Доступная Якутия. Все права защищены.
          </p>
          <p className="text-xs opacity-70">
            Информация на сайте носит ознакомительный характер и не является медицинской
            консультацией. Перед посещением проконсультируйтесь со специалистом.
          </p>
        </div>
      </footer>
    </div>
  );
}

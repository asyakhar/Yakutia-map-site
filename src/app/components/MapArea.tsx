import { useNavigate } from "react-router";
import { MapPin, Landmark, Heart, Hotel, Stethoscope, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type Place = {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  image: string;
  address: string;
  rating: number;
  distance: string;
  tags: string[];
};

type MapAreaProps = {
  places: Place[];
  selectedPlace: string | null;
  setSelectedPlace: (id: string | null) => void;
};

// Центр карты - Якутск
const MAP_CENTER = { lat: 62.0278, lng: 129.7317 };
const MAP_ZOOM = 12;

// Функция для преобразования координат в позицию на карте
function coordinatesToPosition(lat: number, lng: number) {
  // Примерный диапазон координат для отображения
  const latRange = { min: 60.5, max: 63.5 };
  const lngRange = { min: 127.0, max: 132.0 };
  
  const top = ((latRange.max - lat) / (latRange.max - latRange.min)) * 100;
  const left = ((lng - lngRange.min) / (lngRange.max - lngRange.min)) * 100;
  
  return { top: `${top}%`, left: `${left}%` };
}

const typeIcons = {
  museum: Landmark,
  wellness: Heart,
  hotel: Hotel,
  medical: Stethoscope,
};

export function MapArea({ places, selectedPlace, setSelectedPlace }: MapAreaProps) {
  const navigate = useNavigate();
  const selectedPlaceData = places.find((p) => p.id === selectedPlace);

  return (
    <div className="flex-1 relative bg-[#F7F3E8]">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F8] to-[#D0E8F0]">
        {/* Grid lines to simulate map */}
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A5C" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Map attribution */}
        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded text-xs text-gray-600">
          © OpenStreetMap
        </div>
      </div>

      {/* Place Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {places.map((place) => {
          const Icon = typeIcons[place.type as keyof typeof typeIcons] || MapPin;
          const position = coordinatesToPosition(place.lat, place.lng);

          return (
            <button
              key={place.id}
              onClick={() => setSelectedPlace(place.id)}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] rounded-full transition-transform hover:scale-110"
              style={position}
              aria-label={`Открыть ${place.name}`}
            >
              <div
                className={`
                  relative size-10 rounded-full shadow-lg flex items-center justify-center
                  ${selectedPlace === place.id ? "bg-[#1B3A5C] ring-4 ring-[#4ECDC4]" : "bg-[#4ECDC4]"}
                  transition-all
                `}
              >
                <Icon className="size-5 text-white" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Popup Card */}
      {selectedPlaceData && (
        <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white shadow-2xl border-0 overflow-hidden z-10">
          <div className="relative h-40">
            <img
              src={selectedPlaceData.image}
              alt={selectedPlaceData.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-2 right-2 size-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg text-[#2C3E50] mb-1">{selectedPlaceData.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span>{selectedPlaceData.rating}</span>
                </div>
                <span>•</span>
                <span>{selectedPlaceData.distance}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedPlaceData.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#4ECDC4]/10 text-[#1B3A5C] border-[#4ECDC4]/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              onClick={() => navigate(`/place/${selectedPlaceData.id}`)}
              className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white rounded-lg"
            >
              Подробнее
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

import { useState } from "react";
import { Header } from "../components/Header";
import { MapSidebar } from "../components/MapSidebar";
import { MapArea } from "../components/MapArea";
import { places, mapLayers } from "../data/mockData";

export function MapView() {
  const [layers, setLayers] = useState(mapLayers);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  const enabledLayers = layers.filter((l) => l.enabled).map((l) => l.id);
  const filteredPlaces = places.filter((place) =>
    place.layers.some((layer) => enabledLayers.includes(layer))
  );

  return (
    <div className="h-screen flex flex-col bg-[#F7F3E8]">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <MapSidebar
          layers={layers}
          toggleLayer={toggleLayer}
          filteredCount={filteredPlaces.length}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <MapArea
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
      </div>
    </div>
  );
}

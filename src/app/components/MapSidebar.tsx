import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type Layer = {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
};

type MapSidebarProps = {
  layers: Layer[];
  toggleLayer: (id: string) => void;
  filteredCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function MapSidebar({
  layers,
  toggleLayer,
  filteredCount,
  isOpen,
  setIsOpen,
}: MapSidebarProps) {
  return (
    <>
      {/* Toggle Button for Mobile */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed left-4 top-20 z-30 bg-white shadow-lg hover:bg-gray-50 text-[#2C3E50] rounded-full size-12 p-0"
        aria-label={isOpen ? "Скрыть фильтры" : "Показать фильтры"}
      >
        {isOpen ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          fixed md:relative z-20 h-full w-80 bg-white shadow-xl transition-transform duration-300
          flex flex-col
        `}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-[#2C3E50]">Слои карты</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] rounded"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-start gap-3">
                <Checkbox
                  id={layer.id}
                  checked={layer.enabled}
                  onCheckedChange={() => toggleLayer(layer.id)}
                  className="mt-1 data-[state=checked]:bg-[#4ECDC4] data-[state=checked]:border-[#4ECDC4]"
                />
                <Label
                  htmlFor={layer.id}
                  className="flex-1 cursor-pointer flex items-center gap-2"
                >
                  <span
                    className="size-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: layer.color }}
                    aria-hidden="true"
                  />
                  <span className="text-[#2C3E50] leading-tight">{layer.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2C3E50]">Показано объектов:</span>
            <span className="text-lg text-[#1B3A5C]">{filteredCount}</span>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { Volume2, Eye, Footprints, Baby, Sparkles, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

type FunctionalNeed = {
  id: string;
  icon: any;
  label: string;
  description: string;
  color: string;
  layers: string[];
};

const functionalNeeds: FunctionalNeed[] = [
  {
    id: "mobility",
    icon: Footprints,
    label: "Удобно с коляской",
    description: "Пандусы, широкие проходы, лифты",
    color: "#457B9D",
    layers: ["mobility", "inclusive"],
  },
  {
    id: "vision",
    icon: Eye,
    label: "Крупный текст и аудио",
    description: "Аудиогиды, шрифт Брайля, тактильные элементы",
    color: "#FF6B6B",
    layers: ["vision", "inclusive"],
  },
  {
    id: "hearing",
    icon: Volume2,
    label: "Тихое место или субтитры",
    description: "Индукционная петля, сурдоперевод",
    color: "#FFA07A",
    layers: ["hearing", "inclusive"],
  },
  {
    id: "families",
    icon: Baby,
    label: "С детьми",
    description: "Пеленальные столики, детское меню",
    color: "#FFB703",
    layers: ["families", "inclusive"],
  },
  {
    id: "food",
    icon: Sparkles,
    label: "Особое питание",
    description: "Безглютеновое, веганское, халяльное меню",
    color: "#95E1D3",
    layers: ["food", "inclusive"],
  },
  {
    id: "wellness",
    icon: Heart,
    label: "Для здоровья",
    description: "Термальные источники, оздоровительные центры",
    color: "#52B788",
    layers: ["wellness", "cardiovascular", "respiratory", "traditional"],
  },
];

type CustomizationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (selectedNeeds: string[]) => void;
  redirectToMap?: boolean;
};

export function CustomizationModal({
  open,
  onOpenChange,
  onSave,
  redirectToMap = false,
}: CustomizationModalProps) {
  const navigate = useNavigate();
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const toggleNeed = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    );
  };

  const handleContinue = () => {
    if (onSave) {
      onSave(selectedNeeds);
    }
    onOpenChange(false);
    if (redirectToMap) {
      navigate("/map");
    }
  };

  const handleShowAll = () => {
    if (onSave) {
      onSave([]);
    }
    onOpenChange(false);
    if (redirectToMap) {
      navigate("/map");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#2C3E50]">
            Что для вас важно?
          </DialogTitle>
          <DialogDescription className="text-[#2C3E50]/70">
            Отметьте критерии, которые важны при выборе места. Это не обязательно —
            вы всегда можете посмотреть все объекты на карте.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {functionalNeeds.map((need) => {
            const Icon = need.icon;
            const isSelected = selectedNeeds.includes(need.id);

            return (
              <label
                key={need.id}
                className={`
                  flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    isSelected
                      ? "bg-[#4ECDC4]/10 border-[#4ECDC4]"
                      : "bg-white border-gray-200 hover:border-[#4ECDC4]/50"
                  }
                `}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleNeed(need.id)}
                  className="mt-1"
                />

                <div
                  className="size-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${need.color}20` }}
                >
                  <Icon className="size-5" style={{ color: need.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#2C3E50]">{need.label}</h3>
                    {isSelected && (
                      <Badge className="bg-[#4ECDC4] text-white text-xs">
                        Выбрано
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#2C3E50]/70">{need.description}</p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#F7F3E8] rounded-lg">
          <p className="text-sm text-[#2C3E50]/70 leading-relaxed">
            <strong>Зачем это нужно?</strong> Выбранные критерии помогут нам показать только те
            объекты, где есть нужные вам удобства. Вы всегда сможете изменить настройки или
            посмотреть все места на карте.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={handleContinue}
            disabled={selectedNeeds.length === 0}
            className="flex-1 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white py-6 text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedNeeds.length > 0
              ? `Показать места (${selectedNeeds.length} ${
                  selectedNeeds.length === 1 ? "критерий" : "критерия"
                })`
              : "Выберите хотя бы один критерий"}
          </Button>
        </div>

        <button
          onClick={handleShowAll}
          className="w-full mt-2 text-[#1B3A5C] hover:text-[#4ECDC4] underline text-sm focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] rounded px-2 py-2 transition-colors"
        >
          Пропустить и показать всё
        </button>
      </DialogContent>
    </Dialog>
  );
}

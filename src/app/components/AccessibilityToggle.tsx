import { useState } from "react";
import { Accessibility, Type, Eye, X } from "lucide-react";
import { useAccessibility } from "../context/AccessibilityContext";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function AccessibilityToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useAccessibility();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 size-12 rounded-full bg-[#4ECDC4] text-white shadow-lg hover:bg-[#3DBDB5] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-offset-2 transition-all flex items-center justify-center"
        aria-label="Настройки доступности"
      >
        <Accessibility className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed top-20 right-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#2C3E50]">Настройки доступности</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] rounded"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
                <Eye className="size-4 text-[#1B3A5C]" />
                <span className="text-[#2C3E50]">Высокий контраст</span>
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dyslexic-font" className="flex items-center gap-2 cursor-pointer">
                <Type className="size-4 text-[#1B3A5C]" />
                <span className="text-[#2C3E50]">Шрифт для дислексии</span>
              </Label>
              <Switch
                id="dyslexic-font"
                checked={settings.dyslexicFont}
                onCheckedChange={(checked) => updateSettings({ dyslexicFont: checked })}
              />
            </div>

            <div className="pt-2 border-t border-gray-200">
              <Label className="block mb-2 text-[#2C3E50]">Размер шрифта</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={settings.fontSize === "normal" ? "default" : "outline"}
                  onClick={() => updateSettings({ fontSize: "normal" })}
                  className={settings.fontSize === "normal" ? "bg-[#4ECDC4] hover:bg-[#3DBDB5]" : ""}
                >
                  A
                </Button>
                <Button
                  size="sm"
                  variant={settings.fontSize === "large" ? "default" : "outline"}
                  onClick={() => updateSettings({ fontSize: "large" })}
                  className={settings.fontSize === "large" ? "bg-[#4ECDC4] hover:bg-[#3DBDB5]" : ""}
                >
                  A+
                </Button>
                <Button
                  size="sm"
                  variant={settings.fontSize === "extra-large" ? "default" : "outline"}
                  onClick={() => updateSettings({ fontSize: "extra-large" })}
                  className={settings.fontSize === "extra-large" ? "bg-[#4ECDC4] hover:bg-[#3DBDB5]" : ""}
                >
                  A++
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

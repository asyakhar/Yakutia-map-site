import { useState } from "react";
import { Search, Settings, Compass, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAccessibility } from "../context/AccessibilityContext";
import { CustomizationModal } from "./CustomizationModal";
import React from "react";

export function Header() {
  const navigate = useNavigate();
  const { settings } = useAccessibility();
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="h-16 bg-[#1B3A5C] shadow-lg flex items-center px-6 gap-6">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] rounded px-2 py-1"
        aria-label="На главную"
      >
        <div className="relative size-8">
          <Compass className="size-8 text-[#4ECDC4]" strokeWidth={1.5} />
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-white fill-white" />
        </div>
        <span className="hidden sm:inline font-bold">Доступная Якутия</span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <Input
          placeholder="Поиск мест, музеев, клиник..."
          className="pl-10 bg-white/90 border-0 rounded-full focus:ring-2 focus:ring-[#4ECDC4] h-10"
        />
      </div>

      {/* Profile Settings */}
      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        className="border-[#4ECDC4] text-white hover:bg-[#4ECDC4]/20 rounded-lg gap-2"
      >
        <Settings className="size-4" />
        <span className="hidden md:inline">
          {settings.userProfile || "Настройки фильтров"}
        </span>
      </Button>

      {/* Customization Modal */}
      <CustomizationModal
        open={showModal}
        onOpenChange={setShowModal}
        redirectToMap={false}
      />
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Heart, MapPin, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Yakutia-map-site' : '';
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
    icon: MapPin,
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
    layers: ["vision_impaired", "inclusive"],
  },
  {
    id: "hearing",
    icon: Ear,
    label: "Тихое место или субтитры",
    description: "Индукционная петля, сурдоперевод",
    color: "#FFA07A",
    layers: ["hearing_impaired", "inclusive"],
  },
  {
    id: "families",
    icon: Users,
    label: "С детьми",
    description: "Пеленальные столики, детское меню",
    color: "#FFB703",
    layers: ["family", "inclusive"],
  },
  {
    id: "food",
    icon: Utensils,
    label: "Особое питание",
    description: "Безглютеновое, диабетическое меню",
    color: "#95E1D3",
    layers: ["dietary", "inclusive"],
  },
  {
    id: "wellness",
    icon: Heart,
    label: "Для здоровья",
    description: "Термальные источники, оздоровительные центры",
    color: "#52B788",
    layers: ["health", "cardiovascular", "respiratory", "ethnomedicine"],
  },
];

import { Eye, Ear, Users, Utensils } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  

  const scrollToAbout = () => {
    setShowAbout(true);
    setTimeout(() => {
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleNeed = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    );
  };

  const handleContinue = () => {
    // Сохраняем выбранные фильтры в localStorage
    const selectedLayers = selectedNeeds.flatMap(
      (needId) => functionalNeeds.find((n) => n.id === needId)?.layers || []
    );
    localStorage.setItem("preferredLayers", JSON.stringify(selectedLayers));
    localStorage.setItem("preferredNeeds", JSON.stringify(selectedNeeds));
    setShowModal(false);
router.push("/map");
  };

  const handleShowAll = () => {
    localStorage.removeItem("preferredLayers");
    localStorage.removeItem("preferredNeeds");
    setShowModal(false);
router.push("/map");
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-[#F7F3E8]">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Hero Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1603617914658-ccba22c09ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A5C]/80 via-[#1B3A5C]/70 to-[#1B3A5C]/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  <Compass className="size-20 text-[#4ECDC4]" strokeWidth={1.5} />
                  <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-white fill-white" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 text-5xl md:text-6xl text-white font-bold"
              >
                Доступная Якутия
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12 text-xl text-white/90"
              >
                Интерактивный навигатор медицинского и доступного туризма
              </motion.p>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-white/95 backdrop-blur-sm p-8 rounded-xl border-0 shadow-2xl">
                  <h2 className="mb-4 text-2xl text-[#2C3E50] font-semibold">
                    Что для вас важно при выборе места?
                  </h2>

                  <p className="mb-6 text-[#2C3E50]/80">
                    Мы покажем только те объекты, которые подходят именно вам
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowModal(true)}
                      className="flex-1 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white py-6 text-lg rounded-lg shadow-md"
                    >
                      Настроить фильтры
                    </Button>
                    <Button
                      onClick={handleShowAll}
                      variant="outline"
                      className="flex-1 border-2 border-[#1B3A5C]/20 hover:bg-[#1B3A5C]/5 text-[#2C3E50] py-6 text-lg rounded-lg shadow-md"
                    >
                      Показать всё
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.button
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white/90 transition-colors"
              >
                <span className="text-sm">Узнать больше</span>
                <ChevronDown className="size-6 animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        {showAbout && (
          <section id="about-section" className="relative py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl text-[#2C3E50] font-bold mb-6 text-center">
                  О проекте
                </h2>

                <p className="text-lg text-[#2C3E50]/80 mb-8 leading-relaxed">
                  «Доступная Якутия» — это интерактивная карта медицинских и туристических объектов
                  Республики Саха (Якутия), адаптированных для людей с различными потребностями.
                </p>

                <Card className="p-6 mb-8 bg-[#F7F3E8] border-0">
                  <h3 className="text-xl text-[#2C3E50] font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="size-5 text-[#4ECDC4]" />
                    Почему мы используем слои?
                  </h3>
                  <p className="text-[#2C3E50]/80 leading-relaxed mb-4">
                    Каждый человек уникален. Кому-то нужны пандусы, кому-то — аудиогиды, а кому-то —
                    безглютеновое меню. Вместо того чтобы заставлять вас просматривать сотни объектов,
                    мы собрали информацию в 12 тематических слоёв.
                  </p>
                  <p className="text-[#2C3E50]/80 leading-relaxed">
                    Вы выбираете только то, что важно именно вам, а карта показывает подходящие места.
                    Никаких диагнозов, никаких деклараций — только удобство.
                  </p>
                </Card>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-white border-0 shadow-md">
                    <div className="size-12 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center mb-4">
                      <Compass className="size-6 text-[#4ECDC4]" />
                    </div>
                    <h4 className="text-lg text-[#2C3E50] font-semibold mb-2">12 слоёв</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      От пандусов до народной медицины — находите именно то, что вам нужно
                    </p>
                  </Card>

                  <Card className="p-6 bg-white border-0 shadow-md">
                    <div className="size-12 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center mb-4">
                      <Heart className="size-6 text-[#4ECDC4]" />
                    </div>
                    <h4 className="text-lg text-[#2C3E50] font-semibold mb-2">Без диагнозов</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      Вы не обязаны сообщать о своих особенностях — просто выберите критерии
                    </p>
                  </Card>

                  <Card className="p-6 bg-white border-0 shadow-md">
                    <div className="size-12 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center mb-4">
                      <Sparkles className="size-6 text-[#4ECDC4]" />
                    </div>
                    <h4 className="text-lg text-[#2C3E50] font-semibold mb-2">Всегда актуально</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      Информация обновляется регулярно силами сообщества и партнёров
                    </p>
                  </Card>
                </div>

                <Card className="p-6 bg-amber-50 border-amber-200 border-2">
                  <h3 className="text-lg text-amber-900 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Важное уточнение
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Информация на сайте носит <strong>справочный характер</strong> и не заменяет
                    консультацию медицинского специалиста. Перед посещением оздоровительных объектов
                    и использованием народной медицины проконсультируйтесь с вашим врачом.
                  </p>
                </Card>
              </motion.div>
            </div>
          </section>
        )}
      </div>

      {/* Модальное окно выбора фильтров */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
                      <h3 className="font-semibold text-[#2C3E50]">{need.label}</h3>
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
            className="w-full mt-2 text-[#1B3A5C] hover:text-[#4ECDC4] underline text-sm py-2 transition-colors"
          >
            Пропустить и показать всё
          </button>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router";
import { Compass, Heart, MapPin, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CustomizationModal } from "../components/CustomizationModal";

export function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const scrollToAbout = () => {
    setShowAbout(true);
    setTimeout(() => {
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div className="relative min-h-screen w-full bg-[#F7F3E8]">
        {/* Hero Section - Artboard 1A */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Hero Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1603617914658-ccba22c09ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW5hJTIwcGlsbGFycyUyMHlha3V0aWElMjBydXNzaWElMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc5Mjc1MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
                className="mb-4 text-5xl md:text-6xl text-white"
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
                  <h2 className="mb-4 text-2xl text-[#2C3E50]">
                    Что для вас важно при выборе места?
                  </h2>

                  <p className="mb-6 text-[#2C3E50]/80">
                    Мы покажем только те объекты, которые подходят именно вам
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowModal(true)}
                      className="flex-1 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white py-6 text-lg rounded-lg shadow-md focus:ring-2 focus:ring-[#4ECDC4] focus:ring-offset-2"
                    >
                      Настроить фильтры
                    </Button>
                    <Button
                      onClick={() => navigate("/map")}
                      variant="outline"
                      className="flex-1 border-2 border-[#1B3A5C]/20 hover:bg-[#1B3A5C]/5 text-[#2C3E50] py-6 text-lg rounded-lg shadow-md focus:ring-2 focus:ring-[#4ECDC4] focus:ring-offset-2"
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
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2"
                aria-label="Прокрутить вниз"
              >
                <span className="text-sm">Узнать больше</span>
                <ChevronDown className="size-6 animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About Section - Artboard 1B */}
        {showAbout && (
          <section id="about-section" className="relative py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl text-[#2C3E50] mb-6 text-center">
                  О проекте
                </h2>

                <p className="text-lg text-[#2C3E50]/80 mb-8 leading-relaxed">
                  «Доступная Якутия» — это интерактивная карта медицинских и туристических объектов
                  Республики Саха (Якутия), адаптированных для людей с различными потребностями.
                </p>

                <Card className="p-6 mb-8 bg-[#F7F3E8] border-0">
                  <h3 className="text-xl text-[#2C3E50] mb-4 flex items-center gap-2">
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
                    <h4 className="text-lg text-[#2C3E50] mb-2">12 слоёв</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      От пандусов до народной медицины — находите именно то, что вам нужно
                    </p>
                  </Card>

                  <Card className="p-6 bg-white border-0 shadow-md">
                    <div className="size-12 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center mb-4">
                      <Heart className="size-6 text-[#4ECDC4]" />
                    </div>
                    <h4 className="text-lg text-[#2C3E50] mb-2">Без диагнозов</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      Вы не обязаны сообщать о своих особенностях — просто выберите критерии
                    </p>
                  </Card>

                  <Card className="p-6 bg-white border-0 shadow-md">
                    <div className="size-12 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center mb-4">
                      <Sparkles className="size-6 text-[#4ECDC4]" />
                    </div>
                    <h4 className="text-lg text-[#2C3E50] mb-2">Всегда актуально</h4>
                    <p className="text-sm text-[#2C3E50]/70">
                      Информация обновляется регулярно силами сообщества и партнёров
                    </p>
                  </Card>
                </div>

                <Card className="p-6 bg-amber-50 border-amber-200 border-2">
                  <h3 className="text-lg text-amber-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Важное уточнение
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Информация на сайте носит <strong>справочный характер</strong> и не заменяет
                    консультацию медицинского специалиста. Перед посещением оздоровительных объектов
                    и использованием народной медицины проконсультируйтесь с вашим врачом.
                  </p>
                </Card>

                <div className="mt-12 text-center">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white px-8 py-6 text-lg rounded-lg shadow-lg"
                  >
                    Перейти к карте
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>

      {/* Customization Modal - Artboard 1C */}
      <CustomizationModal
        open={showModal}
        onOpenChange={setShowModal}
        redirectToMap={true}
      />
    </>
  );
}

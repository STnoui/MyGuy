import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_OFFSET = 24; // Increased for better spacing
const SCALE_FACTOR = 0.06;
const SCROLL_MULTIPLIER = 1.5;

const Index = () => {
  const { t, language } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef, // Target the scrollable container
    offset: ["start start", "end end"],
  });

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];
  const numCards = services.length;

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-screen overflow-hidden" // Prevent body scroll
    >
      {/* STATIC HEADER */}
      <header className="bg-background/95 backdrop-blur-sm z-10 pb-4">
        <div className="container mx-auto px-4 pt-8 text-center">
          <Logo />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <Badge variant="secondary" className="mt-6 text-md font-semibold">
              {t("operatingHours")}
            </Badge>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight text-center mt-16 mb-8">{t("servicesTitle")}</h2>
        </div>
      </header>

      {/* SCROLLABLE MAIN CONTENT */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        {/* Scroll track div */}
        <div className="relative h-[200vh]">
          {/* Sticky container for cards */}
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="relative mx-auto max-w-sm h-[200px]">
              {services.map((service, i) => {
                const totalProgress = useTransform(scrollYProgress, (pos) => pos * (numCards - 1) * SCROLL_MULTIPLIER);
                
                const y = useTransform(totalProgress, (pos) => {
                  const stackIndex = Math.max(0, i - pos);
                  return stackIndex * CARD_OFFSET;
                });

                const scale = useTransform(totalProgress, (pos) => {
                  const stackIndex = Math.max(0, i - pos);
                  return 1 - stackIndex * SCALE_FACTOR;
                });

                const opacity = useTransform(totalProgress, [i - 1, i, i + 0.5], [1, 1, 0]);

                return (
                  <motion.div
                    key={service.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      y,
                      scale,
                      opacity,
                      zIndex: numCards - i,
                    }}
                    className="origin-center"
                  >
                    <ServiceCard
                      icon={service.icon}
                      title={t(`services.${service.key}.title`)}
                      description={t(`services.${service.key}.description`)}
                      index={i}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Index;
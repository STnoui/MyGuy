import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const CARD_OFFSET = 24;
const SCALE_FACTOR = 0.06;
const VISIBLE_CARDS = 4;
const ANIMATION_DURATION_MS = 500;

const Index = () => {
  const { t, language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 400);
    // This timer ensures all CSS, including backdrop-filter, is rendered before enabling scroll.
    const animationTimer = setTimeout(() => setIsAnimationEnabled(true), 600); 
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];
  const numServices = services.length;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrolling.current) return;

    isScrolling.current = true;

    if (e.deltaY > 0) {
      setActiveIndex((prev) => (prev + 1) % numServices);
    } else {
      setActiveIndex((prev) => (prev - 1 + numServices) % numServices);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, ANIMATION_DURATION_MS);
  };

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div 
        className="flex flex-col h-full w-full pt-16 pb-28 overflow-hidden" 
        onWheel={isAnimationEnabled ? handleWheel : undefined}
      >
        <div className="text-center px-4 pt-8">
          <Logo />
          <div className={cn("inline-block text-md font-semibold text-muted-foreground", "rounded-full px-4 py-2")}>
            <span>{t("operatingHours.label")} </span>
            <span className="text-secondary font-bold">{t("operatingHours.time")}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-20 relative">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
          <div className="relative w-full max-w-sm mx-auto h-[220px]">
            <AnimatePresence>
              {!isReady && (
                <motion.div
                  className="absolute inset-0 bg-background z-20"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            
            {services.map((service, i) => {
              const stackPosition = (i - activeIndex + numServices) % numServices;
              return (
                <motion.div
                  key={service.key}
                  animate={{
                    top: stackPosition * CARD_OFFSET,
                    scale: 1 - stackPosition * SCALE_FACTOR,
                    zIndex: numServices - stackPosition,
                    opacity: stackPosition < VISIBLE_CARDS ? (isReady ? 1 : 0) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    transformOrigin: "center",
                  }}
                  className="w-full will-change-transform"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={t(`services.${service.key}.title`)}
                    description={t(`services.${service.key}.description`)}
                    index={i}
                    activeIndex={activeIndex}
                    totalServices={numServices}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
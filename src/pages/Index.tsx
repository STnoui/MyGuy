import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CARD_OFFSET = 24;
const SCALE_FACTOR = 0.06;
const VISIBLE_CARDS = 4;
const SCROLL_TIMEOUT = 500;

const Index = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const isTouchDragging = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    { icon: <ShoppingBag className="h-10 w-10" />, key: "deliveries" },
    { icon: <Wallet className="h-10 w-10" />, key: "easypay" },
    { icon: <Package className="h-10 w-10" />, key: "parcels" },
    { icon: <Flower2 className="h-10 w-10" />, key: "flowers" },
  ];
  const totalServices = services.length;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrolling.current) return;
    isScrolling.current = true;

    if (e.deltaY > 0) {
      setActiveIndex((prev) => (prev + 1) % totalServices);
    } else {
      setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_TIMEOUT);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isTouchDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScrolling.current || isTouchDragging.current) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 50) {
      isScrolling.current = true;
      isTouchDragging.current = true;
      if (deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % totalServices);
      } else {
        setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_TIMEOUT);
    }
  };

  const handleTouchEnd = () => {
    isTouchDragging.current = false;
  };

  return (
    <div className="h-full">
      <div
        className="flex flex-col h-full w-full pt-16 pb-28 overflow-hidden"
        onWheel={isReady ? handleWheel : undefined}
        onTouchStart={isReady ? handleTouchStart : undefined}
        onTouchMove={isReady ? handleTouchMove : undefined}
        onTouchEnd={isReady ? handleTouchEnd : undefined}
      >
        <div className="text-center px-4 pt-8">
          <motion.div
            layoutId="logo-container"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Logo />
          </motion.div>
          <div className={cn("inline-block text-md font-semibold text-muted-foreground", "rounded-full px-4 py-2")}>
            <span>{t("operatingHours.label")} </span>
            <span className="text-secondary font-bold">{t("operatingHours.time")}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-20 relative">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
          <div className="relative w-full max-w-[19.5rem] mx-auto h-[250px]">
            <AnimatePresence>
              {!isReady && (
                <motion.div
                  className="absolute inset-0 bg-background z-20"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            {services.map((service, index) => {
              const relativeIndex = (index - activeIndex + totalServices) % totalServices;
              return (
                <motion.div
                  key={service.key}
                  animate={{
                    top: relativeIndex * CARD_OFFSET,
                    scale: 1 - relativeIndex * SCALE_FACTOR,
                    zIndex: totalServices - relativeIndex,
                    opacity: relativeIndex < VISIBLE_CARDS ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute w-full will-change-transform"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={t(`services.${service.key}.title`)}
                    description={t(`services.${service.key}.description`)}
                    index={index}
                    activeIndex={activeIndex}
                    totalServices={totalServices}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
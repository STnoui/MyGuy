import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const CARD_OFFSET = 24;
const SCALE_FACTOR = 0.06;
const VISIBLE_CARDS = 4;
const ANIMATION_DURATION_MS = 500;

const Test = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

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
    <div className="flex flex-col h-full w-full items-center justify-center overflow-hidden" onWheel={handleWheel}>
      <div className="relative w-full max-w-sm mx-auto h-[220px]">
        {services.map((service, i) => {
          const stackPosition = (i - activeIndex + numServices) % numServices;

          return (
            <motion.div
              key={service.key}
              initial={false}
              animate={{
                top: stackPosition * CARD_OFFSET,
                scale: 1 - stackPosition * SCALE_FACTOR,
                zIndex: numServices - stackPosition,
                opacity: stackPosition < VISIBLE_CARDS ? 1 : 0,
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
  );
};

export default Test;
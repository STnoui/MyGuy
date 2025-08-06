import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const CARD_OFFSET = 24;
const SCALE_FACTOR = 0.06;
const VISIBLE_CARDS = 4;
const ANIMATION_DURATION_MS = 500;

const Index = () => {
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
      // Scroll Down
      setActiveIndex((prev) => (prev + 1) % numServices);
    } else {
      // Scroll Up
      setActiveIndex((prev) => (prev - 1 + numServices) % numServices);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, ANIMATION_DURATION_MS);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden" onWheel={handleWheel}>
      <div className="text-center px-4 pt-20">
        <Logo />
        <Badge variant="secondary" className="text-md font-semibold">
          {t("operatingHours")}
        </Badge>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-6 relative">
        <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
        <div className="relative mx-auto max-w-sm h-[140px]">
          {services.map((service, i) => {
            const stackPosition = (i - activeIndex + numServices) % numServices;

            return (
              <motion.div
                key={service.key}
                initial={false}
                animate={{
                  y: stackPosition * CARD_OFFSET,
                  scale: 1 - stackPosition * SCALE_FACTOR,
                  zIndex: numServices - stackPosition,
                  opacity: stackPosition < VISIBLE_CARDS ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transformOrigin: "center",
                }}
                className="w-full h-full flex items-center justify-center"
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
  );
};

export default Index;
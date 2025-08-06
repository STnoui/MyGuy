import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_OFFSET = 24;
const SCALE_FACTOR = 0.06;
const VISIBLE_CARDS = 4; // Number of cards visible in the stack

const Index = () => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];
  const numServices = services.length;
  const scrollRange = useTransform(scrollYProgress, [0, 1], [0, numServices]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-center px-4 pt-20">
        <Logo />
        <Badge variant="secondary" className="text-md font-semibold">
          {t("operatingHours")}
        </Badge>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative mt-4 no-scrollbar">
        <div className="relative h-[400vh]">
          <div className="sticky top-1/2 -translate-y-1/2 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
            <div className="relative mx-auto max-w-sm h-[140px]">
              {services.map((service, i) => {
                const targetY = useTransform(scrollRange, (s) => {
                  const delta = (i - s + numServices) % numServices;
                  if (delta < VISIBLE_CARDS) {
                    return delta * CARD_OFFSET;
                  }
                  return VISIBLE_CARDS * CARD_OFFSET;
                });

                const scale = useTransform(targetY, [0, VISIBLE_CARDS * CARD_OFFSET], [1, 1 - VISIBLE_CARDS * SCALE_FACTOR]);
                const opacity = useTransform(targetY, [0, (VISIBLE_CARDS - 1) * CARD_OFFSET, VISIBLE_CARDS * CARD_OFFSET], [1, 1, 0]);
                const zIndex = useTransform(targetY, (y) => numServices * CARD_OFFSET - Math.round(y));

                return (
                  <motion.div
                    key={service.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      y: targetY,
                      scale,
                      opacity,
                      zIndex,
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
      </div>
    </div>
  );
};

export default Index;
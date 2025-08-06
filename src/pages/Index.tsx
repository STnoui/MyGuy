import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_OFFSET = 24; // Increased vertical distance between stacked cards
const SCALE_FACTOR = 0.06; // How much smaller each stacked card is

const Index = () => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    offset: ["start start", "end end"],
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
      {/* Static Header - Moved down with padding */}
      <div className="text-center px-4 pt-20">
        <Logo />
        <Badge variant="secondary" className="text-md font-semibold">
          {t("operatingHours")}
        </Badge>
      </div>

      {/* Contained Scrollable Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative mt-4 no-scrollbar">
        {/* This div creates the necessary scroll height */}
        <div className="relative h-[200vh]">
          {/* This div sticks to the viewport and centers the card stack */}
          <div className="sticky top-1/2 -translate-y-1/2 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
            {/* Taller card container */}
            <div className="relative mx-auto max-w-sm h-[140px]">
              {services.map((service, i) => {
                const y = useTransform(scrollRange, s => (i - s) * CARD_OFFSET);
                const scale = useTransform(scrollRange, s => 1 - (i - s) * SCALE_FACTOR);
                const opacity = useTransform(scrollRange, [i - 1, i, i + 0.9], [1, 1, 0]);

                return (
                  <motion.div
                    key={service.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      scale,
                      y,
                      opacity,
                      zIndex: numServices - i,
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
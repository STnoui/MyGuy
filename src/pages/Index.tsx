import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARD_OFFSET = 32; // More space between cards
const SCALE_FACTOR = 0.05;
const SCROLL_MULTIPLIER = 1.5;

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
  const numCards = services.length;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Static Header */}
      <div className="text-center px-4 pt-2">
        <Logo />
        <Badge variant="secondary" className="text-md font-semibold">
          {t("operatingHours")}
        </Badge>
      </div>

      {/* Contained Scrollable Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative mt-8">
        {/* This div creates the scrollable space */}
        <div className="relative h-[250vh]">
          {/* This div sticks to the viewport */}
          <div className="sticky top-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8">{t("servicesTitle")}</h2>
            <div className="relative mx-auto max-w-sm h-[200px]">
              {services.map((service, i) => {
                const totalProgress = useTransform(scrollYProgress, (pos) => pos * (numCards - 1) * SCROLL_MULTIPLIER);
                
                const y = useTransform(totalProgress, (pos) => Math.max(0, i - pos) * -CARD_OFFSET);
                const scale = useTransform(totalProgress, (pos) => 1 - Math.max(0, i - pos) * SCALE_FACTOR);
                
                // Fixed opacity range
                const opacity = useTransform(totalProgress, [i - 0.5, i, i + 0.7], [0.5, 1, 0]);

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
                    className="origin-bottom center"
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
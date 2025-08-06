import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const CARD_OFFSET = 16;
const SCALE_FACTOR = 0.06;

const Index = () => {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];
  const numCards = services.length;
  const scrollRange = useTransform(scrollYProgress, [0, 1], [0, numCards]);

  return (
    <div ref={scrollRef} className="flex flex-col h-full w-full">
      {/* Static Header */}
      <div className="text-center px-4 pt-2">
        <Logo />
        <Badge variant="secondary" className="text-md font-semibold mt-2">
          {t("operatingHours")}
        </Badge>
      </div>

      {/* Card Stack Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <h2 className="text-3xl font-bold tracking-tight mb-6">{t("servicesTitle")}</h2>
        <div className="relative h-[250px] w-full max-w-sm">
          {services.map((service, i) => {
            const pos = useTransform(scrollRange, (latest) => latest - i);

            const opacity = useTransform(pos, [-1, 0, 0.5, 1], [1, 1, 1, 0]);

            const y = useTransform(pos, (p) => {
              if (p <= 0) {
                return -p * CARD_OFFSET;
              }
              return -CARD_OFFSET;
            });

            const scale = useTransform(pos, (p) => {
              if (p <= 0) {
                return 1 + p * SCALE_FACTOR;
              }
              return 1 - SCALE_FACTOR;
            });

            return (
              <motion.div
                key={service.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity,
                  scale,
                  y,
                  zIndex: numCards - i,
                }}
                className="origin-top"
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
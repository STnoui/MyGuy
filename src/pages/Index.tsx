import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CARD_OFFSET = 16;
const SCALE_FACTOR = 0.06;

const Index = () => {
  const { t, language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (info.offset.y < -50 && activeIndex < services.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center"
    >
      {/* STATIC HEADER CONTENT */}
      <div className="container mx-auto px-4 pt-8">
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
        <h2 className="text-3xl font-bold tracking-tight mt-16 mb-8">{t("servicesTitle")}</h2>
      </div>

      {/* SELF-CONTAINED DRAGGABLE CARD STACK */}
      <div className="relative w-full max-w-sm h-56">
        <AnimatePresence>
          {services.map((service, i) => {
            if (i < activeIndex) {
              return null;
            }

            const isTopCard = i === activeIndex;

            return (
              <motion.div
                key={service.key}
                drag={isTopCard ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                initial={{
                  y: (i - activeIndex) * CARD_OFFSET,
                  scale: 1 - (i - activeIndex) * SCALE_FACTOR,
                  opacity: 1,
                }}
                animate={{
                  y: (i - activeIndex) * CARD_OFFSET,
                  scale: 1 - (i - activeIndex) * SCALE_FACTOR,
                  opacity: 1,
                }}
                exit={{
                  y: -100,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                className="absolute w-full"
                style={{ zIndex: services.length - i }}
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
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Index;
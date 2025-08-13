import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { t } = useI18n();
  const [isReady, setIsReady] = useState(false);

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

  return (
    <div className="h-full">
      <div className="flex flex-col h-full w-full pt-16 pb-28 overflow-hidden">
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
          <div className="relative w-full max-w-[19.5rem] mx-auto h-[250px] overflow-y-auto snap-y snap-mandatory no-scrollbar flex flex-col gap-4 py-4">
            <AnimatePresence>
              {!isReady && (
                <motion.div
                  className="absolute inset-0 bg-background z-20"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {services.map((service) => (
              <div key={service.key} className="w-full snap-start shrink-0">
                <ServiceCard
                  icon={service.icon}
                  title={t(`services.${service.key}.title`)}
                  description={t(`services.${service.key}.description`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
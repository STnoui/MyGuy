import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const { t, language } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const services = [
    { icon: <ShoppingBag className="h-8 w-8" />, key: "deliveries" },
    { icon: <Wallet className="h-8 w-8" />, key: "easypay" },
    { icon: <Package className="h-8 w-8" />, key: "parcels" },
    { icon: <Flower2 className="h-8 w-8" />, key: "flowers" },
  ];

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="md:hidden">
          <Logo />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            {t("heroTitle")}
          </h1>
          <Badge variant="secondary" className="mt-6 text-md font-semibold">
            {t("operatingHours")}
          </Badge>
        </motion.div>
      </div>

      <section ref={containerRef} className="relative h-[300vh] mt-16">
        <div className="sticky top-1/4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">{t("servicesTitle")}</h2>
          <div className="relative mx-auto max-w-sm h-[200px]">
            {services.map((service, i) => {
              const total = services.length;
              const rangeStart = i / total;
              const rangeEnd = (i + 1) / total;

              const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [1, 0]);
              const scale = useTransform(scrollYProgress, [rangeStart, rangeEnd], [1, 0.8]);

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
                    zIndex: total - i,
                  }}
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
      </section>
    </motion.div>
  );
};

export default Index;
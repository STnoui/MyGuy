import { Logo } from "@/components/Logo";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { t, language } = useI18n();

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

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8">{t("servicesTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {services.map((service, index) => (
              <ServiceCard
                key={service.key}
                index={index}
                icon={service.icon}
                title={t(`services.${service.key}.title`)}
                description={t(`services.${service.key}.description`)}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Index;
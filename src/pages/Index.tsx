import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { CallToAction } from "@/components/CallToAction";
import { useI18n } from "@/hooks/use-i18n";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wallet, Package, Flower2 } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { t } = useI18n();

  const services = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      key: "deliveries",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      key: "easypay",
    },
    {
      icon: <Package className="h-8 w-8" />,
      key: "parcels",
    },
    {
      icon: <Flower2 className="h-8 w-8" />,
      key: "flowers",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("heroSubtitle")}
          </p>
          <Badge variant="secondary" className="mt-4 text-base">
            {t("operatingHours")}
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            {t("servicesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
        </motion.div>
      </main>
      <div className="h-28" /> {/* Spacer for the CTA button */}
      <CallToAction />
    </div>
  );
};

export default Index;
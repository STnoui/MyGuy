import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const phoneNumber = "+359888309898";

export const CallToAction = () => {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-md mx-auto"
      >
        <a href={`tel:${phoneNumber}`} className="w-full">
          <Button className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg" size="lg">
            <Phone className="mr-3 h-6 w-6" />
            {t("orderButton")}
          </Button>
        </a>
      </motion.div>
    </div>
  );
};
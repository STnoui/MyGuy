import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const phoneNumber = "+359888309898";

export const CallToAction = () => {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a href={`tel:${phoneNumber}`} className="w-full">
          <Button className="w-full h-14 text-lg font-bold" size="lg">
            <Phone className="mr-2 h-5 w-5" />
            {t("orderButton")}
          </Button>
        </a>
      </motion.div>
    </div>
  );
};
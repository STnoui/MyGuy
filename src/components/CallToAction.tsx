import { useI18n } from "@/hooks/use-i18n";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const phoneNumber = "+359888309898";

export const CallToAction = () => {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center"
      >
        <a
          href={`tel:${phoneNumber}`}
          className={cn(
            "pointer-events-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-12 px-8 text-xl font-bold rounded-2xl"
          )}
        >
          <Phone className="mr-3 h-6 w-6" />
          {t("orderButton")}
        </a>
      </motion.div>
    </div>
  );
};
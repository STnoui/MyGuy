import { useI18n } from "@/hooks/use-i18n";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const phoneNumber = "+359888309898";

export const CallToAction = () => {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent pointer-events-none flex justify-center">
      <motion.a
        href={`tel:${phoneNumber}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "pointer-events-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "h-16 px-10 text-2xl font-bold rounded-2xl w-full max-w-sm border border-primary-foreground/20"
        )}
      >
        <Phone className="mr-4 h-8 w-8" />
        {t("orderButton")}
      </motion.a>
    </div>
  );
};
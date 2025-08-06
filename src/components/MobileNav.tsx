import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { useI18n } from "@/hooks/use-i18n";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-transparent hover:border-border transition-colors"
        aria-label={t("aria.toggleNav")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "x" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <NavLinks onLinkClick={toggleMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
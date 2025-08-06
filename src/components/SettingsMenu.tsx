import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Settings, X, Sun, Moon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const containerVariants: Variants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 500, damping: 40, when: "afterChildren" }
    },
    open: {
      width: "200px",
      height: "180px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 30, when: "beforeChildren" }
    }
  };

  const listVariants: Variants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.1 }
    }
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 10, opacity: 0 }
  };

  const activeClass = "bg-black/15 dark:bg-white/15 backdrop-blur-xl";
  const hoverClass = "hover:bg-black/15 dark:hover:bg-white/15 hover:backdrop-blur-xl";

  return (
    <div className="md:hidden">
      <motion.div
        ref={menuRef}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-4 right-4 z-50 overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 absolute top-0 right-0 flex items-center justify-center focus:outline-none"
          aria-label={t("aria.toggleSettings")}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? "x" : "settings"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0, transition: { duration: 0.1 } }}
                transition={{ delay: 0.1, ease: "easeOut", duration: 0.3 }}
                className="absolute top-0 right-14 h-12 flex items-center text-lg font-bold pointer-events-none"
              >
                {t("settings.title")}
              </motion.p>
              <motion.div
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4 w-full pt-12 p-4"
              >
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                    <Button size="sm" variant="ghost" onClick={() => setTheme('light')} className={cn("h-10 rounded-lg", hoverClass, theme === 'light' && activeClass)}>
                      <Sun className="h-5 w-5" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setTheme('dark')} className={cn("h-10 rounded-lg", hoverClass, theme === 'dark' && activeClass)}>
                      <Moon className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                    <Button size="sm" variant="ghost" onClick={() => setLanguage('en')} className={cn("h-10 rounded-lg font-bold", hoverClass, language === 'en' && activeClass)}>EN</Button>
                    <Button size="sm" variant="ghost" onClick={() => setLanguage('bg')} className={cn("h-10 rounded-lg font-bold", hoverClass, language === 'bg' && activeClass)}>BG</Button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
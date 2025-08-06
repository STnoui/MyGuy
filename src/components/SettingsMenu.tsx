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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const activeClass = "bg-black/15 dark:bg-white/15 backdrop-blur-xl text-secondary";
  const hoverClass = "hover:bg-black/15 dark:hover:bg-white/15 hover:backdrop-blur-xl";

  return (
    <div className="md:hidden">
      <motion.div
        ref={menuRef}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-4 right-4 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 relative flex items-center justify-center focus:outline-none"
          aria-label={t("aria.toggleSettings")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "x" : "settings"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: "200px", height: "180px", opacity: 1 }}
              exit={{ width: 0, height: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 right-0 overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl rounded-2xl"
            >
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
                {mounted && (
                  <>
                    <motion.div variants={itemVariants}>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                        <Button size="sm" variant="ghost" onClick={() => setTheme('light')} className={cn("h-10 rounded-lg", hoverClass, resolvedTheme === 'light' && activeClass)}>
                          <Sun className="h-5 w-5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setTheme('dark')} className={cn("h-10 rounded-lg", hoverClass, resolvedTheme === 'dark' && activeClass)}>
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
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
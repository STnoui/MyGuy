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
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [isOpen]);

  const listVariants: Variants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" },
    },
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 },
  };

  const activeClass = "bg-black/15 dark:bg-white/15 backdrop-blur-xl text-secondary";
  const hoverClass = "hover:bg-black/15 dark:hover:bg-white/15 hover:backdrop-blur-xl";

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[5%] right-4 z-50 w-12 h-12 flex items-center justify-center focus:outline-none"
        aria-label={t("aria.toggleSettings")}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "x" : "settings"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
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
            initial={{ height: 0 }}
            animate={{ height: "66.66vh" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-lg z-40 overflow-auto no-scrollbar"
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-8 w-full max-w-sm mx-auto p-8 pt-24"
            >
              <motion.p variants={itemVariants} className="text-2xl font-bold text-foreground/80 text-center">
                {t("settings.title")}
              </motion.p>
              {mounted && (
                <>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <p className="text-lg font-medium text-center">{t("settings.theme")}</p>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTheme("light")}
                        className={cn("h-12 rounded-lg", hoverClass, resolvedTheme === "light" && activeClass)}
                      >
                        <Sun className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTheme("dark")}
                        className={cn("h-12 rounded-lg", hoverClass, resolvedTheme === "dark" && activeClass)}
                      >
                        <Moon className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <p className="text-lg font-medium text-center">{t("settings.language")}</p>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setLanguage("en")}
                        className={cn("h-12 rounded-lg font-bold", hoverClass, language === "en" && activeClass)}
                      >
                        EN
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setLanguage("bg")}
                        className={cn("h-12 rounded-lg font-bold", hoverClass, language === "bg" && activeClass)}
                      >
                        BG
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
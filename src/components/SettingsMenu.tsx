import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Settings, X, Sun, Moon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SettingsMenuProps {
  activeMenu: 'nav' | 'settings' | null;
  setActiveMenu: (menu: 'nav' | 'settings' | null) => void;
}

export const SettingsMenu = ({ activeMenu, setActiveMenu }: SettingsMenuProps) => {
  const isOpen = activeMenu === 'settings';
  const isOtherMenuOpen = activeMenu !== null && !isOpen;
  const { t, language, setLanguage } = useI18n();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const settingsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsContainerRef.current && !settingsContainerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setActiveMenu]);

  const listVariants: Variants = {
    open: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } },
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 },
  };

  const activeClass = "bg-accent text-secondary";
  const hoverClass = "hover:bg-accent";

  return (
    <div ref={settingsContainerRef} className="md:hidden fixed top-0 right-0 bottom-0 z-50 pointer-events-none">
      <AnimatePresence>
        {!isOtherMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setActiveMenu(isOpen ? null : 'settings')}
            className="pointer-events-auto absolute top-[5%] right-4 w-12 h-12 flex items-center justify-center focus:outline-none"
            aria-label={t("aria.toggleSettings")}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "x" : "settings"}
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="pointer-events-auto absolute top-0 right-0 h-full w-2/3 max-w-xs glass-effect shadow-2xl"
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-8 w-full p-4 pt-24 h-full"
            >
              <motion.p variants={itemVariants} className="text-2xl font-bold text-foreground/80 text-center">
                {t("settings.title")}
              </motion.p>
              {mounted && (
                <>
                  <motion.div variants={itemVariants} className="w-full space-y-2">
                    <p className="text-lg font-medium text-center">{t("settings.theme")}</p>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTheme("light")}
                        className={cn("h-12 rounded-lg focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none", hoverClass, resolvedTheme === "light" && activeClass)}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <Sun className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTheme("dark")}
                        className={cn("h-12 rounded-lg focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none", hoverClass, resolvedTheme === "dark" && activeClass)}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <Moon className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="w-full space-y-2">
                    <p className="text-lg font-medium text-center">{t("settings.language")}</p>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setLanguage("en")}
                        className={cn("h-12 rounded-lg font-bold focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none", hoverClass, language === "en" && activeClass)}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        EN
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setLanguage("bg")}
                        className={cn("h-12 rounded-lg font-bold focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none", hoverClass, language === "bg" && activeClass)}
                        style={{ WebkitTapHighlightColor: "transparent" }}
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
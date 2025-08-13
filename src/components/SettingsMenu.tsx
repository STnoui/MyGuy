import { useState, useEffect } from "react";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setActiveMenu(null);
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, setActiveMenu]);

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

  const activeClass = "bg-accent text-secondary";
  const hoverClass = "hover:bg-accent";

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {!isOtherMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setActiveMenu(isOpen ? null : 'settings')}
            className="fixed top-[5%] right-4 z-50 w-12 h-12 flex items-center justify-center focus:outline-none"
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
          <>
            <motion.div
              className="fixed inset-0 z-30"
              onClick={() => setActiveMenu(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "45vh" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 w-full bg-white/60 dark:bg-[rgba(18,20,26,0.6)] backdrop-blur-xl z-40 overflow-auto no-scrollbar rounded-b-3xl border-b border-black/[.06] dark:border-white/[.08]"
            >
              <motion.div
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto p-8 pt-24 pb-12"
              >
                <motion.p variants={itemVariants} className="text-2xl font-bold text-foreground/80 text-center">
                  {t("settings.title")}
                </motion.p>
                {mounted && (
                  <>
                    <motion.div variants={itemVariants} className="w-full space-y-2">
                      <p className="text-lg font-medium text-center">{t("settings.theme")}</p>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setTheme("light")}
                          className={cn("h-12 rounded-lg focus-visible:outline-none focus-visible:ring-0", hoverClass, resolvedTheme === "light" && activeClass)}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          <Sun className="h-5 w-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setTheme("dark")}
                          className={cn("h-12 rounded-lg focus-visible:outline-none focus-visible:ring-0", hoverClass, resolvedTheme === "dark" && activeClass)}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          <Moon className="h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="w-full space-y-2">
                      <p className="text-lg font-medium text-center">{t("settings.language")}</p>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setLanguage("en")}
                          className={cn("h-12 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-0", hoverClass, language === "en" && activeClass)}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          EN
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setLanguage("bg")}
                          className={cn("h-12 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-0", hoverClass, language === "bg" && activeClass)}
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
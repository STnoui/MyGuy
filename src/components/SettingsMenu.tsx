import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Settings, X, Sun, Moon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useI18n();
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

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bg" : "en");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  const containerVariants: Variants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 35, when: "afterChildren" }
    },
    open: {
      width: "160px",
      height: "140px",
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

  return (
    <div className="md:hidden">
      <motion.div
        ref={menuRef}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-4 right-4 z-50 overflow-hidden bg-background/75 backdrop-blur-3xl border border-white/10 shadow-2xl"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 absolute top-0 left-0 flex items-center justify-center focus:outline-none"
          aria-label="Toggle settings menu"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? "x" : "settings"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-2 w-full pt-12 p-4"
            >
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-md py-3"
                  onClick={toggleLanguage}
                >
                  <span className="w-6 mr-2 font-bold">{language === "en" ? "BG" : "EN"}</span>
                  <span>Language</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-md py-3"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Sun className="w-6 h-6 mr-2" />
                  ) : (
                    <Moon className="w-6 h-6 mr-2" />
                  )}
                  <span>Theme</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Settings, X, Sun, Moon, Monitor } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

  const containerVariants: Variants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 35, when: "afterChildren" }
    },
    open: {
      width: "200px",
      height: "210px",
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
        className="fixed top-4 right-4 z-50 overflow-hidden bg-background/50 backdrop-blur-2xl border border-white/10 shadow-2xl"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 absolute top-0 right-0 flex items-center justify-center focus:outline-none"
          aria-label="Toggle settings menu"
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
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-4 w-full pt-4 p-4"
            >
              <motion.div variants={itemVariants} className="space-y-2 pt-8">
                <p className="text-sm font-medium text-muted-foreground px-1">Theme</p>
                <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
                  <Button size="sm" variant={theme === 'light' ? 'outline' : 'ghost'} onClick={() => setTheme('light')} className="h-8">
                    <Sun className="h-5 w-5" />
                  </Button>
                  <Button size="sm" variant={theme === 'dark' ? 'outline' : 'ghost'} onClick={() => setTheme('dark')} className="h-8">
                    <Moon className="h-5 w-5" />
                  </Button>
                  <Button size="sm" variant={theme === 'system' ? 'outline' : 'ghost'} onClick={() => setTheme('system')} className="h-8">
                    <Monitor className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground px-1">Language</p>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                   <Button size="sm" variant={language === 'en' ? 'outline' : 'ghost'} onClick={() => setLanguage('en')} className="h-8 font-bold">EN</Button>
                   <Button size="sm" variant={language === 'bg' ? 'outline' : 'ghost'} onClick={() => setLanguage('bg')} className="h-8 font-bold">BG</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
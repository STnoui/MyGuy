import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/about", label: t("nav.about") },
  ];

  const handleNavigate = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const containerVariants: Variants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 35, when: "afterChildren" }
    },
    open: {
      width: "224px",
      height: "196px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 30, when: "beforeChildren" }
    }
  };

  const navListVariants: Variants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.1 }
    }
  };

  const navItemVariants: Variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 10, opacity: 0 }
  };

  return (
    <div className="md:hidden">
      <motion.div
        ref={navRef}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-4 left-4 z-50 overflow-hidden bg-background/50 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 absolute top-0 left-0 flex items-center justify-center focus:outline-none"
          aria-label={t("aria.toggleNav")}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={navListVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-1 w-full pt-12 p-4"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={navItemVariants}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-md py-3 rounded-md hover:bg-background/70 hover:backdrop-blur-md"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
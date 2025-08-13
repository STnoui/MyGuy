import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
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

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[5%] left-4 z-50 w-12 h-12 flex items-center justify-center focus:outline-none"
        aria-label={t("aria.toggleNav")}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "x" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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
            <motion.nav
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-4 w-full max-w-sm mx-auto p-8 pt-24"
            >
              <motion.p variants={itemVariants} className="text-2xl font-bold text-foreground/80 mb-4">
                Menu
              </motion.p>
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-2xl py-8 rounded-xl",
                      location.pathname === item.href
                        ? "bg-secondary/20 text-secondary"
                        : "hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
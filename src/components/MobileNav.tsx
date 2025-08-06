import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
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

  const navVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="md:hidden">
      <motion.div
        ref={navRef}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="fixed top-4 left-4 z-50 flex items-center justify-center overflow-hidden bg-neutral-100/20 dark:bg-neutral-900/20 backdrop-blur-2xl shadow-2xl border border-white/10"
        style={{ borderRadius: isOpen ? "24px" : "9999px" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.nav
              key="nav"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-1 p-4 w-56"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={navItemVariants}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-md py-3"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>
          ) : (
            <motion.button
              key="button"
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 flex items-center justify-center"
              aria-label="Open navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <Menu className="h-7 w-7" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
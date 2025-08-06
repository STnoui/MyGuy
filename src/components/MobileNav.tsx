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
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="md:hidden">
      <motion.div
        ref={navRef}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{
          width: isOpen ? "224px" : "48px",
          height: isOpen ? "auto" : "48px",
        }}
        className="fixed top-4 left-4 z-50 overflow-hidden rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-3xl border border-white/10 shadow-2xl"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsOpen(true)}
              className="w-full h-full flex items-center justify-center focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="h-7 w-7" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-1 w-full p-4"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
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
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
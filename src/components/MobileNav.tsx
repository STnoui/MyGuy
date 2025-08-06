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

  const navListVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: 10, opacity: 0 },
  };

  return (
    <div className="md:hidden">
      <motion.div
        ref={navRef}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className={`fixed top-4 left-4 z-50 overflow-hidden bg-background/60 backdrop-blur-2xl border border-white/10 shadow-2xl
          ${isOpen ? "w-56 rounded-3xl" : "w-12 h-12 rounded-full"}`}
      >
        <div className="w-full h-full flex flex-col">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-12 flex-shrink-0 flex items-center justify-center focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-7 w-7" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                variants={navListVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-1 w-full px-4 pb-4"
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
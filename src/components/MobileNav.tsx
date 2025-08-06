import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();

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
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="md:hidden">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`fixed top-4 left-4 z-50 overflow-hidden bg-background/80 backdrop-blur-xl border border-border/50 shadow-xl
          ${isOpen ? "w-56 rounded-3xl" : "w-14 h-14 rounded-full"}`}
      >
        <div className="w-full h-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-center focus:outline-none
              ${isOpen ? 'h-14' : 'h-full'}`}
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </motion.div>
            </AnimatePresence>
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
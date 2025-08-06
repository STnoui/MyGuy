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

  return (
    <div className="md:hidden">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`fixed top-4 left-4 z-50 bg-background/60 backdrop-blur-lg border shadow-lg overflow-hidden ${
          isOpen ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="!w-6 !h-6 !p-0"
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
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="px-4 pb-4 pt-0"
            >
              <nav className="flex flex-col gap-2 w-48">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="justify-start text-md py-3"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
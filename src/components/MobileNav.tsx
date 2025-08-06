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
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-4 left-4 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 relative flex items-center justify-center focus:outline-none"
          aria-label={t("aria.toggleNav")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "x" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </motion.div>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: "224px", height: "196px", opacity: 1 }}
              exit={{ width: 0, height: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 left-0 overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl rounded-2xl"
            >
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.1, ease: "easeOut", duration: 0.3 } }}
                exit={{ x: -20, opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }}
                className="absolute top-0 left-14 h-12 flex items-center text-lg font-bold pointer-events-none"
              >
                Menu
              </motion.p>
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
                      className={cn(
                        "w-full justify-start text-md py-3 rounded-md hover:bg-black/15 dark:hover:bg-white/15 hover:backdrop-blur-xl",
                        location.pathname === item.href && "text-secondary"
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
      </motion.div>
    </div>
  );
};
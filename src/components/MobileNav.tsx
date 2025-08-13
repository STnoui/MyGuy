import { useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeMenu: 'nav' | 'settings' | null;
  setActiveMenu: (menu: 'nav' | 'settings' | null) => void;
}

export const MobileNav = ({ activeMenu, setActiveMenu }: MobileNavProps) => {
  const isOpen = activeMenu === 'nav';
  const isOtherMenuOpen = activeMenu !== null && !isOpen;
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setActiveMenu(null);
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, setActiveMenu]);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/about", label: t("nav.about") },
  ];

  const handleNavigate = (href: string) => {
    navigate(href);
    setActiveMenu(null);
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
      <AnimatePresence>
        {!isOtherMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setActiveMenu(isOpen ? null : 'nav')}
            className="fixed top-[5%] left-4 z-50 w-12 h-12 flex items-center justify-center focus:outline-none"
            aria-label={t("aria.toggleNav")}
            style={{ WebkitTapHighlightColor: "transparent" }}
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
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30"
              onClick={() => setActiveMenu(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "45vh" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 w-full bg-white/50 dark:bg-[rgba(18,20,26,0.6)] backdrop-blur-xl z-40 overflow-auto no-scrollbar rounded-b-3xl border-b border-black/[.06] dark:border-white/[.08]"
            >
              <motion.nav
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto p-8 pt-12 pb-12"
              >
                <motion.p variants={itemVariants} className="text-2xl font-bold text-foreground/80 mb-4 text-center">
                  Menu
                </motion.p>
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants} className="w-full">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-center text-2xl py-8 rounded-xl focus-visible:outline-none",
                        location.pathname === item.href
                          ? "bg-accent text-secondary"
                          : "hover:bg-accent"
                      )}
                      onClick={() => handleNavigate(item.href)}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
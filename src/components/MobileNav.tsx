import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
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

  const containerVariants: Variants = {
    closed: {
      width: "48px",
      height: "48px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 35, duration: 0.4 }
    },
    open: {
      width: "224px",
      height: "196px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 400, damping: 30, duration: 0.5 }
    }
  };

  const navListVariants: Variants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren", duration: 0.1 }
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
        onClick={() => !isOpen && setIsOpen(true)}
        className="fixed top-4 left-4 z-50 overflow-hidden bg-background/75 backdrop-blur-2xl border border-white/10 shadow-2xl cursor-pointer"
      >
        <motion.div
          className="w-12 h-12 absolute top-0 left-0 flex items-center justify-center"
          animate={{ opacity: isOpen ? 0 : 1, transition: { delay: isOpen ? 0 : 0.3 } }}
        >
          <Menu className="h-7 w-7" />
        </motion.div>

        <motion.nav
          variants={navListVariants}
          className="flex flex-col gap-1 w-full pt-12 p-4"
        >
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              variants={navItemVariants}
            >
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
      </motion.div>
    </div>
  );
};
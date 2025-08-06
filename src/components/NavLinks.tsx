import { NavLink } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  onLinkClick?: () => void;
}

export const NavLinks = ({ onLinkClick }: NavLinksProps) => {
  const { t } = useI18n();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-4xl font-bold transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-foreground/80"
    );

  return (
    <nav className="flex flex-col items-center gap-8">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={linkClasses}
          onClick={onLinkClick}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
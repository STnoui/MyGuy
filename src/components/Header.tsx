import { MobileNav } from "./MobileNav";
import { SettingsMenu } from "./SettingsMenu";
import { Button } from "./ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Link } from "react-router-dom";

export const Header = () => {
  const { t } = useI18n();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <MobileNav />
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/myguy-logo.jpg" alt="MyGuy Logo" className="h-10 w-auto" />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <SettingsMenu />
      </div>
    </header>
  );
};
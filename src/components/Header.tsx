import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Globe } from "lucide-react";
import { Logo } from "./Logo";

export const Header = () => {
  const { t, toggleLanguage } = useI18n();

  return (
    <header className="relative py-6">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
          <Globe className="h-5 w-5" />
          <span className="ml-2 font-semibold">{t("language")}</span>
        </Button>
      </div>
      <Logo />
    </header>
  );
};
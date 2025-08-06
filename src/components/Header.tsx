import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Languages } from "lucide-react";

export const Header = () => {
  const { t, toggleLanguage } = useI18n();

  return (
    <header className="absolute top-4 right-4 z-10">
      <Button
        variant="outline"
        onClick={toggleLanguage}
        aria-label="Toggle language"
        className="h-12 px-4 rounded-full bg-background/80 backdrop-blur-sm"
      >
        <Languages className="h-5 w-5" />
        <span className="ml-2 font-semibold">{t("language")}</span>
      </Button>
    </header>
  );
};
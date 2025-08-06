import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations } from "@/lib/translations";

export const LanguageSelector = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="grid grid-cols-2 gap-2">
      {(Object.keys(translations) as Array<keyof typeof translations>).map(
        (lang) => (
          <Button
            key={lang}
            variant="outline"
            className={cn(
              "w-full",
              language === lang && "bg-accent text-accent-foreground"
            )}
            onClick={() => setLanguage(lang)}
          >
            {translations[lang].language}
          </Button>
        )
      )}
    </div>
  );
};
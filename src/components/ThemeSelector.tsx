import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  const themes = [
    { value: "light", label: t("settings.light") },
    { value: "dark", label: t("settings.dark") },
    { value: "system", label: t("settings.system") },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {themes.map((item) => (
        <Button
          key={item.value}
          variant="outline"
          className={cn(
            "w-full",
            theme === item.value && "bg-accent text-accent-foreground"
          )}
          onClick={() => setTheme(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
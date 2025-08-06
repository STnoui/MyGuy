import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Languages, Palette } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSelector } from "./ThemeSelector";
import { useI18n } from "@/hooks/use-i18n";

export const SettingsMenu = () => {
  const { t } = useI18n();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-transparent hover:border-border transition-colors"
          aria-label={t("aria.toggleSettings")}
        >
          <Settings className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t("settings.title")}
          </SheetTitle>
          <SheetDescription>
            {/* This can be removed or translated if needed */}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Languages className="h-4 w-4" />
              {t("settings.language")}
            </h3>
            <LanguageSelector />
          </div>
          <div className="grid gap-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {t("settings.theme")}
            </h3>
            <ThemeSelector />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
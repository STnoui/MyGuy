import { Facebook, Mail } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 flex justify-center items-center gap-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://www.facebook.com/profile.php?id=100092615905479"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("followFacebook")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="h-8 w-8" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("followFacebook")}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="mailto:myguyyy@gmail.com"
              aria-label={t("supportEmail")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-8 w-8" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("supportEmail")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </footer>
  );
};
import { useI18n } from "@/hooks/use-i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const phoneNumber = "+359888309898";

const Contact = () => {
  const { t } = useI18n();
  const buttonBaseClasses =
    "bg-accent hover:bg-accent/80 border border-border/50";
  const buttonLayoutClasses = "h-14 rounded-3xl text-base";

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 pt-28 pb-12">
        <Card className="max-w-lg mx-auto bg-card/50 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{t("contact.title")}</CardTitle>
            <CardDescription className="text-foreground/80">{t("contact.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild variant="ghost" className={cn(buttonBaseClasses, buttonLayoutClasses)}>
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                {t("contact.callUs")}
              </a>
            </Button>
            <Button asChild variant="ghost" className={cn(buttonBaseClasses, buttonLayoutClasses)}>
              <a
                href="https://www.facebook.com/profile.php?id=100092615905479"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="mr-2 h-5 w-5" />
                {t("contact.followFacebook")}
              </a>
            </Button>
            <Button asChild variant="ghost" className={cn(buttonBaseClasses, buttonLayoutClasses)}>
              <a href="mailto:myguyyy@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                {t("contact.supportEmail")}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
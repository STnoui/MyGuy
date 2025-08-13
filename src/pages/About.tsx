import { useI18n } from "@/hooks/use-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const { t } = useI18n();

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 pt-28 pb-12">
        <Card className="max-w-2xl mx-auto bg-muted shadow-2xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {t("about.titlePrefix")}
              <span className="text-secondary">My</span>
              <span className="text-primary">Guy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80 text-center">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
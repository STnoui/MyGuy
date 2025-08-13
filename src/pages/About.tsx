import { useI18n } from "@/hooks/use-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const { t } = useI18n();

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 pt-28 pb-12">
        <Card className="max-w-2xl mx-auto bg-white/60 dark:bg-[rgba(18,20,26,0.6)] backdrop-blur-xl border border-black/[.06] dark:border-white/[.08] shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-2xl rounded-2xl">
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
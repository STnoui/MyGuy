import { useI18n } from "@/hooks/use-i18n";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const { t, language } = useI18n();

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto"
    >
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">{t("about.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80 text-center">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default About;
import { useI18n } from "@/hooks/use-i18n";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Mail } from "lucide-react";

const Contact = () => {
  const { t, language } = useI18n();

  return (
    <motion.div
      key={language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{t("contact.title")}</CardTitle>
            <CardDescription>{t("contact.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://www.facebook.com/profile.php?id=100092615905479"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="mr-2 h-5 w-5" />
                {t("contact.followFacebook")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:myguyyy@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                {t("contact.supportEmail")}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Contact;
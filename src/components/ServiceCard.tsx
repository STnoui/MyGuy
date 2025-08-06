import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <motion.div className="w-full max-w-sm">
      <Card className="h-full bg-card/80 dark:bg-card/60 backdrop-blur-lg border border-white/10 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-secondary/20 text-secondary shrink-0">
            {icon}
          </div>
          <div className="text-left flex-1">
            <CardTitle className="mb-1 text-lg font-bold">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
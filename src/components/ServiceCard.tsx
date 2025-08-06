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
    <motion.div
      className="w-full max-w-sm"
    >
      <Card className="h-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border-white/20 transition-shadow duration-300 hover:shadow-2xl">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="text-secondary mt-1">{icon}</div>
          <div className="text-left">
            <CardTitle className="mb-1">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
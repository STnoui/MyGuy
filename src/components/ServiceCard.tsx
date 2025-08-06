import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 30, delay: index * 0.1 }}
      className="w-full max-w-sm"
    >
      <Card className="h-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border-white/20">
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
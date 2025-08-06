import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to scale:
  // 0 (bottom of screen) -> scale 0.95
  // 0.5 (center of screen) -> scale 1.05
  // 1 (top of screen) -> scale 0.95
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale }}
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
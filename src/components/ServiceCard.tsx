import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  activeIndex: number;
  totalServices: number;
}

export const ServiceCard = ({ icon, title, description, activeIndex, totalServices }: ServiceCardProps) => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBlurred(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      className={cn(
        "h-36 text-card-foreground bg-white/20 dark:bg-black/20 border border-white/10 shadow-2xl rounded-3xl transition-all",
        isBlurred && "backdrop-blur-lg"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 h-full gap-4">
        {/* Left side: Icon and Text */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-secondary/20 text-secondary shrink-0">
            {icon}
          </div>
          <div className="text-left flex-1">
            <CardTitle className="mb-1 text-lg">{title}</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300 text-sm h-10 overflow-hidden">
              {description}
            </CardDescription>
          </div>
        </div>

        {/* Right side: Dot Indicators */}
        <div className="flex flex-col justify-center items-center gap-2">
          {Array.from({ length: totalServices }).map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                activeIndex === dotIndex ? "bg-secondary" : "bg-foreground/30"
              )}
            />
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};
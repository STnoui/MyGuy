import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  activeIndex: number;
  totalServices: number;
}

export const ServiceCard = ({ icon, title, description, activeIndex, totalServices }: ServiceCardProps) => {
  return (
    <Card
      className={cn(
        "h-48 text-card-foreground transition-all glass-effect shadow-lg rounded-2xl"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between p-6 h-full gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 text-secondary shrink-0">
            {icon}
          </div>
          <div className="text-left flex-1">
            <CardTitle className="mb-1 text-lg">{title}</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300 text-sm h-10 overflow-hidden">
              {description}
            </CardDescription>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          {Array.from({ length: totalServices }).map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={cn(
                "rounded-full transition-all duration-300",
                activeIndex === dotIndex
                  ? "w-2.5 h-2.5 bg-secondary"
                  : "w-2 h-2 bg-foreground/30"
              )}
            />
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};
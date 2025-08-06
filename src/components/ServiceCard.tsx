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
        "h-36 text-card-foreground bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 shadow-2xl rounded-3xl transition-all"
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
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <Card
      className={cn(
        "h-48 text-card-foreground transition-all glass-effect shadow-md rounded-2xl"
      )}
    >
      <CardHeader className="flex flex-row items-center p-6 h-full gap-6">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 text-secondary shrink-0">
          {icon}
        </div>
        <div className="text-left flex-1">
          <CardTitle className="mb-1 text-lg">{title}</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300 text-sm h-10 overflow-hidden">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="text-card-foreground rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="flex flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-secondary/20 text-secondary shrink-0">
          {icon}
        </div>
        <div className="text-left flex-1">
          <h3 className="mb-1 text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
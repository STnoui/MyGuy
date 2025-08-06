import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <Card className="h-28 text-card-foreground bg-gray-400/30 dark:bg-gray-600/20 backdrop-blur-lg shadow-2xl border-0 rounded-3xl">
      <CardHeader className="flex flex-row items-center gap-4 p-4 h-full">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-secondary/20 text-secondary shrink-0">
          {icon}
        </div>
        <div className="text-left flex-1">
          <CardTitle className="mb-1 text-lg">{title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="h-24 w-full bg-red-500 rounded-lg flex items-center justify-center text-white p-4">
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
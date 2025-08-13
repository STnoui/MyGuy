import { cn } from "@/lib/utils";

export const BrandIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-16 h-16", className)}
  >
    <path
      d="M70 10H50L30 40L50 70H70L50 40L70 10Z"
      className="fill-primary"
    />
    <path
      d="M30 10H10L30 40L10 70H30L50 40L30 10Z"
      className="fill-secondary"
    />
  </svg>
);
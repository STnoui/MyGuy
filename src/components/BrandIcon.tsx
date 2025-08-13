import { cn } from "@/lib/utils";

export const BrandIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-16 h-16", className)}
  >
    <path
      d="M12 2L4 8V16L12 22L20 16V8L12 2Z"
      className="stroke-primary fill-primary/20"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12L20 8"
      className="stroke-secondary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12V22"
      className="stroke-secondary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12L4 8"
      className="stroke-secondary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 5L8 9"
      className="stroke-primary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
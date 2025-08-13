import { BrandIcon } from "./BrandIcon";

export const Logo = () => (
  <div className="flex flex-col items-center justify-center py-4">
    <BrandIcon className="w-[2.5em] h-[2.5em] mb-2" />
    <h1 className="text-5xl md:text-7xl font-bold">
      <span className="text-secondary">My</span>
      <span className="text-primary">Guy</span>
    </h1>
  </div>
);
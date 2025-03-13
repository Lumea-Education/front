import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`max-w-[1440px] mx-auto md:px-4 ${className || ""} px-11`}>
      {children}
    </div>
  );
}

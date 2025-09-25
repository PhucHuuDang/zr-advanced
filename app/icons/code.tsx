import { cn } from "@/lib/utils";
import React from "react";

interface CodeIconProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

const CodeIcon: React.FC<CodeIconProps> = ({
  className,
  width = 24,
  height = 24,
  strokeWidth,
}: CodeIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-code-icon lucide-code", className)}
    >
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
};

export default CodeIcon;

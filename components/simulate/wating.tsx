import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Waiting({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-[9999]">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    </div>
  );
}

export { Waiting };

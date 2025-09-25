import { Badge } from "@/components/ui/badge"
import { AlertCircle, Circle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high"
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = {
    low: {
      icon: Circle,
      label: "Low",
      className: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
    },
    medium: {
      icon: AlertCircle,
      label: "Medium",
      className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
    },
    high: {
      icon: Zap,
      label: "High",
      className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
    },
  }

  const { icon: Icon, label, className: priorityClassName } = config[priority]

  return (
    <Badge variant="outline" className={cn(priorityClassName, className)}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  )
}

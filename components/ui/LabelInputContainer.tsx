import { cn } from "@/lib/utils"

interface LabelInputContainerProps {
  children: React.ReactNode
  className?: string
}

export function LabelInputContainer({
  children,
  className,
}: LabelInputContainerProps) {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  )
}


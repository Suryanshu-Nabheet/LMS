"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableSectionProps {
  title: string
  defaultExpanded?: boolean
  children: React.ReactNode
}

export function ExpandableSection({ title, defaultExpanded = false, children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 text-gray-700">
          {children}
        </div>
      )}
    </div>
  )
}

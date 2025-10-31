"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsChartProps {
  title: string
  data: { label: string; value: number }[]
}

export function AnalyticsChart({ title, data }: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


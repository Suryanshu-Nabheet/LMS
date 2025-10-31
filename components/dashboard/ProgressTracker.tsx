"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

interface Lesson {
  id: string
  title: string
  completed: boolean
}

interface ProgressTrackerProps {
  lessons: Lesson[]
  progress: number
  currentLessonId?: string
}

export function ProgressTracker({
  lessons,
  progress,
  currentLessonId,
}: ProgressTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Lessons</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {lessons.map((lesson, index) => {
              const isCurrent = lesson.id === currentLessonId
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center space-x-3 p-2 rounded ${
                    isCurrent ? "bg-primary/10" : ""
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm flex-1 ${
                      lesson.completed
                        ? "text-gray-600 line-through"
                        : isCurrent
                        ? "text-primary font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {index + 1}. {lesson.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


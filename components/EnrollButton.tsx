"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { toast } from "@/lib/toast"
import { LoadingSpinner } from "@/components/LoadingSpinner"

interface EnrollButtonProps {
  courseId: string
  isEnrolled: boolean
  userId?: string
}

export function EnrollButton({ courseId, isEnrolled, userId }: EnrollButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleEnroll = async () => {
    if (!userId) {
      router.push("/auth/login")
      toast.info("Please sign in to enroll in courses")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })

      if (response.ok) {
        toast.success("Successfully enrolled!", "You now have access to all course materials.")
        router.refresh()
      } else {
        const data = await response.json()
        toast.error("Enrollment failed", data.error || "Please try again later.")
      }
    } catch (error) {
      toast.error("Something went wrong", "Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <Button disabled className="w-full">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Enrolled
      </Button>
    )
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading || !userId}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          Enrolling...
        </>
      ) : (
        "Enroll Now (Free)"
      )}
    </Button>
  )
}


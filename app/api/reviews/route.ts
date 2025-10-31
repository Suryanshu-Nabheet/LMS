import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { courseId, rating, comment } = await req.json()

    if (!courseId || !rating) {
      return NextResponse.json(
        { error: "Course ID and rating are required" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.user.id,
          courseId,
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "You must be enrolled in this course to leave a review" },
        { status: 403 }
      )
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    })

    if (existingReview) {
      // Update existing review
      const updatedReview = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          rating,
          comment: comment || null,
        },
      })

      return NextResponse.json(updatedReview)
    }

    // Create new review (user info will be added automatically by local-db)
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        courseId,
        rating,
        comment: comment || null,
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


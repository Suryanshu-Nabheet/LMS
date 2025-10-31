import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createPaymentIntent } from "@/lib/payments"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { courseId, amount } = await req.json()

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Placeholder - Replace with actual Stripe integration
    const result = await createPaymentIntent(amount, courseId, session.user.id)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      clientSecret: result.clientSecret,
      message: "Payment integration coming soon. For now, courses are free.",
    })
  } catch (error) {
    console.error("Payment intent error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


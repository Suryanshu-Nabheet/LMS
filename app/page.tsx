import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CourseCard } from "@/components/courses/CourseCard"
import { prisma } from "@/lib/prisma"
import { HeroSection } from "@/components/landing/HeroSection"
import { StatsSection } from "@/components/landing/StatsSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import WorldMapSection from "@/components/landing/WorldMapSection"

async function getFeaturedCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      include: {
        instructor: {
          select: {
            name: true,
            image: true,
          },
        },
        enrollments: true,
        reviews: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    })

    return courses.map((course) => ({
      ...course,
      rating:
        course.reviews.length > 0
          ? course.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
            course.reviews.length
          : 0,
      totalReviews: course.reviews.length,
      enrollments: course.enrollments.length,
    }))
  } catch (error) {
    console.error("Error fetching featured courses:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="py-16 bg-gray-50 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#1E293B]">
                Featured Courses
              </h2>
              <Link href="/courses">
                <Button variant="ghost">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  thumbnailUrl={course.thumbnailUrl}
                  instructor={course.instructor}
                  category={course.category}
                  difficulty={course.difficulty}
                  rating={course.rating}
                  totalReviews={course.totalReviews}
                  enrollments={course.enrollments}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* World Map Section */}
      <WorldMapSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of students and start your learning journey today.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}


"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { BookOpen, User, LogOut } from "lucide-react"
import { SearchBar } from "@/components/shared/SearchBar"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-[#1E293B]">CourseX</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/courses">
            <Button variant="ghost">Browse Courses</Button>
          </Link>
          {session ? (
            <div className="flex items-center space-x-2">
              <Link href={session.user.role === "INSTRUCTOR" ? "/dashboard/instructor" : "/dashboard/student"}>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


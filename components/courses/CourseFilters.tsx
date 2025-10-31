"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState } from "react"

interface CourseFiltersProps {
  categories: string[]
  searchParams: { [key: string]: string | string[] | undefined }
}

export function CourseFilters({ categories, searchParams }: CourseFiltersProps) {
  const router = useRouter()
  const [search, setSearch] = useState((searchParams.search as string) || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (searchParams.category) params.set("category", searchParams.category as string)
    if (searchParams.difficulty) params.set("difficulty", searchParams.difficulty as string)
    if (searchParams.sort) params.set("sort", searchParams.sort as string)
    router.push(`/courses?${params.toString()}`)
  }

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    Object.entries(searchParams).forEach(([k, v]) => {
      if (k !== key && v) params.set(k, v as string)
    })
    if (value) params.set(key, value)
    router.push(`/courses?${params.toString()}`)
  }

  return (
    <div className="mb-8 sm:mb-12 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </form>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <Select
          value={(searchParams.category as string) || "all"}
          onValueChange={(value) => updateFilter("category", value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={(searchParams.difficulty as string) || "all"}
          onValueChange={(value) => updateFilter("difficulty", value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={(searchParams.sort as string) || "newest"}
          onValueChange={(value) => updateFilter("sort", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="enrollments">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


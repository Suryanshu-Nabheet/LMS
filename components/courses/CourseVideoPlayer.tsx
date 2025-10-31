"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseVideoPlayerProps {
  videoUrl?: string | null
  thumbnailUrl: string
  title: string
}

export function CourseVideoPlayer({ videoUrl, thumbnailUrl, title }: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  if (isPlaying) {
    // Extract video ID from YouTube URL if needed
    const getYouTubeEmbedUrl = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      const videoId = match && match[2].length === 11 ? match[2] : null
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`
      }
      
      // If it's already an embed URL, just add autoplay
      if (url.includes('youtube.com/embed') || url.includes('youtu.be')) {
        return url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`
      }
      
      return url
    }

    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(true)}>
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <div className="bg-white/90 hover:bg-white rounded-full p-4 transition-all transform group-hover:scale-110">
          <Play className="h-12 w-12 text-gray-900 fill-gray-900" />
        </div>
      </div>
    </div>
  )
}

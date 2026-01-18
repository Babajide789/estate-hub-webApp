"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark } from "lucide-react"
import { addBookmark, removeBookmark } from "@/lib/supabase/bookmarks"
import { useAuth } from "@/hooks/useAuth"

export function BookmarkButton({ propertyId }: { propertyId: string }) {
  const { user } = useAuth()
  const router = useRouter()

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  async function toggleBookmark() {
    if (!user) {
      router.push("/signin")
      return
    }

    setLoading(true)

    try {
      if (saved) {
        await removeBookmark(propertyId)
        setSaved(false)
      } else {
        await addBookmark(propertyId)
        setSaved(true)
      }
    } catch (err: any) {
      if (err.message === "NOT_AUTHENTICATED") {
        router.push("/signin")
      } else {
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleBookmark()
      }}
      disabled={loading}
      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full"
    >
      <Bookmark
        className={`w-5 h-5 ${
          saved ? "fill-blue-600 text-blue-600" : "text-gray-600"
        }`}
      />
    </button>
  )
}

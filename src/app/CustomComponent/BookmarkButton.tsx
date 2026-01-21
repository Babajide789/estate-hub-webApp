"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark } from "lucide-react"

/** 🔴 CHANGED: import toggleBookmark instead of add/remove */
import { toggleBookmark } from "@/lib/supabase/bookmarks"

import { useAuth } from "@/hooks/useAuth"

export function BookmarkButton({ propertyId }: { propertyId: string }) {
  const { user } = useAuth()
  const router = useRouter()

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  /** 🔴 CHANGED: renamed function to avoid name clash */
  async function handleToggleBookmark() {
    if (!user) {
      router.push("/signin")
      return
    }

    setLoading(true)

    try {
      /** 🔴 CHANGED: single toggle call */
      const result = await toggleBookmark(propertyId)

      /** 🔴 CHANGED: set state from returned value */
      setSaved(result.bookmarked)
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

        /** 🔴 CHANGED: call new handler */
        handleToggleBookmark()
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

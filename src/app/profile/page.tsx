"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/hooks/useAuth"
import { signOut } from "@/lib/supabase/auth"
import { getUserBookmarks } from "@/lib/supabase/bookmarks"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [bookmarksLoading, setBookmarksLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
    }
  }, [user, loading, router])

  // Fetch bookmarks once user is available
  useEffect(() => {
    if (!user) return

    async function fetchBookmarks() {
      try {
        const data = await getUserBookmarks()
        setBookmarks(data ?? [])
      } catch (error) {
        console.error("Failed to load bookmarks:", error)
      } finally {
        setBookmarksLoading(false)
      }
    }

    fetchBookmarks()
  }, [user])

  if (loading) return <p className="p-8">Loading profile...</p>

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <p className="mb-6">Email: {user?.email}</p>

      {/* SAVED PROPERTIES */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Saved Properties
        </h2>

        {bookmarksLoading && (
          <p className="text-gray-500">Loading saved properties…</p>
        )}

        {!bookmarksLoading && bookmarks.length === 0 && (
          <p className="text-gray-500">
            No saved properties yet.
          </p>
        )}

        <ul className="space-y-3">
          {bookmarks.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded"
            >
              Property ID: {item.property_id}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="mt-8"
        onClick={async () => {
          await signOut()
          router.push("/signin")
        }}
      >
        Sign Out
      </Button>
    </div>
  )
}

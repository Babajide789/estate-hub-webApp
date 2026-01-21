"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { getUserBookmarks } from "@/lib/supabase/bookmarks"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/supabase/auth"
import { Property } from "../types/property"
import { PropertyCard } from "../CustomComponent/PropertyCard"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [savedProperties, setSavedProperties] = useState<Property[]>([])
  const [fetching, setFetching] = useState(true)

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
    }
  }, [user, loading, router])

  // 📦 Fetch saved properties
  useEffect(() => {
    async function loadBookmarks() {
      try {
        const data = await getUserBookmarks()
        setSavedProperties(data || [])
      } catch (err) {
        console.error("Failed to load bookmarks", err)
      } finally {
        setFetching(false)
      }
    }

    if (user) loadBookmarks()
  }, [user])

  if (loading || fetching) {
    return (
      <div className="container py-12">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* PROFILE HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold mb-1">My Profile</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <Button
          variant="outline"
          onClick={async () => {
            await signOut()
            router.push("/signin")
          }}
        >
          Sign Out
        </Button>
      </div>

      {/* SAVED PROPERTIES */}
      <section id="bookmarks">
        <h2 className="text-2xl font-semibold mb-6">
          Saved Properties
        </h2>

        {savedProperties.length === 0 ? (
          <p className="text-gray-500">
            You haven’t saved any properties yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

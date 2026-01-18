"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/supabase/auth"
import { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    loadUser()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}

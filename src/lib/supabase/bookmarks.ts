import { supabase } from "./client"

export async function addBookmark(propertyId: string) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error("NOT_AUTHENTICATED")
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      property_id: propertyId,
    })

  if (error) {
    console.error("Bookmark insert error:", error)
    throw error
  }
}

export async function removeBookmark(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("property_id", propertyId)
    .eq("user_id", user.id)

  if (error) throw error
}

export async function getUserBookmarks() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)

  if (error) throw error

  return data
}

export async function toggleBookmark(propertyId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .single()

  if (existing) {
    return supabase
      .from("bookmarks")
      .delete()
      .eq("id", existing.id)
  }

  return supabase.from("bookmarks").insert({
    user_id: user.id,
    property_id: propertyId,
  })
}
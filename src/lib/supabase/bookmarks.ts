import { supabase } from "./client"

export async function addBookmark(propertyId: string) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error("NOT_AUTHENTICATED")
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      property_id: propertyId,
    })
    .select()

  if (error) {
    console.error("FULL BOOKMARK ERROR:", error)
    throw error
  }

  return data
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
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("NOT_AUTHENTICATED")

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      properties (
        id,
        title,
        price,
        description,
        location,
        image,
        status
      )
    `)
    .eq("user_id", user.id)

  if (error) throw error

  // Map out the nested structure
  return data
    .map(row => row.properties)
    .filter(Boolean)
}


export async function toggleBookmark(propertyId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("NOT_AUTHENTICATED")

  // Check if exists
  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .maybeSingle()

  if (existing) {
    // 🔥 Already bookmarked → remove
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", existing.id)

    if (error) throw error

    return { bookmarked: false }
  } else {
    // ➕ Not bookmarked → add
    const { error } = await supabase.from("bookmarks").insert({
      user_id: user.id,
      property_id: propertyId,
    })

    if (error) throw error

    return { bookmarked: true }
  }
}


export async function isBookmarked(propertyId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .maybeSingle()

  return !!data
}

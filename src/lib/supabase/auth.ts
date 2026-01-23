import { supabase } from "./client"

/**
 * Sign up user
 */
interface SignUpParams {
  email: string
  password: string
  full_name?: string
}

export async function signUp({
  email,
  password,
  full_name,
}: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  })

  if (error) throw error
  return data
}

/**
 * Sign in user
 */
export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Get current logged-in user
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) return null
  return data.user
}

/**
 * Sign out user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

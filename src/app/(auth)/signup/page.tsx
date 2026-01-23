"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/supabase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      // Supabase may require email confirmation
      router.push("/signin")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 border p-6 rounded-lg bg-white"
      >
        <h1 className="text-2xl font-semibold text-center">
          Create your account
        </h1>

        {/* Full Name */}
        <div className="space-y-1">
          <Label>Full Name</Label>
          <Input
            placeholder="John Doe"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <Button className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  )
}

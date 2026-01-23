"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from "@/lib/supabase/auth"
import { LogoutConfirm } from "./LogoutConfirm"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

interface NavItemsProps {
  pathname: string
  mobile?: boolean
  onNavigate?: () => void
}

function NavItems({ pathname, mobile = false, onNavigate }: NavItemsProps) {
  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-2"
          : "hidden md:flex items-center gap-6"
      }
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`
              relative transition-all duration-200
              ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
              ${mobile ? "text-lg px-3 py-2 rounded-md" : ""}
            `}
          >
            {item.label}

            {/* Desktop underline */}
            {!mobile && isActive && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 rounded-full" />
            )}

            {/* Mobile left indicator */}
            {mobile && isActive && (
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r" />
            )}
          </Link>
        )
      })}
    </div>
  )
}


export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)
  const isAuthPage = ["/signin", "/signup", "/forgot-password"].includes(pathname)

  // ✅ Prevent auth flicker (THIS IS THE KEY FIX)
  if (loading) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Home className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold">EstateHub</span>
        </Link>

        {/* Desktop Nav */}
        {!isAuthPage && <NavItems pathname={pathname} />}

        {/* Desktop Profile / Auth */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>


                    <LogoutConfirm
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600 focus:text-red-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </DropdownMenuItem>
                      }
                    />

                  </>
                ) : (
                  <DropdownMenuItem onClick={() => router.push("/signin")}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Mobile Nav */}
        {!isAuthPage && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <NavItems
                pathname={pathname}
                mobile
                onNavigate={closeMobileMenu}
              />

              <div className="mt-6 space-y-3">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        closeMobileMenu()
                        router.push("/profile")
                      }}
                    >
                      Profile
                    </Button>

                    <LogoutConfirm
                      onAfterLogout={closeMobileMenu}
                      trigger={
                        <Button
                          variant="destructive"
                          className="w-full"
                        >
                          Sign Out
                        </Button>
                      }
                    />

                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      closeMobileMenu()
                      router.push("/signin")
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  )
}

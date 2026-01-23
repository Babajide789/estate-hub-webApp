"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Menu,
  X,
  User,
  Bookmark,
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
          ? "flex flex-col gap-4"
          : "hidden md:flex items-center gap-6"
      }
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`${
              isActive
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } transition-colors ${mobile ? "text-lg" : ""}`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)
  const isAuthPage = ["/signin", "/signup", "/forgot-password"].includes(pathname)

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

        {/* Profile / Auth */}
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

                    <DropdownMenuItem
                      onClick={async () => {
                        await signOut()
                        router.push("/signin")
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
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

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        closeMobileMenu()
                        router.push("/profile#bookmarks")
                      }}
                    >
                      Saved Properties
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={async () => {
                        await signOut()
                        closeMobileMenu()
                        router.push("/signin")
                      }}
                    >
                      Sign Out
                    </Button>
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


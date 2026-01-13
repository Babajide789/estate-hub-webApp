"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface NavItemsProps {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
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
        const isActive = pathname === item.href;

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
        );
      })}

      <Link href="/contact" onClick={onNavigate}>
        <Button className={mobile ? "w-full" : ""}>
          List Property
        </Button>
      </Link>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);

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
        <NavItems pathname={pathname} />

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          </SheetContent>

        </Sheet>
      </div>
    </header>
  );
}

import Link from "next/link";
import {
  Home,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/constants/socials";
import { footerLinks } from "@/constants/footer-links";


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Home className="w-6 h-6 text-blue-500" />
              <span className="text-xl text-white">EstateHub</span>
            </Link>

            <p className="text-sm mb-4">
              Your trusted partner in finding the perfect property. We combine
              technology with personalized service for exceptional results.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, path, label }) => (
                <Link
                  key={label}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-blue-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white mb-4">Property Types</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.propertyTypes.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-blue-500 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-blue-500" />
                <span>
                  123 Real Estate Blvd, Suite 100
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href="tel:+15551234567" className="hover:text-blue-500">
                  +1 (555) 123-4567
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:info@estatehub.com" className="hover:text-blue-500">
                  info@estatehub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} EstateHub. All rights reserved.</p>

          <div className="flex gap-6">
            {footerLinks.legal.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-blue-500 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}

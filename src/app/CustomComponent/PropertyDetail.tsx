"use client";

import { useRouter } from "next/navigation";
import { Property } from "../types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  ArrowLeft,
  Phone,
  Mail,
  Share2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back */}
      <Button
        variant="ghost"
        onClick={() => router.push("/properties")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Properties
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          <div className="relative h-96 md:h-125 rounded-lg overflow-hidden mb-6">
            <ImageWithFallback
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-blue-600 text-lg px-4 py-2">
              {property.status}
            </Badge>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <p>{property.location}</p>
                </div>
              </div>
              <p className="text-3xl text-blue-600">
                ${property.price.toLocaleString()}
                {property.status === "For Rent" && (
                  <span className="text-xl">/mo</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Info icon={Bed} label="Bedrooms" value={property.bedrooms} />
              <Info icon={Bath} label="Bathrooms" value={property.bathrooms} />
              <Info icon={Square} label="Sq Ft" value={property.sqft.toLocaleString()} />
              <Info icon={Calendar} label="Year Built" value={property.yearBuilt} />
            </div>

            <Separator className="my-6" />

            <Section title="Description">
              {property.description}
            </Section>

            <Separator className="my-6" />

            <Section title="Property Type">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                <p>{property.type}</p>
              </div>
            </Section>

            <Separator className="my-6" />

            <Section title="Features & Amenities">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Contact Agent</h3>

              <div className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/contact")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule a Viewing
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Property
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm text-gray-600">
                <Row label="Property ID" value={`#${property.id.padStart(6, "0")}`} />
                <Row label="Status" value={<Badge variant="secondary">{property.status}</Badge>} />
                <Row label="Type" value={property.type} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function Info({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

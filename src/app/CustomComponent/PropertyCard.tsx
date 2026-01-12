"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Property } from "../types/property";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <Link
        href={`/properties/${property.id}`}
        className="block focus:outline-none"
        prefetch
      >
        <div className="relative">
          {/* IMAGE */}
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* FAVORITE BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite((prev) => !prev);
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            aria-label="Save property"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>

          <Badge className="absolute top-4 left-4 bg-blue-600">
            {property.status}
          </Badge>
        </div>

        {/* CONTENT */}
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-xl text-blue-600">
              ${property.price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <p className="text-sm">{property.location}</p>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

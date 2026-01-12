"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, TrendingUp, Award, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Property } from "../types/property";
import { PropertyCard } from "./PropertyCard";

interface HomePageProps {
  featuredProperties: Property[];
}

export function HomePage({ featuredProperties }: HomePageProps) {
  const router = useRouter();

  const stats = [
    { icon: Home, value: "500+", label: "Properties Listed" },
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: TrendingUp, value: "$2B+", label: "Property Value" },
    { icon: Award, value: "15+", label: "Years Experience" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover the perfect property from our extensive collection of premium real estate listings
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push("/properties")}
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Properties
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => router.push("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <p className="text-3xl mb-1">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl mb-2">Featured Properties</h2>
              <p className="text-gray-600">Handpicked properties just for you</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/properties")}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() =>
                  router.push(`/properties/${property.id}`)
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

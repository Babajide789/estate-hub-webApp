"use client";

import { Property } from "../types/property";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { PropertyFilters as Filters } from "../types/filters";
import { useRouter } from "next/navigation";

interface PropertiesPageProps {
  properties: Property[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function PropertiesPage({
  properties,
  filters,
  onFiltersChange,
}: PropertiesPageProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-2">Browse Properties</h1>
        <p className="text-gray-600">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"} available
        </p>
      </div>

      <PropertyFilters
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() =>
                router.push(`/properties/${property.id}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            No properties found matching your criteria
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}

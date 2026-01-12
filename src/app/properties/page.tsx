"use client"

import { useMemo, useState } from "react";
import { properties } from "../data/properties";
import { PropertyFilters } from "../types/filters";
import PropertiesPage from "../CustomComponent/PropertiesPage";


export default function PropertiesRoute() {
  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    status: "all",
    type: "all",
    priceRange: [0, 6_000_000],
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (
        filters.search &&
        !property.title
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.status !== "all" &&
        property.status !== filters.status
      ) {
        return false;
      }

      if (
        filters.type !== "all" &&
        property.type !== filters.type
      ) {
        return false;
      }

      if (
        property.price < filters.priceRange[0] ||
        property.price > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <PropertiesPage
      properties={filteredProperties}
      filters={filters}
      onFiltersChange={setFilters}
    />
  );
}

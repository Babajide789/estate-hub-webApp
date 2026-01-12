export interface PropertyFilters {
  search: string;
  status: "all" | "For Sale" | "For Rent" | "Sold";
  type: "all" | "House" | "Apartment" | "Condo" | "Villa" | "Penthouse";
  priceRange: [number, number];
  bedrooms?: number;
  bathrooms?: number;
}

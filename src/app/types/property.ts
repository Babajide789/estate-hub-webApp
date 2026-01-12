export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  status: "For Sale" | "For Rent" | "Sold";
  type: "House" | "Apartment" | "Condo" | "Villa" | "Penthouse";
  yearBuilt: number;
  features: string[];
}

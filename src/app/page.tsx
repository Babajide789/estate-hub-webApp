import { Metadata } from "next";
import { HomePage } from "./CustomComponent/HomePage";
import { properties } from "./data/properties";

export const metadata: Metadata = {
  title: "EstateHub - Find Your Dream Home",
  description:
    "Discover premium properties for sale and rent. Find houses, apartments, condos, and luxury homes.",
  openGraph: {
    title: "EstateHub - Find Your Dream Home",
    description:
      "Discover premium properties for sale and rent.",
    type: "website",
  },
};

export default function Home() {
  const featuredProperties = properties
    .filter((p) => p.status === "For Sale")
    .slice(0, 3);

  return (
    <HomePage
      featuredProperties={featuredProperties}
    />
  );
}

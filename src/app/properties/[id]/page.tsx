import { PropertyDetail } from "@/app/CustomComponent/PropertyDetail";
import { properties } from "@/___mocks___/properties";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>; // now async
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params; // unwrap the promise

  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}

export interface Listing {
  pid: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;

  address: string;
  city: string;
  state: string;
  zip: string;

  latitude?: number;
  longitude?: number;

  status: "ACTIVE" | "PENDING" | "SOLD" | "RENTED";
  type: "PROPERTY" | "CAR" | "OTHER";

  agentId: string;

  // MATCH JSON
  images: string[];

  inquiries?: unknown[];

  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;

  createdAt: string;
  updatedAt: string;

  agent?: any;

  features?: string[];
  amenities?: string[];

  propertyType?: string;
  parkingSpots?: number;
  floorNumber?: number;
  totalFloors?: number;
  hoaFee?: number;
  propertyTax?: number;
  heatingType?: string;
  coolingType?: string;
  lastRenovated?: number;
}
export type ListingStatus = "ACTIVE" | "PENDING" | "SOLD" | "RENTED";
export type ListingType = "PROPERTY" | "CAR" | "OTHER";

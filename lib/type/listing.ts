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
  status: ListingStatus;
  type: ListingType;
  agentId: string;
  images: string[];
  inquiries: any[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  agent?: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
  };
}
export type ListingStatus = "ACTIVE" | "PENDING" | "SOLD" | "RENTED";
export type ListingType = "PROPERTY" | "CAR" | "OTHER";

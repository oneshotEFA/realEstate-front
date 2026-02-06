"use client";

import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Ruler,
  Bed,
  Bath,
  Car,
  Building,
  Home,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
  DollarSign,
  Clock,
  Shield,
  FileText,
  Printer,
  Download,
  Bookmark,
  MessageSquare,
  Video,
  X,
  Globe,
  Wifi,
  Thermometer,
  Droplets,
  Tv,
  Coffee,
  Dumbbell,
  Waves,
  TreePine,
  CarFront,
  WashingMachine,
  Microwave,
  Refrigerator,
  Utensils,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

// Types based on your schema
interface ListingImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  email: string;
  licenseId?: string;
  yearsExperience?: number;
  specialties?: string[];
}

interface Listing {
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
  images: ListingImage[];
  createdAt: Date;
  updatedAt: Date;
  agent?: Agent;
  features?: string[];
  amenities?: string[];
  // Additional details
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

const ListingDetailPage = ({ params }: { params: { slug: string } }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Mock listing data
  const listing: Listing = {
    pid: "prop_1",
    title: "Modern Luxury Villa with Ocean Views",
    slug: "modern-luxury-villa-ocean-views",
    description:
      "Stunning contemporary villa featuring breathtaking ocean views, premium finishes, and state-of-the-art smart home technology. This exquisite property offers the ultimate in luxury living with its open-concept design, floor-to-ceiling windows, and seamless indoor-outdoor flow. The chef's kitchen boasts top-of-the-line appliances, while the master suite includes a spa-like bathroom and private balcony overlooking the Pacific.",
    price: 3850000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 5200,
    lotSize: 0.75,
    yearBuilt: 2023,
    address: "123 Oceanview Drive",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    status: "ACTIVE",
    type: "PROPERTY",
    agentId: "agent_1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    propertyType: "Single Family Home",
    parkingSpots: 3,
    floorNumber: 2,
    totalFloors: 2,
    hoaFee: 450,
    propertyTax: 38500,
    heatingType: "Central",
    coolingType: "Central AC",
    lastRenovated: 2023,
    features: [
      "Ocean View",
      "Smart Home",
      "Wine Cellar",
      "Home Theater",
      "Pool",
      "Spa",
      "Outdoor Kitchen",
      "Solar Panels",
      "EV Charging",
      "Security System",
    ],
    amenities: [
      "Pool",
      "Spa",
      "Gym",
      "Wine Cellar",
      "Home Theater",
      "Outdoor Kitchen",
      "Smart Home",
      "Solar Panels",
      "EV Charging",
      "Security System",
      "Central AC",
      "Hardwood Floors",
      "Walk-in Closets",
      "Wet Bar",
      "Fireplace",
    ],
    images: [
      {
        id: "img_1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
        caption: "Front exterior with modern architecture",
        isPrimary: true,
      },
      {
        id: "img_2",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop",
        caption: "Living room with panoramic ocean view",
      },
      {
        id: "img_3",
        url: "https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=1200&h=800&fit=crop",
        caption: "Chef's kitchen with premium appliances",
      },
      {
        id: "img_4",
        url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop",
        caption: "Master bedroom suite with private balcony",
      },
      {
        id: "img_5",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=800&fit=crop",
        caption: "Infinity pool and outdoor entertainment area",
      },
      {
        id: "img_6",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        caption: "Home theater with 4K projection system",
      },
      {
        id: "img_7",
        url: "https://images.unsplash.com/photo-1570129477492-45b003493e3b?w=1200&h=800&fit=crop",
        caption: "Wine cellar with temperature control",
      },
      {
        id: "img_8",
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
        caption: "Private gym with premium equipment",
      },
    ],
    agent: {
      id: "agent_1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 128,
      phone: "+1 (555) 123-4567",
      email: "sarah@ayelehomes.com",
      licenseId: "CA-1234567",
      yearsExperience: 15,
      specialties: [
        "Luxury Homes",
        "Waterfront Properties",
        "Investment Properties",
      ],
    },
  };

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + listing.images.length) % listing.images.length,
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getPricePerSqft = () => {
    if (listing.squareFeet) {
      return (listing.price / listing.squareFeet).toFixed(2);
    }
    return "0";
  };

  // Handle click outside modal
  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setImageModalOpen(false);
    }
  };

  // Image Gallery Component
  const ImageGallery = () => (
    <div className="relative">
      {/* Main Image */}
      <div
        className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden cursor-zoom-in group"
        onClick={() => setImageModalOpen(true)}
      >
        <img
          src={listing.images[currentImageIndex].url}
          alt={listing.images[currentImageIndex].caption || listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Image Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {currentImageIndex + 1} / {listing.images.length}
          </span>
        </div>

        {/* Expand Button */}
        <button className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Maximize2 size={24} className="text-white" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {listing.images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToImage(index)}
            className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              currentImageIndex === index
                ? "border-primary scale-105 shadow-lg"
                : "border-transparent hover:border-primary/50"
            }`}
          >
            <img
              src={image.url}
              alt={image.caption || `Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {currentImageIndex === index && (
              <div className="absolute inset-0 bg-primary/20" />
            )}
          </button>
        ))}
      </div>

      {/* View All Images Button */}
      <button
        onClick={() => setShowAllImages(true)}
        className="mt-4 w-full py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors font-semibold flex items-center justify-center gap-2"
      >
        View All {listing.images.length} Photos
      </button>
    </div>
  );

  // Quick Stats Component
  const QuickStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Bed size={24} className="text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground">
          {listing.bedrooms}
        </div>
        <div className="text-sm text-foreground/60">Bedrooms</div>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Bath size={24} className="text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground">
          {listing.bathrooms}
        </div>
        <div className="text-sm text-foreground/60">Bathrooms</div>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Ruler size={24} className="text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground">
          {listing.squareFeet?.toLocaleString()}
        </div>
        <div className="text-sm text-foreground/60">Square Feet</div>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Car size={24} className="text-primary" />
        </div>
        <div className="text-2xl font-bold text-foreground">
          {listing.parkingSpots}
        </div>
        <div className="text-sm text-foreground/60">Parking</div>
      </div>
    </div>
  );

  // Price Breakdown Component
  const PriceBreakdown = () => (
    <div className="bg-white rounded-2xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Price Details</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-foreground/60">List Price</span>
          <span className="font-semibold">{formatPrice(listing.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Price per Sq Ft</span>
          <span className="font-semibold">${getPricePerSqft()}</span>
        </div>
        {listing.hoaFee && (
          <div className="flex justify-between">
            <span className="text-foreground/60">HOA Fees</span>
            <span className="font-semibold">${listing.hoaFee}/month</span>
          </div>
        )}
        {listing.propertyTax && (
          <div className="flex justify-between">
            <span className="text-foreground/60">Property Tax</span>
            <span className="font-semibold">${listing.propertyTax}/year</span>
          </div>
        )}
      </div>
    </div>
  );

  // Features & Amenities Component
  const FeaturesAmenities = () => (
    <div className="bg-white rounded-2xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Features & Amenities
      </h3>

      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          Key Features
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {listing.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-2">
              <Check size={16} className="text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-4">Amenities</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-primary" />
              <span className="text-sm">High-Speed Internet</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-primary" />
              <span className="text-sm">Central Heating</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={16} className="text-primary" />
              <span className="text-sm">Central Cooling</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tv size={16} className="text-primary" />
              <span className="text-sm">Home Theater</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee size={16} className="text-primary" />
              <span className="text-sm">Wet Bar</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell size={16} className="text-primary" />
              <span className="text-sm">Private Gym</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Waves size={16} className="text-primary" />
              <span className="text-sm">Pool & Spa</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine size={16} className="text-primary" />
              <span className="text-sm">Landscaped Yard</span>
            </div>
            <div className="flex items-center gap-2">
              <CarFront size={16} className="text-primary" />
              <span className="text-sm">Garage</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <WashingMachine size={16} className="text-primary" />
              <span className="text-sm">Laundry Room</span>
            </div>
            <div className="flex items-center gap-2">
              <Refrigerator size={16} className="text-primary" />
              <span className="text-sm">Smart Appliances</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils size={16} className="text-primary" />
              <span className="text-sm">Outdoor Kitchen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Agent Card Component
  const AgentCard = () => (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-start gap-4 mb-6">
        <img
          src={
            listing.agent?.avatar ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
          }
          alt={listing.agent?.name}
          className="w-20 h-20 rounded-2xl border-2 border-white shadow-lg"
        />
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {listing.agent?.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{listing.agent?.rating}</span>
            <span className="text-foreground/60">
              ({listing.agent?.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Shield size={14} className="text-primary" />
            <span className="text-sm text-foreground/60">
              License: {listing.agent?.licenseId}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-foreground/60" />
          <a
            href={`tel:${listing.agent?.phone}`}
            className="text-foreground hover:text-primary transition-colors"
          >
            {listing.agent?.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-foreground/60" />
          <a
            href={`mailto:${listing.agent?.email}`}
            className="text-foreground hover:text-primary transition-colors"
          >
            {listing.agent?.email}
          </a>
        </div>
      </div>

      <button
        onClick={() => setShowContactForm(true)}
        className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold mb-3"
      >
        Contact Agent
      </button>

      <button className="w-full py-3 border border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center justify-center gap-2">
        <MessageSquare size={18} />
        Schedule Tour
      </button>

      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
        <div className="flex flex-wrap gap-2">
          {listing.agent?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Form Modal
  const ContactFormModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in slide-in-up duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Contact Agent</h3>
          <button
            onClick={() => setShowContactForm(false)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
              placeholder={`Hi ${listing.agent?.name}, I'm interested in ${listing.title}...`}
              defaultValue={`Hi ${listing.agent?.name}, I'm interested in ${listing.title} and would like to schedule a viewing. Please contact me with available times.`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  // Full Image Gallery Modal
  const FullImageGallery = () => (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-full" ref={modalRef}>
        <button
          onClick={() => setShowAllImages(false)}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X size={24} className="text-white" />
        </button>

        <div className="relative h-full rounded-2xl overflow-hidden">
          <img
            src={listing.images[currentImageIndex].url}
            alt={listing.images[currentImageIndex].caption || listing.title}
            className="w-full h-full object-contain"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-white text-lg font-medium">
              {currentImageIndex + 1} / {listing.images.length}
            </span>
          </div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 max-w-lg">
            <p className="text-white text-center">
              {listing.images[currentImageIndex].caption}
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 overflow-x-auto">
          <div className="flex gap-2 justify-center px-4">
            {listing.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-white scale-110"
                    : "border-transparent hover:border-white/50"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {currentImageIndex === index && (
                  <div className="absolute inset-0 bg-white/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/listings"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Listings</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-xl transition-all ${
                  isFavorite
                    ? "bg-red-500/10 text-red-500"
                    : "bg-primary/10 text-foreground hover:text-primary"
                }`}
              >
                <Heart size={20} className={isFavorite ? "fill-red-500" : ""} />
              </button>

              <button className="p-3 rounded-xl bg-primary/10 text-foreground hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>

              <button className="p-3 rounded-xl bg-primary/10 text-foreground hover:text-primary transition-colors">
                <Printer size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:w-2/3">
            {/* Title & Price */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-2 text-foreground/60">
                    <MapPin size={18} />
                    <span>
                      {listing.address}, {listing.city}, {listing.state}{" "}
                      {listing.zip}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                    {formatPrice(listing.price)}
                  </div>
                  {listing.squareFeet && (
                    <div className="text-foreground/60">
                      ${getPricePerSqft()} per sq ft
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-semibold">{listing.status}</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <ImageGallery />
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <QuickStats />
            </div>

            {/* Tabs Navigation */}
            <div className="mb-8">
              <div className="flex overflow-x-auto border-b border-border">
                {[
                  "overview",
                  "features",
                  "location",
                  "financial",
                  "documents",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedFeature(tab)}
                    className={`px-6 py-3 font-semibold capitalize transition-colors border-b-2 ${
                      selectedFeature === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tab Content */}
            <div className="mb-8">
              {selectedFeature === "overview" && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Property Overview
                  </h3>
                  <p className="text-foreground/70 leading-relaxed mb-6">
                    {listing.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Property Type
                      </div>
                      <div className="font-semibold">
                        {listing.propertyType}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Year Built
                      </div>
                      <div className="font-semibold">{listing.yearBuilt}</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Lot Size
                      </div>
                      <div className="font-semibold">
                        {listing.lotSize} acres
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Last Renovated
                      </div>
                      <div className="font-semibold">
                        {listing.lastRenovated}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeature === "features" && <FeaturesAmenities />}

              {selectedFeature === "location" && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Location Details
                  </h3>
                  <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Globe
                        size={48}
                        className="text-primary/30 mx-auto mb-4"
                      />
                      <p className="text-foreground/60">
                        Interactive map would be displayed here
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        School District
                      </div>
                      <div className="font-semibold">Malibu Unified</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Walk Score
                      </div>
                      <div className="font-semibold">45/100</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60 mb-1">
                        Transit Score
                      </div>
                      <div className="font-semibold">30/100</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="mb-8">
              <PriceBreakdown />
            </div>
          </div>

          {/* Right Column - Agent & Actions */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <AgentCard />

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Schedule a Visit
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2">
                    <Calendar size={20} />
                    Schedule In-Person Tour
                  </button>
                  <button className="w-full py-3 border border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center justify-center gap-2">
                    <Video size={20} />
                    Virtual Tour
                  </button>
                  <button className="w-full py-3 border border-border text-foreground rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center justify-center gap-2">
                    <Download size={20} />
                    Download Brochure
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Property Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Days on Market</span>
                    <span className="font-semibold">12 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Price Trend</span>
                    <span className="font-semibold text-green-600">Stable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">
                      Similar Properties
                    </span>
                    <span className="font-semibold">8 nearby</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Market Value</span>
                    <span className="font-semibold">
                      {formatPrice(listing.price * 0.95)} -{" "}
                      {formatPrice(listing.price * 1.05)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showContactForm && <ContactFormModal />}
      {showAllImages && <FullImageGallery />}
    </div>
  );
};

export default ListingDetailPage;

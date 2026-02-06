"use client";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Star,
  Heart,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  Building2,
  Home as HomeIcon,
  Building,
  Warehouse,
  ArrowRight,
  X,
  SlidersHorizontal,
  Maximize2,
  DollarSign,
  Calendar,
  Check,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const PropertyListingPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    propertyType: "all",
    priceRange: [0, 5000000],
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "any",
    bathrooms: "any",
    sortBy: "featured",
    amenities: [] as string[],
    yearBuilt: [1990, 2024],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activePriceRange, setActivePriceRange] = useState([0, 5000000]);

  // Enhanced Property Data
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      price: 850000,
      pricePerSqft: 354,
      location: "Downtown District",
      address: "123 Main St, Downtown",
      type: "apartment",
      subtype: "Modern Apartment",
      beds: 3,
      baths: 2,
      size: 2400,
      year: 2022,
      rating: 4.8,
      featured: true,
      tags: ["New", "Luxury", "City View"],
      amenities: ["Pool", "Gym", "Parking", "Elevator"],
      description:
        "Stunning modern apartment with panoramic city views and premium finishes throughout.",
      agent: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop",
      price: 1250000,
      pricePerSqft: 357,
      location: "Suburban Heights",
      address: "456 Oak Avenue",
      type: "house",
      subtype: "Family House",
      beds: 4,
      baths: 3,
      size: 3500,
      year: 2020,
      rating: 4.9,
      featured: true,
      tags: ["Pool", "Garden", "Garage"],
      amenities: ["Pool", "Garden", "Garage", "Fireplace"],
      description:
        "Beautiful family home with spacious rooms and a large backyard perfect for entertaining.",
      agent: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=600&h=400&fit=crop",
      price: 450000,
      pricePerSqft: 375,
      location: "Hillside Area",
      address: "789 Pine Road",
      type: "cottage",
      subtype: "Cozy Cottage",
      beds: 2,
      baths: 1,
      size: 1200,
      year: 2018,
      rating: 4.6,
      tags: ["Renovated", "Garden"],
      amenities: ["Garden", "Fireplace", "Hardwood Floors"],
      description:
        "Charming cottage with rustic charm and modern amenities in a peaceful hillside setting.",
      agent: "Emma Wilson",
      agentAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
      price: 2100000,
      pricePerSqft: 420,
      location: "Waterfront",
      address: "101 Ocean Drive",
      type: "villa",
      subtype: "Luxury Villa",
      beds: 5,
      baths: 4,
      size: 5000,
      year: 2023,
      rating: 5.0,
      featured: true,
      tags: ["Waterfront", "Pool", "Smart Home"],
      amenities: ["Pool", "Smart Home", "Waterfront", "Gym", "Home Theater"],
      description:
        "Exclusive waterfront villa with private dock, infinity pool, and smart home technology.",
      agent: "David Miller",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
      price: 675000,
      pricePerSqft: 325,
      location: "Midtown",
      address: "202 Central Ave",
      type: "apartment",
      subtype: "Penthouse",
      beds: 3,
      baths: 2.5,
      size: 2080,
      year: 2021,
      rating: 4.7,
      tags: ["City View", "Rooftop"],
      amenities: ["Rooftop Terrace", "Concierge", "Wine Cellar"],
      description:
        "Luxurious penthouse with private rooftop terrace and stunning skyline views.",
      agent: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      price: 325000,
      pricePerSqft: 295,
      location: "East Side",
      address: "303 Maple Street",
      type: "townhouse",
      subtype: "Townhouse",
      beds: 2,
      baths: 2,
      size: 1100,
      year: 2019,
      rating: 4.5,
      tags: ["Pet Friendly", "Renovated"],
      amenities: ["Pet Friendly", "Balcony", "Hardwood Floors"],
      description:
        "Modern townhouse with open floor plan and private patio in a vibrant neighborhood.",
      agent: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1570129477492-45b003493e3b?w=600&h=400&fit=crop",
      price: 950000,
      pricePerSqft: 380,
      location: "Uptown",
      address: "404 Park Lane",
      type: "house",
      subtype: "Contemporary House",
      beds: 4,
      baths: 3,
      size: 2500,
      year: 2022,
      rating: 4.8,
      featured: true,
      tags: ["Smart Home", "Eco-Friendly", "Solar"],
      amenities: ["Smart Home", "Solar Panels", "EV Charging", "Garden"],
      description:
        "Energy-efficient contemporary home with smart features and sustainable design.",
      agent: "Emma Wilson",
      agentAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      price: 575000,
      pricePerSqft: 310,
      location: "West End",
      address: "505 River Road",
      type: "house",
      subtype: "Ranch House",
      beds: 3,
      baths: 2,
      size: 1850,
      year: 2017,
      rating: 4.4,
      tags: ["Single Story", "Mountain View"],
      amenities: ["Mountain View", "Large Yard", "Fireplace"],
      description:
        "Spacious ranch-style home with large yard and mountain views in a quiet neighborhood.",
      agent: "David Miller",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&h=400&fit=crop",
      price: 725000,
      pricePerSqft: 340,
      location: "Northridge",
      address: "606 Valley Rd",
      type: "house",
      subtype: "Modern Farmhouse",
      beds: 4,
      baths: 3,
      size: 2130,
      year: 2021,
      rating: 4.7,
      featured: true,
      tags: ["New Construction", "Smart Home"],
      amenities: ["Smart Home", "Chef's Kitchen", "Wine Cellar", "Pool"],
      description:
        "Brand new modern farmhouse with open concept living and premium finishes.",
      agent: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1512917774080-9c9e9be67c5f?w=600&h=400&fit=crop",
      price: 385000,
      pricePerSqft: 320,
      location: "Southgate",
      address: "707 Sunset Blvd",
      type: "apartment",
      subtype: "Loft Apartment",
      beds: 2,
      baths: 2,
      size: 1200,
      year: 2019,
      rating: 4.6,
      tags: ["Loft", "Exposed Brick"],
      amenities: ["High Ceilings", "Exposed Brick", "City View"],
      description:
        "Industrial-style loft apartment with exposed brick walls and high ceilings.",
      agent: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  // Enhanced Property Types
  const propertyTypes = [
    {
      value: "all",
      label: "All Types",
      icon: Building2,
      color: "bg-gradient-to-br from-primary/20 to-primary/10",
    },
    {
      value: "apartment",
      label: "Apartments",
      icon: Building,
      color: "bg-gradient-to-br from-blue-500/20 to-blue-400/10",
    },
    {
      value: "house",
      label: "Houses",
      icon: HomeIcon,
      color: "bg-gradient-to-br from-green-500/20 to-green-400/10",
    },
    {
      value: "villa",
      label: "Villas",
      icon: Warehouse,
      color: "bg-gradient-to-br from-purple-500/20 to-purple-400/10",
    },
    {
      value: "cottage",
      label: "Cottages",
      icon: HomeIcon,
      color: "bg-gradient-to-br from-amber-500/20 to-amber-400/10",
    },
    {
      value: "townhouse",
      label: "Townhouses",
      icon: Building,
      color: "bg-gradient-to-br from-red-500/20 to-red-400/10",
    },
  ];

  // Bedroom & Bathroom Options
  const bedroomOptions = [
    { value: "any", label: "Any", icon: "∞" },
    { value: "1", label: "1+", icon: "1" },
    { value: "2", label: "2+", icon: "2" },
    { value: "3", label: "3+", icon: "3" },
    { value: "4", label: "4+", icon: "4" },
    { value: "5", label: "5+", icon: "5" },
  ];

  // Sort Options
  const sortOptions = [
    { value: "featured", label: "Featured", icon: Sparkles },
    { value: "price-low", label: "Price: Low to High", icon: DollarSign },
    { value: "price-high", label: "Price: High to Low", icon: TrendingUp },
    { value: "newest", label: "Newest", icon: Calendar },
    { value: "rating", label: "Highest Rated", icon: Star },
    { value: "size", label: "Largest", icon: Maximize2 },
  ];

  // Amenity Options
  const amenityOptions = [
    "Pool",
    "Gym",
    "Parking",
    "Garden",
    "Smart Home",
    "Waterfront",
    "Fireplace",
    "Pet Friendly",
    "Elevator",
    "Rooftop",
    "Concierge",
    "Solar Panels",
    "EV Charging",
  ];

  // Price Range Presets
  const pricePresets = [
    { label: "Under $500K", min: 0, max: 500000 },
    { label: "$500K - $1M", min: 500000, max: 1000000 },
    { label: "$1M - $2M", min: 1000000, max: 2000000 },
    { label: "Over $2M", min: 2000000, max: 5000000 },
  ];

  // Filter Properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (property) =>
          property.location.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.subtype.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query),
      );
    }

    // Property type filter
    if (filters.propertyType !== "all") {
      result = result.filter(
        (property) => property.type === filters.propertyType,
      );
    }

    // Price filter
    result = result.filter(
      (property) =>
        property.price >= filters.priceRange[0] &&
        property.price <= filters.priceRange[1],
    );

    // Bedrooms filter
    if (filters.bedrooms !== "any") {
      const minBeds = parseInt(filters.bedrooms);
      result = result.filter((property) => property.beds >= minBeds);
    }

    // Bathrooms filter
    if (filters.bathrooms !== "any") {
      const minBaths = parseInt(filters.bathrooms);
      result = result.filter((property) => property.baths >= minBaths);
    }

    // Year built filter
    result = result.filter(
      (property) =>
        property.year >= filters.yearBuilt[0] &&
        property.year <= filters.yearBuilt[1],
    );

    // Amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter((property) =>
        filters.amenities.every((amenity) =>
          property.amenities.includes(amenity),
        ),
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "size":
        result.sort((a, b) => b.size - a.size);
        break;
      default: // featured
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return result;
  }, [filters, searchQuery]);

  // Handle favorite toggle
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  // Handle price preset
  const applyPricePreset = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
    setActivePriceRange([min, max]);
  };

  // Format price
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  // Enhanced Filter Section
  const FilterSection = () => (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter size={20} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Refine Search</h3>
        </div>
        <button
          onClick={() =>
            setFilters({
              propertyType: "all",
              priceRange: [0, 5000000],
              minPrice: 0,
              maxPrice: 5000000,
              bedrooms: "any",
              bathrooms: "any",
              sortBy: "featured",
              amenities: [],
              yearBuilt: [1990, 2024],
            })
          }
          className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-2"
        >
          <X size={16} />
          Clear All
        </button>
      </div>

      {/* Property Type - Enhanced */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 size={18} />
          Property Type
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() =>
                  setFilters({ ...filters, propertyType: type.value })
                }
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${
                  filters.propertyType === type.value
                    ? `${type.color} border-primary shadow-md scale-[1.02]`
                    : "border-border hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${type.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    size={24}
                    className={
                      filters.propertyType === type.value
                        ? "text-primary"
                        : "text-foreground/60"
                    }
                  />
                </div>
                <span
                  className={`font-medium text-sm ${
                    filters.propertyType === type.value
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {type.label}
                </span>
                <div
                  className={`w-6 h-1 rounded-full mt-1 ${
                    filters.propertyType === type.value
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range - Enhanced */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <DollarSign size={18} />
            Price Range
          </h4>
          <span className="text-lg font-bold text-primary">
            {formatPrice(filters.priceRange[0])} -{" "}
            {formatPrice(filters.priceRange[1])}
          </span>
        </div>

        {/* Price Presets */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {pricePresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPricePreset(preset.min, preset.max)}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activePriceRange[0] === preset.min &&
                activePriceRange[1] === preset.max
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-primary/5 text-foreground hover:bg-primary/10"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative py-4">
          <div className="absolute h-2 bg-primary/20 rounded-full w-full" />
          <div
            className="absolute h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
            style={{
              left: `${(filters.priceRange[0] / 5000000) * 100}%`,
              right: `${100 - (filters.priceRange[1] / 5000000) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [parseInt(e.target.value), filters.priceRange[1]],
              })
            }
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], parseInt(e.target.value)],
              })
            }
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-foreground/60 mt-6">
            <span>$0</span>
            <span>$2.5M</span>
            <span>$5M</span>
          </div>
        </div>
      </div>

      {/* Bedrooms & Bathrooms - Enhanced */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Bed size={18} />
            Bedrooms
          </h4>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setFilters({ ...filters, bedrooms: option.value })
                }
                className={`relative px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 min-w-[60px] ${
                  filters.bedrooms === option.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-primary/5 text-foreground hover:bg-primary/10"
                }`}
              >
                <span className="font-bold">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
                {filters.bedrooms === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white border-2 border-primary rounded-full flex items-center justify-center">
                    <Check size={10} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Bath size={18} />
            Bathrooms
          </h4>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setFilters({ ...filters, bathrooms: option.value })
                }
                className={`relative px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 min-w-[60px] ${
                  filters.bathrooms === option.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-primary/5 text-foreground hover:bg-primary/10"
                }`}
              >
                <span className="font-bold">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
                {filters.bathrooms === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white border-2 border-primary rounded-full flex items-center justify-center">
                    <Check size={10} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities - Enhanced */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {amenityOptions.map((amenity) => (
            <button
              key={amenity}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  amenities: prev.amenities.includes(amenity)
                    ? prev.amenities.filter((a) => a !== amenity)
                    : [...prev.amenities, amenity],
                }));
              }}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                filters.amenities.includes(amenity)
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="text-sm font-medium">{amenity}</span>
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  filters.amenities.includes(amenity)
                    ? "bg-primary border-primary"
                    : "border-foreground/30"
                }`}
              >
                {filters.amenities.includes(amenity) && (
                  <Check size={12} className="text-white" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Year Built */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar size={18} />
          Year Built: {filters.yearBuilt[0]} - {filters.yearBuilt[1]}
        </h4>
        <div className="relative py-4">
          <div className="absolute h-2 bg-primary/20 rounded-full w-full" />
          <div
            className="absolute h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
            style={{
              left: `${((filters.yearBuilt[0] - 1990) / (2024 - 1990)) * 100}%`,
              right: `${100 - ((filters.yearBuilt[1] - 1990) / (2024 - 1990)) * 100}%`,
            }}
          />
          <input
            type="range"
            min="1990"
            max="2024"
            step="1"
            value={filters.yearBuilt[0]}
            onChange={(e) =>
              setFilters({
                ...filters,
                yearBuilt: [parseInt(e.target.value), filters.yearBuilt[1]],
              })
            }
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min="1990"
            max="2024"
            step="1"
            value={filters.yearBuilt[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                yearBuilt: [filters.yearBuilt[0], parseInt(e.target.value)],
              })
            }
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-foreground/60 mt-6">
            <span>1990</span>
            <span>2007</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      {/* Sort By - Enhanced */}
      <div>
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} />
          Sort By
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setFilters({ ...filters, sortBy: option.value })}
                className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  filters.sortBy === option.value
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    filters.sortBy === option.value
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-foreground"
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Active Filters Display
  const ActiveFilters = () => {
    const activeFilters = [];

    if (filters.propertyType !== "all") {
      const type = propertyTypes.find((t) => t.value === filters.propertyType);
      activeFilters.push(type?.label || "");
    }

    if (filters.bedrooms !== "any") {
      activeFilters.push(`${filters.bedrooms}+ Beds`);
    }

    if (filters.bathrooms !== "any") {
      activeFilters.push(`${filters.bathrooms}+ Baths`);
    }

    if (filters.amenities.length > 0) {
      activeFilters.push(`${filters.amenities.length} Amenities`);
    }

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-sm text-foreground/60">Active filters:</span>
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-2"
          >
            {filter}
            <button
              onClick={() => {
                // Logic to remove specific filter
              }}
              className="hover:text-primary/80"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setFilters({
              propertyType: "all",
              priceRange: [0, 5000000],
              minPrice: 0,
              maxPrice: 5000000,
              bedrooms: "any",
              bathrooms: "any",
              sortBy: "featured",
              amenities: [],
              yearBuilt: [1990, 2024],
            })
          }
          className="text-sm text-primary hover:text-primary/80 font-semibold ml-2"
        >
          Clear All
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit mb-6">
              <Sparkles size={14} /> Premium Collection
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Discover Your{" "}
              <span className="relative">
                <span className="text-primary">Perfect</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </span>{" "}
              Home
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore our curated selection of premium properties. Use our smart
              filters to find exactly what matches your lifestyle.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-4 border border-border shadow-xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-primary/5 rounded-xl">
                    <Search size={20} className="text-primary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by location, address, or property type..."
                      className="flex-1 outline-none text-foreground placeholder:text-foreground/40 bg-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <X size={18} className="text-foreground/40" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow-md">
                    <Search size={18} />
                    Search
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-5 py-3.5 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center gap-2"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {pricePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPricePreset(preset.min, preset.max)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activePriceRange[0] === preset.min &&
                      activePriceRange[1] === preset.max
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/5 text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-border min-w-[160px]">
              <p className="font-bold text-4xl text-primary">
                {filteredProperties.length}
              </p>
              <p className="text-foreground/60">Properties Found</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-border min-w-[160px]">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                <p className="font-bold text-4xl text-primary">4.7</p>
              </div>
              <p className="text-foreground/60">Average Rating</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-border min-w-[160px]">
              <p className="font-bold text-4xl text-primary">8</p>
              <p className="text-foreground/60">Featured Listings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSection />

              {/* Additional Info Card */}
              <div className="mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  Need Help?
                </h4>
                <p className="text-foreground/70 text-sm mb-4">
                  Our expert agents are ready to assist you in finding the
                  perfect property.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
                >
                  Contact Agent
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div
                className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-in fade-in duration-200"
                onClick={() => setShowFilters(false)}
              >
                <div
                  className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Filter size={20} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        Filters
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <FilterSection />
                </div>
              </div>
            )}

            {/* Properties List */}
            <div className="flex-1">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Showing {filteredProperties.length} Properties
                  </h2>
                  <ActiveFilters />
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button className="px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 transition-all font-medium text-sm flex items-center gap-2">
                      {
                        sortOptions.find((s) => s.value === filters.sortBy)
                          ?.label
                      }
                      <ChevronDown size={16} />
                    </button>
                    <div className="absolute top-full mt-1 right-0 w-48 bg-white border border-border rounded-xl shadow-lg z-10 hidden">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            setFilters({ ...filters, sortBy: option.value })
                          }
                          className={`w-full p-3 text-left hover:bg-primary/5 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            filters.sortBy === option.value
                              ? "text-primary font-semibold"
                              : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden px-4 py-2.5 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center gap-2"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Property Cards Grid/List */}
              {filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    No Properties Found
                  </h3>
                  <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or search criteria to find more
                    properties.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        propertyType: "all",
                        priceRange: [0, 5000000],
                        minPrice: 0,
                        maxPrice: 5000000,
                        bedrooms: "any",
                        bathrooms: "any",
                        sortBy: "featured",
                        amenities: [],
                        yearBuilt: [1990, 2024],
                      })
                    }
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-6"
                    }
                  >
                    {filteredProperties.map((property) => (
                      <Link
                        key={property.id}
                        href={`/properties/${property.id}`}
                        className={`group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 ${
                          viewMode === "list"
                            ? "flex flex-col md:flex-row"
                            : "hover:-translate-y-2"
                        }`}
                      >
                        {/* Image */}
                        <div
                          className={`relative overflow-hidden ${
                            viewMode === "list"
                              ? "md:w-80 h-64 md:h-auto flex-shrink-0"
                              : "h-56"
                          }`}
                        >
                          <img
                            src={property.image}
                            alt={property.subtype}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {property.featured && (
                              <span className="px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full text-xs font-bold shadow-md">
                                <Sparkles size={10} className="inline mr-1" />
                                FEATURED
                              </span>
                            )}
                            {property.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-foreground rounded-full text-xs font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Rating & Favorite */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-full">
                              <Star
                                size={14}
                                className="fill-yellow-400 text-yellow-400"
                              />
                              <span className="font-bold text-sm">
                                {property.rating}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(property.id);
                              }}
                              className={`p-2.5 rounded-full backdrop-blur-sm transition-all ${
                                favorites.includes(property.id)
                                  ? "bg-red-500/20 text-red-500"
                                  : "bg-white/20 text-white hover:bg-white/30"
                              }`}
                            >
                              <Heart
                                size={18}
                                className={
                                  favorites.includes(property.id)
                                    ? "fill-red-500"
                                    : ""
                                }
                              />
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <span className="text-sm font-semibold text-secondary mb-1 block">
                                {property.subtype}
                              </span>
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {property.location}
                              </h3>
                              <div className="flex items-center gap-1 text-foreground/60 text-sm">
                                <MapPin size={14} />
                                <span>{property.address}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                {formatPrice(property.price)}
                              </p>
                              <p className="text-sm text-foreground/60">
                                ${property.pricePerSqft}/sqft
                              </p>
                            </div>
                          </div>

                          {/* Description - Only in list view */}
                          {viewMode === "list" && (
                            <p className="text-foreground/70 mb-4 line-clamp-2">
                              {property.description}
                            </p>
                          )}

                          {/* Property Details */}
                          <div
                            className={`grid ${
                              viewMode === "list"
                                ? "grid-cols-5"
                                : "grid-cols-4"
                            } gap-3 mb-6 pb-6 border-b border-border`}
                          >
                            <div className="text-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Bed size={18} className="text-primary" />
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-foreground">
                                  {property.beds} Beds
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Bath size={18} className="text-primary" />
                              </div>
                              <span className="text-sm font-semibold text-foreground">
                                {property.baths} Baths
                              </span>
                            </div>
                            <div className="text-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Ruler size={18} className="text-primary" />
                              </div>
                              <span className="text-sm font-semibold text-foreground">
                                {property.size.toLocaleString()} sqft
                              </span>
                            </div>
                            {viewMode === "list" ? (
                              <>
                                <div className="text-center">
                                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <Calendar
                                      size={18}
                                      className="text-primary"
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-foreground">
                                    {property.year}
                                  </span>
                                </div>
                                <div className="text-center">
                                  <div className="flex items-center gap-1 justify-center mb-2">
                                    <img
                                      src={property.agentAvatar}
                                      alt={property.agent}
                                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                                    />
                                  </div>
                                  <span className="text-xs text-foreground/60">
                                    {property.agent}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-center">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                  <Calendar
                                    size={18}
                                    className="text-primary"
                                  />
                                </div>
                                <span className="text-sm font-semibold text-foreground">
                                  Built {property.year}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quick Amenities & CTA */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {property.amenities
                                .slice(0, 2)
                                .map((amenity, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-primary/5 text-primary rounded text-xs font-medium"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              {property.amenities.length > 2 && (
                                <span className="text-xs text-foreground/60">
                                  +{property.amenities.length - 2} more
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-sm flex items-center gap-2 group/btn">
                                View Details
                                <ArrowRight
                                  size={16}
                                  className="group-hover/btn:translate-x-1 transition-transform"
                                />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // Handle schedule tour
                                }}
                                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-semibold text-sm"
                              >
                                Tour
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button className="p-3 border border-border rounded-xl hover:bg-primary/5 transition-colors">
                      <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <button className="w-12 h-12 bg-primary text-primary-foreground rounded-xl font-semibold shadow-md">
                      1
                    </button>
                    <button className="w-12 h-12 border border-border rounded-xl hover:bg-primary/5 transition-colors font-semibold">
                      2
                    </button>
                    <button className="w-12 h-12 border border-border rounded-xl hover:bg-primary/5 transition-colors font-semibold">
                      3
                    </button>
                    <span className="px-3 text-foreground/60">...</span>
                    <button className="w-12 h-12 border border-border rounded-xl hover:bg-primary/5 transition-colors font-semibold">
                      8
                    </button>
                    <button className="p-3 border border-border rounded-xl hover:bg-primary/5 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              )}

              {/* Help Section */}
              <div className="mt-12 lg:hidden">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Can't Find What You're Looking For?
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Our expert agents can help you find properties that match
                    your exact requirements.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold group shadow-md"
                  >
                    <span>Contact an Agent</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyListingPage;

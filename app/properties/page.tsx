"use client";

import { listingService } from "@/lib/services/listings";
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
  Home as HomeIcon,
  Car,
  LucideCrosshair,
  ArrowRight,
  X,
  SlidersHorizontal,
  Maximize2,
  DollarSign,
  Calendar,
  Check,
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  Hash,
  CarFront,
  Cpu,
  BookOpen,
  Music2,
  Gamepad2,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
// Types based on your Prisma schema
type ListingStatus = "ACTIVE" | "PENDING" | "SOLD" | "RENTED";
type ListingType = "PROPERTY" | "CAR" | "OTHER";

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
  status: ListingStatus;
  type: ListingType;
  agentId: string;
  images: string[];
  inquiries: any[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  agent?: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
  };
}

const UniversalListingPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: listing } = useSWR<Listing[]>(
    "listings",
    () => listingService.getListings(),
    {
      revalidateOnFocus: false,
    },
  );
  const listings = listing ?? [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const [filters, setFilters] = useState({
    listingType: "all" as ListingType | "all",
    priceRange: [0, 5000000],
    bedrooms: "any" as string | number,
    bathrooms: "any" as string | number,
    sortBy: "featured",
    status: "all" as ListingStatus | "all",
    city: "all",
    yearBuilt: [1990, 2024] as [number, number],
    squareFeet: [0, 10000] as [number, number],
    // Car specific
    carYear: [2000, 2024] as [number, number],
    carMileage: [0, 200000] as [number, number],
    carType: "all",
    // Electronics specific
    electronicsCondition: "all",
    // Other filters
    searchQuery: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<ListingType | "all">(
    "all",
  );
  const categories = [
    {
      value: "all" as ListingType | "all",
      label: "All Listings",
      icon: Layers,
      color: "from-primary/20 to-primary/10",
    },
    {
      value: "PROPERTY",
      label: "Properties",
      icon: HomeIcon,
      color: "from-blue-500/20 to-blue-400/10",
    },
    {
      value: "CAR",
      label: "Cars",
      icon: Car,
      color: "from-red-500/20 to-red-400/10",
    },
  ];

  // Price presets
  const pricePresets = [
    { label: "Under $10K", min: 0, max: 10000 },
    { label: "$10K - $50K", min: 10000, max: 50000 },
    { label: "$50K - $100K", min: 50000, max: 100000 },
    { label: "$100K - $500K", min: 100000, max: 500000 },
    { label: "Over $500K", min: 500000, max: 5000000 },
  ];

  // Status options
  const statusOptions = [
    { value: "all", label: "All Status", color: "bg-foreground/10" },
    { value: "ACTIVE", label: "Active", color: "bg-green-100 text-green-800" },
    {
      value: "PENDING",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "SOLD", label: "Sold", color: "bg-red-100 text-red-800" },
    { value: "RENTED", label: "Rented", color: "bg-blue-100 text-blue-800" },
  ];

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured", icon: Sparkles },
    { value: "price-low", label: "Price: Low to High", icon: DollarSign },
    { value: "price-high", label: "Price: High to Low", icon: TrendingUp },
    { value: "newest", label: "Newest", icon: Calendar },
    { value: "oldest", label: "Oldest", icon: Clock },
  ];

  // Items per page options
  const itemsPerPageOptions = [6, 12, 24, 48, 96];

  // City options (unique cities from listings)
  const cityOptions = [
    "all",
    ...Array.from(new Set(listings?.map((l) => l.city))),
  ];

  // Filter listings
  const filteredListings = useMemo(() => {
    let result = [...(listings ?? [])];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description?.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query),
      );
    }

    // Type filter
    if (filters.listingType !== "all") {
      result = result.filter((listing) => listing.type === filters.listingType);
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((listing) => listing.status === filters.status);
    }

    // City filter
    if (filters.city !== "all") {
      result = result.filter((listing) => listing.city === filters.city);
    }

    // Price filter
    result = result.filter(
      (listing) =>
        listing.price >= filters.priceRange[0] &&
        listing.price <= filters.priceRange[1],
    );

    // Property-specific filters - FIXED SECTION
    if (filters.listingType === "PROPERTY" || filters.listingType === "all") {
      // Bedrooms filter
      if (filters.bedrooms !== "any") {
        const minBeds =
          filters.bedrooms === "4+" ? 4 : Number(filters.bedrooms);
        result = result.filter((listing) => {
          if (listing.type !== "PROPERTY") return true; // ignore non-properties
          return (listing.bedrooms ?? 0) >= minBeds;
        });
      }

      // Bathrooms filter
      if (filters.bathrooms !== "any") {
        const minBaths = Number(filters.bathrooms);
        result = result.filter((listing) => {
          if (listing.type !== "PROPERTY") return true; // ignore non-properties
          return (listing.bathrooms ?? 0) >= minBaths;
        });
      }

      // Square feet filter
      result = result.filter((listing) => {
        if (listing.type !== "PROPERTY") return true; // ignore non-properties
        return (
          !listing.squareFeet ||
          (listing.squareFeet >= filters.squareFeet[0] &&
            listing.squareFeet <= filters.squareFeet[1])
        );
      });

      // Year built filter
      result = result.filter((listing) => {
        if (listing.type !== "PROPERTY") return true; // ignore non-properties
        return (
          !listing.yearBuilt ||
          (listing.yearBuilt >= filters.yearBuilt[0] &&
            listing.yearBuilt <= filters.yearBuilt[1])
        );
      });
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
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      default: // featured
        result.sort((a, b) => {
          // Simple featured logic - could be enhanced
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
    }

    return result;
  }, [filters, listings]);

  // Pagination calculations
  const totalItems = filteredListings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, itemsPerPage]);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, currentPage, itemsPerPage]);

  // Handle category change
  const handleCategoryChange = (category: ListingType | "all") => {
    setActiveCategory(category);
    setFilters((prev) => ({ ...prev, listingType: category }));
  };

  // Handle favorite toggle
  const toggleFavorite = (pid: string) => {
    setFavorites((prev) =>
      prev.includes(pid)
        ? prev.filter((favPid) => favPid !== pid)
        : [...prev, pid],
    );
  };

  // Format price
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  // Get category stats
  const categoryStats = categories.map((category) => {
    const count = listings?.filter((listing) =>
      category.value === "all" ? true : listing.type === category.value,
    ).length;
    const totalValue = listings
      .filter((listing) =>
        category.value === "all" ? true : listing.type === category.value,
      )
      .reduce((sum, listing) => sum + listing.price, 0);

    return { ...category, count, totalValue };
  });

  // Pagination component
  const Pagination = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-border rounded-lg bg-white text-sm font-medium"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-foreground/60">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            items
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* First page */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsLeft size={18} className="text-foreground/60" />
          </button>

          {/* Previous page */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} className="text-foreground/60" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {startPage > 1 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="w-10 h-10 rounded-lg text-sm font-medium hover:bg-primary/5"
                >
                  1
                </button>
                {startPage > 2 && (
                  <span className="px-2 text-foreground/40">...</span>
                )}
              </>
            )}

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-linear-to-r from-primary to-secondary text-white shadow-md"
                    : "hover:bg-primary/5"
                }`}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="px-2 text-foreground/40">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10 h-10 rounded-lg text-sm font-medium hover:bg-primary/5"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next page */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} className="text-foreground/60" />
          </button>

          {/* Last page */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsRight size={18} className="text-foreground/60" />
          </button>
        </div>
      </div>
    );
  };

  // Compact pagination for mobile
  const CompactPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="lg:hidden flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-foreground/60">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          items
        </div>
      </div>
    );
  };

  // Enhanced Filter Section with dynamic filters
  const FilterSection = () => (
    <aside className="w-full  space-y-6">
      {/* Header Section with Neon Accent */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full" />
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                Fine-tune
              </h3>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-3">
              Smart Search Engine
            </p>
          </div>

          <button
            onClick={() => {
              setFilters({
                listingType: "all",
                priceRange: [0, 5000000],
                bedrooms: "any",
                bathrooms: "any",
                sortBy: "featured",
                status: "all",
                city: "all",
                yearBuilt: [1990, 2024],
                squareFeet: [0, 10000],
                carYear: [2000, 2024],
                carMileage: [0, 200000],
                carType: "all",
                electronicsCondition: "all",
                searchQuery: "",
              });
              setCurrentPage(1);
            }}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-300"
          >
            <X
              size={14}
              className="group-hover:rotate-90 transition-transform"
            />
            <span className="text-xs font-bold uppercase">Reset</span>
          </button>
        </div>

        {/* Category Grid - "The Matrix" Style */}
        <div className="mb-10">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">
            Selection
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categoryStats.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;
              return (
                <button
                  key={category.value}
                  onClick={() => {
                    handleCategoryChange(category.value as ListingType | "all");
                    setShowFilters(false);
                    setCurrentPage(1);
                  }}
                  className={`relative flex flex-col items-start p-3 rounded-2xl border transition-all duration-500 overflow-hidden group ${
                    isActive
                      ? "border-primary bg-primary/3 ring-1 ring-primary/20 shadow-sm"
                      : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl mb-3 transition-all duration-500 ${
                      isActive
                        ? "bg-primary text-white scale-110"
                        : "bg-white text-slate-400 shadow-sm"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`text-xs font-bold ${isActive ? "text-primary" : "text-slate-600"}`}
                  >
                    {category.label}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {category.count} items
                  </span>

                  {isActive && (
                    <div className="absolute -right-2 -bottom-2 opacity-10">
                      <Icon size={48} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Engine */}
        <div className="mb-10 p-5 rounded-4xl bg-slate-900 text-white shadow-2xl shadow-primary/20">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                Your Budget
              </p>
              <h4 className="text-lg font-black">
                {formatPrice(filters.priceRange[1])}
              </h4>
            </div>
            <DollarSign className="text-primary/40" size={24} />
          </div>

          {/* Visual Slider Placeholder (Replace with your Range Component) */}
          <div className="relative h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div
              className="absolute h-full bg-linear-to-r from-primary to-blue-400 transition-all duration-700"
              style={{ width: `${(filters.priceRange[1] / 5000000) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {pricePresets.slice(0, 4).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [preset.min, preset.max],
                  }));
                  setCurrentPage(1);
                }}
                className="py-2 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 text-[10px] font-bold transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Details Section */}
        {(filters.listingType === "PROPERTY" ||
          filters.listingType === "all") && (
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <HomeIcon size={16} className="text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700">
                Property Specs
              </h4>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 mb-3 block">
                  Bedrooms
                </label>
                <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  {["any", "1", "2", "3", "4+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setFilters((p) => ({ ...p, bedrooms: num }));
                        setCurrentPage(1);
                      }}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                        filters.bedrooms === num
                          ? "bg-white text-primary shadow-sm scale-110"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {num === "any" ? "All" : num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern Sort Select */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block">
            Sorting Architecture
          </label>
          <div className="relative group">
            <select
              value={filters.sortBy}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Sparkles
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
              size={18}
            />
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:translate-y-[-40%] transition-transform"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* CTA Prompt */}
      <div className="bg-primary p-6 rounded-4xl text-white shadow-xl shadow-primary/30 group cursor-pointer overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 transition-transform duration-700">
          <MapPin size={64} />
        </div>
        <h4 className="text-lg font-black mb-1">Save Search</h4>
        <p className="text-white/70 text-xs font-medium mb-4">
          Get notified when new {activeCategory} match your style.
        </p>
        <button className="w-full bg-white text-primary py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
          Notify Me
        </button>
      </div>
    </aside>
  );

  // Active Filters Display
  const ActiveFilters = () => {
    const activeFilters = [];
    if (filters.listingType !== "all") {
      const category = categories.find((c) => c.value === filters.listingType);
      activeFilters.push(category?.label || "");
    }

    if (filters.status !== "all") {
      const status = statusOptions.find((s) => s.value === filters.status);
      activeFilters.push(status?.label || "");
    }

    if (filters.city !== "all") {
      activeFilters.push(filters.city);
    }

    if (filters.bedrooms !== "any") {
      activeFilters.push(
        filters.bedrooms === "4+" ? "4+ Beds" : `${filters.bedrooms}+ Beds`,
      );
    }

    if (filters.bathrooms !== "any") {
      activeFilters.push(`${filters.bathrooms}+ Baths`);
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
                // Remove specific filter logic
              }}
              className="hover:text-primary/80"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setFilters({
              listingType: "all",
              priceRange: [0, 5000000],
              bedrooms: "any",
              bathrooms: "any",
              sortBy: "featured",
              status: "all",
              city: "all",
              yearBuilt: [1990, 2024],
              squareFeet: [0, 10000],
              carYear: [2000, 2024],
              carMileage: [0, 200000],
              carType: "all",
              electronicsCondition: "all",
              searchQuery: "",
            });
            setCurrentPage(1);
          }}
          className="text-sm text-primary hover:text-primary/80 font-semibold ml-2"
        >
          Clear All
        </button>
      </div>
    );
  };

  // Get category icon
  const getCategoryIcon = (type: ListingType) => {
    const category = categories.find((c) => c.value === type);
    return category?.icon || HomeIcon;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit mb-6">
              <Sparkles size={14} /> Universal Marketplace
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Find{" "}
              <span className="relative">
                <span className="text-primary">Anything</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
              </span>{" "}
              You Need
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Browse properties, cars, electronics, furniture, and more. Our
              smart filters help you find exactly what you're looking for.
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
                      value={filters.searchQuery}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          searchQuery: e.target.value,
                        }));
                        setCurrentPage(1);
                      }}
                      placeholder="Search for properties, cars, electronics, furniture..."
                      className="flex-1 outline-none text-foreground placeholder:text-foreground/40 bg-transparent"
                    />
                    {filters.searchQuery && (
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, searchQuery: "" }));
                          setCurrentPage(1);
                        }}
                        className="p-1 hover:bg-primary/10 rounded"
                      >
                        <X size={18} className="text-foreground/40" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3.5 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow-md">
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

              {/* Category Quick Select */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categoryStats.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => {
                        handleCategoryChange(
                          category.value as ListingType | "all",
                        );
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        activeCategory === category.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/5 text-foreground hover:bg-primary/10"
                      }`}
                    >
                      <Icon size={14} />
                      {category.label} ({category.count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 shrink-0">
              <FilterSection />

              {/* Category Value Summary */}
              <div className="mt-6 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <DollarSign size={20} className="text-primary" />
                  Category Values
                </h4>
                <div className="space-y-3">
                  {categoryStats.slice(1).map((category) => (
                    <div
                      key={category.value}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon
                          size={14}
                          className="text-foreground/60"
                        />
                        <span className="text-sm">{category.label}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(category.totalValue)}
                      </span>
                    </div>
                  ))}
                </div>
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
                        Smart Filters
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

            {/* Listings Grid */}
            <div className="flex-1">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Showing {Math.min(currentItems.length, itemsPerPage)} of{" "}
                    {totalItems} Listings
                    {totalPages > 1 &&
                      ` • Page ${currentPage} of ${totalPages}`}
                  </h2>
                  <ActiveFilters />
                </div>

                <div className="flex items-center gap-4">
                  {/* Items per page selector */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm text-foreground/60">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1.5 border border-border rounded-lg bg-white text-sm font-medium"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          sortBy: e.target.value,
                        }));
                        setCurrentPage(1);
                      }}
                      className="appearance-none px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 transition-all font-medium text-sm pr-10 bg-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 pointer-events-none"
                      size={16}
                    />
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

              {/* Listings Grid/List */}
              {currentItems.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    No Listings Found
                  </h3>
                  <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or search criteria to find more
                    listings.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        listingType: "all",
                        priceRange: [0, 5000000],
                        bedrooms: "any",
                        bathrooms: "any",
                        sortBy: "featured",
                        status: "all",
                        city: "all",
                        yearBuilt: [1990, 2024],
                        squareFeet: [0, 10000],
                        carYear: [2000, 2024],
                        carMileage: [0, 200000],
                        carType: "all",
                        electronicsCondition: "all",
                        searchQuery: "",
                      });
                      setCurrentPage(1);
                    }}
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
                    {currentItems.map((listing) => {
                      const CategoryIcon = getCategoryIcon(listing.type);
                      const statusColor =
                        statusOptions.find((s) => s.value === listing.status)
                          ?.color || "bg-foreground/10";

                      return (
                        <Link
                          key={listing.pid}
                          href={`/properties/${listing.pid}`}
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
                                ? "md:w-80 h-64 md:h-auto shrink-0"
                                : "h-56"
                            }`}
                          >
                            <img
                              src={listing.images[0]}
                              alt={listing.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span
                                className={`px-3 py-1.5 ${statusColor} rounded-full text-xs font-bold shadow-md flex items-center gap-1`}
                              >
                                <CategoryIcon size={10} />
                                {listing.type}
                              </span>
                            </div>

                            {/* Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(listing.pid);
                              }}
                              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all ${
                                favorites.includes(listing.pid)
                                  ? "bg-red-500/20 text-red-500"
                                  : "bg-white/20 text-white hover:bg-white/30"
                              }`}
                            >
                              <Heart
                                size={18}
                                className={
                                  favorites.includes(listing.pid)
                                    ? "fill-red-500"
                                    : ""
                                }
                              />
                            </button>

                            {/* Price Tag */}
                            <div className="absolute bottom-4 left-4">
                              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                                <p className="text-xl font-bold text-primary">
                                  {formatPrice(listing.price)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div
                            className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <CategoryIcon
                                    size={16}
                                    className="text-foreground/60"
                                  />
                                  <span className="text-sm font-semibold text-secondary uppercase">
                                    {listing.type}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                                  {listing.title}
                                </h3>
                                <div className="flex items-center gap-1 text-foreground/60 text-sm mb-3">
                                  <MapPin size={14} />
                                  <span>
                                    {listing.address}, {listing.city},{" "}
                                    {listing.state}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Description - Only in list view */}
                            {viewMode === "list" && (
                              <p className="text-foreground/70 mb-4 line-clamp-2">
                                {listing.description}
                              </p>
                            )}

                            {/* Property Details (if property) */}
                            {listing.type === "PROPERTY" &&
                              (listing.bedrooms ||
                                listing.bathrooms ||
                                listing.squareFeet) && (
                                <div
                                  className={`grid ${
                                    viewMode === "list"
                                      ? "grid-cols-3"
                                      : "grid-cols-3"
                                  } gap-3 mb-4`}
                                >
                                  {listing.bedrooms && (
                                    <div className="text-center">
                                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Bed
                                          size={18}
                                          className="text-primary"
                                        />
                                      </div>
                                      <span className="text-sm font-semibold text-foreground">
                                        {listing.bedrooms} Beds
                                      </span>
                                    </div>
                                  )}
                                  {listing.bathrooms && (
                                    <div className="text-center">
                                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Bath
                                          size={18}
                                          className="text-primary"
                                        />
                                      </div>
                                      <span className="text-sm font-semibold text-foreground">
                                        {listing.bathrooms} Baths
                                      </span>
                                    </div>
                                  )}
                                  {listing.squareFeet && (
                                    <div className="text-center">
                                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Ruler
                                          size={18}
                                          className="text-primary"
                                        />
                                      </div>
                                      <span className="text-sm font-semibold text-foreground">
                                        {listing.squareFeet.toLocaleString()}{" "}
                                        sqft
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                            {/* Agent & Actions */}
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {listing.agent?.avatar && (
                                  <img
                                    src={listing.agent.avatar}
                                    alt={listing.agent.name}
                                    className="w-8 h-8 rounded-full border-2 border-white shadow"
                                  />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {listing.agent?.name}
                                  </p>
                                  {listing.agent?.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star
                                        size={12}
                                        className="fill-yellow-400 text-yellow-400"
                                      />
                                      <span className="text-xs text-foreground/60">
                                        {listing.agent.rating}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-sm flex items-center gap-2 group/btn">
                                View Details
                                <ArrowRight
                                  size={16}
                                  className="group-hover/btn:translate-x-1 transition-transform"
                                />
                              </button>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {filteredListings.length > 0 && (
                    <>
                      <Pagination />
                      <CompactPagination />
                    </>
                  )}
                </>
              )}

              {/* Help Section */}
              <div className="mt-12 lg:hidden">
                <div className="bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Need Help Finding Something?
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Our agents can help you find exactly what you're looking for
                    across all categories.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold group shadow-md"
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

export default UniversalListingPage;

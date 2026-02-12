"use client";

import { agentService } from "@/lib/services/agents";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Calendar,
  MessageSquare,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  ChevronDown,
  Users,
  Home,
  DollarSign,
  CheckCircle,
  Shield,
  Sparkles,
  TrendingUp,
  X,
  Heart,
  List,
  Briefcase,
  Building,
  Target,
  Check,
  BookOpen,
  FileText,
  Map,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import useSWR from "swr";

// Types based on your Prisma schema
interface Agent {
  id: string;
  userId: string;
  bio?: string;
  licenseId?: string;
  yearsExperience?: number;
  specialties: string[];
  listings: any[];
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    rating?: number;
    reviews?: number;
    website?: string;
    social?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
  // Derived stats
  stats?: {
    totalListings: number;
    activeListings: number;
    totalVolume?: number;
    avgDaysOnMarket?: number;
    clientSatisfaction?: number;
    listToSaleRatio?: number;
  };
  featured?: boolean;
  available?: boolean;
}

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteAgents, setFavoriteAgents] = useState<string[]>([]);

  // Agent data based on your schema
  const agents: Agent[] = useMemo(
    () => [
      {
        id: "agent_1",
        userId: "user_1",
        bio: "With over 15 years of experience in luxury real estate, Sarah specializes in waterfront properties and investment opportunities. Her attention to detail and market knowledge ensures the best outcomes for her clients.",
        licenseId: "CA-1234567",
        yearsExperience: 15,
        specialties: [
          "Luxury Homes",
          "Waterfront Properties",
          "Investment Properties",
        ],
        listings: [],
        createdAt: new Date("2018-03-15"),
        updatedAt: new Date("2024-01-20"),
        user: {
          id: "user_1",
          name: "Sarah Johnson",
          email: "sarah@ayelehomes.com",
          phone: "+1 (555) 123-4567",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001",
          rating: 4.9,
          reviews: 128,
          website: "www.sarahjohnson.com",
          social: {
            linkedin: "sarahjohnson",
            twitter: "sarah_realtor",
            facebook: "sarahjohnsonre",
            instagram: "sarahjohnson_homes",
          },
        },
        stats: {
          totalListings: 45,
          activeListings: 12,
          totalVolume: 185000000,
          avgDaysOnMarket: 28,
          clientSatisfaction: 99,
          listToSaleRatio: 98.5,
        },
        featured: true,
        available: true,
      },
      {
        id: "agent_2",
        userId: "user_2",
        bio: "Michael is a commercial real estate specialist with extensive experience in development projects and investment properties. His analytical approach and market insights provide exceptional value to investors.",
        licenseId: "CA-2345678",
        yearsExperience: 12,
        specialties: [
          "Commercial Properties",
          "Development Land",
          "Office Spaces",
        ],
        listings: [],
        createdAt: new Date("2019-06-22"),
        updatedAt: new Date("2024-01-18"),
        user: {
          id: "user_2",
          name: "Michael Chen",
          email: "michael@ayelehomes.com",
          phone: "+1 (555) 234-5678",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          address: "456 Oak Avenue",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          rating: 4.8,
          reviews: 96,
          website: "www.michaelchenrealty.com",
          social: {
            linkedin: "michaelchenre",
            twitter: "mchen_realty",
            facebook: "michaelchenproperties",
            instagram: "michaelchen_commercial",
          },
        },
        stats: {
          totalListings: 32,
          activeListings: 8,
          totalVolume: 220000000,
          avgDaysOnMarket: 35,
          clientSatisfaction: 98,
          listToSaleRatio: 97.2,
        },
        featured: true,
        available: true,
      },
      {
        id: "agent_3",
        userId: "user_3",
        bio: "Emma specializes in helping families find their perfect homes. With her patient approach and deep knowledge of school districts and neighborhoods, she makes the home-buying process smooth and enjoyable.",
        licenseId: "CA-3456789",
        yearsExperience: 10,
        specialties: ["First-time Buyers", "Family Homes", "Relocation"],
        listings: [],
        createdAt: new Date("2020-01-10"),
        updatedAt: new Date("2024-01-15"),
        user: {
          id: "user_3",
          name: "Emma Wilson",
          email: "emma@ayelehomes.com",
          phone: "+1 (555) 345-6789",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
          address: "789 Pine Road",
          city: "Chicago",
          state: "IL",
          zip: "60601",
          rating: 4.9,
          reviews: 142,
          website: "www.emmawilsonhomes.com",
          social: {
            linkedin: "emmawilsonre",
            twitter: "emma_homes",
            facebook: "emmawilsonrealestate",
            instagram: "emmawilson_homes",
          },
        },
        stats: {
          totalListings: 67,
          activeListings: 15,
          totalVolume: 145000000,
          avgDaysOnMarket: 24,
          clientSatisfaction: 100,
          listToSaleRatio: 99.1,
        },
        featured: false,
        available: true,
      },
      {
        id: "agent_4",
        userId: "user_4",
        bio: "David handles the most exclusive properties in the market. His discreet service and extensive network of high-net-worth individuals make him the go-to expert for luxury real estate.",
        licenseId: "CA-4567890",
        yearsExperience: 18,
        specialties: [
          "Penthouse Apartments",
          "Estate Properties",
          "Celebrity Clients",
        ],
        listings: [],
        createdAt: new Date("2015-11-05"),
        updatedAt: new Date("2024-01-10"),
        user: {
          id: "user_4",
          name: "David Miller",
          email: "david@ayelehomes.com",
          phone: "+1 (555) 456-7890",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          address: "101 Ocean Drive",
          city: "Miami",
          state: "FL",
          zip: "33101",
          rating: 5.0,
          reviews: 87,
          website: "www.davidmillerluxury.com",
          social: {
            linkedin: "davidmillerluxury",
            twitter: "dmillerluxury",
            facebook: "davidmillerluxuryproperties",
            instagram: "davidmiller_luxury",
          },
        },
        stats: {
          totalListings: 28,
          activeListings: 6,
          totalVolume: 320000000,
          avgDaysOnMarket: 42,
          clientSatisfaction: 99,
          listToSaleRatio: 96.8,
        },
        featured: true,
        available: true,
      },
      {
        id: "agent_5",
        userId: "user_5",
        bio: "Olivia focuses on investment properties and rental portfolios. Her financial analysis skills and market timing expertise help investors maximize their returns in real estate.",
        licenseId: "CA-5678901",
        yearsExperience: 8,
        specialties: ["Rental Properties", "Multi-family Units", "REITs"],
        listings: [],
        createdAt: new Date("2021-08-30"),
        updatedAt: new Date("2024-01-05"),
        user: {
          id: "user_5",
          name: "Olivia Martinez",
          email: "olivia@ayelehomes.com",
          phone: "+1 (555) 567-8901",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
          address: "202 Central Ave",
          city: "San Francisco",
          state: "CA",
          zip: "94101",
          rating: 4.7,
          reviews: 73,
          website: "www.oliviamartinezinvest.com",
          social: {
            linkedin: "oliviamartinezinvest",
            twitter: "olivia_invest",
            facebook: "oliviamartinezinvestment",
            instagram: "olivia_investments",
          },
        },
        stats: {
          totalListings: 42,
          activeListings: 10,
          totalVolume: 95000000,
          avgDaysOnMarket: 31,
          clientSatisfaction: 97,
          listToSaleRatio: 97.5,
        },
        featured: false,
        available: false,
      },
      {
        id: "agent_6",
        userId: "user_6",
        bio: "James specializes in rural and land properties. His deep understanding of zoning regulations and agricultural value makes him the expert for land investments and country living.",
        licenseId: "CA-6789012",
        yearsExperience: 14,
        specialties: ["Farmland", "Ranch Properties", "Development Land"],
        listings: [],
        createdAt: new Date("2017-04-12"),
        updatedAt: new Date("2024-01-03"),
        user: {
          id: "user_6",
          name: "James Wilson",
          email: "james@ayelehomes.com",
          phone: "+1 (555) 678-9012",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
          address: "303 Maple Street",
          city: "Austin",
          state: "TX",
          zip: "73301",
          rating: 4.8,
          reviews: 64,
          website: "www.jameswilsonland.com",
          social: {
            linkedin: "jameswilsonland",
            twitter: "jwilson_land",
            facebook: "jameswilsonruralproperties",
            instagram: "jameswilson_land",
          },
        },
        stats: {
          totalListings: 23,
          activeListings: 5,
          totalVolume: 85000000,
          avgDaysOnMarket: 56,
          clientSatisfaction: 98,
          listToSaleRatio: 95.3,
        },
        featured: false,
        available: true,
      },
    ],
    [],
  );

  const { data } = useSWR(
  ["agent"],
  () => agentService.getagents(),
  { revalidateOnFocus: false }
);


  // Constants
  const SPECIALTIES = useMemo(() => {
    const allSpecialties = agents.flatMap((agent) => agent.specialties);
    return ["all", ...Array.from(new Set(allSpecialties))];
  }, [agents]);

  const EXPERIENCE_LEVELS = [
    { value: "all", label: "All Experience" },
    { value: "0-5", label: "0-5 Years" },
    { value: "5-10", label: "5-10 Years" },
    { value: "10-15", label: "10-15 Years" },
    { value: "15+", label: "15+ Years" },
  ];

  // Stats calculation
  const stats = useMemo(
    () => [
      {
        value: agents.length,
        label: "Expert Agents",
        icon: Users,
        description: "Certified professionals",
      },
      {
        value: `${Math.round(agents.reduce((sum, agent) => sum + (agent.yearsExperience || 0), 0) / agents.length)}+`,
        label: "Avg Years Experience",
        icon: Award,
        description: "Industry expertise",
      },
      {
        value: "98%",
        label: "Client Satisfaction",
        icon: Star,
        description: "Based on reviews",
      },
      {
        value: `$${Math.round(agents.reduce((sum, agent) => sum + (agent.stats?.totalVolume || 0), 0) / 1000000)}M+`,
        label: "Total Volume Sold",
        icon: DollarSign,
        description: "Combined sales",
      },
    ],
    [agents],
  );

  // Filter agents
  const filteredAgents = useMemo(() => {
    let result = [...agents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.user.name.toLowerCase().includes(query) ||
          agent.user.email.toLowerCase().includes(query) ||
          agent.bio?.toLowerCase().includes(query) ||
          agent.specialties.some((s) => s.toLowerCase().includes(query)),
      );
    }

    // Specialty filter
    if (selectedSpecialty !== "all") {
      result = result.filter((agent) =>
        agent.specialties.includes(selectedSpecialty),
      );
    }

    // Experience filter
    if (selectedExperience !== "all") {
      switch (selectedExperience) {
        case "0-5":
          result = result.filter((agent) => (agent.yearsExperience || 0) < 5);
          break;
        case "5-10":
          result = result.filter(
            (agent) =>
              (agent.yearsExperience || 0) >= 5 &&
              (agent.yearsExperience || 0) < 10,
          );
          break;
        case "10-15":
          result = result.filter(
            (agent) =>
              (agent.yearsExperience || 0) >= 10 &&
              (agent.yearsExperience || 0) < 15,
          );
          break;
        case "15+":
          result = result.filter((agent) => (agent.yearsExperience || 0) >= 15);
          break;
      }
    }

    return result;
  }, [agents, searchQuery, selectedSpecialty, selectedExperience]);

  // Handlers
  const toggleFavorite = (id: string) => {
    setFavoriteAgents((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("all");
    setSelectedExperience("all");
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const formatExperience = (years: number) => {
    if (years >= 10) return `${years}+ Years`;
    return `${years} Years`;
  };

  // Filter Component
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
          onClick={handleResetFilters}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-2"
        >
          <X size={16} />
          Reset All
        </button>
      </div>

      {/* Specialty Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target size={18} />
          Specialties
        </h4>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedSpecialty === specialty
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-primary/5 text-foreground hover:bg-primary/10"
              }`}
            >
              {specialty === "all" ? "All Specialties" : specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Briefcase size={18} />
          Experience Level
        </h4>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setSelectedExperience(level.value)}
              className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                selectedExperience === level.value
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="font-medium">{level.label}</span>
              {selectedExperience === level.value && (
                <CheckCircle size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-4">Team Summary</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Total Agents</span>
            <span className="font-bold">{agents.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Avg. Experience</span>
            <span className="font-bold">
              {Math.round(
                agents.reduce(
                  (sum, agent) => sum + (agent.yearsExperience || 0),
                  0,
                ) / agents.length,
              )}
              + years
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Active Listings</span>
            <span className="font-bold">
              {agents.reduce(
                (sum, agent) => sum + (agent.stats?.activeListings || 0),
                0,
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Active Filters Display
  const ActiveFilters = () => {
    const activeFilters = [];

    if (selectedSpecialty !== "all") {
      activeFilters.push(selectedSpecialty);
    }

    if (selectedExperience !== "all") {
      const level = EXPERIENCE_LEVELS.find(
        (l) => l.value === selectedExperience,
      );
      activeFilters.push(level?.label || "");
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
                if (filter === selectedSpecialty) setSelectedSpecialty("all");
                if (EXPERIENCE_LEVELS.some((l) => l.label === filter))
                  setSelectedExperience("all");
              }}
              className="hover:text-primary/80 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={handleResetFilters}
          className="text-sm text-primary hover:text-primary/80 font-semibold ml-2 transition-colors"
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
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit mb-6">
              <Award size={14} /> Certified Professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Meet Our{" "}
              <span className="relative">
                <span className="text-primary">Expert</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
              </span>{" "}
              Agents
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Our licensed real estate professionals combine deep market
              expertise with personalized service to help you achieve your
              property goals.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-4 border border-border shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-primary/5 rounded-xl">
                    <Search size={20} className="text-primary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, specialty, or license..."
                      className="flex-1 outline-none text-foreground placeholder:text-foreground/40 bg-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 hover:bg-primary/10 rounded transition-colors"
                      >
                        <X size={18} className="text-foreground/40" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-5 py-3.5 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold flex items-center gap-2"
                  >
                    <Filter size={18} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Active Filters & View Toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex-1">
                  <ActiveFilters />
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground/60">
                    {filteredAgents.length} agents found
                  </span>
                  <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <Users size={20} />
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
                </div>
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

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-in fade-in duration-200"
                  onClick={() => setShowFilters(false)}
                  aria-hidden="true"
                />
                <div
                  className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white p-6 overflow-y-auto z-50 animate-in slide-in-from-right duration-300 lg:hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filters panel"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Filter
                          size={20}
                          className="text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        Filters
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      aria-label="Close filters"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <FilterSection />
                </div>
              </>
            )}

            {/* Agents Grid */}
            <div className="flex-1">
              {filteredAgents.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search
                      size={32}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    No Agents Found
                  </h3>
                  <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or filters to find our
                    expert agents.
                  </p>
                  <button
                    onClick={handleResetFilters}
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
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-6"
                    }
                  >
                    {filteredAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className={`group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 ${
                          viewMode === "list"
                            ? "flex flex-col lg:flex-row"
                            : "hover:-translate-y-2"
                        }`}
                      >
                        {/* Agent Header with Avatar */}
                        <div
                          className={`relative p-6 ${
                            viewMode === "list" ? "lg:w-64 shrink-0" : ""
                          }`}
                        >
                          <div className="relative">
                            {/* Avatar */}
                            <div className="relative">
                              <img
                                src={
                                  agent.user.avatar ||
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                                }
                                alt={agent.user.name}
                                className={`rounded-2xl border-4 border-white shadow-lg ${
                                  viewMode === "list"
                                    ? "w-48 h-48"
                                    : "w-32 h-32 mx-auto"
                                }`}
                                loading="lazy"
                                width={viewMode === "list" ? 192 : 128}
                                height={viewMode === "list" ? 192 : 128}
                              />

                              {/* Status Indicator */}
                              <div
                                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                                  agent.available
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />

                              {/* Favorite Button */}
                              <button
                                onClick={() => toggleFavorite(agent.id)}
                                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
                                  favoriteAgents.includes(agent.id)
                                    ? "bg-red-500/20 text-red-500"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                                aria-label={
                                  favoriteAgents.includes(agent.id)
                                    ? `Remove ${agent.user.name} from favorites`
                                    : `Add ${agent.user.name} to favorites`
                                }
                              >
                                <Heart
                                  size={18}
                                  className={
                                    favoriteAgents.includes(agent.id)
                                      ? "fill-red-500"
                                      : ""
                                  }
                                />
                              </button>
                            </div>

                            {/* License Badge */}
                            {agent.licenseId && (
                              <div className="mt-4 flex items-center gap-2">
                                <BadgeCheck
                                  size={14}
                                  className="text-primary"
                                />
                                <span className="text-xs font-medium text-foreground/60">
                                  License: {agent.licenseId}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Agent Details */}
                        <div
                          className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                        >
                          {/* Header */}
                          <div className="mb-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                  {agent.user.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                    {formatExperience(
                                      agent.yearsExperience || 0,
                                    )}
                                  </span>
                                  {agent.featured && (
                                    <span className="text-xs font-bold bg-linear-to-r from-primary to-secondary text-primary-foreground px-2 py-0.5 rounded flex items-center gap-1">
                                      <Sparkles size={10} />
                                      FEATURED
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star
                                  size={16}
                                  className="fill-yellow-400 text-yellow-400"
                                />
                                <span className="font-bold">
                                  {agent.user.rating}
                                </span>
                                <span className="text-sm text-foreground/60">
                                  ({agent.user.reviews})
                                </span>
                              </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1 text-foreground/60 text-sm mb-4">
                              <MapPin size={14} />
                              <span>
                                {agent.user.city}, {agent.user.state}
                              </span>
                            </div>
                          </div>

                          {/* Bio - Only in list view */}
                          {viewMode === "list" && agent.bio && (
                            <p className="text-foreground/70 mb-4 line-clamp-3">
                              {agent.bio}
                            </p>
                          )}

                          {/* Stats */}
                          <div
                            className={`grid ${viewMode === "list" ? "grid-cols-4" : "grid-cols-2"} gap-3 mb-4`}
                          >
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">
                                {agent.stats?.activeListings || 0}
                              </div>
                              <div className="text-xs text-foreground/60">
                                Active Listings
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">
                                {agent.stats?.totalListings || 0}
                              </div>
                              <div className="text-xs text-foreground/60">
                                Total Sold
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">
                                {agent.stats?.clientSatisfaction || 0}%
                              </div>
                              <div className="text-xs text-foreground/60">
                                Satisfaction
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">
                                {agent.stats?.listToSaleRatio?.toFixed(1) || 0}%
                              </div>
                              <div className="text-xs text-foreground/60">
                                List/Sale Ratio
                              </div>
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {agent.specialties
                                .slice(0, 3)
                                .map((specialty, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-primary/5 text-primary rounded text-xs font-medium"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              {agent.specialties.length > 3 && (
                                <span className="px-2 py-1 bg-foreground/5 text-foreground/60 rounded text-xs">
                                  +{agent.specialties.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Contact & Actions */}
                          <div className="pt-4 border-t border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <a
                                href={`mailto:${agent.user.email}`}
                                className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                aria-label={`Email ${agent.user.name}`}
                              >
                                <Mail size={18} />
                              </a>
                              {agent.user.phone && (
                                <a
                                  href={`tel:${agent.user.phone}`}
                                  className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                  aria-label={`Call ${agent.user.name}`}
                                >
                                  <Phone size={18} />
                                </a>
                              )}
                            </div>
                            <Link
                              href={`/agents/${agent.id}`}
                              className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-sm flex items-center gap-2 group/btn"
                            >
                              View Profile
                              <ArrowRight
                                size={16}
                                className="group-hover/btn:translate-x-1 transition-transform"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Section */}
                  <div className="mt-20">
                    <div className="bg-linear-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center border border-primary/20">
                      <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-foreground mb-6">
                          Ready to Work with Certified Experts?
                        </h3>
                        <p className="text-foreground/70 mb-8 text-lg">
                          Our licensed agents are ready to guide you through
                          every step of your real estate journey with
                          professionalism and expertise.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link
                            href="/contact"
                            className="px-8 py-4 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold inline-flex items-center gap-2 shadow-md"
                          >
                            <MessageSquare size={20} />
                            Contact Our Team
                          </Link>
                          <Link
                            href="/about"
                            className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold"
                          >
                            About Our Agency
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Agents */}
      <section className="px-4 md:px-8 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Work with Our Licensed Agents
            </h2>
            <p className="text-foreground/60 text-lg max-w-3xl mx-auto">
              Professional expertise, ethical standards, and dedicated service
              in every transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BadgeCheck,
                title: "Licensed Professionals",
                description:
                  "All our agents are fully licensed and adhere to the highest industry standards.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Shield,
                title: "Client Protection",
                description:
                  "Your interests are protected through transparent communication and ethical practices.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description:
                  "Deep understanding of market trends and property values for optimal results.",
                color: "bg-amber-100 text-amber-600",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;

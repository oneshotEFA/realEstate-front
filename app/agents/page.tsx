"use client";
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
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteAgents, setFavoriteAgents] = useState<number[]>([]);

  // Agent data
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h-300&fit=crop",
      rating: 4.9,
      reviews: 128,
      experience: "15+ Years",
      propertiesSold: 245,
      totalVolume: "$185M",
      specialties: [
        "Luxury Homes",
        "Waterfront Properties",
        "Investment Properties",
      ],
      languages: ["English", "Spanish", "French"],
      location: "Downtown Office",
      email: "sarah@ayelehomes.com",
      phone: "+1 (555) 123-4567",
      website: "www.sarahjohnson.com",
      bio: "With over 15 years of experience in luxury real estate, Sarah specializes in waterfront properties and investment opportunities. Her attention to detail and market knowledge ensures the best outcomes for her clients.",
      social: {
        linkedin: "sarahjohnson",
        twitter: "sarah_realtor",
        facebook: "sarahjohnsonre",
        instagram: "sarahjohnson_homes",
      },
      stats: {
        avgDaysOnMarket: 28,
        listToSaleRatio: 98.5,
        clientSatisfaction: 99,
      },
      certifications: ["CRS", "ABR", "SRES"],
      featured: true,
      available: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Commercial Real Estate Expert",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=1200&h=300&fit=crop",
      rating: 4.8,
      reviews: 96,
      experience: "12+ Years",
      propertiesSold: 189,
      totalVolume: "$220M",
      specialties: [
        "Commercial Properties",
        "Development Land",
        "Office Spaces",
      ],
      languages: ["English", "Mandarin", "Cantonese"],
      location: "Financial District",
      email: "michael@ayelehomes.com",
      phone: "+1 (555) 234-5678",
      website: "www.michaelchenrealty.com",
      bio: "Michael is a commercial real estate specialist with extensive experience in development projects and investment properties. His analytical approach and market insights provide exceptional value to investors.",
      social: {
        linkedin: "michaelchenre",
        twitter: "mchen_realty",
        facebook: "michaelchenproperties",
        instagram: "michaelchen_commercial",
      },
      stats: {
        avgDaysOnMarket: 35,
        listToSaleRatio: 97.2,
        clientSatisfaction: 98,
      },
      certifications: ["CCIM", "SIOR", "CRE"],
      featured: true,
      available: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "Residential Property Specialist",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=300&fit=crop",
      rating: 4.9,
      reviews: 142,
      experience: "10+ Years",
      propertiesSold: 312,
      totalVolume: "$145M",
      specialties: ["First-time Buyers", "Family Homes", "Relocation"],
      languages: ["English", "German", "Portuguese"],
      location: "Suburban Office",
      email: "emma@ayelehomes.com",
      phone: "+1 (555) 345-6789",
      website: "www.emmawilsonhomes.com",
      bio: "Emma specializes in helping families find their perfect homes. With her patient approach and deep knowledge of school districts and neighborhoods, she makes the home-buying process smooth and enjoyable.",
      social: {
        linkedin: "emmawilsonre",
        twitter: "emma_homes",
        facebook: "emmawilsonrealestate",
        instagram: "emmawilson_homes",
      },
      stats: {
        avgDaysOnMarket: 24,
        listToSaleRatio: 99.1,
        clientSatisfaction: 100,
      },
      certifications: ["ABR", "SRES", "e-Pro"],
      featured: false,
      available: true,
    },
    {
      id: 4,
      name: "David Miller",
      title: "Luxury Properties Director",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=300&fit=crop",
      rating: 5.0,
      reviews: 87,
      experience: "18+ Years",
      propertiesSold: 156,
      totalVolume: "$320M",
      specialties: [
        "Penthouse Apartments",
        "Estate Properties",
        "Celebrity Clients",
      ],
      languages: ["English", "Italian", "Arabic"],
      location: "Luxury Division",
      email: "david@ayelehomes.com",
      phone: "+1 (555) 456-7890",
      website: "www.davidmillerluxury.com",
      bio: "David handles the most exclusive properties in the market. His discreet service and extensive network of high-net-worth individuals make him the go-to expert for luxury real estate.",
      social: {
        linkedin: "davidmillerluxury",
        twitter: "dmillerluxury",
        facebook: "davidmillerluxuryproperties",
        instagram: "davidmiller_luxury",
      },
      stats: {
        avgDaysOnMarket: 42,
        listToSaleRatio: 96.8,
        clientSatisfaction: 99,
      },
      certifications: ["CLHMS", "LUXE", "GRI"],
      featured: true,
      available: true,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      title: "Investment Property Advisor",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=300&fit=crop",
      rating: 4.7,
      reviews: 73,
      experience: "8+ Years",
      propertiesSold: 198,
      totalVolume: "$95M",
      specialties: ["Rental Properties", "Multi-family Units", "REITs"],
      languages: ["English", "Spanish", "Japanese"],
      location: "Investment Center",
      email: "olivia@ayelehomes.com",
      phone: "+1 (555) 567-8901",
      website: "www.oliviamartinezinvest.com",
      bio: "Olivia focuses on investment properties and rental portfolios. Her financial analysis skills and market timing expertise help investors maximize their returns in real estate.",
      social: {
        linkedin: "oliviamartinezinvest",
        twitter: "olivia_invest",
        facebook: "oliviamartinezinvestment",
        instagram: "olivia_investments",
      },
      stats: {
        avgDaysOnMarket: 31,
        listToSaleRatio: 97.5,
        clientSatisfaction: 97,
      },
      certifications: ["CIPS", "CRE", "MRP"],
      featured: false,
      available: false,
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Rural & Land Specialist",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1548940740-204726a19be3?w=1200&h=300&fit=crop",
      rating: 4.8,
      reviews: 64,
      experience: "14+ Years",
      propertiesSold: 121,
      totalVolume: "$85M",
      specialties: ["Farmland", "Ranch Properties", "Development Land"],
      languages: ["English"],
      location: "Rural Division",
      email: "james@ayelehomes.com",
      phone: "+1 (555) 678-9012",
      website: "www.jameswilsonland.com",
      bio: "James specializes in rural and land properties. His deep understanding of zoning regulations and agricultural value makes him the expert for land investments and country living.",
      social: {
        linkedin: "jameswilsonland",
        twitter: "jwilson_land",
        facebook: "jameswilsonruralproperties",
        instagram: "jameswilson_land",
      },
      stats: {
        avgDaysOnMarket: 56,
        listToSaleRatio: 95.3,
        clientSatisfaction: 98,
      },
      certifications: ["ALC", "CCIM", "GRI"],
      featured: false,
      available: true,
    },
    {
      id: 7,
      name: "Sophia Lee",
      title: "New Construction Expert",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=1200&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      experience: "9+ Years",
      propertiesSold: 176,
      totalVolume: "$110M",
      specialties: ["New Builds", "Custom Homes", "Development Projects"],
      languages: ["English", "Korean", "Japanese"],
      location: "Construction Division",
      email: "sophia@ayelehomes.com",
      phone: "+1 (555) 789-0123",
      website: "www.sophialeeconstruction.com",
      bio: "Sophia works exclusively with new construction projects. Her relationships with top builders and knowledge of construction processes help clients get the best value in new homes.",
      social: {
        linkedin: "sophialeecnst",
        twitter: "sophia_newhomes",
        facebook: "sophialeenewconstruction",
        instagram: "sophialee_newhomes",
      },
      stats: {
        avgDaysOnMarket: 22,
        listToSaleRatio: 98.8,
        clientSatisfaction: 99,
      },
      certifications: ["New Home Specialist", "GRI"],
      featured: true,
      available: true,
    },
    {
      id: 8,
      name: "Robert Garcia",
      title: "International Properties Director",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1512917774080-9c9e9be67c5f?w=1200&h=300&fit=crop",
      rating: 4.7,
      reviews: 52,
      experience: "11+ Years",
      propertiesSold: 98,
      totalVolume: "$165M",
      specialties: [
        "International Buyers",
        "Resort Properties",
        "Investment Visas",
      ],
      languages: ["English", "Spanish", "French", "Arabic"],
      location: "International Office",
      email: "robert@ayelehomes.com",
      phone: "+1 (555) 890-1234",
      website: "www.robertgarciainternational.com",
      bio: "Robert handles international transactions and cross-border investments. His global network and understanding of international tax laws make him invaluable for overseas buyers.",
      social: {
        linkedin: "robertgarciaintl",
        twitter: "rgarcia_intl",
        facebook: "robertgarciainternational",
        instagram: "robertgarcia_international",
      },
      stats: {
        avgDaysOnMarket: 45,
        listToSaleRatio: 96.2,
        clientSatisfaction: 97,
      },
      certifications: ["CIPS", "CRE", "FIABCI"],
      featured: false,
      available: true,
    },
  ];

  // Filter options
  const specialties = [
    "all",
    "Luxury Homes",
    "Commercial Properties",
    "First-time Buyers",
    "Investment Properties",
    "New Construction",
    "Rural & Land",
    "International",
  ];

  const languages = [
    "all",
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Korean",
    "Italian",
    "Arabic",
    "Portuguese",
  ];

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      searchQuery === "" ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesSpecialty =
      selectedSpecialty === "all" ||
      agent.specialties.includes(selectedSpecialty);

    const matchesLanguage =
      selectedLanguage === "all" || agent.languages.includes(selectedLanguage);

    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  const toggleFavorite = (id: number) => {
    setFavoriteAgents((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  // Stats
  const stats = [
    { value: agents.length, label: "Expert Agents", icon: Users },
    { value: "15+", label: "Avg Years Experience", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "$1.3B+", label: "Total Volume Sold", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit mb-6">
              <Award size={14} /> Award Winning Team
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Meet Our{" "}
              <span className="relative">
                <span className="text-primary">Expert</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </span>{" "}
              Agents
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Our team of dedicated real estate professionals combines deep
              market knowledge with personalized service to help you achieve
              your property goals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <p className="font-bold text-3xl text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-foreground/60 text-sm">{stat.label}</p>
                </div>
              );
            })}
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
                      placeholder="Search by name, specialty, or keyword..."
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
                <div className="flex items-center gap-3">
                  {(selectedSpecialty !== "all" ||
                    selectedLanguage !== "all") && (
                    <>
                      <span className="text-sm text-foreground/60">
                        Active filters:
                      </span>
                      {selectedSpecialty !== "all" && (
                        <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                          {selectedSpecialty}
                          <button
                            onClick={() => setSelectedSpecialty("all")}
                            className="hover:text-primary/80"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      {selectedLanguage !== "all" && (
                        <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                          {selectedLanguage}
                          <button
                            onClick={() => setSelectedLanguage("all")}
                            className="hover:text-primary/80"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setSelectedSpecialty("all");
                          setSelectedLanguage("all");
                        }}
                        className="text-sm text-primary hover:text-primary/80 font-semibold"
                      >
                        Clear All
                      </button>
                    </>
                  )}
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
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                          : "hover:bg-primary/10 text-foreground/60"
                      }`}
                    >
                      <Users size={20} />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
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
                <h3 className="text-xl font-bold text-foreground">Filters</h3>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Specialty Filter */}
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award size={18} />
                Specialty
              </h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
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

            {/* Language Filter */}
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe size={18} />
                Languages
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => setSelectedLanguage(language)}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedLanguage === language
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium">
                      {language === "all" ? "All Languages" : language}
                    </span>
                    {selectedLanguage === language && (
                      <CheckCircle size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSpecialty("all");
                setSelectedLanguage("all");
              }}
              className="w-full py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Agents Grid */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No Agents Found
              </h3>
              <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find our expert
                agents.
              </p>
              <button
                onClick={() => {
                  setSelectedSpecialty("all");
                  setSelectedLanguage("all");
                  setSearchQuery("");
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
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                    {/* Agent Header with Cover & Avatar */}
                    <div
                      className={`relative ${
                        viewMode === "list"
                          ? "lg:w-80 h-48 lg:h-auto flex-shrink-0"
                          : "h-48"
                      }`}
                    >
                      {/* Cover Image */}
                      <img
                        src={agent.cover}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Avatar & Basic Info */}
                      <div
                        className={`absolute ${
                          viewMode === "list"
                            ? "left-6 bottom-6 flex items-end gap-4"
                            : "left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
                        }`}
                      >
                        <div
                          className={`relative ${
                            viewMode === "list" ? "w-24 h-24" : "w-20 h-20"
                          }`}
                        >
                          <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg"
                          />
                          {agent.available ? (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                          ) : (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white" />
                          )}
                        </div>

                        {viewMode === "list" && (
                          <div className="mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {agent.name}
                            </h3>
                            <p className="text-white/90 text-sm">
                              {agent.title}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(agent.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                          favoriteAgents.includes(agent.id)
                            ? "bg-red-500/20 text-red-500"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          size={20}
                          className={
                            favoriteAgents.includes(agent.id)
                              ? "fill-red-500"
                              : ""
                          }
                        />
                      </button>

                      {/* Featured Badge */}
                      {agent.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                            <Sparkles size={10} />
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Agent Details */}
                    <div
                      className={`p-6 ${viewMode === "list" ? "flex-1" : "pt-16"}`}
                    >
                      {viewMode !== "list" && (
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {agent.name}
                          </h3>
                          <p className="text-foreground/60 text-sm mb-3">
                            {agent.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />
                              <span className="font-bold">{agent.rating}</span>
                              <span className="text-foreground/60 text-sm">
                                ({agent.reviews} reviews)
                              </span>
                            </div>
                            <div className="w-1 h-1 bg-foreground/30 rounded-full" />
                            <span className="text-sm text-foreground/60">
                              {agent.experience}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Stats - Grid View */}
                      {viewMode !== "list" && (
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {agent.propertiesSold}
                            </div>
                            <div className="text-xs text-foreground/60">
                              Properties Sold
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {agent.totalVolume}
                            </div>
                            <div className="text-xs text-foreground/60">
                              Total Volume
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {agent.stats.clientSatisfaction}%
                            </div>
                            <div className="text-xs text-foreground/60">
                              Satisfaction
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bio - Only in list view */}
                      {viewMode === "list" && (
                        <>
                          <div className="mb-4">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star
                                  size={18}
                                  className="fill-yellow-400 text-yellow-400"
                                />
                                <span className="font-bold text-lg">
                                  {agent.rating}
                                </span>
                                <span className="text-foreground/60">
                                  ({agent.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-foreground/60">
                                <Award size={16} />
                                <span>{agent.experience}</span>
                              </div>
                            </div>
                            <p className="text-foreground/70 line-clamp-3">
                              {agent.bio}
                            </p>
                          </div>

                          {/* Stats - List View */}
                          <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-xl font-bold text-primary">
                                {agent.propertiesSold}
                              </div>
                              <div className="text-sm text-foreground/60">
                                Properties Sold
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-primary">
                                {agent.totalVolume}
                              </div>
                              <div className="text-sm text-foreground/60">
                                Total Volume
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-primary">
                                {agent.stats.avgDaysOnMarket}
                              </div>
                              <div className="text-sm text-foreground/60">
                                Avg Days on Market
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-primary">
                                {agent.stats.clientSatisfaction}%
                              </div>
                              <div className="text-sm text-foreground/60">
                                Satisfaction
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Specialties & Languages */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {agent.specialties
                            .slice(0, 3)
                            .map((specialty, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          {agent.specialties.length > 3 && (
                            <span className="px-3 py-1 bg-foreground/5 text-foreground/60 rounded-lg text-sm">
                              +{agent.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/60">
                          <Globe size={14} />
                          <span>{agent.languages.join(", ")}</span>
                        </div>
                      </div>

                      {/* Contact & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Mail size={18} />
                          </button>
                          <button className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Phone size={18} />
                          </button>
                          <button className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <MessageSquare size={18} />
                          </button>
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
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center border border-primary/20">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold text-foreground mb-6">
                      Ready to Work with Our Experts?
                    </h3>
                    <p className="text-foreground/70 mb-8 text-lg">
                      Connect with the perfect agent for your real estate
                      journey. Our team is ready to provide personalized
                      guidance and exceptional service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/contact"
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold inline-flex items-center gap-2 shadow-md"
                      >
                        <MessageSquare size={20} />
                        Contact Us
                      </Link>
                      <Link
                        href="/about"
                        className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold"
                      >
                        Learn About Our Team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Our Agents */}
      <section className="px-4 md:px-8 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Work with Our Agents
            </h2>
            <p className="text-foreground/60 text-lg max-w-3xl mx-auto">
              Our agents bring expertise, dedication, and personalized service
              to every transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Integrity",
                description:
                  "We prioritize your best interests with transparent communication and ethical practices.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: TrendingUp,
                title: "Market Expertise",
                description:
                  "Deep understanding of market trends and property values for optimal results.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Award,
                title: "Award-Winning Service",
                description:
                  "Recognized for exceptional client service and successful transactions.",
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

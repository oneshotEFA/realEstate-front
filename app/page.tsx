"use client";
import { Listing } from "@/lib/type/listing";
import { listingService } from "@/lib/services/listings";
import {
  ChevronRight,
  Home as HomeIcon,
  Building2,
  Leaf,
  MapPin,
  Bed,
  Ruler,

  Car,
  ShoppingBag,
  Clock,
  Star,
  Shield,
  TrendingUp,
  Users,
  Search,
  Filter,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const Home = () => {
  const { data: listing } = useSWR<Listing[]>(
    ["lists"],
    () => listingService.getFeaturedListings(),
    {
      revalidateOnFocus: false,
    },
  );
  const featuredProperties = listing ?? [];
  console.log("Featured Listings:", featuredProperties);
  const featuredPropertiess = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      price: "$850,000",
      location: "Downtown District",
      type: "Modern Apartment",
      beds: 3,
      baths: 2,
      size: "2,400 sqft",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop",
      price: "$1,250,000",
      location: "Suburban Heights",
      type: "Family House",
      beds: 4,
      baths: 3,
      size: "3,500 sqft",
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=600&h=400&fit=crop",
      price: "$450,000",
      location: "Hillside Area",
      type: "Cozy Cottage",
      beds: 2,
      baths: 1,
      size: "1,200 sqft",
      rating: 4.6,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
      price: "$2,100,000",
      location: "Waterfront",
      type: "Luxury Villa",
      beds: 5,
      baths: 4,
      size: "5,000 sqft",
      rating: 5.0,
      featured: true,
    },
  ];

  // Property types for filtering
  const propertyTypes = [
    {
      icon: Building2,
      label: "Apartments",
      types: ["For Sale", "For Rent", "Furnished", "To Buy"],
      count: "124",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: HomeIcon,
      label: "Houses",
      types: ["For Sale", "For Rent", "To Buy"],
      count: "89",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Leaf,
      label: "Land",
      types: ["For Sale", "To Buy"],
      count: "42",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Car,
      label: "Car",
      types: ["For Sale", "For Rent", "To Buy"],
    },

    {
      icon: ShoppingBag,
      label: "Commercial Properties",
      types: ["Offices", "Shops", " Warehouses", "Hotels"],
    },
    {
      icon: Clock,
      label: "Short-Term Rentals",
      types: ["Daily/Weekly", "Furnished", " Airbnb"],
    },
  ];

  // Stats
  const stats = [
    { icon: Users, value: "1,000+", label: "Happy Customers" },
    { icon: Building2, value: "500+", label: "Properties Listed" },
    { icon: Shield, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  ];

  // Trusted by companies
  const trustedCompanies = [
    { name: "Realty Corp", logo: "🏢" },
    { name: "Home Advisors", logo: "🔑" },
    { name: "Property Plus", logo: "⭐" },
    { name: "Urban Living", logo: "🏙️" },
    { name: "Estate Experts", logo: "💼" },
    { name: "Dream Homes", logo: "🏡" },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Redesigned */}
      <section className="relative px-4 md:px-8 py-16 md:py-28 overflow-hidden">
        {/* Background with gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit">
                <Star size={14} /> Trusted by 1,000+ Families
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                  Discover Your{" "}
                  <span className="relative">
                    <span className="text-primary">Dream</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </span>{" "}
                  Home
                </h1>
                <p className="text-lg md:text-xl text-foreground/70">
                  Find the home that truly fits your life. With Ayele Homes, you
                  get honest guidance, a smooth process, and support you can
                  trust.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-xl p-2 border border-border shadow-lg">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Search size={20} className="text-foreground/40" />
                      <input
                        type="text"
                        placeholder="Search by location, property type, or keyword..."
                        className="flex-1 outline-none text-foreground placeholder:text-foreground/40"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2">
                      Search
                      <ArrowRight size={18} />
                    </button>
                    <button className="px-4 py-3 border border-border rounded-lg hover:bg-primary/5 transition-all flex items-center gap-2">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center gap-2">
                      <stat.icon size={20} className="text-primary" />
                      <p className="font-bold text-2xl text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-foreground/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Image with Card */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop"
                  alt="Modern luxury home"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-foreground/60">Featured</p>
                      <h3 className="text-xl font-bold text-foreground">
                        Ocean View Villa
                      </h3>
                    </div>
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                      $2.1M
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>5 Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler size={16} />
                      <span>5,000 sqft</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>Waterfront</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Property Types Section */}
      <section className="px-4 md:px-8 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect Property Type
            </h2>
            <p className="text-foreground/60 text-lg">
              Browse through our curated collection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Link
                  key={index}
                  href={`/properties?type=${type.label.toLowerCase()}`}
                  className="group relative bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className={`${type.color} p-3 rounded-xl`}>
                        <Icon size={28} />
                      </div>
                      <span className="text-2xl font-bold text-foreground">
                        {type.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {type.label}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {type.types.map((t) => (
                          <div
                            key={t}
                            className="text-foreground/60 hover:text-primary transition-colors font-medium flex items-center gap-2 group/link"
                          >
                            <ChevronRight
                              size={16}
                              className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                            />
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Explore Properties
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Properties - Redesigned */}
      <section className="px-4 md:px-8 py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold w-fit mb-4">
                <Star size={14} /> Premium Selection
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Featured <span className="text-primary">Properties</span>
              </h2>
              <p className="text-foreground/60">
                Handpicked homes that match your lifestyle
              </p>
            </div>
            <Link
              href="/properties"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold"
            >
              View All Properties
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Property Cards Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties?.map((property) => (
              <div
                key={property.pid}
                className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    {property.featured && (
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-white font-bold text-sm">
                      {property.agentId}
                    </span>
                  </div>

                  <button className="absolute top-4 right-12 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart size={18} className="text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-secondary">
                      {property.type}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {property.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {property.address}
                  </h3>

                  {/* Property Details */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-border">
                    <div className="text-center">
                      <Bed
                        size={20}
                        className="text-foreground/40 mx-auto mb-1"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {property.bedrooms} Beds
                      </span>
                    </div>
                    <div className="text-center">
                      <Ruler
                        size={20}
                        className="text-foreground/40 mx-auto mb-1"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {property.squareFeet}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-1">
                        <span className="text-xs font-bold">B</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {property.bathrooms} Baths
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/properties/${property.pid}`}
                    className="block w-full py-3 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-center group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Section - Enhanced */}
      <section className="px-4 md:px-8 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Stack */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop"
                  alt="Team at Ayele Homes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-3xl -z-10" />

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 left-6 bg-white rounded-2xl p-6 shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      25+ Years
                    </p>
                    <p className="text-foreground/60">Industry Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-primary font-semibold mb-3">WHY CHOOSE US</p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Your Trusted Partner in Real Estate Journey
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  With over 25 years of experience, Ayele Homes has helped
                  thousands of families find their perfect home. Our dedicated
                  team combines expertise, integrity, and passion to deliver
                  exceptional service.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "AI-powered property matching system",
                  "Virtual tours and 3D walkthroughs",
                  "Transparent pricing with no hidden fees",
                  "Dedicated personal consultant",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ChevronRight size={16} className="text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trusted By - Enhanced */}
      <section className="px-4 md:px-8 py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-foreground/60">
              Partnered with the best in the business
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-4"
              >
                <div className="text-4xl">{company.logo}</div>
                <p className="font-semibold text-foreground text-center">
                  {company.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Ready to Find Your Dream Home?
              </h3>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found their perfect
                home with Ayele Homes. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/properties"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-semibold inline-flex items-center gap-2"
                >
                  Browse Properties
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

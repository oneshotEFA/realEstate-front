import {
  ChevronRight,
  Home as HomeIcon,
  Building2,
  Leaf,
  MapPin,
  Bed,
  Ruler,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  // Mock featured properties data
  const featuredProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1570129477492-45b003493e3b?w=400&h=300&fit=crop",
      price: "$850,000",
      location: "Downtown District",
      type: "Modern Apartment",
      beds: 3,
      size: "2,400 sqft",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      price: "$1,250,000",
      location: "Suburban Heights",
      type: "Family House",
      beds: 4,
      size: "3,500 sqft",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      price: "$450,000",
      location: "Hillside Area",
      type: "Cozy Cottage",
      beds: 2,
      size: "1,200 sqft",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1512917774080-9c9e9be67c5f?w=400&h=300&fit=crop",
      price: "$2,100,000",
      location: "Waterfront",
      type: "Luxury Villa",
      beds: 5,
      size: "5,000 sqft",
    },
  ];

  // Property types for filtering
  const propertyTypes = [
    {
      icon: Building2,
      label: "Apartments",
      types: ["For Sale", "For Rent"],
    },
    {
      icon: HomeIcon,
      label: "Houses",
      types: ["For Sale", "For Rent"],
    },
    {
      icon: Leaf,
      label: "Land",
      types: ["For Sale"],
    },
  ];

  // Trusted by companies (mock)
  const trustedCompanies = [
    "Realty Corp",
    "Home Advisors",
    "Property Plus",
    "Urban Living",
    "Estate Experts",
    "Dream Homes",
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                  Find Your Dream <span className="text-primary">Home</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/70">
                  Discover exceptional properties tailored to your lifestyle.
                  Expert guidance, transparent process, and your satisfaction
                  guaranteed.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold gap-2"
                >
                  Browse Properties
                  <ChevronRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-semibold"
                >
                  Contact Agent
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex gap-8 pt-4 text-sm">
                <div>
                  <p className="font-bold text-primary text-2xl">500+</p>
                  <p className="text-foreground/60">Properties Listed</p>
                </div>
                <div>
                  <p className="font-bold text-primary text-2xl">1000+</p>
                  <p className="text-foreground/60">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative h-96 md:h-full min-h-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45b003493e3b?w=800&h=600&fit=crop"
                alt="Beautiful modern home"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Properties Section */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Featured Properties
              </h2>
              <p className="text-foreground/60">
                Handpicked homes that match your lifestyle
              </p>
            </div>
            <Link
              href="/properties"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All <ChevronRight size={20} />
            </Link>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="group rounded-xl overflow-hidden bg-white border border-border hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={property.image}
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {property.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-secondary font-semibold mb-2">
                    {property.type}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {property.location}
                  </h3>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1">
                      <Bed size={16} className="text-tertiary" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler size={16} className="text-tertiary" />
                      <span>{property.size}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-2 px-3 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-sm">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/properties"
            className="md:hidden flex items-center justify-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-12"
          >
            View All Properties <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* 3. About Us (Short Version) */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Team at Ayele Homes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-primary font-semibold mb-2">
                  About Ayele Homes
                </p>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Your Trusted Real Estate Partner
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  With over 15 years of experience, Ayele Homes has helped
                  thousands of families find their perfect home. Our dedicated
                  team combines expertise, integrity, and passion to deliver
                  exceptional service.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Expert team with industry experience
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Transparent and honest communication
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Comprehensive property database
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Learn More About Us <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What Are You Looking For? Section */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Are You Looking For?
            </h2>
            <p className="text-foreground/60 text-lg">
              Narrow down your search by property type
            </p>
          </div>

          {/* Property Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="group cursor-pointer rounded-2xl p-8 bg-white border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Icon
                        size={32}
                        className="text-primary group-hover:text-primary-foreground"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {type.label}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {type.types.map((t) => (
                        <Link
                          key={t}
                          href={`/properties?type=${type.label}&subtype=${t}`}
                          className="text-foreground/60 hover:text-primary transition-colors font-medium flex items-center gap-2"
                        >
                          <ChevronRight size={16} />
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Trusted By Section */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Trusted by Leading Organizations
          </h2>

          {/* Auto-scrolling company logos */}
          <div className="relative">
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {trustedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-16 px-6 bg-white rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <p className="font-semibold text-foreground/60 text-center whitespace-nowrap">
                    {company}
                  </p>
                </div>
              ))}
            </div>

            {/* Gradient overlays for visual effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

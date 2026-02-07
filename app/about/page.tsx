import Placeholder from '@/components/ui/placeHolder';
import { ArrowRight, Car, ChevronRight, Home, Search, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const About = () => (
  <section className="pt-32 px-4 md:px-8 py-20 bg-background">
    {/* pt-32 gives space below the navbar */}

    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop"
              alt="Ayele Homes Team"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-3xl -z-10" />

          {/* FLOATING CARD */}
          <div className="absolute -bottom-6 left-6 bg-white rounded-2xl p-6 shadow-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">25+ Years</p>
                <p className="text-foreground/60">Combined Expertise</p>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-primary font-semibold mb-3">ABOUT AYELE HOMES</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
              Building Trust, Delivering Homes,
              <span className="text-primary"> Creating Better Journeys</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Ayele Homes provides modern real estate and automotive solutions
              for families, investors, and businesses. With transparent service
              and verified listings, we help you buy, sell, rent, or invest with
              confidence.
            </p>
          </div>

          {/* VALUES */}
          <div className="space-y-4">
            {[
              'Honest and transparent from start to finish',
              'Dedicated consultants for every customer',
              'Verified listings and secure transactions',
              'Smart technology-powered search',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ChevronRight size={16} className="text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* CEO SECTION */}
    <div className="max-w-7xl mx-auto mt-28">
      <h3 className="text-3xl font-bold mb-10 text-foreground text-center">
        Meet Our CEO
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80"
            className="w-full h-full object-cover"
            alt="CEO"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-foreground">
            Ayele (CEO & Founder)
          </h4>
          <p className="text-foreground/70 leading-relaxed">
            With strong vision and passion for real estate and automotive
            services, Ayele leads our team toward transparency, innovation, and
            excellence. His goal is to make property and vehicle ownership
            simple, fair, and accessible.
          </p>

          <div className="flex gap-4 pt-3">
            <div className="bg-primary/10 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-primary">1.2k+</p>
              <p className="text-foreground/60 text-sm">Homes Sold</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-primary">800+</p>
              <p className="text-foreground/60 text-sm">Cars Delivered</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-foreground/60 text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* GRAPH / STATISTICS */}
    <div className="max-w-7xl mx-auto mt-28">
      <h3 className="text-3xl font-bold mb-10 text-center text-foreground">
        Growth Performance
      </h3>

      <div className="bg-white border border-border rounded-3xl p-10 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80"
          alt="Graph"
          className="w-full h-[350px] object-cover rounded-xl"
        />
      </div>
    </div>
    {/* SERVICES SECTION — Add this inside your About Page */}
    <section className="max-w-7xl mx-auto mt-28">
      <h3 className="text-3xl font-bold mb-10 text-center text-foreground">
        Our Services
      </h3>

      <p className="text-foreground/60 text-center max-w-2xl mx-auto mb-16">
        At Ayele Homes, we provide a complete range of real estate and
        automotive services designed to make your buying, selling, or renting
        journey smooth, transparent, and stress-free.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          {
            title: 'Sell Your Property',
            desc: 'We help homeowners sell faster with verified buyers and expert pricing.',
            icon: TrendingUp,
          },
          {
            title: 'Buy Your Dream Home',
            desc: 'Find the perfect home that matches your needs, lifestyle, and budget.',
            icon: Home,
          },
          {
            title: 'Car Sales & Rental',
            desc: 'Buy high-quality cars or rent vehicles with full inspection and fair pricing.',
            icon: Car,
          },
          {
            title: 'Property Management',
            desc: 'We manage rentals, tenants, maintenance, and payments for property owners.',
            icon: Users,
          },
          {
            title: 'Legal & Documentation',
            desc: 'Full support with contracts, property transfer, agreements, and due diligence.',
            icon: Shield,
          },
          {
            title: 'Consultation & Valuation',
            desc: 'Get accurate home valuations and professional real estate advice.',
            icon: Search,
          },
        ].map((service, i) => {
          const Icon = service.icon;
          return (
            <div
              key={i}
              className="p-10 bg-white rounded-3xl border border-border shadow-sm hover:shadow-lg hover:border-primary transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="text-primary" size={32} />
              </div>

              <h4 className="text-2xl font-bold mb-3 text-foreground">
                {service.title}
              </h4>

              <p className="text-foreground/60 leading-relaxed">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>

    {/* PHOTO GALLERY */}
    <div className="max-w-7xl mx-auto mt-28 pb-10">
      <h3 className="text-3xl font-bold mb-10 text-center text-foreground">
        Moments & Highlights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80',
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80',
        ].map((src, i) => (
          <div
            key={i}
            className="h-[300px] rounded-3xl overflow-hidden shadow-md"
          >
            <img src={src} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;

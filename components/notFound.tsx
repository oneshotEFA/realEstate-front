"use client";
import { useEffect } from "react";

import { ChevronRight, Link } from "lucide-react";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const location = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location,
    );
  }, [location]);

  return (

      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <p className="text-3xl font-bold text-foreground mb-4">
            Oops! Page not found
          </p>
          <p className="text-lg text-foreground/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold"
          >
            Back to Home
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>

  );
};

export default NotFound;

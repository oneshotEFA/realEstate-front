import { ChevronRight, Link } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <div className="min-h-[60vh] px-4 md:px-8 py-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        <p className="text-lg text-foreground/70 mb-8">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-sm text-blue-800">
            This page is coming soon! Continue prompting to fill in the content
            for this page, or explore other sections of Ayele Homes.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold"
        >
          Back to Home
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Placeholder;

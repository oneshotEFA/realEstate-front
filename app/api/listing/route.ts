import {
  getAllContent,
  getFilteredContent,
  getPaginatedContent,
} from "@/lib/contentFetcher/filerReader";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Pagination
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1
  ) {
    return NextResponse.json(
      {
        error: "Invalid pagination parameters",
        example: "/api/listing?page=1&limit=10",
      },
      { status: 400 },
    );
  }

  // Filters object for getPaginatedContent
  const filters: Record<string, any> = {};

  // Keep featured logic separate
  const isFeatured = searchParams.get("featured") === "true";
  if (isFeatured) {
    const data = getFilteredContent("listings", { featured: true });
    return NextResponse.json(data);
  }

  // Helper to parse range filters from CSV
  const parseRange = (value: string | null): [number, number] | null => {
    if (!value) return null;
    const parts = value.split(",").map(Number);
    return [parts[0] ?? 0, parts[1] ?? 0] as [number, number];
  };

  // Range filters
  const priceRange = parseRange(searchParams.get("priceRange"));
  if (priceRange) filters.price = { gte: priceRange[0], lte: priceRange[1] };

  const squareFeet = parseRange(searchParams.get("squareFeet"));
  if (squareFeet)
    filters.squareFeet = { gte: squareFeet[0], lte: squareFeet[1] };

  // Exact-match filters
  const exactFilters = [
    "type",
    "status",
    "city",
    "bedrooms",
    "bathrooms",
    "searchQuery",
  ];

  exactFilters.forEach((key) => {
    const value = searchParams.get(key);
    if (value && value !== "all" && value !== "any") {
      filters[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });

  // Use getPaginatedContent for everything else
  console.log("Filters applied:", filters);
  const data = getPaginatedContent("listings", {
    pagination: { page, limit },
    filters,
  });

  return NextResponse.json(data);
}

/*



*/

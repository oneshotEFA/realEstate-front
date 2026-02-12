import { getFilteredContent } from "@/lib/contentFetcher/filerReader";
import { listingService } from "@/lib/services/listings";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Listing ID is required" },
      { status: 400 },
    );
  }

  const listing = getFilteredContent("listings", { pid: id })[0];
  return NextResponse.json(listing);
}

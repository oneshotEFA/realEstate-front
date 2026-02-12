import {
  getAllContent,
  getFilteredContent,
  getPaginatedContent,
} from "@/lib/contentFetcher/filerReader";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const featured = searchParams.get("featured");
  if (featured === "true") {
    const data = getFilteredContent("listings", { featured: true });
    return NextResponse.json(data);
  }
  if (!pageParam && !limitParam) {
    const data = getAllContent("listings");
    return NextResponse.json(data);
  }

  const page = Number(pageParam);
  const limit = Number(limitParam);

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1
  ) {
    return NextResponse.json(
      {
        error: "Invalid pagination parameters",
        example: "/api/listings?page=1&limit=10",
      },
      { status: 400 },
    );
  }

  const data = getPaginatedContent("listings", {
    pagination: { page, limit },
  });

  return NextResponse.json(data);
}

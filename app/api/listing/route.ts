// app/api/projects/route.ts
import { getAllContent } from "@/lib/contentFetcher/filerReader";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = getAllContent("listings");
  return NextResponse.json(data);
}

import { getAllContent } from "@/lib/contentFetcher/filerReader";
import { NextResponse } from "next/server";

export function GET(){
    const data = getAllContent("agents")
    return NextResponse.json(data)
}
import {
  getAllContent,
  getFilteredContent,
} from '@/lib/contentFetcher/filerReader';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ceo = searchParams.get('ceo');
  if (ceo) {
    const data = getFilteredContent('agents', { CEO: true });
    return NextResponse.json(data);
  }
  const data = getAllContent('agents');
  return NextResponse.json(data);
}

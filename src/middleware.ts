import { NextRequest, NextResponse } from "next/server";

// MIDDLEWARE RUNS BEFORE ANY PAGE RENDER EVEN BEFORE FRONTEND AND BACKEND. FIRST MIDDLEWARE RUNS AND AFTER THAT ALL OTHER PAGES RUNS.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

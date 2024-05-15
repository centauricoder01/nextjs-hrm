import { connect } from "@/db/db";
import leaveModel from "@/model/leave.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();
  } catch (error) {}
}

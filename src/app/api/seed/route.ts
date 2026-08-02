import { seed } from "@/db/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seed();
    return NextResponse.json({ message: "Seed successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

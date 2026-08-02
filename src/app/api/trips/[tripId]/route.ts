import { db } from "@/db";
import { trips, buses, routes, companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const tripData = await db.select({
      id: trips.id,
      price: trips.price,
      departureTime: trips.departureTime,
      bus: buses,
      route: routes,
      company: companies,
    })
    .from(trips)
    .innerJoin(buses, eq(trips.busId, buses.id))
    .innerJoin(routes, eq(trips.routeId, routes.id))
    .innerJoin(companies, eq(buses.companyId, companies.id))
    .where(eq(trips.id, tripId))
    .limit(1);

    if (tripData.length === 0) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(tripData[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

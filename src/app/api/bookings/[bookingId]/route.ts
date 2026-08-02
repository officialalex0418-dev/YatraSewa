import { db } from "@/db";
import { bookings, trips, buses, routes, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;
    const bookingData = await db.select({
      id: bookings.id,
      seatNumbers: bookings.seatNumbers,
      totalAmount: bookings.totalAmount,
      userName: users.name,
      tripDepartureTime: trips.departureTime,
      busName: buses.name,
      busType: buses.type,
      routeOrigin: routes.origin,
      routeDestination: routes.destination,
    })
    .from(bookings)
    .innerJoin(users, eq(bookings.userId, users.id))
    .innerJoin(trips, eq(bookings.tripId, trips.id))
    .innerJoin(buses, eq(trips.busId, buses.id))
    .innerJoin(routes, eq(trips.routeId, routes.id))
    .where(eq(bookings.id, bookingId))
    .limit(1);

    if (bookingData.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(bookingData[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

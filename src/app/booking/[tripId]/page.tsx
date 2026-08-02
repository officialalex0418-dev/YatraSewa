import { db } from "@/db";
import { trips, buses, routes, companies, bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SeatSelectionClient from "./SeatSelectionClient";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const tripData = await db.select({
    trip: trips,
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
    notFound();
  }

  const trip = tripData[0];

  // Get already booked seats for this trip
  const existingBookings = await db.select().from(bookings).where(eq(bookings.tripId, tripId));
  const bookedSeats = existingBookings.flatMap(b => b.seatNumbers.split(',').map(s => s.trim()));

  return (
    <SeatSelectionClient 
      trip={trip} 
      bookedSeats={bookedSeats}
    />
  );
}

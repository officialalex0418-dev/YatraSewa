import { db } from "@/db";
import { bookings, trips, yatraPointsTransactions, wallets, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { tripId, seatNumbers, totalAmount } = await req.json();

    if (!tripId || !seatNumbers || !totalAmount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Create Booking
    const [booking] = await db.insert(bookings).values({
      userId: session.user.id,
      tripId,
      seatNumbers,
      totalAmount: totalAmount.toString(),
      paymentStatus: "paid", // Simulating successful payment
      bookingStatus: "confirmed",
    }).returning();

    // 2. Loyalty Points Calculation (10% back)
    const pointsEarned = Math.floor(totalAmount * 0.1);
    
    // 3. Update User Points
    await db.update(users)
      .set({ yatraPoints: sql`${users.yatraPoints} + ${pointsEarned}` })
      .where(eq(users.id, session.user.id));

    // 4. Record Points Transaction
    await db.insert(yatraPointsTransactions).values({
      userId: session.user.id,
      bookingId: booking.id,
      points: pointsEarned,
      type: "earned",
      description: `Earned from booking ${booking.id}`,
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

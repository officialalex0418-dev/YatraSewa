"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, CreditCard, Shield, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripId = searchParams.get("tripId");
  const seats = searchParams.get("seats");
  
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (!tripId) return;
    fetch(`/api/trips/${tripId}`)
      .then(res => res.json())
      .then(data => setTrip(data))
      .catch(() => toast.error("Failed to load trip details"));
  }, [tripId]);

  const handleBooking = async () => {
    if (!tripId || !seats || !trip) return;
    
    setLoading(true);
    const seatCount = seats.split(",").length;
    const totalAmount = seatCount * Number(trip.price);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          tripId,
          seatNumbers: seats,
          totalAmount,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      toast.success("Booking successful!");
      router.push(`/booking/confirmation/${result.bookingId}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!tripId || !seats) return <div className="p-20 text-center">Invalid request</div>;

  const seatCount = seats.split(",").length;
  const pricePerSeat = trip ? Number(trip.price) : 0;
  const totalAmount = seatCount * pricePerSeat;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-purple-600 text-white p-6">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard size={20} />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 border-2 border-purple-600 rounded-2xl bg-purple-50 gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                  <CreditCard size={20} />
                </div>
                <span className="text-sm font-bold">eSewa</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border-2 border-gray-100 rounded-2xl hover:border-purple-200 gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                  <CreditCard size={20} />
                </div>
                <span className="text-sm font-bold">Khalti</span>
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
              <Shield size={20} className="text-green-600" />
              <p className="text-xs text-gray-500">Your transaction is encrypted and secure.</p>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-14 text-lg font-bold gap-2 shadow-lg shadow-purple-200" 
          onClick={handleBooking}
          disabled={loading || !trip}
        >
          {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
          Pay NPR {totalAmount}
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <Card className="border-none shadow-sm p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Bus size={24} />
            </div>
            <div>
              <h3 className="font-bold">{trip?.bus?.name || 'Bus details'}</h3>
              <p className="text-sm text-gray-500">{trip?.route?.origin} to {trip?.route?.destination}</p>
            </div>
          </div>

          <div className="space-y-3 py-4 border-y border-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Selected Seats ({seatCount})</span>
              <span className="font-bold">{seats}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price per seat</span>
              <span className="font-bold">NPR {pricePerSeat}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Taxes & Fees</span>
              <span className="font-bold">NPR 0</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Payable</span>
            <span className="text-2xl font-extrabold text-purple-600">NPR {totalAmount}</span>
          </div>

          <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle2 size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-900">Loyalty Rewards</p>
              <p className="text-xs text-green-700">You will earn <span className="font-bold">{Math.floor(totalAmount * 0.1)} Yatra Points</span> from this trip.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Suspense fallback={<div className="text-center p-20">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}

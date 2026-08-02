"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, User, Check, Info, Shield, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SeatSelectionClient({ trip, bookedSeats }: any) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const router = useRouter();
  
  const rows = 9;
  const seatsPerRow = 4;
  const totalSeats = trip.bus.capacity;

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : prev.length >= 4 
          ? (toast.error("Maximum 4 seats per booking"), prev)
          : [...prev, seatId]
    );
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    // In a real app, you'd lock seats via socket here
    router.push(`/checkout?tripId=${trip.trip.id}&seats=${selectedSeats.join(",")}`);
  };

  const renderSeat = (id: string, label: string) => {
    const isBooked = bookedSeats.includes(id);
    const isSelected = selectedSeats.includes(id);

    return (
      <button
        key={id}
        disabled={isBooked}
        onClick={() => toggleSeat(id)}
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
          isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" :
          isSelected ? "bg-purple-600 text-white shadow-lg scale-110" :
          "bg-white border-2 border-gray-100 text-gray-600 hover:border-purple-300 hover:bg-purple-50"
        )}
      >
        {isBooked ? <User size={14} /> : isSelected ? <Check size={14} /> : label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>Back</Button>
            <div>
              <h2 className="font-bold">{trip.bus.name}</h2>
              <p className="text-xs text-gray-500">{trip.route.origin} → {trip.route.destination}</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-100 rounded" />
              <span className="text-xs font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <span className="text-xs font-medium">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 rounded" />
              <span className="text-xs font-medium">Selected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <Card className="lg:col-span-2 border-none shadow-sm p-8 bg-white flex flex-col items-center">
            <div className="w-full max-w-xs border-4 border-gray-100 rounded-3xl p-8 relative">
              <div className="absolute top-4 right-8 w-12 h-12 border-4 border-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <div className="w-6 h-6 border-4 border-gray-100 rounded-full" />
              </div>
              <div className="mb-12 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">Front</div>
              
              <div className="grid grid-cols-4 gap-4 justify-items-center">
                {Array.from({ length: 32 }).map((_, i) => {
                  const seatNum = i + 1;
                  const seatLabel = `${Math.ceil(seatNum/4)}${String.fromCharCode(65 + (i % 4))}`;
                  return renderSeat(seatLabel, seatLabel);
                })}
              </div>
              
              <div className="mt-12 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">Back</div>
            </div>
          </Card>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                Booking Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Selected Seats</span>
                  <span className="font-bold">{selectedSeats.join(", ") || "None"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Unit Price</span>
                  <span className="font-bold">NPR {trip.trip.price}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-400">Total Amount</span>
                    <p className="text-2xl font-extrabold text-purple-600">NPR {selectedSeats.length * Number(trip.trip.price)}</p>
                  </div>
                  <p className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                    + {Math.floor(selectedSeats.length * Number(trip.trip.price) * 0.1)} Points
                  </p>
                </div>
              </div>

              <Button className="w-full h-12 gap-2" onClick={handleProceed} disabled={selectedSeats.length === 0}>
                Proceed to Checkout
                <ArrowRight size={18} />
              </Button>
            </Card>

            <div className="bg-purple-600 rounded-2xl p-6 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Star size={80} fill="white" />
              </div>
              <h4 className="font-bold mb-2">Yatra Rewards</h4>
              <p className="text-sm text-purple-100 mb-4 leading-relaxed">
                Join our membership program and earn up to 15% back in Yatra Points on every booking!
              </p>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">Learn More</Button>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Money Back Guarantee</p>
                <p className="text-[10px] text-gray-500 italic">Terms and conditions apply</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

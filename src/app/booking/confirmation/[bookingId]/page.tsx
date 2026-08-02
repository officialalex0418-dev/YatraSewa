"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Home, Bus, Calendar, MapPin, Printer } from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

import { useParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/bookings/${bookingId}`)
      .then(res => res.json())
      .then(data => {
        setBooking(data);
        QRCode.toDataURL(bookingId).then(setQrCodeUrl);
      });
  }, [bookingId]);

  const downloadPDF = () => {
    if (!booking) return;

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("YatraSewa Ticket", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking.id}`, 20, 40);
    doc.text(`Passenger: ${booking.userName}`, 20, 50);
    doc.text(`Bus: ${booking.busName}`, 20, 60);
    doc.text(`Route: ${booking.routeOrigin} to ${booking.routeDestination}`, 20, 70);
    doc.text(`Seats: ${booking.seatNumbers}`, 20, 80);
    doc.text(`Total Amount: NPR ${booking.totalAmount}`, 20, 90);
    
    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, 'PNG', 150, 30, 40, 40);
    }
    
    doc.save(`Ticket-${booking.id}.pdf`);
    toast.success("Ticket downloaded!");
  };

  if (!booking) return <div className="p-20 text-center">Loading ticket...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-500">Your ticket has been booked successfully. Have a safe journey!</p>
        </div>

        <Card className="border-none shadow-2xl overflow-hidden mb-8">
          <div className="bg-purple-600 p-8 text-white relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Ticket Number</p>
                <h2 className="text-2xl font-mono font-bold">{booking.id.slice(0, 8).toUpperCase()}</h2>
              </div>
              <div className="bg-white p-2 rounded-lg">
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Passenger</p>
                <p className="text-xl font-bold">{booking.userName}</p>
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">CONFIRMED</span>
              </div>
            </div>
          </div>

          <CardContent className="p-8 space-y-8 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-4 -translate-y-2 flex justify-between px-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-50" />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-purple-600">
                  <Bus size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{booking.busName}</h3>
                  <p className="text-xs text-gray-500">{booking.busType}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Seat(s)</p>
                <p className="font-bold text-lg">{booking.seatNumbers}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-50">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase">From</p>
                <p className="font-bold">{booking.routeOrigin}</p>
                <p className="text-xs text-gray-500">Departure: 07:00 AM</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase">To</p>
                <p className="font-bold">{booking.routeDestination}</p>
                <p className="text-xs text-gray-500">Arrival: 01:00 PM</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Aug 12, 2026</span>
              </div>
              <p className="text-xl font-extrabold text-gray-900">NPR {booking.totalAmount}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-12 gap-2" onClick={downloadPDF}>
            <Download size={20} />
            Download Ticket
          </Button>
          <Button variant="outline" className="h-12 w-12 p-0" onClick={() => window.print()}>
            <Printer size={20} />
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full h-12 gap-2">
              <Home size={20} />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Calendar, Bus, Shield, Star, CreditCard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: ""
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.from) params.set("from", search.from);
    if (search.to) params.set("to", search.to);
    if (search.date) params.set("date", search.date);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <Bus className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              YatraSewa
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-purple-600 transition-colors">Home</Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-purple-600 transition-colors">Bookings</Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">About</Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">Support</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")}>Login</Button>
            <Button onClick={() => router.push("/register")}>Register</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-24">
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Your Journey, <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Simplified.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book bus tickets across Nepal with the most reliable, secure, and user-friendly platform. Travel in comfort and style.
            </p>

            <Card className="shadow-2xl border-none p-2 bg-white/70 backdrop-blur-xl">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <Input 
                    placeholder="From (Origin)" 
                    className="pl-10 h-14 border-none bg-gray-50 focus-visible:ring-1" 
                    value={search.from}
                    onChange={(e) => setSearch({ ...search, from: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <Input 
                    placeholder="To (Destination)" 
                    className="pl-10 h-14 border-none bg-gray-50 focus-visible:ring-1" 
                    value={search.to}
                    onChange={(e) => setSearch({ ...search, to: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                    <Calendar size={20} />
                  </div>
                  <Input 
                    type="date" 
                    className="pl-10 h-14 border-none bg-gray-50 focus-visible:ring-1" 
                    value={search.date}
                    onChange={(e) => setSearch({ ...search, date: e.target.value })}
                  />
                </div>
                <Button className="h-14 gap-2 text-lg" onClick={handleSearch}>
                  <Search size={20} />
                  Search Buses
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold">Secure Booking</h3>
                <p className="text-gray-600">Your data and payments are protected with enterprise-grade security protocols.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Star size={32} />
                </div>
                <h3 className="text-xl font-bold">Loyalty Points</h3>
                <p className="text-gray-600">Earn Yatra Points on every booking and redeem them for future travels.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold">Instant Refund</h3>
                <p className="text-gray-600">Cancel your tickets easily and get instant refunds to your Yatra Wallet.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Bus className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">YatraSewa</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            © 2026 YatraSewa. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

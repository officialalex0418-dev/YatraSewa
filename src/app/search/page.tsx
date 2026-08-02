import { db } from "@/db";
import { trips, buses, routes, companies } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, Clock, MapPin, Star, Shield, Info } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; date?: string }>;
}) {
  const params = await searchParams;
  const from = params.from || "";
  const to = params.to || "";

  // Query trips with bus and route details
  const results = await db.select({
    trip: trips,
    bus: buses,
    route: routes,
    company: companies,
  })
  .from(trips)
  .innerJoin(buses, eq(trips.busId, buses.id))
  .innerJoin(routes, eq(trips.routeId, routes.id))
  .innerJoin(companies, eq(buses.companyId, companies.id))
  .where(
    and(
      from ? eq(routes.origin, from) : undefined,
      to ? eq(routes.destination, to) : undefined
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Bus className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              YatraSewa
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <span className="text-sm font-bold">{from || 'Anywhere'}</span>
            <div className="w-4 h-[1px] bg-gray-300" />
            <span className="text-sm font-bold">{to || 'Anywhere'}</span>
            <div className="w-4 h-[1px] bg-gray-300" />
            <span className="text-sm text-gray-500">{params.date || 'Any Date'}</span>
          </div>
          <Button variant="outline" size="sm">Change Search</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="hidden lg:block space-y-6">
            <Card className="border-none shadow-sm p-6">
              <h3 className="font-bold mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Bus Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-purple-600" /> AC / Deluxe
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-purple-600" /> Non-AC
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Departure Time</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-purple-600" /> Morning
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-purple-600" /> Afternoon
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-purple-600" /> Evening
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Trip Results */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{results.length} Buses Found</h2>
              <select className="bg-transparent text-sm font-medium outline-none border-none">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {results.map((item) => (
              <Card key={item.trip.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-6 md:col-span-3 border-r border-gray-50">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <Bus size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-purple-600 transition-colors">{item.bus.name}</h3>
                            <p className="text-sm text-gray-500">{item.company.name} • {item.bus.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                          <Star size={12} fill="currentColor" /> 4.8
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold">{format(new Date(item.trip.departureTime), "HH:mm")}</span>
                          <span className="text-sm text-gray-500">{item.route.origin}</span>
                        </div>
                        <div className="flex flex-col items-center flex-1 px-8">
                          <span className="text-xs text-gray-400 mb-1">{item.route.estimatedDuration}</span>
                          <div className="w-full h-[2px] bg-gray-100 relative">
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-purple-600 bg-white" />
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-indigo-600 bg-white" />
                          </div>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-2xl font-bold">{format(new Date(item.trip.arrivalTime), "HH:mm")}</span>
                          <span className="text-sm text-gray-500">{item.route.destination}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                        {Array.isArray(item.bus.amenities) && (item.bus.amenities as string[]).map((amenity) => (
                          <span key={amenity} className="text-[10px] font-bold uppercase bg-gray-50 text-gray-500 px-2 py-1 rounded whitespace-nowrap">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50/50 flex flex-col justify-between items-center text-center">
                      <div>
                        <p className="text-xs text-gray-400 line-through">NPR {Number(item.trip.price) + 250}</p>
                        <p className="text-2xl font-extrabold text-gray-900">NPR {item.trip.price}</p>
                        <p className="text-[10px] text-green-600 font-bold mt-1">10% Points Back</p>
                      </div>
                      <Link href={`/booking/${item.trip.id}`} className="w-full">
                        <Button className="w-full">Select Seat</Button>
                      </Link>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Shield size={10} /> Secure Booking
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {results.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Info size={40} />
                </div>
                <h3 className="text-xl font-bold">No buses found</h3>
                <p className="text-gray-500">Try changing your search criteria or date.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

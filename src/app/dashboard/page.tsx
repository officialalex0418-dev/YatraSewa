import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, MapPin, Calendar, Clock, CreditCard, Star } from "lucide-react";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.user.role === 'admin') {
    redirect("/dashboard/admin");
  }

  if (session.user.role === 'company') {
    redirect("/dashboard/company/fleet");
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
            <Calendar className="text-purple-600 w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-500 font-medium">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Yatra Points</CardTitle>
            <Star className="text-yellow-500 w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-gray-500">Worth NPR 45.00</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Wallet Balance</CardTitle>
            <CreditCard className="text-blue-500 w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NPR 1,200</div>
            <p className="text-xs text-gray-500">Available for booking</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Trips</CardTitle>
            <Bus className="text-indigo-600 w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-indigo-500 font-medium">Kathmandu - Pokhara</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 border border-gray-100 group-hover:border-purple-200">
                    <Bus size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Kathmandu → Pokhara</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={14} /> Aug 12, 2026</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> 07:00 AM</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">NPR 1,250</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md mt-1">Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

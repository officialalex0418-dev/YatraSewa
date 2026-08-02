import { db } from "@/db";
import { users, bookings, companies } from "@/db/schema";
import { sql, count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bus, CreditCard, ShoppingBag, TrendingUp, ShieldCheck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') {
    redirect("/dashboard");
  }

  const [userCount] = await db.select({ value: count() }).from(users);
  const [bookingCount] = await db.select({ value: count() }).from(bookings);
  const [companyCount] = await db.select({ value: count() }).from(companies);
  const [revenue] = await db.select({ value: sql<number>`sum(total_amount)` }).from(bookings);

  const stats = [
    { name: "Total Users", value: userCount.value, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Bookings", value: bookingCount.value, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Active Companies", value: companyCount.value, icon: Bus, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Total Revenue", value: `NPR ${revenue.value || 0}`, icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={stat.bg + " p-3 rounded-2xl " + stat.color}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent User Registrations</CardTitle>
            <TrendingUp size={20} className="text-gray-400" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {/* Fetch recent users */}
               <div className="flex items-center justify-between py-2 border-b border-gray-50">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gray-100" />
                   <div>
                     <p className="text-sm font-bold">John Doe</p>
                     <p className="text-xs text-gray-500">user.laxmisah988@gmail.com</p>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded">Customer</span>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Platform Health</CardTitle>
            <ShieldCheck size={20} className="text-green-500" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Status</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database Status</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Email Service</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

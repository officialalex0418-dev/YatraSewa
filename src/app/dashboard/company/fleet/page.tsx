import { db } from "@/db";
import { buses, companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, Plus, Edit, Trash } from "lucide-react";

export default async function FleetPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'company') {
    redirect("/dashboard");
  }

  // Get company ID
  const companyData = await db.select().from(companies).where(eq(companies.ownerId, session.user.id)).limit(1);
  if (companyData.length === 0) return <div>No company found</div>;
  
  const company = companyData[0];
  const fleet = await db.select().from(buses).where(eq(buses.companyId, company.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Fleet Management</h2>
          <p className="text-gray-500 text-sm">Manage your buses and their details.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Add New Bus
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((bus) => (
          <Card key={bus.id} className="border-none shadow-sm overflow-hidden group">
            <CardHeader className="bg-purple-600 p-4 text-white">
              <div className="flex justify-between items-start">
                <Bus size={32} />
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-red-500">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-1">{bus.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{bus.registrationNumber}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Type</p>
                  <p className="text-sm font-bold">{bus.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Capacity</p>
                  <p className="text-sm font-bold">{bus.capacity} Seats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {fleet.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <Bus size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-400">No buses in your fleet yet</h3>
            <Button variant="ghost" className="mt-4">Add your first bus</Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { db } from "@/db";
import { wallets, yatraPointsTransactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, History } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default async function WalletPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, session.user.id)).limit(1);
  const transactions = await db.select().from(yatraPointsTransactions).where(eq(yatraPointsTransactions.userId, session.user.id)).orderBy(desc(yatraPointsTransactions.createdAt)).limit(10);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet size={160} />
          </div>
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Available Balance</p>
                <h2 className="text-5xl font-extrabold">NPR {wallet?.balance || "0.00"}</h2>
              </div>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-none gap-2">
                <Plus size={18} />
                Load Funds
              </Button>
            </div>
            
            <div className="flex gap-12">
              <div>
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Yatra Points</p>
                <p className="text-2xl font-bold">{session.user.yatraPoints}</p>
              </div>
              <div>
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">Membership</p>
                <p className="text-2xl font-bold capitalize">{session.user.membership}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col h-24 gap-2 rounded-2xl">
                <ArrowUpRight className="text-green-500" />
                Transfer
              </Button>
              <Button variant="outline" className="flex flex-col h-24 gap-2 rounded-2xl">
                <ArrowDownLeft className="text-blue-500" />
                Redeem
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <History size={20} className="text-purple-600" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                    tx.type === 'earned' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {tx.type === 'earned' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{format(new Date(tx.createdAt!), "MMM dd, yyyy • HH:mm")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold", tx.type === 'earned' ? "text-green-600" : "text-red-600")}>
                    {tx.type === 'earned' ? '+' : '-'}{tx.points} Points
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.type}</p>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <History size={32} className="mx-auto mb-2 opacity-20" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

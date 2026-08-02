import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MoreVertical, Edit, Trash, Shield } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') {
    redirect("/dashboard");
  }

  const allUsers = await db.select().from(users);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-500 text-sm">Monitor and manage platform users.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Membership</th>
                <th className="px-6 py-4">Points</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600' :
                      user.role === 'company' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 capitalize">{user.membership}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {user.yatraPoints}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

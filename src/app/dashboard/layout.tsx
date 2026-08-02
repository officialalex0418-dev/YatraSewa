import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bus, LayoutDashboard, Calendar, Users, Settings, LogOut, Wallet, Star, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Loyalty", href: "/dashboard/loyalty", icon: Star },
  ];

  if (user.role === "admin") {
    navItems.push(
      { name: "Admin Home", href: "/dashboard/admin", icon: Shield },
      { name: "User Management", href: "/dashboard/admin/users", icon: Users }
    );
  }

  if (user.role === "company") {
    navItems.push(
      { name: "Fleet Management", href: "/dashboard/company/fleet", icon: Bus }
    );
  }

  navItems.push({ name: "Settings", href: "/dashboard/settings", icon: Settings });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Bus className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            YatraSewa
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors font-medium"
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-purple-50 p-4 rounded-2xl mb-4">
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Membership</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{user.membership} Member</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your travels today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{user.yatraPoints} Points</p>
              <p className="text-xs text-gray-500">Yatra Loyalty</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white shadow-sm" />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Ticket, Wallet, Star, Clock, Gift, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerDashboard = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-gradient text-white flex items-center justify-center font-bold">Y</div>
          <span className="text-xl font-bold tracking-tight">YatraSewa</span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <NavItem icon={<Clock size={20} />} label="Overview" active />
          <NavItem icon={<Ticket size={20} />} label="My Bookings" />
          <NavItem icon={<Wallet size={20} />} label="Wallet & Points" />
          <NavItem icon={<Gift size={20} />} label="Coupons" />
          <NavItem icon={<Star size={20} />} label="Reviews" />
          <div className="pt-8 mt-8 border-t border-slate-100">
            <NavItem icon={<Settings size={20} />} label="Profile Settings" />
            <NavItem icon={<LogOut size={20} />} label="Sign Out" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Welcome, {user?.name}!</h1>
            <p className="text-slate-500 mt-1">Ready for your next adventure?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-purple-50 rounded-2xl flex items-center space-x-3">
              <Gift className="text-purple-600" size={20} />
              <div className="text-right">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Yatra Points</div>
                <div className="text-lg font-black text-purple-600">{user?.yatraPoints || 0}</div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-white shadow-sm" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard label="Total Trips" value="12" icon={<Clock size={24} />} color="bg-blue-500" />
          <StatCard label="Wallet Balance" value={`NPR ${user?.walletBalance || 0}`} icon={<Wallet size={24} />} color="bg-emerald-500" />
          <StatCard label="Loyalty Status" value="Silver" icon={<Star size={24} />} color="bg-amber-500" />
        </div>

        {/* Recent Bookings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Bookings</h2>
            <button className="text-sm font-bold text-purple-600 hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Ticket size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No active bookings</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">Your upcoming trips will appear here. Start by searching for a bus.</p>
              <button className="mt-8 px-8 py-3 bg-purple-gradient text-white font-bold rounded-2xl shadow-lg shadow-purple-200">
                Search Buses
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-purple-gradient text-white shadow-lg shadow-purple-200' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatCard = ({ label, value, icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between"
  >
    <div>
      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-black text-slate-900 mt-2">{value}</div>
    </div>
    <div className={`p-4 rounded-2xl text-white ${color} shadow-lg shadow-opacity-20`}>
      {icon}
    </div>
  </motion.div>
);

export default CustomerDashboard;

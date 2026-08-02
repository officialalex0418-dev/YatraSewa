import DashboardLayout from '../../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Users,
  Bus,
  DollarSign,
  ShieldCheck,
  ArrowUpRight,
  Briefcase,
  Ticket,
  TrendingUp,
  LifeBuoy
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, bookings: 240 },
  { name: 'Tue', revenue: 3000, bookings: 139 },
  { name: 'Wed', revenue: 2000, bookings: 980 },
  { name: 'Thu', revenue: 2780, bookings: 390 },
  { name: 'Fri', revenue: 1890, bookings: 480 },
  { name: 'Sat', revenue: 2390, bookings: 380 },
  { name: 'Sun', revenue: 3490, bookings: 430 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="SUPER_ADMIN">
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Platform Overview</h1>
            <p className="text-slate-500 mt-2 text-lg">Real-time health and performance metrics.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
            </div>
            <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02]">
              System Health
            </button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard label="Total Revenue" value="NPR 2.4M" trend="+24%" icon={<DollarSign size={24} />} color="bg-purple-600" />
          <StatCard label="Active Companies" value="124" trend="+8" icon={<Briefcase size={24} />} color="bg-blue-600" />
          <StatCard label="Total Users" value="12,504" trend="+1.2k" icon={<Users size={24} />} color="bg-emerald-600" />
          <StatCard label="Active Trips" value="482" trend="+12" icon={<Bus size={24} />} color="bg-amber-600" />
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Commission</div>
                <TrendingUp className="text-purple-600" size={20} />
             </div>
             <div className="text-3xl font-black text-slate-900">NPR 142.5K</div>
             <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-[65%]" />
             </div>
             <div className="mt-4 flex justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">TARGET: 200K</span>
                <span className="text-purple-600">65% ACHIVED</span>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Booking Success</div>
                <Ticket className="text-emerald-600" size={20} />
             </div>
             <div className="text-3xl font-black text-slate-900">98.2%</div>
             <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98%]" />
             </div>
             <div className="mt-4 flex justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">PREV: 96.4%</span>
                <span className="text-emerald-600">+1.8% IMPROVED</span>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Support Tickets</div>
                <LifeBuoy className="text-amber-600" size={20} />
             </div>
             <div className="text-3xl font-black text-slate-900">12 OPEN</div>
             <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[40%]" />
             </div>
             <div className="mt-4 flex justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">TOTAL: 45</span>
                <span className="text-amber-600">8 URGENT</span>
             </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                 <h3 className="text-xl font-black text-slate-900">Revenue Performance</h3>
                 <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Global Earnings</p>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                    <span className="text-xs font-bold text-slate-500">REVENUE</span>
                 </div>
                 <select className="bg-slate-50 border-none outline-none text-xs font-bold text-slate-500 rounded-xl px-4 py-2">
                   <option>Weekly View</option>
                   <option>Monthly View</option>
                 </select>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-8">Recent Activity</h3>
             <div className="space-y-8">
                {[
                   { label: 'New Company', desc: 'Everest Travels registered', time: '2m ago', icon: <Briefcase size={16} />, color: 'bg-blue-50 text-blue-600' },
                   { label: 'High Revenue', desc: 'Kathmandu-Pokhara route spike', time: '15m ago', icon: <TrendingUp size={16} />, color: 'bg-purple-50 text-purple-600' },
                   { label: 'System Alert', desc: 'Backup completed successfully', time: '1h ago', icon: <ShieldCheck size={16} />, color: 'bg-emerald-50 text-emerald-600' },
                   { label: 'Support', desc: 'Urgent ticket #7281 opened', time: '3h ago', icon: <LifeBuoy size={16} />, color: 'bg-amber-50 text-amber-600' },
                ].map((item, i) => (
                   <div key={i} className="flex items-start space-x-4">
                      <div className={`p-3 rounded-2xl ${item.color} shrink-0`}>
                         {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-slate-900">{item.label}</h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</span>
                         </div>
                         <p className="text-xs text-slate-500 mt-1 font-medium truncate">{item.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
             <button className="w-full mt-10 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm">
                View Full Audit Logs
             </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

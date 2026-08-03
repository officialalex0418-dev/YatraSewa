import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { useAppSelector } from '../../hooks/redux';
import { TrendingUp, Users, Bus, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const CompanyDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['companyStats'],
    queryFn: async () => {
      const response = await api.get('/company/stats');
      return response.data;
    },
  });

  return (
    <DashboardLayout role="COMPANY">
      <div className="space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Company Overview</h1>
            <p className="text-slate-500 mt-1">Monitor your fleet performance and revenue.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 flex items-center space-x-2">
              <Calendar size={16} />
              <span>Aug 1, 2026 - Aug 31, 2026</span>
            </div>
            <button className="px-6 py-2.5 bg-purple-gradient text-white font-bold rounded-xl shadow-lg shadow-purple-200 hover:scale-[1.02] transition-transform">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Revenue"
            value={`NPR ${stats?.totalRevenue || 0}`}
            trend="+12.5%"
            icon={<DollarSign size={24} />}
            color="text-emerald-600 bg-emerald-50"
          />
          <StatCard
            label="Tickets Sold"
            value={stats?.totalTickets || 0}
            trend="+5.2%"
            icon={<TrendingUp size={24} />}
            color="text-blue-600 bg-blue-50"
          />
          <StatCard
            label="Total Fleet"
            value={stats?.totalBuses || 0}
            icon={<Bus size={24} />}
            color="text-purple-600 bg-purple-50"
          />
          <StatCard
            label="Active Trips"
            value={stats?.totalTrips || 0}
            icon={<Calendar size={24} />}
            color="text-amber-600 bg-amber-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
              <select className="bg-slate-50 border-none outline-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1.5">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
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
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Recent Activity</h3>
            <div className="space-y-6">
              {stats?.recentBookings?.length > 0 ? (
                stats.recentBookings.map((booking: any) => (
                  <div key={booking._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">New Booking</div>
                        <div className="text-xs text-slate-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-emerald-600">+NPR {booking.paidAmount}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm">No recent bookings found.</p>
                </div>
              )}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ label, value, trend, icon, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
      {trend && (
        <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
          <ArrowUpRight size={14} />
          <span>{trend}</span>
        </div>
      )}
    </div>
    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</div>
    <div className="text-2xl font-black text-slate-900 mt-1">{value}</div>
  </motion.div>
);

export default CompanyDashboard;

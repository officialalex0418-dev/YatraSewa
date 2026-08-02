import DashboardLayout from '../../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { Users, Bus, DollarSign, ShieldCheck, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="SUPER_ADMIN">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Platform Control Center</h1>
            <p className="text-slate-500 mt-1">Global monitoring of YatraSewa ecosystem.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
              System Health
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlobalStatCard label="Total Revenue" value="NPR 2.4M" trend="+24%" icon={<DollarSign size={24} />} color="bg-purple-600" />
          <GlobalStatCard label="Active Companies" value="124" trend="+8" icon={<Bus size={24} />} color="bg-blue-600" />
          <GlobalStatCard label="Total Users" value="12,504" trend="+1.2k" icon={<Users size={24} />} color="bg-emerald-600" />
          <GlobalStatCard label="Pending Approvals" value="12" icon={<ShieldCheck size={24} />} color="bg-amber-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Company Approvals */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Pending Approvals</h3>
              <button className="text-sm font-bold text-purple-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Everest Travels', email: 'contact@everest.com', date: '2 hours ago' },
                { name: 'Annapurna Express', email: 'admin@annapurna.np', date: '5 hours ago' },
                { name: 'Lumbini Yatayat', email: 'info@lumbini.com', date: '1 day ago' },
              ].map((company, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                      {company.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{company.name}</div>
                      <div className="text-xs text-slate-500">{company.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-xs font-bold text-slate-400 mr-4 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{company.date}</span>
                    </div>
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8">System Alerts</h3>
            <div className="space-y-6">
              <div className="flex space-x-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <div>
                  <div className="text-sm font-bold text-amber-900">Settlement Overdue</div>
                  <div className="text-xs text-amber-700 mt-1">4 companies have pending commission settlements for July 2026.</div>
                </div>
              </div>
              <div className="flex space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Clock className="text-blue-600 shrink-0" size={24} />
                <div>
                  <div className="text-sm font-bold text-blue-900">Backup Completed</div>
                  <div className="text-xs text-blue-700 mt-1">Daily system backup was successful at 04:00 AM.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const GlobalStatCard = ({ label, value, trend, icon, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-6"
  >
    <div className={`p-4 rounded-2xl text-white ${color} shadow-lg shadow-opacity-20`}>
      {icon}
    </div>
    <div>
      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="flex items-center space-x-3 mt-1">
        <div className="text-2xl font-black text-slate-900">{value}</div>
        {trend && (
          <div className="flex items-center space-x-1 text-emerald-600 text-xs font-bold">
            <ArrowUpRight size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;

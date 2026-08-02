import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

export const StatCard = ({ label, value, trend, trendType = 'up', icon, color }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center space-x-6"
  >
    <div className={`p-4 rounded-[24px] text-white ${color} shadow-lg shadow-opacity-20`}>
      {icon}
    </div>
    <div>
      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="flex items-center space-x-3 mt-2">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold ${
            trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-red-600'
          }`}>
            {trendType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

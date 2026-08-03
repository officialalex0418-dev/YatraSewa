import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  Calendar,
  Plus,
  ArrowRight,
  Clock,
  Bus as BusIcon,
  MapPin,
  Trash2,
  X,
  UserCheck,
  Zap,
  Repeat
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface Trip {
  _id: string;
  departureTime: string;
  arrivalTime: string;
  baseFare: number;
  status: string;
  busId: any;
  routeId: any;
}

const Trips = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: trips, isLoading, refetch } = useQuery<Trip[]>({
    queryKey: ['companyTrips'],
    queryFn: async () => {
      const response = await api.get('/company/trips');
      return response.data;
    },
  });

  const { data: buses } = useQuery({ queryKey: ['buses'], queryFn: () => api.get('/company/buses').then(r => r.data) });
  const { data: routes } = useQuery({ queryKey: ['routes'], queryFn: () => api.get('/company/routes').then(r => r.data) });

  const { register, handleSubmit, reset } = useForm<any>();

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/company/trips', data),
    onSuccess: () => {
      toast.success('Trip scheduled successfully!');
      setIsModalOpen(false);
      refetch();
    },
    onError: (error: any) => toast.error(error.response?.data?.message || 'Scheduling conflict detected'),
  });

  const onSubmit = (data: any) => createMutation.mutate(data);

  const columns: ColumnDef<Trip>[] = [
    {
      accessorKey: 'departureTime',
      header: 'Trip Schedule',
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
              <Calendar size={20} />
           </div>
           <div>
              <div className="font-black text-slate-900">{new Date(row.original.departureTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                 <Clock size={10} />
                 <span>ETA: {new Date(row.original.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
           </div>
        </div>
      ),
    },
    {
      id: 'details',
      header: 'Route & Bus',
      cell: ({ row }) => (
        <div className="space-y-1.5">
           <div className="flex items-center space-x-2 text-xs font-black text-slate-700">
              <MapPin size={12} className="text-purple-600" />
              <span>{row.original.routeId?.from}</span>
              <ArrowRight size={12} className="text-slate-300" />
              <span>{row.original.routeId?.to}</span>
           </div>
           <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase">
              <BusIcon size={12} className="text-slate-300" />
              <span>{row.original.busId?.busName} ({row.original.busId?.busNumber})</span>
           </div>
        </div>
      ),
    },
    {
      accessorKey: 'baseFare',
      header: 'Pricing',
      cell: ({ row }) => (
        <div className="text-sm font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-lg inline-block">
          NPR {row.original.baseFare}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          <Zap size={10} />
          <span>{row.original.status}</span>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="COMPANY">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trip Scheduler</h1>
            <p className="text-slate-500 mt-1 font-medium">Coordinate your fleet schedules and staff.</p>
          </div>
          <button
            onClick={() => { reset(); setIsModalOpen(true); }}
            className="px-6 py-3 bg-purple-gradient text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Schedule New Trip</span>
          </button>
        </div>

        {isLoading ? (
           <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-purple-600" /></div>
        ) : (
          <DataTable columns={columns} data={trips || []} />
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h2 className="text-2xl font-black text-slate-900">Schedule Trip</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-white rounded-xl shadow-sm"><X size={24} /></button>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Route</label>
                        <select {...register('routeId', { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-purple-500/20 font-bold">
                           <option value="">Choose Route</option>
                           {routes?.map((r: any) => <option key={r._id} value={r._id}>{r.from} → {r.to}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Assign Vehicle</label>
                        <select {...register('busId', { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-purple-500/20 font-bold">
                           <option value="">Choose Bus</option>
                           {buses?.filter((b: any) => b.status === 'ACTIVE').map((b: any) => <option key={b._id} value={b._id}>{b.busName} ({b.busNumber})</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Departure Time</label>
                        <input type="datetime-local" {...register('departureTime', { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none font-bold" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Arrival Time</label>
                        <input type="datetime-local" {...register('arrivalTime', { required: true })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none font-bold" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Base Ticket Fare</label>
                        <input type="number" {...register('baseFare', { required: true })} placeholder="NPR 0.00" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none font-bold" />
                     </div>
                     <div className="flex items-center space-x-3 p-5 bg-slate-50 rounded-3xl border border-slate-100 mt-6">
                        <Repeat size={20} className="text-purple-600" />
                        <div className="flex-1">
                           <div className="text-xs font-black text-slate-900 uppercase">Recurring Trip</div>
                           <div className="text-[10px] font-bold text-slate-400">Repeat schedule automatically</div>
                        </div>
                        <input type="checkbox" {...register('isRecurring')} className="w-6 h-6 rounded-lg text-purple-600 border-slate-200" />
                     </div>
                  </div>

                  <button type="submit" className="w-full py-5 bg-purple-gradient text-white font-black rounded-[32px] shadow-2xl shadow-purple-200 hover:scale-[1.01] transition-all">
                     {createMutation.isPending ? 'Scheduling Trip...' : 'Publish Trip to Public'}
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Trips;

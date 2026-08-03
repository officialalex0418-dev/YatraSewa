import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  MapPin,
  Plus,
  Trash2,
  X,
  ArrowRight,
  Clock,
  Navigation,
  Map as MapIcon,
  Phone,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';

interface Route {
  _id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  isActive: boolean;
}

const Routes = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: routes, isLoading, refetch } = useQuery<Route[]>({
    queryKey: ['companyRoutes'],
    queryFn: async () => {
      const response = await api.get('/company/routes');
      return response.data;
    },
  });

  const { register, control, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      stops: [{ name: '', timeFromStart: '' }],
      pickupPoints: [{ name: '', address: '' }]
    }
  });

  const { fields: stopFields, append: addStop, remove: removeStop } = useFieldArray({
    control,
    name: 'stops'
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/company/routes', data),
    onSuccess: () => {
      toast.success('Route created successfully!');
      setIsModalOpen(false);
      refetch();
    },
  });

  const onSubmit = (data: any) => createMutation.mutate(data);

  const columns: ColumnDef<Route>[] = [
    {
      accessorKey: 'from',
      header: 'Route Path',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center">
             <div className="w-3 h-3 rounded-full bg-purple-600" />
             <div className="w-0.5 h-4 bg-slate-200" />
             <div className="w-3 h-3 rounded-full border-2 border-purple-600" />
          </div>
          <div>
            <div className="font-black text-slate-900 flex items-center space-x-2">
               <span>{row.original.from}</span>
               <ArrowRight size={14} className="text-slate-400" />
               <span>{row.original.to}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Route ID: {row.original._id.slice(-6)}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'distance',
      header: 'Specs',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
             <Navigation size={12} className="text-slate-400" />
             <span>{row.original.distance}</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
             <Clock size={12} className="text-slate-300" />
             <span>{row.original.duration}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><Info size={18} /></button>
          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="COMPANY">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Route Management</h1>
            <p className="text-slate-500 mt-1 font-medium">Define your travel paths and boarding points.</p>
          </div>
          <button
            onClick={() => { reset(); setIsModalOpen(true); }}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create New Route</span>
          </button>
        </div>

        {isLoading ? (
           <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-purple-600" /></div>
        ) : (
          <DataTable columns={columns} data={routes || []} />
        )}
      </div>

      {/* Route Builder Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[85vh]">
               <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Route Builder</h2>
                    <p className="text-slate-500 text-sm font-medium">Map out your journey</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-white rounded-xl shadow-sm"><X size={24} /></button>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 space-y-10">
                  {/* Basic Route Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                           <MapPin size={14} className="text-purple-600" />
                           <span>Departure City</span>
                        </label>
                        <input {...register('from', { required: true })} placeholder="e.g. Kathmandu" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-purple-500/20 font-black text-slate-700" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                           <MapPin size={14} className="text-rose-500" />
                           <span>Destination City</span>
                        </label>
                        <input {...register('to', { required: true })} placeholder="e.g. Pokhara" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-rose-500/20 font-black text-slate-700" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Distance</label>
                        <input {...register('distance')} placeholder="e.g. 200 km" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estimated Duration</label>
                        <input {...register('duration')} placeholder="e.g. 6h 30m" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                     </div>
                  </div>

                  {/* Intermediate Stops */}
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Journey Stops</label>
                        <button type="button" onClick={() => addStop({ name: '', timeFromStart: '' })} className="text-purple-600 font-bold text-xs flex items-center space-x-1 hover:underline">
                           <Plus size={14} />
                           <span>Add Stop</span>
                        </button>
                     </div>

                     <div className="space-y-4">
                        {stopFields.map((field, index) => (
                           <div key={field.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 group">
                              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400">{index + 1}</div>
                              <input {...register(`stops.${index}.name`)} placeholder="Stop Name" className="flex-1 bg-transparent outline-none font-bold text-sm" />
                              <input {...register(`stops.${index}.timeFromStart`)} placeholder="Time (e.g. 2h)" className="w-24 bg-transparent outline-none font-bold text-sm text-slate-400" />
                              <button type="button" onClick={() => removeStop(index)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                           </div>
                        ))}
                     </div>
                  </div>

                  <button type="submit" className="w-full py-5 bg-purple-gradient text-white font-black rounded-[32px] shadow-2xl shadow-purple-200 hover:scale-[1.01] transition-all">
                     {createMutation.isPending ? 'Saving Route...' : 'Confirm Route Creation'}
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Routes;

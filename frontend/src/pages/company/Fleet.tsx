import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  Bus as BusIcon,
  Plus,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Layout,
  Wifi,
  Wind,
  Battery,
  Tv,
  Coffee
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface Bus {
  _id: string;
  busName: string;
  busNumber: string;
  busType: string;
  category: string;
  totalSeats: number;
  status: string;
  amenities: string[];
}

const AMENITIES = [
  { id: 'AC', icon: <Wind size={16} />, label: 'Air Conditioning' },
  { id: 'WIFI', icon: <Wifi size={16} />, label: 'WiFi' },
  { id: 'CHARGING', icon: <Battery size={16} />, label: 'Charging Ports' },
  { id: 'TV', icon: <Tv size={16} />, label: 'Entertainment' },
  { id: 'WATER', icon: <Coffee size={16} />, label: 'Mineral Water' },
];

const Fleet = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingBus, setEditingBus] = React.useState<Bus | null>(null);

  const { data: buses, isLoading, refetch } = useQuery<Bus[]>({
    queryKey: ['companyBuses'],
    queryFn: async () => {
      const response = await api.get('/company/buses');
      return response.data;
    },
  });

  const { register, handleSubmit, reset, setValue, watch } = useForm<any>();

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/company/buses', data),
    onSuccess: () => {
      toast.success('Bus added to fleet!');
      setIsModalOpen(false);
      refetch();
    },
    onError: (error: any) => toast.error(error.response?.data?.message || 'Failed to add bus'),
  });

  const onSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  const columns: ColumnDef<Bus>[] = [
    {
      accessorKey: 'busName',
      header: 'Bus Details',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <BusIcon size={24} />
          </div>
          <div>
            <div className="font-black text-slate-900">{row.original.busName}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.original.busNumber}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'busType',
      header: 'Type & Category',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-700">{row.original.busType}</div>
          <div className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded inline-block">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: 'totalSeats',
      header: 'Capacity',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Layout size={16} className="text-slate-400" />
          <span className="text-sm font-bold text-slate-700">{row.original.totalSeats} Seats</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const colors = {
          ACTIVE: 'bg-emerald-50 text-emerald-600',
          MAINTENANCE: 'bg-amber-50 text-amber-600',
          RETIRED: 'bg-rose-50 text-rose-600',
        }[status as keyof typeof colors] || 'bg-slate-50 text-slate-600';

        return (
          <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current opacity-80 ${colors}`}>
            {status === 'ACTIVE' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><FileText size={18} /></button>
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fleet Management</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage your buses, layouts, and documents.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add New Bus</span>
          </button>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-purple-600" /></div>
        ) : (
          <DataTable columns={columns} data={buses || []} />
        )}
      </div>

      {/* Add Bus Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Add New Bus</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Bus Name</label>
                     <input {...register('busName', { required: true })} placeholder="e.g. Blue Super Deluxe" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Vehicle Plate Number</label>
                     <input {...register('busNumber', { required: true })} placeholder="e.g. BA 2 PA 1234" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Bus Type</label>
                     <select {...register('busType')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
                        <option value="DELUXE">Deluxe</option>
                        <option value="SUPER_DELUXE">Super Deluxe</option>
                        <option value="AC">AC</option>
                        <option value="NON_AC">Non AC</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                     <select {...register('category')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
                        <option value="SEATER">Seater</option>
                        <option value="SLEEPER">Sleeper</option>
                        <option value="SEMI_SLEEPER">Semi-Sleeper</option>
                     </select>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest text-[10px]">Amenities & Comfort</label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {AMENITIES.map((item) => (
                        <label key={item.id} className="flex items-center space-x-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:border-purple-200 transition-all">
                          <input type="checkbox" value={item.id} {...register('amenities')} className="w-5 h-5 rounded-lg text-purple-600 border-slate-200" />
                          <div className="flex items-center space-x-2 text-slate-600">
                             {item.icon}
                             <span className="text-xs font-bold">{item.label}</span>
                          </div>
                        </label>
                      ))}
                   </div>
                </div>

                <button type="submit" className="w-full py-4 bg-purple-gradient text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all">
                   {createMutation.isPending ? 'Adding Bus...' : 'Onboard Vehicle'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Fleet;

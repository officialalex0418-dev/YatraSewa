import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { User, ShieldCheck, Mail, Phone, MoreHorizontal, Ban } from 'lucide-react';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  yatraPoints: number;
  createdAt: string;
}

const Customers = () => {
  const { data: customers, isLoading } = useQuery<Customer[]>({
    queryKey: ['adminCustomers'],
    queryFn: async () => {
      const response = await api.get('/admin/customers');
      return response.data;
    },
  });

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
            <User size={20} />
          </div>
          <div>
            <div className="font-bold text-slate-900">{row.original.name}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Joined {new Date(row.original.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Contact',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
             <Mail size={12} className="text-slate-400" />
             <span>{row.original.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
             <Phone size={10} className="text-slate-300" />
             <span>{row.original.phone || 'N/A'}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'walletBalance',
      header: 'Wallet',
      cell: ({ row }) => (
        <div className="text-sm font-black text-slate-900">
          NPR {row.original.walletBalance || 0}
        </div>
      ),
    },
    {
      accessorKey: 'yatraPoints',
      header: 'Yatra Points',
      cell: ({ row }) => (
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase border border-purple-100">
          <ShieldCheck size={12} />
          <span>{row.original.yatraPoints || 0} PTS</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreHorizontal size={18} />
          </button>
          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
            <Ban size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="SUPER_ADMIN">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Passenger CRM</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage all platform users and support history.</p>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all">
            Export Customer Data
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-white rounded-3xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={customers || []} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Customers;

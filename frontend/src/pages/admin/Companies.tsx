import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, ShieldAlert, MoreHorizontal, Eye, Ban, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Company {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isApproved: boolean;
  totalRevenue: number;
  createdAt: string;
}

const Companies = () => {
  const { data: companies, isLoading, refetch } = useQuery<Company[]>({
    queryKey: ['adminCompanies'],
    queryFn: async () => {
      const response = await api.get('/admin/companies');
      return response.data;
    },
  });

  const handleApprove = async (id: string) => {
    try {
      await api.post(`/admin/companies/${id}/approve`);
      toast.success('Company approved successfully');
      refetch();
    } catch (error) {
      toast.error('Approval failed');
    }
  };

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'name',
      header: 'Company Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400">
            {row.original.name[0]}
          </div>
          <div>
            <div className="font-black text-slate-900">{row.original.name}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {row.original._id.slice(-6)}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Contact Info',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-700">{row.original.email}</div>
          <div className="text-xs font-medium text-slate-400">{row.original.phone || 'No phone'}</div>
        </div>
      ),
    },
    {
      accessorKey: 'isApproved',
      header: 'Status',
      cell: ({ row }) => (
        row.original.isApproved ? (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <BadgeCheck size={12} />
            <span>Active</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
            <ShieldAlert size={12} />
            <span>Pending</span>
          </div>
        )
      ),
    },
    {
      accessorKey: 'totalRevenue',
      header: 'Revenue',
      cell: ({ row }) => (
        <div className="text-sm font-black text-slate-900">
          NPR {row.original.totalRevenue || 0}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {!row.original.isApproved && (
            <button
              onClick={() => handleApprove(row.original._id)}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              title="Approve"
            >
              <CheckCircle size={18} />
            </button>
          )}
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <Eye size={18} />
          </button>
          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
            <Ban size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreHorizontal size={18} />
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bus Companies</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage and verify transport operators.</p>
          </div>
          <button className="px-6 py-3 bg-purple-gradient text-white font-bold rounded-2xl shadow-lg shadow-purple-200 hover:scale-[1.02] transition-all">
            + Onboard New Company
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-white rounded-3xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={companies || []} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Companies;

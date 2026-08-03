import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, ShieldAlert, MoreHorizontal, Eye, Ban, CheckCircle, Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface Company {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isApproved: boolean;
  totalRevenue: number;
  createdAt: string;
  address?: string;
  panVat?: string;
  ownerName?: string;
  emergencyContact?: string;
}

interface CompanyFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  panVat: string;
  ownerName: string;
  emergencyContact: string;
}

const Companies = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCompany, setEditingCompany] = React.useState<Company | null>(null);

  const { data: companies, isLoading, refetch } = useQuery<Company[]>({
    queryKey: ['adminCompanies'],
    queryFn: async () => {
      const response = await api.get('/admin/companies');
      return response.data;
    },
  });

  const { register, handleSubmit, reset, setValue } = useForm<CompanyFormData>();

  React.useEffect(() => {
    if (editingCompany) {
      setValue('name', editingCompany.name);
      setValue('email', editingCompany.email);
      setValue('phone', editingCompany.phone);
      setValue('address', editingCompany.address || '');
      setValue('panVat', editingCompany.panVat || '');
      setValue('ownerName', editingCompany.ownerName || '');
      setValue('emergencyContact', editingCompany.emergencyContact || '');
    } else {
      reset();
    }
  }, [editingCompany, setValue, reset]);

  const createMutation = useMutation({
    mutationFn: (data: CompanyFormData) => api.post('/admin/companies', data),
    onSuccess: () => {
      toast.success('Company created and welcome email sent!');
      setIsModalOpen(false);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create company');
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: CompanyFormData) => api.put(`/admin/companies/${editingCompany?._id}`, data),
    onSuccess: () => {
      toast.success('Company updated successfully');
      setIsModalOpen(false);
      setEditingCompany(null);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update company');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/companies/${id}`),
    onSuccess: () => {
      toast.success('Company deleted successfully');
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete company');
    }
  });

  const onSubmit = (data: CompanyFormData) => {
    if (editingCompany) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

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
          <button
            onClick={() => {
              setEditingCompany(row.original);
              setIsModalOpen(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this company?')) {
                deleteMutation.mutate(row.original._id);
              }
            }}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <Trash2 size={18} />
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
          <button
            onClick={() => {
              setEditingCompany(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-purple-gradient text-white font-bold rounded-2xl shadow-lg shadow-purple-200 hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Onboard New Company</span>
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

      {/* Onboarding/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {editingCompany ? 'Edit Company' : 'Onboard New Company'}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">Enter transport operator details</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="e.g. Everest Travels"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input
                      {...register('email', { required: true })}
                      type="email"
                      disabled={!!editingCompany}
                      placeholder="contact@company.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <input
                      {...register('phone', { required: true })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">PAN/VAT Number</label>
                    <input
                      {...register('panVat', { required: true })}
                      placeholder="123456789"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Headquarters Address</label>
                    <input
                      {...register('address', { required: true })}
                      placeholder="Main Street, Kathmandu"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Owner Name</label>
                    <input
                      {...register('ownerName', { required: true })}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Emergency Contact</label>
                    <input
                      {...register('emergencyContact', { required: true })}
                      placeholder="Secondary Number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-purple-gradient text-white font-bold rounded-2xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Processing...' : (editingCompany ? 'Save Changes' : 'Confirm Onboarding')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Companies;

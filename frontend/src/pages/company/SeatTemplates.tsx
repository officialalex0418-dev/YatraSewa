import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { Plus, X, Layout as LayoutIcon, MousePointer2, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Seat {
  seatNumber: string;
  row: number;
  col: number;
  type: string;
  isWindow: boolean;
}

const SeatTemplates = () => {
  const [isDesignerOpen, setIsDesignerOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState('');
  const [category, setCategory] = React.useState('SEATER');
  const [rows, setRows] = React.useState(10);
  const [cols, setCols] = React.useState(5);
  const [layout, setLayout] = React.useState<Seat[]>([]);

  const { data: templates, isLoading, refetch } = useQuery({
    queryKey: ['seatTemplates'],
    queryFn: async () => {
      const response = await api.get('/company/templates');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/company/templates', data),
    onSuccess: () => {
      toast.success('Template saved!');
      setIsDesignerOpen(false);
      refetch();
    },
  });

  const toggleSeat = (r: number, c: number) => {
    const exists = layout.find(s => s.row === r && s.col === c);
    if (exists) {
      setLayout(layout.filter(s => !(s.row === r && s.col === c)));
    } else {
      setLayout([...layout, {
        seatNumber: `${String.fromCharCode(65 + r)}${c + 1}`,
        row: r,
        col: c,
        type: 'STANDARD',
        isWindow: c === 0 || c === cols - 1
      }]);
    }
  };

  const handleSave = () => {
    if (!templateName) return toast.error('Please enter a template name');
    if (layout.length === 0) return toast.error('Add at least one seat');
    createMutation.mutate({
      name: templateName,
      category,
      dimensions: { rows, cols },
      layout,
      totalSeats: layout.length
    });
  };

  return (
    <DashboardLayout role="COMPANY">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seat Templates</h1>
            <p className="text-slate-500 mt-1 font-medium">Create reusable seat layouts for your fleet.</p>
          </div>
          <button
            onClick={() => {
               setTemplateName('');
               setLayout([]);
               setIsDesignerOpen(true);
            }}
            className="px-6 py-3 bg-purple-gradient text-white font-bold rounded-2xl shadow-xl flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create New Template</span>
          </button>
        </div>

        {isLoading ? (
           <div className="h-64 animate-pulse bg-white rounded-[40px] border border-slate-100" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates?.map((t: any) => (
               <div key={t._id} className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm group">
                  <div className="flex items-center justify-between mb-4">
                     <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                        <LayoutIcon size={24} />
                     </div>
                     <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{t.name}</h3>
                  <div className="mt-2 flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                     <span>{t.totalSeats} Seats</span>
                     <span className="w-1 h-1 bg-slate-200 rounded-full" />
                     <span>{t.category}</span>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>

      {/* Visual Designer Modal */}
      <AnimatePresence>
        {isDesignerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDesignerOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-5xl bg-slate-50 rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]">

              {/* Designer Toolbar */}
              <div className="w-full md:w-80 bg-white p-8 border-r border-slate-100 overflow-y-auto">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-900">Layout Builder</h2>
                    <button onClick={() => setIsDesignerOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><X size={20} /></button>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Template Name</label>
                       <input value={templateName} onChange={(e) => setTemplateName(e.target.value)} placeholder="e.g. 2x2 Luxury Deluxe" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 font-bold" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Rows</label>
                          <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Cols</label>
                          <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Vehicle Category</label>
                       <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold">
                          <option value="SEATER">Seater</option>
                          <option value="SLEEPER">Sleeper</option>
                          <option value="HIACE">Hiace / Mini Bus</option>
                       </select>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                       <div className="flex items-center justify-between text-sm font-bold text-slate-600 mb-4">
                          <span>Total Seats Selected</span>
                          <span className="text-purple-600 font-black text-lg">{layout.length}</span>
                       </div>
                       <button
                         onClick={handleSave}
                         className="w-full py-4 bg-purple-gradient text-white font-black rounded-2xl shadow-xl flex items-center justify-center space-x-2"
                       >
                          <Save size={20} />
                          <span>Save Template</span>
                       </button>
                    </div>
                 </div>
              </div>

              {/* Designer Canvas */}
              <div className="flex-1 p-12 flex flex-col items-center overflow-y-auto">
                 <div className="mb-8 flex items-center space-x-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100 text-xs font-bold text-slate-500">
                    <MousePointer2 size={16} />
                    <span>Click on grid cells to add or remove seats</span>
                 </div>

                 {/* The Bus Body */}
                 <div className="relative bg-white p-12 rounded-[60px] shadow-inner border-[12px] border-slate-200/50">
                    {/* Front Section */}
                    <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-48 h-20 bg-slate-200/50 rounded-t-[40px] flex items-center justify-center">
                       <div className="w-32 h-2 bg-slate-300 rounded-full" />
                    </div>

                    {/* Seat Grid */}
                    <div
                      className="grid gap-4"
                      style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`
                      }}
                    >
                      {Array.from({ length: rows }).map((_, r) => (
                        Array.from({ length: cols }).map((_, c) => {
                          const isActive = layout.some(s => s.row === r && s.col === c);
                          return (
                            <button
                              key={`${r}-${c}`}
                              onClick={() => toggleSeat(r, c)}
                              className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center font-bold text-[10px] ${
                                isActive
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-110'
                                  : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                              }`}
                            >
                              {isActive ? `${String.fromCharCode(65 + r)}${c + 1}` : ''}
                            </button>
                          );
                        })
                      ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default SeatTemplates;

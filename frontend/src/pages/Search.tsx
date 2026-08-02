import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { Bus, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Search = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips', from, to, date],
    queryFn: async () => {
      const response = await api.get(`/trips`, {
        params: { from, to, date },
      });
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-slate-900">{from}</h2>
            <ChevronRight className="text-slate-400" size={20} />
            <h2 className="text-xl font-bold text-slate-900">{to}</h2>
            <div className="ml-4 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              {date || 'All Dates'}
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 hover:bg-slate-100">
            <Filter size={18} />
            <span className="text-sm font-semibold">Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Bus Type</h3>
            <div className="space-y-2">
              {['AC', 'Non-AC', 'Deluxe', 'Super Deluxe'].map(type => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-slate-600">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-white rounded-3xl animate-pulse border border-slate-100" />
              ))}
            </div>
          ) : trips?.length > 0 ? (
            trips.map((trip: any) => (
              <motion.div
                key={trip._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-purple-50 transition-colors">
                      <Bus className="text-slate-400 group-hover:text-purple-600 transition-colors" size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{trip.companyId.name}</h4>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-slate-500">
                        <span>{trip.busType}</span>
                        <span>•</span>
                        <span>{trip.busNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-12">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {new Date(trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{trip.routeFrom}</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="w-20 h-[2px] bg-slate-200" />
                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-slate-300" />
                      <div className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">8h 30m</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {new Date(trip.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{trip.routeTo}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-black text-purple-600">NPR {trip.fare}</div>
                      <div className="text-xs text-green-600 font-bold mt-1">{trip.totalSeats - trip.bookedSeats.length} Seats Left</div>
                    </div>
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">
                      Select Seat
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="text-slate-400 mb-4 flex justify-center">
                <Bus size={48} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No buses found</h3>
              <p className="text-slate-500 mt-1">Try searching for a different route or date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

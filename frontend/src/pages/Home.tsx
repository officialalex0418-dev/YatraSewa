import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Bus } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 text-white rounded-lg bg-purple-gradient">
            <Bus size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">YatraSewa</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/search" className="text-sm font-medium text-slate-600 hover:text-purple-600">Search</Link>
          <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-purple-600">About</Link>
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">Sign In</Link>
          <Link to="/register" className="px-5 py-2 text-sm font-medium text-white bg-purple-gradient rounded-full shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-slate-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.1),transparent)]" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl"
        >
          Your Journey, <span className="text-purple-600">Simplified.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-xl text-slate-600 max-w-2xl"
        >
          Book bus tickets instantly with premium comfort, real-time tracking, and exclusive Yatra Points rewards.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 w-full max-w-5xl bg-white p-6 rounded-3xl shadow-2xl shadow-slate-200/50 flex flex-wrap md:flex-nowrap items-center gap-4 border border-slate-100"
        >
          <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <MapPin className="text-purple-500" size={20} />
            <input type="text" placeholder="From (e.g. Kathmandu)" className="bg-transparent border-none outline-none w-full text-sm font-medium" />
          </div>
          <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <MapPin className="text-purple-500" size={20} />
            <input type="text" placeholder="To (e.g. Pokhara)" className="bg-transparent border-none outline-none w-full text-sm font-medium" />
          </div>
          <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <Calendar className="text-purple-500" size={20} />
            <input type="date" className="bg-transparent border-none outline-none w-full text-sm font-medium" />
          </div>
          <button className="w-full md:w-auto px-8 py-3.5 bg-purple-gradient text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-purple-200 hover:scale-[1.02] transition-transform">
            <Search size={20} />
            <span>Search Buses</span>
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Routes', value: '500+' },
            { label: 'Bus Operators', value: '120+' },
            { label: 'Happy Travelers', value: '1M+' },
            { label: 'Tickets Booked', value: '2M+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

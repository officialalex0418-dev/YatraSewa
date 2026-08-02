import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import CustomerDashboard from './pages/customer/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Search Route */}
        <Route path="/search" element={<Search />} />

        {/* Customer Dashboard */}
        <Route path="/dashboard" element={<CustomerDashboard />} />

        {/* Company Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import CustomerDashboard from './pages/customer/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyFleet from './pages/company/Fleet';
import CompanyTemplates from './pages/company/SeatTemplates';
import CompanyRoutes from './pages/company/Routes';
import CompanyTrips from './pages/company/Trips';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCompanies from './pages/admin/Companies';
import AdminCustomers from './pages/admin/Customers';

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
        <Route path="/company/fleet" element={<CompanyFleet />} />
        <Route path="/company/templates" element={<CompanyTemplates />} />
        <Route path="/company/routes" element={<CompanyRoutes />} />
        <Route path="/company/trips" element={<CompanyTrips />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />

      </Routes>
    </div>
  );
}

export default App;

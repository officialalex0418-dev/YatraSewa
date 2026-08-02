import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';
import {
  LayoutDashboard,
  Bus,
  MapPin,
  Calendar,
  Users,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
}

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
      active
        ? 'bg-purple-gradient text-white shadow-lg shadow-purple-200'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </Link>
);

const DashboardLayout = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const companyLinks = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/company/dashboard' },
    { icon: <Bus size={20} />, label: 'Fleet Management', path: '/company/fleet' },
    { icon: <MapPin size={20} />, label: 'Routes', path: '/company/routes' },
    { icon: <Calendar size={20} />, label: 'Trips', path: '/company/trips' },
    { icon: <Users size={20} />, label: 'Staff', path: '/company/staff' },
  ];

  const adminLinks = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'Companies', path: '/admin/companies' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <Settings size={20} />, label: 'System Settings', path: '/admin/settings' },
  ];

  const links = role === 'SUPER_ADMIN' ? adminLinks : companyLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 flex items-center space-x-3">
          <div className="p-2 text-white rounded-xl bg-purple-gradient">
            <Bus size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">YatraSewa</span>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {links.map((link) => (
            <SidebarItem
              key={link.path}
              icon={link.icon}
              label={link.label}
              path={link.path}
              active={location.pathname === link.path}
            />
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            path="/settings"
            active={location.pathname === '/settings'}
          />
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 mt-2 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600">
              <Menu size={24} />
            </button>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{role.replace('_', ' ')} PANEL</h2>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-100 pl-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">{user?.name}</div>
                <div className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 text-white rounded-xl bg-purple-gradient">
                  <Bus size={24} />
                </div>
                <span className="text-xl font-black tracking-tight">YatraSewa</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              {links.map((link) => (
                <SidebarItem
                  key={link.path}
                  icon={link.icon}
                  label={link.label}
                  path={link.path}
                  active={location.pathname === link.path}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

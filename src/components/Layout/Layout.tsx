import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Truck, 
  MapPin, 
  Bug, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  User,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Import Inspections', href: '/import-inspections', icon: Truck },
    { name: 'Farm Inspections', href: '/farm-inspections', icon: MapPin },
    { name: 'Pest Surveillance', href: '/pest-surveillance', icon: Bug },
    { name: 'Reports', href: '/reports', icon: FileText },
    ...(user?.role === 'admin' ? [
      { name: 'Bookings', href: '/bookings', icon: Calendar },
      { name: 'Analytics', href: '/analytics', icon: BarChart3 },
      { name: 'User Management', href: '/users', icon: Users },
    ] : []),
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          {/* Mobile Header */}
          <div className="flex h-20 items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-cyan-600 to-cyan-600">
            <div className="flex items-center">
              <img 
                src="/BAHFSA APP.png"
                alt="BAHFSA Logo" 
                className="h-12 w-auto"
              />
              <div className="ml-3">
                <div className="text-white font-bold text-lg">BAHFSA</div>
                <div className="text-blue-100 text-sm">Plant Protection Unit</div>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-blue-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile User Info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          {/* Desktop Header */}
          <div className="flex items-center h-20 px-4 border-b border-gray-200 bg-gradient-to-r from-cyan-600 to-cyan-600">
            <div className="flex items-center">
              <img 
                src="/BAHFSA APP.png"
                alt="BAHFSA Logo" 
                className={`${sidebarCollapsed ? 'h-10 w-10' : 'h-12 w-auto'} transition-all duration-300`}
              />
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <div className="text-white font-bold text-lg">BAHFSA</div>
                  <div className="text-blue-100 text-sm">Plant Protection Unit</div>
                </div>
              )}
            </div>
          </div>
          
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <item.icon className={`h-5 w-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!sidebarCollapsed && item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop User Info */}
          <div className="border-t border-gray-200 p-4">
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        {/* Top navigation */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={toggleMobileSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop sidebar toggle - moved outside sidebar */}
          <button
            type="button"
            className="hidden lg:block -m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              <div className="flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-gray-600 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  QrCode, 
  CreditCard, 
  Calendar, 
  User,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Check sessionStorage first for faster load
          const cachedProfile = sessionStorage.getItem('userProfile');
          if (cachedProfile) {
            setUserProfile(JSON.parse(cachedProfile));
            setLoading(false);
            return;
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, role')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            setUserProfile(profile);
            sessionStorage.setItem('userProfile', JSON.stringify(profile));
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const menuItems = useMemo(() => [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Registrations', icon: ClipboardList, path: '/dashboard/registrations' },
    { label: 'My Teams', icon: Users, path: '/dashboard/teams' },
    { label: 'Attendance QR', icon: QrCode, path: '/dashboard/qr' },
    { label: 'Bookings', icon: CalendarCheck, path: '/dashboard/bookings' },
    { label: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
    { label: 'Event Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { label: 'Profile Settings', icon: User, path: '/dashboard/profile' },
  ], []);

  const handleLogout = async () => {
    sessionStorage.removeItem('userProfile'); // Clear cache on logout
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900/50 border-r border-white/10 backdrop-blur-xl fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold font-orbitron text-secondary">DASHBOARD</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Site</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 z-40 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold font-orbitron text-secondary">DASHBOARD</h2>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-slate-900 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <h2 className="text-xl font-bold font-orbitron text-secondary">MENU</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-secondary text-white' 
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-2">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5"
                >
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back to Site</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-20 bg-slate-900/30 border-b border-white/10 backdrop-blur-md sticky top-0 z-30 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Event Countdown</span>
              <span className="text-secondary font-orbitron font-bold">Day 1: 02:14:45</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-gray-400 hover:text-secondary transition-colors relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold">{userProfile?.full_name || 'Loading...'}</p>
                <p className="text-[10px] text-secondary uppercase font-bold">{userProfile?.role || 'Student'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.full_name || 'User'}`} alt="Avatar" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

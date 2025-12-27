import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabase';

const FloatingDashboardButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('student');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile) setUserRole(profile.role);
      }
    };
    checkRole();
  }, []);

  // Don't show the button if we're already on a dashboard
  if (
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/coordinator') || 
    location.pathname.startsWith('/volunteer')
  ) {
    return null;
  }

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(getDashboardPath());
    }
  };

  const getDashboardPath = () => {
    switch (userRole) {
      case 'super_admin': return '/admin';
      case 'registration_admin': return '/admin/desk';
      case 'event_coordinator': return '/coordinator';
      case 'volunteer': return '/volunteer';
      default: return '/dashboard';
    }
  };

  const isAdminRole = ['super_admin', 'registration_admin', 'event_coordinator', 'volunteer'].includes(userRole);

  return (
    <motion.button
      onClick={handleClick}
      className={`fixed bottom-24 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 bg-gradient-to-r ${isAdminRole ? 'from-red-600 to-orange-600' : 'from-purple-600 to-blue-600'} text-white rounded-full shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300 lg:bottom-24 lg:right-8 group`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isAdminRole ? "Admin Panel" : "Go to Dashboard"}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {isAdminRole ? <ShieldCheck size={28} /> : <LayoutDashboard size={28} />}
      </motion.div>
      
      {/* Pulsing effect */}
      <span className={`absolute inset-0 rounded-full ${isAdminRole ? 'bg-red-500' : 'bg-purple-500'} animate-ping opacity-20 pointer-events-none`}></span>
      
      {/* Tooltip for desktop */}
      <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
        {isAdminRole ? 'Admin Panel' : 'My Dashboard'}
      </span>
    </motion.button>
  );
};

export default FloatingDashboardButton;

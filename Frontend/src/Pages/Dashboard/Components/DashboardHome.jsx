import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Cpu, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Calendar,
  MapPin,
  Loader2
} from 'lucide-react';
import { supabase } from '../../../supabase';
import { supabaseService } from '../../../services/supabaseService';

const DashboardHome = () => {
  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch profile and registrations in parallel for faster load
        const [profileResponse, regData] = await Promise.all([
          supabase.from('profiles').select('full_name, email, college_name, role').eq('id', user.id).single(),
          supabaseService.getUserRegistrations(user.id)
        ]);
        
        setProfile(profileResponse.data);
        setRegistrations(regData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Events Registered', 
      value: registrations.length.toString(), 
      icon: Trophy, 
      color: 'text-secondary', 
      bg: 'bg-secondary/10' 
    },
    { 
      label: 'Workshops', 
      value: registrations.filter(r => r.events?.category === 'workshop').length.toString(), 
      icon: Cpu, 
      color: 'text-primary-light', 
      bg: 'bg-primary/10' 
    },
    { 
      label: 'Teams Joined', 
      value: '0', // Placeholder for team logic
      icon: Users, 
      color: 'text-secondary-light', 
      bg: 'bg-secondary/10' 
    },
    { 
      label: 'Attendance', 
      value: `0/${registrations.length}`, 
      icon: CheckCircle2, 
      color: 'text-green-400', 
      bg: 'bg-green-500/10' 
    },
  ];

  const alerts = [
    { 
      title: 'Welcome to DaKshaa!', 
      message: 'Complete your registration for events to get your entry tickets.', 
      type: 'info',
      action: 'Browse Events'
    }
  ];

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark/20 to-secondary-dark/20 border border-white/10 p-8">
        <div className="relative z-10">
          <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2">
            Welcome, {profile?.full_name || 'Student'} 👋
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl">
            {profile?.college_name || 'College Name'} • {profile?.department || 'Department'} • {profile?.year_of_study || 'Year'}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
            {registrations.some(r => r.combo_id) && (
              <span className="px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium">
                Combo Pass Holder
              </span>
            )}
            <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-medium">
              Roll No: {profile?.roll_number || 'N/A'}
            </span>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts & Announcements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="text-secondary" size={20} />
              Alerts & Announcements
            </h2>
            <button className="text-sm text-secondary hover:underline">Mark all as read</button>
          </div>
          
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`mt-1 p-2 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 
                alert.type === 'success' ? 'bg-green-500/10 text-green-500' : 
                'bg-primary/10 text-primary-light'
              }`}>
                <AlertCircle size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-secondary transition-colors">{alert.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                <button className="mt-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-secondary hover:text-secondary-light">
                  {alert.action} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Event Card */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="text-secondary" size={20} />
            Next Up
          </h2>
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-b from-secondary/20 to-transparent border border-secondary/30 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-widest">Technical</span>
                <span className="text-xs text-gray-400">Today, 10:30 AM</span>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-secondary transition-colors">Web-O-Thon 2026</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={16} className="text-secondary" />
                  <span>IT Lab 3, Block B</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Users size={16} className="text-secondary" />
                  <span>Team: Web Wizards</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300">
                View Details
              </button>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 blur-3xl rounded-full group-hover:bg-secondary/40 transition-all duration-500"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;


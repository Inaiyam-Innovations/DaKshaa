import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TicketCheck, TrendingUp, Radio } from "lucide-react";
import { supabase } from "../../supabase";
import CountUp from "react-countup";

const LiveStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    registrations: 0,
    last_updated: null
  });
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Particle animation for background
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10
  }));

  useEffect(() => {
    fetchInitialStats();
    setupRealtimeSubscriptions();

    return () => {
      supabase.channel('live-stats').unsubscribe();
    };
  }, []);

  const fetchInitialStats = async () => {
    try {
      setLoading(true);
      
      // Call the secure RPC function
      const { data, error } = await supabase.rpc('get_live_stats');
      
      if (error) {
        console.error('Error fetching stats:', error);
        // Fallback to direct count if RPC not available
        await fetchStatsFallback();
      } else {
        setStats(data);
      }
    } catch (err) {
      console.error('Error:', err);
      await fetchStatsFallback();
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsFallback = async () => {
    // Fallback method using head count
    const [usersResult, regsResult] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('registrations').select('*', { count: 'exact', head: true })
    ]);

    setStats({
      users: usersResult.count || 0,
      registrations: regsResult.count || 0,
      last_updated: new Date().toISOString()
    });
  };

  const setupRealtimeSubscriptions = () => {
    // Create a channel for both tables
    const channel = supabase.channel('live-stats');

    // Listen for new profiles (students joining)
    channel.on(
      'postgres_changes',
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'profiles' 
      },
      (payload) => {
        console.log('New student onboarded!', payload);
        setStats(prev => ({
          ...prev,
          users: prev.users + 1,
          last_updated: new Date().toISOString()
        }));
        setIsLive(true);
        setTimeout(() => setIsLive(false), 2000);
      }
    );

    // Listen for new registrations
    channel.on(
      'postgres_changes',
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'registrations' 
      },
      (payload) => {
        console.log('New registration!', payload);
        setStats(prev => ({
          ...prev,
          registrations: prev.registrations + 1,
          last_updated: new Date().toISOString()
        }));
        setIsLive(true);
        setTimeout(() => setIsLive(false), 2000);
      }
    );

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Realtime subscriptions active');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-400">Loading Live Stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      {/* Live Indicator */}
      <motion.div 
        className="absolute top-8 right-8 flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm z-10"
        animate={{ scale: isLive ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Radio className={`w-5 h-5 text-red-500 ${isLive ? 'animate-pulse' : ''}`} />
        <span className="text-red-500 font-bold uppercase tracking-wider text-sm">
          {isLive ? 'UPDATING...' : 'LIVE'}
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent mb-4">
            DAKSHAA 2026
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 font-light tracking-wider">
            Live Statistics Dashboard
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Students Onboarded Card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-orange-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-3xl p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-12 h-12 text-secondary" />
                </div>
              </div>

              {/* Label */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300 text-center mb-4 uppercase tracking-wider">
                Students Joined
              </h2>

              {/* Counter */}
              <div className="text-center">
                <div className="text-7xl md:text-9xl font-black text-secondary mb-4 tabular-nums">
                  <CountUp 
                    end={stats.users} 
                    duration={2}
                    separator=","
                    preserveValue
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-semibold">Total Onboarded</span>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(249,115,22,0.1), transparent 70%)'
                }}
              />
            </div>
          </motion.div>

          {/* Total Registrations Card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-3xl p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <TicketCheck className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Label */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300 text-center mb-4 uppercase tracking-wider">
                Event Registrations
              </h2>

              {/* Counter */}
              <div className="text-center">
                <div className="text-7xl md:text-9xl font-black text-primary mb-4 tabular-nums">
                  <CountUp 
                    end={stats.registrations} 
                    duration={2}
                    separator=","
                    preserveValue
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-semibold">Total Seats Filled</span>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(147,51,234,0.1), transparent 70%)'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 space-y-4"
        >
          <p className="text-gray-500 text-sm">
            Last Updated: {stats.last_updated ? new Date(stats.last_updated).toLocaleString() : 'Just now'}
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold uppercase tracking-wider">
              Real-time Updates Active
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default LiveStats;


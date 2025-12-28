import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';
import { supabaseService } from '../../../services/supabaseService';
import { supabase } from '../../../supabase';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const data = await supabaseService.getUserRegistrations(user.id);
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  if (loading) return <div className="text-center p-10">Loading your registrations...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">My Registrations</h2>
      
      {registrations.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-gray-400">You haven't registered for any events yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {registrations.map((reg) => (
            <motion.div 
              key={reg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(reg.payment_status)}`}>
                    {reg.payment_status}
                  </span>
                  <h3 className="text-lg font-bold mt-2">{reg.events?.title || 'Event'}</h3>
                  <p className="text-sm text-gray-400 capitalize">{reg.events?.category}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>March 15-17, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>09:00 AM onwards</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button 
                  disabled={reg.payment_status !== 'completed'}
                  className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={14} /> Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;



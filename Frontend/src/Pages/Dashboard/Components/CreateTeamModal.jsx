import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../../supabase';
import { createTeam } from '../../../services/teamService';

const CreateTeamModal = ({ isOpen, onClose, onTeamCreated }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    eventId: '',
    maxMembers: 4
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTeamEvents();
    }
  }, [isOpen]);

  const fetchTeamEvents = async () => {
    try {
      setFetchingEvents(true);
      // Fetch events that allow teams (is_team_event = true)
      const { data, error } = await supabase
        .from('events')
        .select('id, title, max_team_size, min_team_size')
        .eq('is_team_event', true)
        .eq('is_active', true)
        .order('title');

      if (error) throw error;

      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setFetchingEvents(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update max members based on selected event
    if (name === 'eventId') {
      const selectedEvent = events.find(e => e.id === value);
      if (selectedEvent) {
        setFormData(prev => ({ 
          ...prev, 
          maxMembers: selectedEvent.max_team_size || 4 
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.teamName.trim()) {
      setError('Please enter a team name');
      setLoading(false);
      return;
    }

    if (!formData.eventId) {
      setError('Please select an event');
      setLoading(false);
      return;
    }

    try {
      const result = await createTeam({
        teamName: formData.teamName,
        eventId: formData.eventId,
        maxMembers: formData.maxMembers
      });

      if (result.success) {
        setSuccess('Team created successfully! 🎉');
        setFormData({ teamName: '', eventId: '', maxMembers: 4 });
        
        // Wait a bit to show success message
        setTimeout(() => {
          if (onTeamCreated) onTeamCreated();
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to create team. Please try again.');
      }
    } catch (err) {
      console.error('Error creating team:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ teamName: '', eventId: '', maxMembers: 4 });
      setError('');
      setSuccess('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Users className="text-secondary" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Create New Team</h2>
                <p className="text-xs text-gray-400">Form your team for a group event</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your team name"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:opacity-50"
                required
              />
            </div>

            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Event <span className="text-red-500">*</span>
              </label>
              {fetchingEvents ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-secondary" />
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm">No team events available</p>
                </div>
              ) : (
                <select
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:opacity-50"
                  required
                >
                  <option value="" className="bg-slate-900">Select an event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id} className="bg-slate-900">
                      {event.title} (Team size: {event.min_team_size || 2}-{event.max_team_size || 4})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Max Members Info */}
            {formData.eventId && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-secondary">Max Team Size:</span> {formData.maxMembers} members
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  You can add up to {formData.maxMembers - 1} more member(s) after creating the team
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || fetchingEvents || events.length === 0}
                className="flex-1 px-4 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Users size={18} />
                    Create Team
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateTeamModal;

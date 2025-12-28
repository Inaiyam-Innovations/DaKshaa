import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel, UtensilsCrossed, Calendar, User, Mail, Phone, School, MapPin, X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../../supabase';
import toast from 'react-hot-toast';

const AccommodationBooking = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookingType, setBookingType] = useState(''); // 'accommodation' or 'lunch'
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    gender: '',
    collegeName: '',
    accommodationDates: [],
    lunchDates: []
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
          setFormData({
            ...formData,
            fullName: profile.full_name || '',
            email: profile.email || user.email,
            mobile: profile.mobile_number || '',
            gender: profile.gender || '',
            collegeName: profile.college_name || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleBooking = (type) => {
    setBookingType(type);
    setShowModal(true);
  };

  const handleDateToggle = (date, type) => {
    if (type === 'accommodation') {
      setFormData(prev => ({
        ...prev,
        accommodationDates: prev.accommodationDates.includes(date)
          ? prev.accommodationDates.filter(d => d !== date)
          : [...prev.accommodationDates, date]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        lunchDates: prev.lunchDates.includes(date)
          ? prev.lunchDates.filter(d => d !== date)
          : [...prev.lunchDates, date]
      }));
    }
  };

  const calculateTotal = () => {
    if (bookingType === 'accommodation') {
      return formData.accommodationDates.length * 300;
    } else {
      return formData.lunchDates.length * 100;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please login to book', {
          icon: '🔒',
          duration: 3000,
        });
        setLoading(false);
        return;
      }

      if (bookingType === 'accommodation') {
        if (formData.accommodationDates.length === 0) {
          toast.error('Please select at least one date', {
            icon: '📅',
            duration: 3000,
          });
          setLoading(false);
          return;
        }

        // Add to backend
        const response = await fetch('http://localhost:3000/add-accommodation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            username: formData.fullName,
            accommodation_dates: formData.accommodationDates,
            gender: formData.gender,
            email_id: formData.email,
            mobile_number: formData.mobile,
            college_name: formData.collegeName
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success('Accommodation booked successfully! 🏨', {
            duration: 4000,
            icon: '✅',
            style: {
              background: '#10b981',
              color: '#fff',
            },
          });
          // Reset form
          setFormData({
            ...formData,
            accommodationDates: []
          });
          setShowModal(false);
        } else if (result.alreadyBooked) {
          toast.error('You have already booked accommodation!', {
            icon: '⚠️',
            duration: 4000,
            style: {
              background: '#f59e0b',
              color: '#fff',
            },
          });
          setShowModal(false);
        } else {
          throw new Error('Booking failed');
        }
      } else {
        if (formData.lunchDates.length === 0) {
          toast.error('Please select at least one lunch date', {
            icon: '📅',
            duration: 3000,
          });
          setLoading(false);
          return;
        }

        // Add lunch booking via backend
        const response = await fetch('http://localhost:3000/add-lunch-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            lunch_dates: formData.lunchDates,
            total_price: calculateTotal()
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success('Lunch reserved successfully! 🍽️', {
            duration: 4000,
            icon: '✅',
            style: {
              background: '#f97316',
              color: '#fff',
            },
          });
          // Reset form
          setFormData({
            ...formData,
            lunchDates: []
          });
          setShowModal(false);
        } else if (result.alreadyBooked) {
          toast.error('You have already booked lunch!', {
            icon: '⚠️',
            duration: 4000,
            style: {
              background: '#f59e0b',
              color: '#fff',
            },
          });
          setShowModal(false);
        } else {
          throw new Error('Booking failed');
        }
      }
    } catch (error) {
      console.error('Booking error:', error);
      
      toast.error('Booking failed. Please try again.', {
        icon: '❌',
        duration: 5000,
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
          Accommodation & Dining
        </h1>
        <p className="text-gray-400">Book your stay and meals for DaKshaa 2026</p>
      </motion.div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Accommodation Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Hotel className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-orbitron">Accommodation</h2>
              <p className="text-gray-400 text-sm">Rs. 300 per day</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Accommodation is only provided for <strong>28th Evening stay</strong> with
                Evening Dinner and <strong>29th Morning breakfast</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={16} />
              <span>March 28 Evening Stay</span>
            </div>
          </div>

          <button
            onClick={() => handleBooking('accommodation')}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-blue-500/50"
          >
            BOOK NOW
          </button>
        </motion.div>

        {/* Lunch Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <UtensilsCrossed className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-orbitron">Lunch</h2>
              <p className="text-gray-400 text-sm">Rs. 100 per lunch</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Only Lunch will be provided for <strong>28th and 29th March</strong>.
                Register here to reserve your meals.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>March 28 Lunch</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>March 29 Lunch</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleBooking('lunch')}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-orange-500/50"
          >
            RESERVE NOW
          </button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {bookingType === 'accommodation' ? (
                  <Hotel className="w-6 h-6 text-blue-400" />
                ) : (
                  <UtensilsCrossed className="w-6 h-6 text-orange-400" />
                )}
                <h3 className="text-2xl font-bold text-white">
                  {bookingType === 'accommodation' ? 'Book Accommodation' : 'Reserve Lunch'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* User Info (Pre-filled) */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                    <User size={18} className="text-gray-500" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="bg-transparent text-white flex-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                    <Mail size={18} className="text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-transparent text-white flex-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Mobile</label>
                  <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                    <Phone size={18} className="text-gray-500" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="bg-transparent text-white flex-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">College Name</label>
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                  <School size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                    className="bg-transparent text-white flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Select {bookingType === 'accommodation' ? 'Stay' : 'Lunch'} Dates
                </label>
                <div className="flex gap-4">
                  {bookingType === 'accommodation' ? (
                    <button
                      type="button"
                      onClick={() => handleDateToggle('March 28', 'accommodation')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.accommodationDates.includes('March 28')
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-blue-500/50'
                      }`}
                    >
                      March 28 Evening
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDateToggle('March 28', 'lunch')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.lunchDates.includes('March 28')
                            ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-orange-500/50'
                        }`}
                      >
                        March 28
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDateToggle('March 29', 'lunch')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.lunchDates.includes('March 29')
                            ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-orange-500/50'
                        }`}
                      >
                        March 29
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Amount:</span>
                  <span className="text-3xl font-bold text-white">₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                  bookingType === 'accommodation'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
              >
                {loading ? 'Processing...' : `Confirm ${bookingType === 'accommodation' ? 'Booking' : 'Reservation'}`}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AccommodationBooking;



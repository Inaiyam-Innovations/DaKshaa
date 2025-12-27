import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, School, BookOpen, GraduationCap, ChevronRight, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    collegeName: '',
    department: '',
    yearOfStudy: '',
    rollNumber: '',
    referredBy: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
        },
      });
      setLoading(false);
      return;
    }

    if (formData.mobileNumber.length !== 10) {
      toast.error("Mobile number must be 10 digits", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
        },
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Sign up with Supabase Auth and pass metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            gender: formData.gender,
            college_name: formData.collegeName,
            department: formData.departmentment,
            year_of_study: formData.yearOfStudy,
            roll_number: formData.rollNumber,
            mobile_number: formData.mobileNumber,
            referred_by: formData.referredBy
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Send welcome email
        try {
          await fetch('http://localhost:3000/send-welcome-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              fullName: formData.fullName
            })
          });
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't block registration if email fails
        }

        toast.success('Account created successfully! Check your email', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 10px 40px rgba(14, 165, 233, 0.3)',
          },
          icon: '🎉',
        });
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
    >

      <h2 className="text-3xl font-bold text-white mb-8 font-orbitron text-center">Create Your DaKshaa Account</h2>
      
      <form onSubmit={handleSignUp} className="space-y-8">
        {/* Section 1: Personal Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <User className="text-secondary w-5 h-5" />
            <h3 className="text-xl font-semibold text-white">Section 1: Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Enter name as per College ID"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
              <p className="text-[10px] text-gray-500 ml-1 italic">This exact name will appear on your certificates.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Gender</label>
              <select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400 ml-1">College Name</label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="text"
                  name="collegeName"
                  placeholder="e.g., K.S. Rangasamy College of Technology"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Department</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="text"
                  name="department"
                  placeholder="e.g., CSE, ECE, Mech"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Year of Study</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <select
                  required
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                >
                  <option value="">Select Year</option>
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400 ml-1">Register / Roll Number</label>
              <input
                required
                type="text"
                name="rollNumber"
                placeholder="e.g., 7377212CS101"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400 ml-1">Referred By (Optional)</label>
              <input
                type="text"
                name="referredBy"
                placeholder="Enter referrer's Roll Number (e.g., 7377212CS101)"
                value={formData.referredBy}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
              />
              <p className="text-[10px] text-gray-500 ml-1 italic">Enter the roll number of the person who referred you to earn them points!</p>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Login Credentials */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Mail className="text-secondary w-5 h-5" />
            <h3 className="text-xl font-semibold text-white">Section 2: Contact & Credentials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400 ml-1">Mobile Number (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="tel"
                  name="mobileNumber"
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
              <p className="text-[10px] text-gray-500 ml-1 italic">Used for event updates.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="yourname@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-secondary hover:underline font-semibold"
          >
            Login here
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUpForm;

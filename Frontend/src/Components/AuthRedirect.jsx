import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch role from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const role = profile?.role || 'student';

      if (role === 'super_admin') {
        navigate('/admin');
      } else if (role === 'registration_admin') {
        navigate('/admin/desk');
      } else if (role === 'event_coordinator') {
        navigate('/coordinator');
      } else if (role === 'volunteer') {
        navigate('/volunteer');
      } else {
        // If on login page, redirect to home
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) return null;

  return <>{children}</>;
};

export default AuthRedirect;

import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Components/DashboardLayout';

// Lazy load dashboard components for better performance
const DashboardHome = lazy(() => import('./Components/DashboardHome'));
const MyRegistrations = lazy(() => import('./Components/MyRegistrations'));
const MyTeams = lazy(() => import('./Components/MyTeams'));
const AttendanceQR = lazy(() => import('./Components/AttendanceQR'));
const Payments = lazy(() => import('./Components/Payments'));
const EventSchedule = lazy(() => import('./Components/EventSchedule'));
const ProfileSettings = lazy(() => import('./Components/ProfileSettings'));
const AccommodationBooking = lazy(() => import('../Accomodation/Components/AccommodationBooking'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="registrations" element={<MyRegistrations />} />
          <Route path="teams" element={<MyTeams />} />
          <Route path="qr" element={<AttendanceQR />} />
          <Route path="bookings" element={<AccommodationBooking />} />
          <Route path="payments" element={<Payments />} />
          <Route path="schedule" element={<EventSchedule />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};


export default Dashboard;

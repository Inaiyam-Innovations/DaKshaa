import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from 'react-hot-toast';
import Events from "./Pages/Events/Events";
import Home from "./Pages/Home/Home";
import "./App.css";
import ParticlesComponent from "./Pages/Layout/ParticlesComponent";
import Navbar from "./Pages/Layout/Navbar";
import Tags from "./Pages/Layout/Tags";
import GuestLecture from "./Pages/GuestLecture/GuestLecture";
import UltraFooter from "./Pages/Layout/UltraFooter";
import Workshop from "./Pages/Workshop/Workshop";
import Sponsors from "./Pages/Sponsors/Sponsors";
import Contact from "./Pages/Home/Components/Contact";
import Harmonics from "./Pages/Harmonics/Harmonics";
import EventDetails from "./Pages/Events/EventDetails/EventDetails";
import Teams from "./Pages/Teams/Teams";
import Startup from "./Pages/Startup/Startup";
import Accomodation from "./Pages/Accomodation/Accomodation";
import Hackathon from "./Pages/Hackathon/Hackathon";
import Codathon from "./Pages/Codathon/Codathon";
import Register from "./Pages/Register/Register";
import EventRegistration from "./Pages/Register/EventRegistration";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Schedule from "./Pages/Schedule/Schedule";
import Feedback from "./Pages/Feedback/Feedback";
import Scan from "./Pages/Scan/Scan";
import Login from "./Pages/Login/Login";
import AuthRedirect from "./Components/AuthRedirect";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoadingScreen from "./Pages/Layout/LoadingScreen";
import ScrollToTop from "./Pages/Layout/ScrollToTop";
import FloatingCallButton from "./Pages/Layout/FloatingCallButton";
import FloatingDashboardButton from "./Pages/Layout/FloatingDashboardButton";
import BottomNavbar from "./Pages/Layout/BottomNavbar";

// Admin & Staff Imports
import AdminLayout from "./Pages/Admin/AdminLayout";
import SuperAdminOverview from "./Pages/Admin/SuperAdmin/Overview";
import UserManager from "./Pages/Admin/SuperAdmin/UserManager";
import EventConfig from "./Pages/Admin/SuperAdmin/EventConfig";
import EventConfiguration from "./Pages/Admin/SuperAdmin/EventConfiguration";
import ComboManagement from "./Pages/Admin/SuperAdmin/ComboManagement";
import FinanceManager from "./Pages/Admin/SuperAdmin/FinanceManager";
import RegistrationManagement from "./Pages/Admin/SuperAdmin/RegistrationManagement";
import FinanceModule from "./Pages/Admin/SuperAdmin/FinanceModule";
import ParticipantCRM from "./Pages/Admin/SuperAdmin/ParticipantCRM";
import WaitlistManagement from "./Pages/Admin/SuperAdmin/WaitlistManagement";
import EventRegistrationManager from "./Pages/Admin/SuperAdmin/EventRegistrationManager";
import AccommodationManager from "./Pages/Admin/SuperAdmin/AccommodationManager";
import EventController from "./Pages/Admin/SuperAdmin/EventController";
import RoleManagement from "./Pages/Admin/SuperAdmin/RoleManagement";
import RegDesk from "./Pages/Admin/RegAdmin/Desk";
import RegistrationAdminDashboard from "./Pages/Admin/RegAdmin/RegistrationAdminDashboard";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import LiveStatusBoard from "./Pages/LiveStatus/LiveStatusBoard";
import LiveStats from "./Pages/LiveStatus/LiveStats";
import TestConnection from "./Pages/TestConnection";
import CoordinatorDashboard from "./Pages/Admin/Coordinator/Dashboard";
import EventCoordinatorDashboard from "./Pages/Admin/Coordinator/EventCoordinatorDashboard";
import VolunteerScanner from "./Pages/Admin/Volunteer/Scanner";
import VolunteerDashboard from "./Pages/Admin/Volunteer/VolunteerDashboard";
import AttendanceScanner from "./Pages/Admin/Volunteer/AttendanceScanner";
import MyRegistrations from "./Pages/MyRegistrations/MyRegistrations";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/coordinator") ||
    location.pathname.startsWith("/volunteer");
  const isScan = location.pathname === "/scan";
  const isLogin = location.pathname === "/login";

  return (
    <>
      {!isDashboard && !isAdmin && !isScan && !isLogin && <Navbar />}
      {!isDashboard && !isAdmin && !isScan && !isLogin && <Tags />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <AuthRedirect>
                <Home />
              </AuthRedirect>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events/conference" element={<GuestLecture />} />
          <Route path="/events/workshop" element={<Workshop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/hormonics" element={<Harmonics />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/startups" element={<Startup />} />
          <Route path="/accomodation" element={<Accomodation />} />
          <Route path="/event/hackathon" element={<Hackathon />} />
          <Route path="/event/codeathon" element={<Codathon />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/register-events" element={<EventRegistration />} />
          <Route path="/scan" element={<Scan />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={["student", "super_admin", "registration_admin", "event_coordinator", "volunteer"]}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/live-status" element={<LiveStatusBoard />} />
          <Route path="/live-stats" element={<LiveStats />} />
          <Route path="/test-connection" element={<TestConnection />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={["super_admin", "registration_admin"]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <SuperAdminOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <RoleManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <UserManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="events"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <EventConfig />
                </ProtectedRoute>
              }
            />
            <Route
              path="event-configuration"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <EventConfiguration />
                </ProtectedRoute>
              }
            />
            <Route
              path="combos"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <ComboManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="finance"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <FinanceManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="registrations"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <RegistrationManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="finance-module"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <FinanceModule />
                </ProtectedRoute>
              }
            />
            <Route
              path="crm"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <ParticipantCRM />
                </ProtectedRoute>
              }
            />
            <Route
              path="waitlist"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <WaitlistManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="accommodation"
              element={
                <ProtectedRoute
                  allowedRoles={["super_admin", "registration_admin"]}
                >
                  <AccommodationManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="event-controller"
              element={
                <ProtectedRoute allowedRoles={["super_admin", "coordinator"]}>
                  <EventController />
                </ProtectedRoute>
              }
            />
            <Route
              path="event/:eventId/manage"
              element={
                <ProtectedRoute allowedRoles={["super_admin", "coordinator"]}>
                  <EventRegistrationManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="desk"
              element={
                <ProtectedRoute
                  allowedRoles={["registration_admin", "super_admin"]}
                >
                  <RegistrationAdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Coordinator Routes */}
          <Route
            path="/coordinator"
            element={
              <ProtectedRoute
                allowedRoles={["event_coordinator", "super_admin"]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EventCoordinatorDashboard />} />
            <Route path="scanner" element={<AttendanceScanner />} />
          </Route>

          {/* Volunteer Routes */}
          <Route
            path="/volunteer"
            element={
              <ProtectedRoute allowedRoles={["volunteer", "super_admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VolunteerDashboard />} />
            <Route path="scanner" element={<AttendanceScanner />} />
          </Route>
        </Routes>
      </AnimatePresence>

      {!isDashboard && !isAdmin && !isScan && !isLogin && <UltraFooter />}
      {!isAdmin && <FloatingDashboardButton />}
      {!isDashboard && !isAdmin && !isScan && !isLogin && (
        <FloatingCallButton />
      )}
      {!isDashboard && !isAdmin && !isScan && !isLogin && <BottomNavbar />}
      <ScrollToTop />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 99999,
          },
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen variant="cyber" text="Initializing..." />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <ParticlesComponent id="particlesBG" />
          <AppContent />
        </Router>
      )}
    </>
  );
}

export default App;

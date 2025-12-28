import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  Package,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  Bell,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../../supabase";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchRegistrations(user.id);
        fetchUserNotifications(user.id);
      } else {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  const fetchUserNotifications = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data) {
        setNotifications(data);
      }
    } catch (err) {
      console.log("Notifications table may not exist:", err);
    }
  };

  const markNotificationRead = async (notificationId) => {
    await supabase
      .from("user_notifications")
      .update({ is_read: true })
      .eq("id", notificationId);
    fetchUserNotifications(user.id);
  };

  const fetchRegistrations = async (userId) => {
    try {
      setLoading(true);

      // Fetch registrations with event details
      const { data, error } = await supabase
        .from("event_registrations_config")
        .select(
          `
          *,
          events_config:event_id (
            id,
            event_name,
            description,
            category,
            price,
            event_date,
            event_time,
            venue
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        // Try alternative query without join
        const { data: simpleData, error: simpleError } = await supabase
          .from("event_registrations_config")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (!simpleError) {
          setRegistrations(simpleData || []);
        }
      } else {
        setRegistrations(data || []);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const eventName = reg.events_config?.event_name || reg.event_name || "";
    const matchesSearch = eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "ALL" || reg.payment_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "COMPLETED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "TBA";
    return timeString;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto text-yellow-500" size={64} />
          <h2 className="text-2xl font-bold text-white">Please Login</h2>
          <p className="text-gray-400">
            You need to be logged in to view your registrations
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full"
          >
            Login Now
          </motion.button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Notifications */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
              My Registrations
            </h1>
            <p className="text-gray-400">
              View and manage all your event registrations
            </p>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 bg-gray-800 border border-gray-700 rounded-xl text-white hover:border-blue-500 transition-all relative"
            >
              <Bell size={24} />
              {notifications.filter((n) => !n.is_read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter((n) => !n.is_read).length}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50"
              >
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-bold">Notifications</h3>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-4 border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/50 ${
                        !notif.is_read ? "bg-blue-500/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            !notif.is_read ? "bg-green-500/20" : "bg-gray-700"
                          }`}
                        >
                          <CheckCircle
                            className={`${
                              !notif.is_read
                                ? "text-green-400"
                                : "text-gray-500"
                            }`}
                            size={16}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">
                            {notif.title || "Registration Confirmed"}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(notif.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {!notif.is_read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Confirmation Banner */}
        {registrations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl flex items-center gap-4"
          >
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-green-400 font-medium">
                Registration Status: Confirmed
              </p>
              <p className="text-gray-400 text-sm">
                All your registrations have been successfully recorded in our
                system.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Ticket className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Registrations</p>
                <p className="text-3xl font-bold text-white">
                  {registrations.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Check className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-white">
                  {
                    registrations.filter(
                      (r) => r.payment_status?.toUpperCase() === "PAID"
                    ).length
                  }
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-2xl border border-yellow-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="text-yellow-400" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-white">
                  {
                    registrations.filter(
                      (r) => r.payment_status?.toUpperCase() === "PENDING"
                    ).length
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white hover:border-gray-600"
            >
              <Filter size={20} />
              <span>
                {filterStatus === "ALL" ? "All Status" : filterStatus}
              </span>
              <ChevronDown size={16} />
            </button>
            {showFilter && (
              <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden z-10">
                {["ALL", "PAID", "PENDING", "CANCELLED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setShowFilter(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                  >
                    {status === "ALL" ? "All Status" : status}
                  </button>
                ))}
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchRegistrations(user.id)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            <RefreshCw size={20} />
            Refresh
          </motion.button>
        </div>

        {/* Registrations List */}
        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-bold text-white mb-2">
              No Registrations Found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterStatus !== "ALL"
                ? "Try adjusting your search or filter"
                : "You haven't registered for any events yet"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/register")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full"
            >
              Browse Events
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((reg, index) => (
              <motion.div
                key={reg.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                        <Calendar className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {reg.events_config?.event_name ||
                            `Event #${reg.event_id?.slice(0, 8)}`}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {reg.events_config?.description ||
                            "Event registration"}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          {reg.events_config?.event_date && (
                            <span className="flex items-center gap-1 text-gray-400">
                              <Calendar size={14} />
                              {formatDate(reg.events_config.event_date)}
                            </span>
                          )}
                          {reg.events_config?.event_time && (
                            <span className="flex items-center gap-1 text-gray-400">
                              <Clock size={14} />
                              {formatTime(reg.events_config.event_time)}
                            </span>
                          )}
                          {reg.events_config?.venue && (
                            <span className="flex items-center gap-1 text-gray-400">
                              <MapPin size={14} />
                              {reg.events_config.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        reg.payment_status
                      )}`}
                    >
                      {reg.payment_status || "CONFIRMED"}
                    </span>
                    {reg.events_config?.price && (
                      <span className="text-xl font-bold text-blue-400">
                        ₹{reg.events_config.price}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      Registered: {formatDate(reg.created_at)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Clock,
  MapPin,
  AlertTriangle,
  Zap,
  Calendar
} from "lucide-react";
import { supabase } from "../../supabase";

const LiveStatusBoard = () => {
  const [nowHappening, setNowHappening] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchLiveData();

    // Set up realtime subscriptions
    const eventsChannel = supabase
      .channel("events_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
        fetchLiveData();
      })
      .subscribe();

    const announcementsChannel = supabase
      .channel("announcements_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        fetchAnnouncements();
      })
      .subscribe();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Refresh data every 30 seconds
    const dataInterval = setInterval(fetchLiveData, 30000);

    return () => {
      eventsChannel.unsubscribe();
      announcementsChannel.unsubscribe();
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const fetchLiveData = async () => {
    await Promise.all([fetchEvents(), fetchAnnouncements()]);
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;

      const now = new Date();
      
      // Events currently happening
      const live = (data || []).filter(event => event.current_status === "live");
      
      // Events starting within 1 hour
      const upcoming = (data || []).filter(event => {
        if (!event.start_time || event.current_status === "live" || event.current_status === "ended") return false;
        const startTime = new Date(event.start_time);
        const diffMs = startTime - now;
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours >= 0 && diffHours <= 1;
      });

      setNowHappening(live);
      setUpNext(upcoming);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "from-green-500 to-emerald-500";
      case "delayed":
        return "from-yellow-500 to-orange-500";
      case "scheduled":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getAnnouncementColor = (type) => {
    switch (type) {
      case "urgent":
        return "from-red-500/20 to-red-600/10 border-red-500/50";
      case "success":
        return "from-green-500/20 to-green-600/10 border-green-500/50";
      case "warning":
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/50";
      default:
        return "from-blue-500/20 to-blue-600/10 border-blue-500/50";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            DaKshaa 2026 • Live Status
          </h1>
          <p className="text-2xl text-gray-400 font-mono">
            {currentTime.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}{" "}
            • {currentTime.toLocaleTimeString("en-IN")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* NOW HAPPENING */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Radio className="text-green-500" size={32} />
              </motion.div>
              <h2 className="text-4xl font-bold text-green-400">NOW HAPPENING</h2>
            </div>

            <AnimatePresence mode="popLayout">
              {nowHappening.length > 0 ? (
                nowHappening.map((event, index) => (
                  <motion.div
                    key={event.event_id}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-gradient-to-r from-green-500/20 to-emerald-500/10 border-2 border-green-500/50 rounded-2xl p-6 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-3xl font-bold text-white">{event.category}</h3>
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="px-3 py-1 bg-green-500 rounded-full text-black font-bold text-sm"
                        >
                          LIVE
                        </motion.div>
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-2 text-xl text-gray-300">
                          <MapPin size={20} className="text-green-500" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                      {event.start_time && (
                        <div className="flex items-center gap-2 text-lg text-gray-400 mt-2">
                          <Clock size={18} />
                          <span>Started at {formatTime(event.start_time)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-gray-600"
                >
                  <p className="text-2xl">No events currently happening</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* UP NEXT */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Clock className="text-blue-500" size={32} />
              <h2 className="text-4xl font-bold text-blue-400">UP NEXT</h2>
            </div>

            <AnimatePresence mode="popLayout">
              {upNext.length > 0 ? (
                upNext.map((event, index) => (
                  <motion.div
                    key={event.event_id}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-gradient-to-r ${
                      event.current_status === "delayed"
                        ? "from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500/50"
                        : "from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/50"
                    } rounded-2xl p-6 overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{event.category}</h3>
                        {event.current_status === "delayed" && (
                          <div className="px-3 py-1 bg-yellow-500 rounded-full text-black font-bold text-sm flex items-center gap-1">
                            <AlertTriangle size={14} />
                            DELAYED
                          </div>
                        )}
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-2 text-lg text-gray-300">
                          <MapPin size={18} className="text-blue-500" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                      {event.start_time && (
                        <div className="flex items-center gap-2 text-lg text-gray-400 mt-2">
                          <Clock size={18} />
                          <span>Starts at {formatTime(event.start_time)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-gray-600"
                >
                  <p className="text-2xl">No upcoming events in the next hour</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FLASH NEWS / ANNOUNCEMENTS */}
        {announcements.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-12 max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <Zap className="text-yellow-500" size={32} />
              <h2 className="text-4xl font-bold text-yellow-400">FLASH NEWS</h2>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gradient-to-r ${getAnnouncementColor(announcement.type)} border rounded-2xl p-6`}
                  >
                    <p className="text-2xl font-medium">{announcement.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveStatusBoard;


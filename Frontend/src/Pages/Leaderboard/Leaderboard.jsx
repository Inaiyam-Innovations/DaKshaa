import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Users,
  TrendingUp,
  Star,
  RefreshCw,
  Crown
} from "lucide-react";
import { supabase } from "../../supabase";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    topReferrer: null,
    activeReferrers: 0
  });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Fetch users with referral counts
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, roll_no, department, college_name, referral_count")
        .gt("referral_count", 0)
        .order("referral_count", { ascending: false })
        .limit(100);

      if (error) throw error;

      setLeaderboard(data || []);

      // Calculate stats
      const totalReferrals = data?.reduce((sum, user) => sum + user.referral_count, 0) || 0;
      const topReferrer = data?.[0];
      const activeReferrers = data?.length || 0;

      setStats({
        totalReferrals,
        topReferrer,
        activeReferrers
      });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="text-yellow-500" size={24} />;
      case 1:
        return <Medal className="text-gray-300" size={24} />;
      case 2:
        return <Medal className="text-orange-400" size={24} />;
      default:
        return null;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30";
      case 1:
        return "from-gray-300/20 to-gray-400/5 border-gray-300/30";
      case 2:
        return "from-orange-400/20 to-orange-500/5 border-orange-400/30";
      default:
        return "from-white/5 to-white/0 border-white/10";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <RefreshCw className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="text-secondary" size={48} />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Referral Leaderboard
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Top ambassadors spreading the word about DaKshaa 2026
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="text-blue-500" size={32} />
                <span className="text-3xl font-bold">{stats.totalReferrals}</span>
              </div>
              <p className="text-gray-400">Total Referrals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Crown className="text-yellow-500" size={32} />
                <span className="text-3xl font-bold">{stats.topReferrer?.referral_count || 0}</span>
              </div>
              <p className="text-gray-400">Top Referrer Score</p>
              {stats.topReferrer && (
                <p className="text-xs text-gray-500 mt-2">{stats.topReferrer.full_name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Star className="text-purple-500" size={32} />
                <span className="text-3xl font-bold">{stats.activeReferrers}</span>
              </div>
              <p className="text-gray-400">Active Referrers</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.roll_no}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gradient-to-r ${getRankColor(index)} border rounded-2xl p-6 hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="w-16 text-center">
                    {index < 3 ? (
                      getRankIcon(index)
                    ) : (
                      <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-xl font-bold">{user.full_name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                      <span className="font-mono">{user.roll_no}</span>
                      <span>•</span>
                      <span>{user.department}</span>
                      {user.college_name && (
                        <>
                          <span>•</span>
                          <span className="text-xs">{user.college_name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500" size={20} />
                    <span className="text-3xl font-bold text-secondary">{user.referral_count}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Referrals</p>
                </div>
              </div>

              {/* Special Badge for Top 3 */}
              {index < 3 && (
                <div className="mt-4 flex items-center gap-2">
                  <Award
                    className={
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-300"
                        : "text-orange-400"
                    }
                    size={16}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {index === 0 ? "🏆 Champion" : index === 1 ? "🥈 Runner Up" : "🥉 2nd Runner Up"}
                  </span>
                </div>
              )}
            </motion.div>
          ))}

          {leaderboard.length === 0 && (
            <div className="text-center py-20">
              <Trophy size={64} className="mx-auto mb-4 text-gray-600 opacity-50" />
              <p className="text-xl text-gray-500">No referrals yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;


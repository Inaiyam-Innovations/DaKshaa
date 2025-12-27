import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  CheckCircle2, 
  XCircle, 
  Crown,
  Mail,
  Phone,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { supabase } from "../../../supabase";
import { supabaseService } from "../../../services/supabaseService";
import CreateTeamModal from "./CreateTeamModal";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const data = await supabaseService.getUserTeams(user.id);
        setTeams(data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamCreated = () => {
    fetchTeams(); // Refresh teams list
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Teams</h2>
          <p className="text-gray-400 text-sm">Manage your event teams and invitations</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          <UserPlus size={20} />
          Create New Team
        </button>
      </div>

      {/* Create Team Modal */}
      <CreateTeamModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTeamCreated={handleTeamCreated}
      />

      <div className="grid grid-cols-1 gap-8">
        {teams.map((team) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center border border-white/10">
                    <Users className="text-secondary" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{team.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        team.role === "lead" ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30" : "bg-primary/20 text-primary-light border border-primary/30"
                      }`}>
                        {team.role}
                      </span>
                    </div>
                    <p className="text-secondary font-medium mt-1">{team.events?.title}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Team Size</p>
                    <p className="text-xl font-bold">{team.members.length} / {team.events?.max_team_size || "?"}</p>
                  </div>
                  {team.role === "lead" && (
                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                      Manage Team
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.members.map((member, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      {member.role === "lead" ? <Crown className="text-yellow-500" size={18} /> : <Users className="text-gray-400" size={18} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {teams.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-gray-600" size={40} />
            </div>
            <h3 className="text-xl font-bold text-white">No Teams Found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              You haven't joined or created any teams yet. Start by creating a team for a group event!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeams;

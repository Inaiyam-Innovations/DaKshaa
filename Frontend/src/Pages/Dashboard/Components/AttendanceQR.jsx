import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  QrCode, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Download,
  Share2,
  Loader2
} from "lucide-react";
import { supabase } from "../../../supabase";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

const AttendanceQR = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (data) {
          setProfile({
            ...data,
            regId: `DAK25-${user.id.substring(0, 8).toUpperCase()}`
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadEntryPass = async () => {
    try {
      toast.loading("Generating Entry Pass...", { id: 'download' });
      
      // Create canvas with higher resolution for better quality
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set dimensions (higher resolution for better quality)
      const scale = 2; // 2x resolution for better quality
      canvas.width = 800 * scale;
      canvas.height = 900 * scale; // Reduced height since we removed 2 fields
      ctx.scale(scale, scale);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 900);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 900);
      
      // Top accent bar
      ctx.fillStyle = '#f97316';
      ctx.fillRect(0, 0, 800, 8);
      
      // Entry Pass Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ENTRY PASS', 400, 80);
      
      // DaKshaa 2026 subtitle
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('DaKshaa 2026', 400, 130);
      
      // Get QR code from canvas
      const qrCanvas = qrRef.current?.querySelector('canvas');
      if (qrCanvas) {
        // White background for QR
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(200, 180, 400, 400);
        
        // Draw QR code
        ctx.drawImage(qrCanvas, 220, 200, 360, 360);
      }
      
      // Participant Details Box (reduced height)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(50, 620, 700, 220);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 620, 700, 220);
      
      // Name
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('PARTICIPANT NAME', 80, 670);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(profile.full_name?.toUpperCase() || 'N/A', 80, 710);
      
      // Registration ID
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px Arial';
      ctx.fillText('REGISTRATION ID', 80, 760);
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(profile.regId, 80, 795);
      
      // Footer
      ctx.fillStyle = '#64748b';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('This is an official entry pass for DaKshaa 2026', 400, 870);
      
      // Convert to blob with high quality and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DaKshaa_2026_Entry_Pass_${profile.regId}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Entry Pass downloaded successfully!', { id: 'download' });
      }, 'image/png', 1.0); // Maximum quality
      
    } catch (error) {
      console.error('Error downloading entry pass:', error);
      toast.error('Failed to download Entry Pass', { id: 'download' });
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Attendance QR</h2>
        <p className="text-gray-400">Show this QR code at the event venue for attendance</p>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group" ref={qrRef}>
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              <QRCodeCanvas 
                value={profile.id}
                size={200}
                level="H"
                includeMargin={false}
              />
              
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-secondary/50 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-20"
                style={{ top: 0 }}
              />
            </div>
          </div>

          <div className="mt-10 text-center space-y-2">
            <h3 className="text-2xl font-bold">{profile.full_name}</h3>
            <p className="text-secondary font-mono tracking-widest font-bold">{profile.regId}</p>
            <p className="text-sm text-gray-500">{profile.college_name}</p>
          </div>

          <div className="mt-8 flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 font-bold uppercase tracking-widest text-sm">QR Active</span>
          </div>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadEntryPass}
            className="mt-6 flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/50"
          >
            <Download size={20} />
            <span>Download Entry Pass</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Info className="text-secondary" size={24} />
          </div>
          <div>
            <h4 className="font-bold">Attendance Information</h4>
            <p className="text-sm text-gray-400">Use this QR for general entry and event check-ins</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider">College Name</p>
          <p className="font-bold text-white">{profile.college_name || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceQR;

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ksrct from '../../assets/collegeLogoWhite.png';
import dakshaa from '../../assets/logo1.png';

// Animated Social Icon
const SocialIcon = ({ href, icon: Icon, delay }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-sky-900/50 border border-sky-700/50 rounded-lg group-hover:border-cyan-400 transition-colors duration-300">
        <Icon className="text-xl md:text-2xl text-sky-300 group-hover:text-cyan-400 transition-colors" />
      </div>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.a>
  );
};

// Contact Info Item
const ContactItem = ({ icon: Icon, children, delay }) => {
  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="mt-1 w-8 h-8 flex items-center justify-center bg-sky-800/50 rounded-lg border border-sky-700/30">
        <Icon className="text-cyan-400 text-sm" />
      </div>
      <div className="text-sky-200/80 text-sm md:text-base leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

// Section Title
const FooterTitle = ({ children, delay = 0 }) => {
  return (
    <motion.h3
      className="text-xl md:text-2xl font-orbitron font-semibold mb-4 relative inline-block"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
        {children}
      </span>
      <motion.div
        className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      />
    </motion.h3>
  );
};

const UltraFooter = () => {
  const socialLinks = [
    { href: "https://instagram.com", icon: FaInstagram },
    { href: "https://facebook.com", icon: FaFacebook },
    { href: "https://linkedin.com", icon: FaLinkedin },
    { href: "https://youtube.com", icon: FaYoutube },
    { href: "https://x.com", icon: FaXTwitter },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-sky-950/30 to-gray-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Top border animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, #06b6d4, transparent)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {/* Logo Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src={ksrct} 
              alt="KSRCT Logo" 
              className="h-16 md:h-20 w-auto mb-4"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-sky-300/70 text-sm text-center md:text-left">
              Excellence in Technical Education
            </p>
          </motion.div>

          {/* Student Coordinators */}
          <div className="text-center md:text-left">
            <FooterTitle delay={0.1}>Student Coordinators</FooterTitle>
            <div className="space-y-3 mt-4">
              <ContactItem icon={FaPhone} delay={0.2}>
                <p>9489243775 - Kavinesh K</p>
                <p>7708739300 - Gopinath T</p>
                <p>8144596872 - Ruban B</p>
              </ContactItem>
              <ContactItem icon={FaEnvelope} delay={0.3}>
                dakshaa@ksrct.ac.in
              </ContactItem>
            </div>
          </div>

          {/* Address */}
          <div className="text-center md:text-left">
            <FooterTitle delay={0.2}>Address</FooterTitle>
            <div className="mt-4">
              <ContactItem icon={FaMapMarkerAlt} delay={0.4}>
                K.S.Rangasamy College of Technology,<br />
                KSR Kalvi Nagar, Tiruchengode-637 215,<br />
                Tamil Nadu, India.
              </ContactItem>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <motion.img 
              className="w-36 md:w-44 mb-4" 
              src={dakshaa} 
              alt="Dakshaa Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            
            <FooterTitle delay={0.3}>Connect With Us</FooterTitle>
            
            <div className="flex gap-3 mt-4">
              {socialLinks.map((link, i) => (
                <SocialIcon
                  key={i}
                  href={link.href}
                  icon={link.icon}
                  delay={0.4 + i * 0.1}
                />
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <a 
                href="/feedback" 
                className="px-6 py-2 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 text-sm font-orbitron"
              >
                Give Feedback
              </a>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-10 h-[1px] bg-gradient-to-r from-transparent via-sky-700 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sky-400/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2026 DaKshaa T26. All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span>by KSRCT Students</span>
          </div>
          
          <div className="flex gap-4">
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-sky-800/30" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-sky-800/30" />
    </footer>
  );
};

export default UltraFooter;


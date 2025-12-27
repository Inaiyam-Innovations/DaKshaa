import React from "react";
import { motion } from "framer-motion";

const GuestLectureCard = ({ name, title, image, time, date, location }) => {
  return (
    <motion.div
      className="p-3 border border-primary-dark mx-auto max-w-full"
      whileHover={{ scale: 1.05 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-primary-dark bg-opacity-40 p-4 sm:p-6 shadow-lg text-white text-center clip-bottom-right w-full md:w-[1000px] md:h-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title Section with bg-primary-dark */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 bg-primary-dark py-4">
          {name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <div className="border border-primary-dark w-full max-w-xs sm:max-w-sm md:max-w-md">
              <img
                src={image}
                alt={name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="p-4 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <p className="text-gray-400 text-sm sm:text-base">{title}</p>

            {/* Bullet Points */}
            <ul className="text-justify mt-3 text-sm sm:text-base list-disc pl-5 space-y-2">
              {name ===
                "National Conference on Mechanical automation & building science" && (
                <>
                  <li>Sustainable Building Materials</li>
                  <li>Structural Health Monitoring</li>
                  <li>Ground Improvement Techniques</li>
                  <li>Geotextiles and Geosynthetics Applications</li>
                  <li>Environmental Monitoring and Treatment</li>
                  <li>Transportation Planning and Smart Cities</li>
                  <li>Remote Sensing and GIS Applications</li>
                  <li>River Basin and Watershed Management</li>
                  <li>Automation and Construction Project Management</li>
                  <li>AI & ML Integration in Civil Engineering</li>
                </>
              )}
              {name === "Technology" && (
                <>
                  <li>
                    Programs in Textile Technology, Biotechnology & Food
                    Technology
                  </li>
                  <li>Advanced research & innovation in life sciences</li>
                  <li>Industry collaborations for real-world applications</li>
                </>
              )}

              {name ===
                "National Conference on Advancements in Semiconductor Technologies, Intelligent systems and Power Engineering (ASTIPE 2026)" && (
                <>
                  <li>Renewable Energy Systems and Sustainability</li>
                  <li>Advanced Power Electronics and Drives</li>
                  <li>Smart Grids and Energy Management</li>
                  <li>Electric Vehicles and Energy Storage Technologies</li>
                  <li>Embedded Systems and Internet of Things</li>
                  <li>Image, Speech, Audio and Signal Processing</li>
                  <li>
                    Satellite, Space, Vehicular and Wireless Communication
                  </li>
                  <li>Digital Circuit Design and Verification</li>
                  <li>Low Power VLSI Design</li>
                  <li>FPGA-Based VLSI Design</li>
                </>
              )}
              {name ===
                "Applications of Artificial intelligence and  Cybersecurity" && (
                <>
                  <li>Machine Learning</li>
                  <li>Natural Language Processing</li>
                  <li>Computer Vision</li>
                  <li>Expert Systems</li>
                  <li>Network Security</li>
                  <li>Cloud Security</li>
                  <li>Cryptography</li>
                  <li>Incident Response</li>
                  <li>AI for Cybersecurity Policy and Governance</li>
                  <li>Explainable AI (XAI) for Cybersecurity</li>
                </>
              )}
            </ul>

            {/* Register Button */}
            <div className="text-center mt-5 text-sky-500 text-xl md:text-2xl font-semibold mb-4">
              Registration Fee: 300
            </div>
            <button
              className="w-full md:w-auto px-6 py-3 bg-sky-600 clip bg-opacity-70 border-2 border-sky-900 hover:bg-sky-800 transition-all text-white font-semibold text-xl shadow-xl"
              onClick={() =>
                window.open("https://forms.gle/rfUU9yyQm6VeyX9x8", "_blank")
              }
            >
              REGISTER NOW!
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuestLectureCard;


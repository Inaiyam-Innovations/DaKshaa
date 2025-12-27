import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import TechnicalImage from "../../assets/EventsImages/technical.png";
import NonTechnicalImage from "../../assets/EventsImages/non-technical.png";
import Cultural from "../../assets/EventsImages/culturals.jpg";
import Workshop from "../../assets/EventsImages/workshop.jpg";
import HackathonImage from "../../assets/Hackathon.png";
import ConferenceImage from "../../assets/conference/1.png";

import Tech1 from "../../assets/EventsImages/EventDetails/TechnicalImages/CSE.png";
import Tech2 from "../../assets/EventsImages/EventDetails/TechnicalImages/IT.png";
import Tech3 from "../../assets/EventsImages/EventDetails/TechnicalImages/VLSI.png";
// import Tech4 from "../../assets/EventsImages/EventDetails/TechnicalImages/ece2.png"
import Tech5 from "../../assets/EventsImages/EventDetails/TechnicalImages/MCT.png";
import Tech6 from "../../assets/EventsImages/EventDetails/TechnicalImages/CSBS.png";
import Tech7 from "../../assets/EventsImages/EventDetails/TechnicalImages/ECE.png";
import Tech8 from "../../assets/EventsImages/EventDetails/TechnicalImages/FOOD.png";
import Tech9 from "../../assets/EventsImages/EventDetails/TechnicalImages/MECH.png";
import Tech11 from "../../assets/EventsImages/EventDetails/TechnicalImages/AIML.png";
import Tech14 from "../../assets/EventsImages/EventDetails/TechnicalImages/CIVIL.png";
import Tech15 from "../../assets/EventsImages/EventDetails/TechnicalImages/PROJECTEXPO.png";
import Tech16 from "../../assets/EventsImages/EventDetails/TechnicalImages/TEXTILE.png";
import Tech18 from "../../assets/EventsImages/EventDetails/TechnicalImages/bt.jpg";
import Tech19 from "../../assets/EventsImages/EventDetails/TechnicalImages/POSTER.png";
import Tech20 from "../../assets/EventsImages/EventDetails/TechnicalImages/EEE.png";

import NonTech1 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF CSE.jpg";
import NonTech2 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF EEE.jpg";
import NonTech3 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF VLSI.jpg";
import NonTech4 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF BIO TECH.jpg";
import NonTech5 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF MECHATRONICS.jpg";
import NonTech6 from "../../assets/EventsImages/EventDetails/Nontech/CSBS.jpg";
import NonTech7 from "../../assets/EventsImages/EventDetails/Nontech/ft.jpg";
import NonTech8 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF MECH.jpg";
import NonTech10 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF ECE.jpg";
import NonTech11 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF CIVIL.jpg";
import NonTech12 from "../../assets/EventsImages/EventDetails/Nontech/Department of InformationTechnology.jpg";
import NonTech13 from "../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF TEXTILE.jpg";

import Workshop1 from "../../assets/EventsImages/EventDetails/Workshop/vlsi.jpg";
import Workshop2 from "../../assets/EventsImages/EventDetails/Workshop/it.jpg";
import Workshop3 from "../../assets/EventsImages/EventDetails/Workshop/aids.jpg";
import Workshop4 from "../../assets/EventsImages/EventDetails/Workshop/aiml.jpg";
import Workshop5 from "../../assets/EventsImages/EventDetails/Workshop/csbs.jpg";
import Workshop6 from "../../assets/EventsImages/EventDetails/Workshop/cse.jpg";
import Workshop7 from "../../assets/EventsImages/EventDetails/Workshop/eee.jpg";
import Workshop8 from "../../assets/EventsImages/EventDetails/Workshop/biotech.jpg";
import Workshop9 from "../../assets/EventsImages/EventDetails/Workshop/mechatronics.jpg";
import Workshop10 from "../../assets/EventsImages/EventDetails/Workshop/ece.jpg";
import Workshop11 from "../../assets/EventsImages/EventDetails/Workshop/ft.jpg";
import Workshop12 from "../../assets/EventsImages/EventDetails/Workshop/mech.jpg";
import Workshop13 from "../../assets/EventsImages/EventDetails/Workshop/civil.jpg";
import Workshop14 from "../../assets/EventsImages/EventDetails/Workshop/textile.jpg";

import Culturals1 from "../../assets/HORMONICS/MUSICAL.png";
import Culturals2 from "../../assets/HORMONICS/INSTRUMENT.png";
import Culturals3 from "../../assets/HORMONICS/GROUP.png";
import Culturals4 from "../../assets/HORMONICS/SOLO DANCE.png";
import Culturals5 from "../../assets/HORMONICS/short flim.png";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      image: TechnicalImage,
      name: "Technical Events",
      descriptionImages: [
        {
          image: Tech1,
          eventId: "technical-event-1",
        },
        {
          image: Tech3,
          eventId: "technical-event-3",
        },
        {
          image: Tech5,
          eventId: "technical-event-5",
        },
        {
          image: Tech6,
          eventId: "technical-event-6",
        },
        {
          image: Tech7,
          eventId: "technical-event-7",
        },
        {
          image: Tech9,
          eventId: "technical-event-10",
        },
        {
          image: Tech14,
          eventId: "technical-event-15",
        },
        {
          image: Tech16,
          eventId: "technical-event-16",
        },
        {
          image: Tech15,
          eventId: "technical-event-17",
        },
        {
          image: Tech18,
          eventId: "technical-event-18",
        },
        {
          image: Tech19,
          eventId: "technical-event-19",
        },
        {
          image: Tech20,
          eventId: "technical-event-20",
        },
      ],
    },
    {
      id: 2,
      image: NonTechnicalImage,
      name: "Non-Technical Events",
      descriptionImages: [
        {
          image: NonTech12,
          eventId: "non-technical-event-9",
        },
        {
          image: NonTech1,
          eventId: "non-technical-event-1",
        },
        {
          image: NonTech2,
          eventId: "non-technical-event-2",
        },
        {
          image: NonTech3,
          eventId: "non-technical-event-3",
        },
        {
          image: NonTech4,
          eventId: "non-technical-event-4",
        },
        {
          image: NonTech5,
          eventId: "non-technical-event-5",
        },
        {
          image: NonTech6,
          eventId: "non-technical-event-6",
        },
        {
          image: NonTech7,
          eventId: "non-technical-event-7",
        },
        {
          image: NonTech8,
          eventId: "non-technical-event-8",
        },
        {
          image: NonTech10,
          eventId: "non-technical-event-11",
        },
        {
          image: NonTech11,
          eventId: "non-technical-event-12",
        },
        {
          image: NonTech13,
          eventId: "non-technical-event-13",
        },
      ],
    },
    {
      id: 3,
      image: Cultural,
      name: "Harmonicks",
      descriptionImages: [
        {
          image: Culturals2,
          eventId: "culturals-event-2",
        },
        {
          image: Culturals1,
          eventId: "culturals-event-1",
        },
        {
          image: Culturals3,
          eventId: "culturals-event-3",
        },
        {
          image: Culturals4,
          eventId: "culturals-event-4",
        },
        {
          image: Culturals5,
          eventId: "culturals-event-5",
        },
      ],
    },
    {
      id: 4,
      image: HackathonImage,
      name: "Hackathon",
      descriptionImages: [
        {
          image: Tech2,
          eventId: "hackathon",
        },
        {
          image: Tech11,
          eventId: "codeathon",
        },
      ],
    },
    {
      id: 5,
      image: Workshop,
      name: "Workshop",
      descriptionImages: [
        {
          image: Workshop2,
          eventId: "workshop-2",
        },
        {
          image: Workshop1,
          eventId: "workshop-1",
        },
        {
          image: Workshop3,
          eventId: "workshop-3",
        },
        {
          image: Workshop4,
          eventId: "workshop-4",
        },
        {
          image: Workshop5,
          eventId: "workshop-5",
        },
        {
          image: Workshop6,
          eventId: "workshop-6",
        },
        {
          image: Workshop7,
          eventId: "workshop-7",
        },
        {
          image: Workshop8,
          eventId: "workshop-8",
        },
        {
          image: Workshop9,
          eventId: "workshop-9",
        },
        {
          image: Workshop10,
          eventId: "workshop-10",
        },
        {
          image: Workshop11,
          eventId: "workshop-11",
        },
        {
          image: Workshop12,
          eventId: "workshop-12",
        },
        {
          image: Workshop13,
          eventId: "workshop-13",
        },
        {
          image: Workshop14,
          eventId: "workshop-14",
        },
      ],
    },
    {
      id: 6,
      image: ConferenceImage,
      name: "Conference",
      descriptionImages: [
        {
          image: ConferenceImage,
          eventId: "conference",
        },
      ],
    },
  ];

  useEffect(() => {
    setSelectedEvent(events[0].id);
  }, []);

  const handleEventClick = (id, index) => {
    if (isSpinning) return;

    setIsSpinning(true);
    const anglePerEvent = 360 / events.length;
    // Calculate the shortest rotation to the target index
    // We want the selected event to be at the top (270 degrees in SVG terms usually, but here we rotate the container)
    const targetRotation = -(index * anglePerEvent);

    // Add a full spin for effect
    setRotation((prev) => {
      const currentRotation = prev % 360;
      return prev + (targetRotation - currentRotation) - 360;
    });

    setSelectedEvent(id);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  const selectedEventData =
    events.find((event) => event.id === selectedEvent) || null;

  const title = "Events";

  const handleSlideClick = (eventId) => {
    if (eventId === "conference") {
      navigate("/events/conference");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden pt-24 pb-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 relative z-10"
      >
        <h1 className="text-center font-orbitron font-bold text-4xl md:text-6xl mb-16 tracking-tighter">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                textShadow: [
                  "0 0 0px rgba(14,165,233,0)",
                  "0 0 20px rgba(14,165,233,0.5)",
                  "0 0 0px rgba(14,165,233,0)",
                ],
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                textShadow: { repeat: Infinity, duration: 2 },
              }}
              className="inline-block hover:text-secondary transition-colors cursor-default"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <div className="flex flex-col items-center justify-center mb-20">
          {/* Instruction Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <p className="text-secondary font-orbitron text-sm tracking-[0.3em] uppercase animate-pulse">
              Select a Category to Explore
            </p>
          </motion.div>

          {/* Cyber Spin Wheel Container */}
          <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[680px] flex items-center justify-center">
            {/* Background Hex Grid (CSS Pattern) */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#0ea5e9 0.5px, transparent 0.5px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Outer Decorative Rings */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Slow Rotating Outer Ring */}
              <motion.div
                className="absolute inset-[-30px] rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              {/* Fast Counter-Rotating Ring */}
              <motion.div
                className="absolute inset-[-15px] rounded-full border-2 border-dashed border-secondary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              {/* Pulsing Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20 shadow-[0_0_100px_rgba(14,165,233,0.1)]"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Rotating Container */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 35, damping: 15 }}
            >
              {/* SVG Background for the Wheel */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="cyberGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Main Wheel Body */}
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="url(#cyberGradient)"
                  stroke="#0ea5e9"
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="0.1"
                  opacity="0.3"
                />

                {/* Degree Markers */}
                {[...Array(36)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="2"
                    x2="50"
                    y2={i % 9 === 0 ? 6 : 4}
                    transform={`rotate(${i * 10} 50 50)`}
                    stroke="#0ea5e9"
                    strokeWidth={i % 9 === 0 ? "0.5" : "0.2"}
                    opacity={i % 9 === 0 ? "0.8" : "0.4"}
                  />
                ))}

                {/* Spokes with Energy Flow */}
                {events.length > 0 &&
                  events.map((event, i) => {
                    const angle =
                      events.length > 0 ? (i / events.length) * 360 : 0;
                    const angleRad = (angle * Math.PI) / 180;
                    const endX = 50 + 48 * Math.cos(angleRad);
                    const endY = 50 + 48 * Math.sin(angleRad);
                    const isSelected = selectedEvent === event.id;
                    return (
                      <g key={event.id || i}>
                        <line
                          x1="50"
                          y1="50"
                          x2={endX}
                          y2={endY}
                          stroke={isSelected ? "#22d3ee" : "#0ea5e9"}
                          strokeWidth={isSelected ? "0.4" : "0.1"}
                          opacity={isSelected ? "1" : "0.3"}
                          filter={isSelected ? "url(#glow)" : ""}
                        />
                        {isSelected && (
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="1"
                            fill="#22d3ee"
                            animate={{
                              cx: [50, endX],
                              cy: [50, endY],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
              </svg>

              {/* Event Nodes */}
              {events.map((event, index) => {
                const angle = (index / events.length) * 2 * Math.PI;
                const radius = 42; // Percentage of SVG viewbox
                const isSelected = selectedEvent === event.id;

                return (
                  <motion.div
                    key={event.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${50 + radius * Math.cos(angle)}%`,
                      top: `${50 + radius * Math.sin(angle)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handleEventClick(event.id, index)}
                  >
                    {/* Node Content */}
                    <div className="relative">
                      {/* Holographic Frame */}
                      <div
                        className={`absolute -inset-2 rounded-full border border-dashed transition-all duration-500 ${
                          isSelected
                            ? "border-secondary animate-spin-slow opacity-100"
                            : "border-primary/20 opacity-0 group-hover:opacity-50"
                        }`}
                      />

                      <motion.div
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 transition-all duration-500 ${
                          isSelected
                            ? "border-secondary shadow-[0_0_40px_rgba(34,211,238,0.8)] scale-110 z-20"
                            : "border-primary/40 grayscale hover:grayscale-0 hover:border-primary hover:scale-105 z-10"
                        }`}
                        style={{ rotate: -rotation }}
                      >
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay with Scanlines */}
                        <div
                          className={`absolute inset-0 transition-colors duration-500 ${
                            isSelected
                              ? "bg-secondary/10"
                              : "bg-black/50 group-hover:bg-black/20"
                          }`}
                        />

                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <span
                            className={`text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-orbitron font-bold text-center leading-tight uppercase tracking-tighter transition-colors duration-500 ${
                              isSelected
                                ? "text-white"
                                : "text-gray-300 group-hover:text-white"
                            }`}
                          >
                            {event.name}
                          </span>
                        </div>

                        {/* Active Selection Glow */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 border-4 border-secondary/30 rounded-full"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center Hub - Reactor Core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52">
                {/* Rotating Core Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-secondary/30 border-t-secondary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-primary/30 border-b-primary"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Core */}
                <div className="absolute inset-4 rounded-full bg-[#020617] border border-secondary/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.2)] overflow-hidden">
                  {/* Core Pulse */}
                  <motion.div
                    className="absolute inset-0 bg-secondary/5"
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <motion.img
                    src={logo}
                    alt="Dakshaa Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain relative z-10"
                    animate={{
                      scale: [1, 1.05, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(34,211,238,0))",
                        "drop-shadow(0 0 15px rgba(34,211,238,0.5))",
                        "drop-shadow(0 0 0px rgba(34,211,238,0))",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative z-10 text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">
                    2026
                  </div>

                  {/* Scanning Line */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 bg-secondary/40 blur-sm"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Selection Indicator (Top Pointer) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 pointer-events-none z-30">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div className="w-0.5 h-16 bg-gradient-to-b from-secondary via-secondary/50 to-transparent" />
                <div className="w-4 h-4 border-2 border-secondary rotate-45 flex items-center justify-center shadow-[0_0_20px_#22d3ee]">
                  <div className="w-1.5 h-1.5 bg-secondary" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-7xl mx-auto relative"
          >
            {/* Decorative Background for Section */}
            <div className="absolute -inset-10 bg-primary/5 rounded-[4rem] blur-3xl -z-10" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden -z-10">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, transparent 24%, rgba(14, 165, 233, .3) 25%, rgba(14, 165, 233, .3) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, .3) 75%, rgba(14, 165, 233, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(14, 165, 233, .3) 25%, rgba(14, 165, 233, .3) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, .3) 75%, rgba(14, 165, 233, .3) 76%, transparent 77%, transparent)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="flex flex-col items-center mb-12">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent mb-4"
              />
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary uppercase tracking-[0.2em]">
                {selectedEventData?.name}
              </h2>
              <div className="mt-2 text-secondary/60 font-orbitron text-[10px] tracking-[0.5em] uppercase">
                Accessing Database...
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {selectedEventData?.descriptionImages.map((slide, index) => (
                <motion.div
                  key={`${slide.eventId}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]"
                  onClick={() => handleSlideClick(slide.eventId)}
                >
                  {/* Cyber Card */}
                  <div className="relative overflow-hidden bg-slate-900/50 border border-white/10 rounded-lg aspect-square cursor-pointer group-hover:border-secondary/50 transition-all duration-500">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                    <img
                      src={slide.image}
                      alt="Event"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-orbitron text-secondary tracking-widest uppercase">
                          Register Now
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg
                            className="w-5 h-5 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Events;


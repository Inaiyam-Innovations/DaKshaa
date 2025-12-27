import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

import Tech2 from "../../../assets/EventsImages/EventDetails/TechnicalImages/IT.png";
import guvi from "../../Sponsors/assets/guvi.jpg";

const HackathonSection = () => {
  const navigate = useNavigate();
  // Example data as an array of objects
  const eventDetails = {
    id: "hackathon-event-1",
    title: "Neura-Hack 2026 By",
    descriptions: [
     
    ],
    registrationLink: "https://forms.gle/DH6Su1b3y2YPfuvDA",
    rounds: [
      {
        title: "Topics",
        description: [
          "Artificial Intelligence and Machine Learning",
        
        ],
      },
      {
        title: "Round: Ideation",
        description: [
          "Problem Statement: On-the-spot selection from 20 topics.",
          "Submit your project idea.",
          "Present a brief pitch.",
          "Develop a working prototype.",
          "Submit a demo video.",
          "The top 10 finalists will give a presentation on 29th March, and the top 3 will be selected as the final winners.",
          "Winners will be announced.",
        ],
      },
      
     
    ],
    rules: 
    [
      "Teams must consist of 3 members.",
      "All code must be written during the hackathon.",
      "Plagiarism will result in disqualification.",
    ],
    schedule: [
      {
        round: "Venue",
        date: "March 28, 2026",
        time: "10:00 AM",
        location: "IT-Lab 1, IT Park",
      },
      
    ],
    contact: {
      facultyCoordinator: [
        {
          name: "Mr. K.Senthil Kumar",
          phone: "+91 95666 66124",
          email: "senthilkumark@ksrct.ac.in",
        },
        {
          name: "Mrs. K.Mahalakshmi",
          phone: "+91 99442 86457",
          email: "mahalakshmik@ksrct.ac.in",
        },
      ],
      studentCoordinator: [
        {
          name: "Poorna Sri K ",
          phone: "+91 6374702698",
          email: "poornasri664@gmail.com",
        },
        {
          name: "Sivaraj A",
          phone: "+91 90872 78175",
          email: "sivarajboss22@gmail.com",
        },
      ],
    },
  };

  // Use the first event in the array for demonstration
  const event = eventDetails;

  const [openRound, setOpenRound] = useState(null);

  const toggleRound = (round) => {
    setOpenRound(openRound === round ? null : round);
  };

  // Infinite Pulsing Animation for Button
  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Load Animation
  const loadAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition="transition"
      variants={loadAnimation}
      className="p-4 md:p-10 mt-24 text-white min-h-screen"
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <div className="max-w-4xl mx-auto text-white p-4 md:p-6">
        <div className="flex justify-center items-center mb-7 md:gap-5 gap-2">
          <h1 className="text-2xl md:text-5xl font-bold text-center text-[#9DD3FF]">
            {event.title}
          </h1>
          <img
            src={guvi}
            alt=""
            className="md:w-40 md:h-24 w-24 h-16"
          />
        </div>
        <div className="border border-sky-800 p-2">
          <div className="text-center clip-bottom-right flex flex-col gap-4 p-4 md:p-10 items-center bg-sky-900/20">
            <img
              src={Tech2}
              alt={event.title}
              className="w-40 h-40 md:w-96 md:h-96 object-cover mb-4 shadow-md"
            />
            <p className="text-lg md:text-xl mb-4 text-sky-600 text-justify">
              Neura Hack - 36-Hour Hackathon is powered by GUVI where teams
              develop solutions to problem statements provided by the
              organizers. Participants must register in advance and complete
              their projects within the 36-hour timeframe, using only original
              work. Open-source tools are allowed, but plagiarism and
              pre-existing solutions are prohibited. Submissions must include
              code, documentation, and a working demo. Projects are judged on
              innovation, technical implementation, impact, and presentation. A
              strict code of conduct ensures fairness, and intellectual property
              rights and prizes are governed by GUVI's policies.
            </p>
            {/* Register Now Button */}
            <motion.button
              className="mb-4 w-60 md:w-auto px-6 py-3 bg-primary clip bg-opacity-70 border-2 border-primary-dark hover:bg-primary-dark transition-all text-white font-semibold text-xl shadow-xl"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              variants={pulseAnimation} // Infinite pulsing animation
              animate="animate" // Ensure the animation is always running
              onClick={() => window.open(event.registrationLink, "_blank")} // Open registration link in a new tab
            >
              REGISTER NOW!
            </motion.button>
          </div>
        </div>

        {/* Rest of the content */}
        <div className="flex flex-col md:flex-row justify-center my-10 gap-4">
          {["Rewards", "Rounds", "Rules", "Schedule", "Contact"].map(
            (item, index) => (
              <motion.div
                key={index}
                className="border-2 border-primary-dark p-1"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  const element = document.getElementById(item);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                  else{
                    console.log("Not found");
                  }
                }}
              >
                <h1 className="bg-primary-dark cursor-default px-4 md:px-10 py-3 text-primary bg-opacity-80 clip-bottom-right-2">
                  {item}
                </h1>
              </motion.div>
            )
          )}
        </div>

        {/* Problem Statements<div className="border border-primary-dark p-2 mb-6 " id="PS">
          <div className="flex flex-col gap-8  border p-4  border-primary-dark bg-primary-dark/30">
            <p className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Problem Statements
            </p>

            {eventDetails?.descriptions?.map((desc, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-col gap-3 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <p className="text-primary text-xl font-semibold">
                  {desc.heading}
                </p>
                <p className="font-semibold">Problem Statement:</p>
                <p className="text-primary border border-primary-dark p-4">
                  {desc.desc}
                </p>
              </div>
            ))}
          </div>
        </div> */}
        {/*  */}

        {/* Rewards and Recognition Section */}
        <div className="border border-primary-dark p-2 mb-5 " id="Rewards">
          <div className="border border-primary-dark shadow-lg p-4 md:p-10">
            <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Rewards and Recognition
            </h2>

            {/* Prize List */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
              {/* 1st Prize */}
              <div className="flex flex-col items-center bg-primary-dark/30 border border-primary-dark p-6 rounded-lg w-full max-w-xs shadow-md sm:mt-16 order-2 sm:order-1">
                <span className="text-2xl font-bold text-yellow-400">
                  🥈 2nd Prize
                </span>
                <span className="text-3xl font-semibold text-white mt-2">
                  ₹20,000
                </span>
              </div>

              {/* 2nd Prize (Center) */}
              <div className="flex flex-col items-center bg-primary-dark/30 border border-primary-dark p-6 rounded-lg w-full max-w-xs shadow-md sm:mb-16 order-1 sm:order-2">
                <span className="text-2xl font-bold text-gray-300">
                  🥇 1st Prize
                </span>
                <span className="text-3xl font-semibold text-white mt-2">
                  ₹30,000
                </span>
              </div>

              {/* 3rd Prize */}
              <div className="flex flex-col items-center bg-primary-dark/30 border border-primary-dark p-6 rounded-lg w-full max-w-xs shadow-md sm:mt-16 order-3">
                <span className="text-2xl font-bold text-orange-400">
                  🥉 3rd Prize
                </span>
                <span className="text-3xl font-semibold text-white mt-2">
                  ₹10,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rounds Section */}
        <div className="border border-primary-dark p-2" id="Rounds">
          <div className="border border-primary-dark shadow-lg p-4 md:p-10">
            <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Rounds
            </h2>
            <div className="flex flex-col gap-7">
              {event.rounds.map((round, index) => (
                <motion.div key={index} className="flex flex-col gap-3">
                  <h1 className="font-semibold text-xl md:text-2xl text-primary">
                    {round.title}
                  </h1>
                  {/* Check if description is an array and render as a list */}
                  {Array.isArray(round.description) ? (
                    <ul className="list-disc pl-6 text-lg md:text-xl text-primary">
                      {round.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg md:text-xl text-primary">
                      {round.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Rules Section */}
        <div className="border border-primary-dark p-2 mt-6" id="Rules">
          <div className="bg-primary-dark/30 shadow-lg p-4 md:p-10">
            <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary bg-inherit border border-primary-dark px-3 py-3">
              Rules
            </h2>
            <ul className="list-disc pl-6 text-lg md:text-xl text-primary">
              {event.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="border border-primary-dark p-2 mt-6" id="Schedule">
          <div className="p-4 md:p-10">
            <h2 className="text-2xl md:text-3xl text-center font-semibold mb-8 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Schedule
            </h2>
            {event.schedule.map((schedule, index) => (
              <div key={index} className="border-gray-300 pb-2 mb-2">
                <motion.button
                  className="flex justify-between items-center w-full text-lg md:text-xl font-medium p-3 border border-primary-dark text-primary hover:bg-primary-dark transition-colors duration-300"
                  onClick={() => toggleRound(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {schedule.round}
                  {openRound === index ? <ChevronUp /> : <ChevronDown />}
                </motion.button>
                {openRound === index && (
                  <motion.div
                    className="mt-2 p-3 border border-primary-dark bg-transparent text-gray-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-base md:text-lg">
                      Date: {schedule.date}
                    </p>
                    <p className="text-base md:text-lg">
                      Time: {schedule.time}
                    </p>
                    <p className="text-base md:text-lg">
                      Location: {schedule.location}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border border-primary-dark p-3 mt-6" id="Contact">
          <div className="bg-primary-dark/20 p-4 md:p-10">
            <h2 className="text-2xl md:text-3xl text-center font-bold mb-8 text-primary border border-primary-dark px-3 py-3">
              Contact
            </h2>

            {/* Faculty Coordinator Contact Details */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                Faculty Coordinator
              </h3>
              {event.contact.facultyCoordinator.map((coordinator, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.name}
                  </p>
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.phone}
                  </p>
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.email}
                  </p>
                </div>
              ))}
            </div>

            {/* Student Coordinator Contact Details */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                Student Coordinator
              </h3>
              {event.contact.studentCoordinator.map((coordinator, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.name}
                  </p>
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.phone}
                  </p>
                  <p className="text-lg md:text-xl text-primary">
                    {coordinator.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HackathonSection;


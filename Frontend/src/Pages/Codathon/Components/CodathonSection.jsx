import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"; // Assuming you're using Lucide icons
import { useNavigate } from "react-router-dom";
import EboxLogo from "../../../assets/Codethon/EBOX_logo.png";
import Tech11 from "../../../assets/EventsImages/EventDetails/TechnicalImages/AIML.png";
const CodathonSection = () => {
  const navigate = useNavigate();
  // Example data as an array of objects
  const eventDetails = {
    id: "Codeathon-event-1",
    title: "Neura-Code By",
    descriptions: [
      {
        image: Tech11,
        text: "Codathon is a competitive coding event where participants solve programming problems within a time limit. Hosted on the Unstop platform, this event challenges individuals or teams to showcase their coding skills, creativity, and problem-solving abilities. Participants will be judged on the correctness, innovation, and quality of their code.",
      },
    ],
    registrationLink: "https://forms.gle/nYUbVjvLkKBhSDDHA",
    rounds: [
      {
        title: "Single Round",
        description: [
          "Participants will be given a set of programming problems to solve within a specified time limit.",
          "Time Limit: 2 hours",
        ],
      },
    ],
    rules: [
      "No pre-written code or external help is allowed.",
      "Participants must adhere to the time limit.",
      "Any form of plagiarism will lead to disqualification.",
      "No specialization is required.",
      "All domains are allowed to participate.",
    ],
    schedule: [
      {
        round: "Event Timing",
        date: "March 28, 2026",

        time: "9:30 AM",
        location: "To be announced",
      },
    ],
    contact: {
      facultyCoordinator: [
        {
          name: "Ms. R.P. Harshini (AP/CSE(AIML))",
          phone: "9361446506",
          email: "harshinirp@ksrct.ac.in",
        },
      ],
      studentCoordinator: [
        {
          name: "Praveen S (II-Year/CSE(AIML))",
          phone: "6369493352",
          email: "saravananpraveen1157@gmail.com",
        },
        {
          name: "Pavithran G (II-Year/CSE(AIML))",
          phone: "9363575964",
          email: "techpavithran18@gmail.com",
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
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <div className="max-w-4xl mx-auto text-white p-4 md:p-6">
        <div className="flex justify-center items-center md:gap-5 gap-3 mb-5">
          <h1 className="text-2xl md:text-5xl font-bold text-center text-primary">
            {event.title}
          </h1>
          <img src={EboxLogo} alt="" className="md:w-48 md:h-16 w-32 h-12" />
        </div>

        {/* Rest of the content */}
        <div className="flex flex-col md:flex-row justify-between my-10 gap-4">
          {["Description", "Rounds", "Rules", "Schedule", "Contact"].map(
            (item, index) => (
              <motion.div
                key={index}
                className="border-2 border-primary-dark p-1"
                whileHover={{ scale: 1.05 }}
              >
                <h1 className="bg-primary-dark cursor-default px-4 md:px-10 py-3 text-primary bg-opacity-80 clip-bottom-right-2">
                  {item}
                </h1>
              </motion.div>
            )
          )}
        </div>

        {/* Description Section */}
        <div className="border border-primary-dark p-2 mb-6 ">
          <div className="flex flex-col gap-8  border p-4  border-primary-dark bg-primary-dark/30">
            <p className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Neura-Code By EBOX
            </p>

            {eventDetails?.descriptions?.map((desc, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-6 "
                                    }`}
              >
                <div className="w-40 h-40 md:w-72 md:h-72">
                  <img
                    src={desc.image}
                    alt={`Hackathon image ${index + 1}`}
                    className="w-full h-full object-cover border border-primary-dark"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl text-primary text-justify mb-5 px-8">{desc.text}</p>

                  {/* Register Now Button */}
                  <motion.button
                    className="mb-8 w-60 ml-12 md:w-auto md:ml-72 px-6 py-3 bg-primary clip bg-opacity-70 border-2 border-primary-dark hover:bg-primary-dark transition-all text-white font-semibold text-xl md:text-2xl shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.9 }}
                    variants={pulseAnimation} // Infinite pulsing animation
                    animate="animate" // Ensure the animation is always running
                    onClick={() =>
                      window.open(event.registrationLink, "_blank")
                    } // Open registration link in a new tab
                  >
                    REGISTER NOW!
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards and Recognition Section */}
        <div className="border border-primary-dark p-2 mb-5">
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
                  ₹3000
                </span>
              </div>

              {/* 2nd Prize (Center) */}
              <div className="flex flex-col items-center bg-primary-dark/30 border border-primary-dark p-6 rounded-lg w-full max-w-xs shadow-md sm:mb-16 order-1 sm:order-2">
                <span className="text-2xl font-bold text-gray-300">
                  🥇 1st Prize
                </span>
                <span className="text-3xl font-semibold text-white mt-2">
                  ₹5000
                </span>
              </div>

              {/* 3rd Prize */}
              <div className="flex flex-col items-center bg-primary-dark/30 border border-primary-dark p-6 rounded-lg w-full max-w-xs shadow-md sm:mt-16 order-3">
                <span className="text-2xl font-bold text-orange-400">
                  🥉 3rd Prize
                </span>
                <span className="text-3xl font-semibold text-white mt-2">
                  ₹2000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rounds Section */}
        <div className="border border-primary-dark p-2">
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
        <div className="border border-primary-dark p-2 mt-6">
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
        <div className="border border-primary-dark p-2 mt-6">
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
        <div className="border border-primary-dark p-3 mt-6">
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

export default CodathonSection;


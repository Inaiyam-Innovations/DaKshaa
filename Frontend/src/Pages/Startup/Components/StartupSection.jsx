import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import startuptn from "../../../assets/startup/logo.png";
import member2 from "../../../assets/startup/panelMember1.jpg";
import member3 from "../../../assets/startup/panelMember2.jpg";
import member1 from "../../../assets/startup/gurushankar.jpg";
import member4 from "../../../assets/startup/aravinth.jpg";

function StartupSection() {
  const title1 = "Idea's";
  const title2 = "Elevator";
  const title3 = "Pitching";
  const title4 = "Contest";

  const tags = [
    "Prize",
    "Panel Discussion",
    "Eligibility",
    "Norms and Guidelines",
    "Contest and Benefits",
    "Schedule",
    "Contact",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for other animations
  }, []);

  // Framer Motion variants for the load animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Ensures the animation only plays once
      variants={containerVariants}
    >
      <h1
        className="text-center font-bold text-white md:text-4xl text-3xl mt-0 md:mt-8"
        data-aos="fade-down" // AOS animation for the title
      >
        {title1.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
        &nbsp;
        {title2.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
        &nbsp;
        {title3.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
        &nbsp;
        {title4.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Startup Tamil Nadu Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 mt-16 gap-8">
        <div className="md:col-span-4 flex flex-col items-center md:items-start justify-center">
          <div className="relative inline-block mb-4 md:mb-12">
            <img
              src={startuptn}
              alt=""
              className="border-none bg-white p-4 w-44 md:w-72"
            />
            <div className="absolute -top-4 -left-4 w-1/5 h-1/5 border-t-2 border-l-2 border-sky-900"></div>
            <div className="absolute -bottom-4 -right-4 w-1/5 h-1/5 border-b-2 border-r-2 border-sky-900"></div>
          </div>
        </div>
        <div className="md:col-span-8 flex flex-col items-center text-center md:text-left justify-center md:items-start mb-8">
          <div className="p-2 border border-sky-800 w-full">
            <p className="bg-sky-900/70 p-6 clip-bottom-right text-justify">
              StartupTN, in collaboration with K.S. Rangasamy College of
              Technology, proudly presents the DaKshaa T26 Idea Elevator
              Pitching Contest as part of Tamil Nadu Global Startup Summit 2026.
              This prestigious event serves as a dynamic platform for aspiring
              students to showcase their groundbreaking ideas in a fast-paced
              and impactful setting. As a parallel session of the Global Startup
              Summit, the contest brings together visionary minds, industry
              leaders, and investors, fostering an environment of innovation,
              collaboration, and entrepreneurial excellence. Participants will
              have the opportunity to pitch their ideas, receive valuable
              insights from experts, and gain exposure to potential funding and
              mentorship opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col flex-wrap md:flex-row justify-center my-10 mx-10 gap-10">
        {tags.map((item, index) => (
          <motion.div
            key={index}
            className="border-2 border-sky-900 cursor-default p-1"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const element = document.getElementById(item);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <h1 className="bg-sky-900 px-4 md:px-10 py-3 text-sky-300 bg-opacity-80 clip-bottom-right-2">
              {item}
            </h1>
          </motion.div>
        ))}
      </div>

      {/* Prize pool */}
      <div className="border border-sky-800 p-2 mb-5" id="Prize">
        <div className="border border-sky-800 shadow-lg p-4 md:p-10">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-sky-600 border border-sky-800 bg-sky-900/30 px-3 py-3">
            Prize Pool
          </h2>

          {/* Prize List */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
            id="Prize"
          >
            {/* 1st Prize */}
            <div className="flex flex-col items-center bg-sky-900/30 border border-sky-800 p-6 rounded-lg w-64 shadow-md">
              <span className="text-2xl font-bold text-yellow-400">
                🥇 1st Prize
              </span>
              <span className="text-3xl font-semibold text-white mt-2">
                ₹10,000
              </span>
            </div>

            {/* 2nd Prize */}
            <div className="flex flex-col items-center bg-sky-900/30 border border-sky-800 p-6 rounded-lg w-64 shadow-md">
              <span className="text-2xl font-bold text-gray-300">
                🥈 2nd Prize
              </span>
              <span className="text-3xl font-semibold text-white mt-2">
                ₹5,000
              </span>
            </div>

            {/* 3rd Prize */}
            <div className="flex flex-col items-center bg-sky-900/30 border border-sky-800 p-6 rounded-lg w-64 shadow-md">
              <span className="text-2xl font-bold text-orange-400">
                🥉 3rd Prize
              </span>
              <span className="text-3xl font-semibold text-white mt-2">
                ₹2,000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel */}
      <div className="border border-sky-800 p-2 mb-5" id="Panel Discussion">
        <div className="border border-sky-800 shadow-lg p-4 md:p-10">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-sky-600 border border-sky-800 bg-sky-900/30 px-3 py-3">
            Panel Members
          </h2>

          {/* Grid Layout - Always 2 cards per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-8">
            <div
              className="relative group cursor-pointer overflow-hidden duration-500 
                     w-full max-w-xs mx-auto bg-sky-900 
                     bg-opacity-30 border border-sky-900 text-gray-50 p-5 pb-10"
            >
              {/* Square Image */}
              <div className="w-full aspect-square">
                <img
                  src={member1}
                  alt="Icon"
                  className="group-hover:scale-105 w-full h-full object-cover duration-500"
                />
              </div>

              {/* Hover Text Effect */}
              <div className="absolute w-full left-0 p-5 -bottom-[80px] duration-500 group-hover:-translate-y-16">
                <div className="absolute -z-10 left-0 w-full h-24 sm:h-32 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                <span className="text-md md:text-xl font-bold block">
                  Mr. Gurushankar Selvam
                </span>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  Project Lead,
                </p>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  Erode & Salem Regional Hubs,
                </p>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  StartupTN, Govt. of Tamil Nadu.
                </p>
              </div>
            </div>
            <div
              className="relative group cursor-pointer overflow-hidden duration-500 
                     w-full max-w-xs mx-auto bg-sky-900 
                     bg-opacity-30 border border-sky-900 text-gray-50 p-5 pb-10"
            >
              {/* Square Image */}
              <div className="w-full aspect-square">
                <img
                  src={member4}
                  alt="Icon"
                  className="group-hover:scale-105 w-full h-full object-cover duration-500"
                />
              </div>

              {/* Hover Text Effect */}
              <div className="absolute w-full left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-14">
                <div className="absolute -z-10 left-0 w-full h-24 sm:h-32 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                <span className="text-lg sm:text-xl font-bold block">
                  Mr. S. Arvinth
                </span>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  Founder & CEO, Incer Technovation Private Limited
                </p>
              </div>
            </div>


            <div
              className="relative group cursor-pointer overflow-hidden duration-500 
                     w-full max-w-xs mx-auto bg-sky-900 
                     bg-opacity-30 border border-sky-900 text-gray-50 p-5 pb-10"
            >
              {/* Square Image */}
              <div className="w-full aspect-square">
                <img
                  src={member2}
                  alt="Icon"
                  className="group-hover:scale-105 w-full h-full object-cover duration-500"
                />
              </div>

              {/* Hover Text Effect */}
              <div className="absolute w-full left-0 p-5 -bottom-[80px] duration-500 group-hover:-translate-y-16">
                <div className="absolute -z-10 left-0 w-full h-24 sm:h-32 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                <span className="text-lg sm:text-xl font-bold block">
                  Dr. N. Thiruvenkadam,
                </span>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  Head of MSME BI,
                </p>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  K.S.Rangasamy College of Technology (Autonomous)
                </p>
              </div>
            </div>
            <div
              className="relative group cursor-pointer overflow-hidden duration-500 
                     w-full max-w-xs mx-auto bg-sky-900 
                     bg-opacity-30 border border-sky-900 text-gray-50 p-5 pb-10"
            >
              {/* Square Image */}
              <div className="w-full aspect-square">
                <img
                  src={member3}
                  alt="Icon"
                  className="group-hover:scale-105 w-full h-full object-cover duration-500"
                />
              </div>

              {/* Hover Text Effect */}
              <div className="absolute w-full left-0 p-5 pb-10 -bottom-36 duration-500 group-hover:-translate-y-28">
                <div className="absolute -z-10 left-0 w-full h-24  sm:h-32 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                <span className="text-sm md:text-xl font-bold block">
                  Dr. B. Mythili Gnanamangai
                </span>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  CEO,
                </p>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  ACIC-KS Rangasasmy College of Technology Incubation Foundation,

                </p>
                <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-sm sm:text-base leading-5">
                  (ACIC-KSRCTIF)
                  K.S.Rangasamy College of Technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="border border-sky-800 p-2 mb-5" id="Eligibility">
        <div className="border border-sky-800 shadow-lg p-4 md:p-10">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-sky-600 border border-sky-800 bg-sky-900/30 px-3 py-3">
            Eligibility
          </h2>
          <div className="flex flex-col mx-10 gap-7">
            {/* <h1 className="font-semibold text-xl md:text-2xl text-sky-600"></h1> */}
            <ul className="list-disc">
              <li className="text-lg md:text-xl text-sky-300">
                Open to College Students: Participants must be currently
                enrolled in a college or university.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                Team Composition: A team can have a minimum of 1 and a maximum
                of 3 members.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                No Entrepreneurs or Business Owners: Individuals who own a
                registered startup or business are not eligible to participate.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                Originality of Ideas: The idea presented must be original and
                should not infringe on any existing patents or intellectual
                property.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                College ID Mandatory: All participants must carry their college
                ID card on the event day for verification.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                One Entry Per Team: A participant can be part of only one team;
                multiple entries from the same individual will not be allowed.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                Presentation Requirement: Teams must be prepared to pitch their
                idea using a concise and structured approach within
                the allotted time.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="border border-sky-800 p-2 mb-5" id="Norms and Guidelines">
        <div className="border border-sky-800 shadow-lg p-4 md:p-10">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-sky-600 border border-sky-800 bg-sky-900/30 px-3 py-3">
            Norms and Guidelines
          </h2>
          <div className="flex flex-col items-start mx-10 gap-7">
            <ul className="list-disc">
              <li className="text-lg md:text-xl text-sky-300">Presentation Format:</li>
              <li className="text-lg md:text-xl text-sky-300">
                The pitch must be delivered using a PowerPoint presentation (PPT).
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                Each team is required to have exactly 8 slides in their PPT.
              </li>
              <li className="text-lg md:text-xl text-sky-300">
                The content should be clear, concise, and visually appealing.
              </li>
            </ul>
            <ul className="list-disc">
              <li className="text-lg md:text-xl text-sky-300">Pitching Rules:</li>
              <li className="text-lg md:text-xl text-sky-300">
                Each team will get 5 minutes to present, followed by a 2-minute Q&A session.</li>
              <li className="text-lg md:text-xl text-sky-300">
                Presentations should be engaging and to the point.
              </li>
            </ul>
            <ul className="list-disc">
              <li className="text-lg md:text-xl text-primary">Event Regulations:</li>
              <li className="text-lg md:text-xl text-primary">
                Teams must be present at least 30 minutes before the event starts.
              </li>
              <li className="text-lg md:text-xl text-primary">
                Strict adherence to time limits will be enforced.
                Plagiarism or misrepresentation of ideas will lead to immediate disqualification.
              </li>
              <li className="text-lg md:text-xl text-primary">
                The judges’ decisions will be final and binding.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contest and Benefits */}
      <div className="border border-primary-dark p-2 mb-5" id="Contest and Benefits">
        <div className="border border-primary-dark shadow-lg p-4 md:p-10">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
            Contest and Benefits
          </h2>
          <div className="flex flex-col items-start mx-10 gap-7">
            <ul className="list-disc">
              <li className="text-lg md:text-xl text-primary">
                StartupTN, in collaboration with K.S. Rangasamy College of Technology, proudly presents the Idea Elevator Pitching Contest as part of DaKshaa T26, a parallel session of the TN Global Startup Summit 2026, scheduled for May 3, 2026.
              </li>
              <li className="text-lg md:text-xl text-primary">
                This prestigious event serves as a dynamic platform for aspiring students to showcase their innovative ideas in a fast-paced and impactful setting. As a parallel session of the TN Global Startup Summit, the contest brings together visionary minds, industry leaders, and investors, fostering an environment of innovation, collaboration, and entrepreneurial excellence.
              </li>
              <li className="text-lg md:text-xl text-primary">
                Participants will have the opportunity to pitch their ideas, receive valuable feedback from industry experts, and gain exposure to potential funding and mentorship opportunities.
              </li>
              <li className="text-lg md:text-xl text-primary">
                Join us in shaping the future of innovation and entrepreneurship!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="border border-primary-dark p-2 mt-6" id="Schedule">
        <div className="p-4 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center font-semibold mb-8 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
            Schedule
          </h2>

          <div className="border-gray-300 pb-2 mb-2">
            <button className="flex justify-between items-center w-full text-lg md:text-xl font-medium p-3 border border-primary-dark text-primary bg-primary-dark">
              Venue and Timing
            </button>
            <div className="mt-2 p-3 border border-primary-dark bg-transparent text-gray-300">
              <p className="text-base md:text-lg">Date: 28th March 2026</p>
              <p className="text-base md:text-lg">Time: 09:00 AM - 4:00 PM</p>
              <p className="text-base md:text-lg">
                Location: Venue details will be shared in the
                confirmation email.
              </p>
            </div>
          </div>
          {/* <div>
            <p className="text-red-500 font-bold text-lg">Condition Applied*</p>
          </div>
          <div>
            <p className="font-bold text-lg">
              Special discount for team of queens*
            </p>
          </div> */}
        </div>
      </div>

      {/* Contact */}
      <div className="border border-primary-dark p-3 mt-6" id="Contact">
        <div className="bg-primary-dark/20 p-4 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center font-bold mb-8 text-primary border border-primary-dark px-3 py-3">
            Contact
          </h2>

          {/* Student Coordinator Contact Details */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              Student Coordinator
            </h3>

            <div className="mb-4">
              <p className="text-lg md:text-xl text-primary">Name: Rithika S</p>
              <p className="text-lg md:text-xl text-primary">
                Email: rithikasamraj04@gmail.com
              </p>
              <p className="text-lg md:text-xl text-primary">
                Contact No: +91 6383303147
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-10 flex items-center justify-center">
        <button
          className="px-4 py-2 bg-primary clip bg-opacity-70 border-2 border-primary-dark hover:bg-primary-dark transition-all text-white font-semibold text-xl md:text-xl shadow-xl"
          onClick={() =>
            window.open("https://forms.gle/4EfW4nqVz7ddzSiEA", "_blank")
          }
        >
          REGISTER NOW!
        </button>
      </div>
    </motion.div>
  );
}

export default StartupSection;


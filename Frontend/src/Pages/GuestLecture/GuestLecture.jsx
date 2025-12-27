import React from "react";
import { motion } from "framer-motion";
import GuestLectureCard from "./Components/GuestLectureCards";
import cs from "../../assets/conference/3.png";
import mech from "../../assets/conference/1.png";
import els from "../../assets/conference/4.png";
import is from "../../assets/conference/2.png";

const GuestLecture = () => {
  const title = "Conference"; // Page top title

  const frames = [
    {
      lectures: [
        {
          name: "National Conference on Mechanical automation & building science",
          description:
            "The School of Building & Mechanical Sciences at KSRCT focuses on engineering excellence, innovation, and hands-on learning in mechanical, mechatronics, and civil engineering. It offers state-of-the-art facilities, an industry-driven curriculum, and advanced research opportunities. Mechanical engineering emphasizes design, manufacturing, robotics, and aerospace; mechatronics integrates mechanical, electronics, and computing for AI-driven automation and Industry 4.0; civil engineering specializes in sustainable infrastructure and smart cities. With cutting-edge labs, strong industry partnerships, and a practical learning approach, KSRCT ensures students excel in automotive, aerospace, robotics, and construction sectors, preparing them for global career opportunities.",
          image: mech,
        },
      ],
    },
    // {
    //   lectures: [
    //     {
    //       name: "Technology",
    //       image: is,
    //     },
    //   ],
    // },
    {
      lectures: [
        {
          name: "National Conference on Advancements in Semiconductor Technologies, Intelligent systems and Power Engineering (ASTIPE 2026)",
          image: els,
        },
      ],
    },
    {
      lectures: [
        {
          name: "Applications of Artificial intelligence and  Cybersecurity",
          image: cs,
        },
      ],
    },
  ];

  return (
    <div className="my-24">
      {/* Conference Title at the Top */}
      <h1
        className="text-center font-bold text-white md:text-5xl text-3xl mt-0 mb-12 md:mt-8"
        data-aos="fade-down" // AOS animation
      >
        {title.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* NCISTEM Title & Subtitle Below Conference Title */}
      <div className="text-center  bg-opacity-70 text-white py-6 px-6 shadow-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">NCISTEMM</h2>
        <p className="text-gray-300 mt-2 text-sm sm:text-lg font-semibold">
          NATIONAL CONFERENCE ON INNOVATIONS IN SCIENCE, TECHNOLOGY,
          ENGINEERING, MATHEMATICS, AND MEDICINE
        </p>
        <p className="mt-3 text-xl font-semibold">NOTE: Mail your conference paper to <span className="text-primary font-bold">ncistemm@ksrct.ac.in</span></p>
        <p className="mt-3 text-xl font-semibold">Phone No: <span className="text-primary font-bold">+91 9943442987</span></p>

      </div>

      {/* First card */}
      <div className="mb-16">
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-3 border border-primary mx-auto max-w-full"
              whileHover={{ scale: 1.05 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="bg-primary bg-opacity-40 p-4 sm:p-6 shadow-lg text-white text-center w-full md:w-[1000px] md:h-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Title Section with bg-primary */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 bg-primary py-4">
                  Technological Innovations in Life Science towards
                  Sustainability"
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                  {/* Image Section */}
                  <div className="flex justify-center col-span-2">
                    <div className="border border-primary ">
                      <img
                        src={is}
                        alt="Technology Image"
                        className="w-full h-96 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Text Section */}
                  <div className="p-4 flex flex-col justify-center items-center md:items-center text-center md:text-left col-span-2">
                    {/* Register Button */}
                    <div className="text-center text-primary text-xl md:text-2xl font-semibold mb-4">
                      Registration Fee: 300
                    </div>
                    <button
                      className="w-full md:w-auto px-6 py-3 bg-primary clip bg-opacity-70 border-2 border-primary hover:bg-primary transition-all text-white font-semibold text-xl shadow-xl"
                      onClick={() =>
                        window.open(
                          "https://forms.gle/rfUU9yyQm6VeyX9x8",
                          "_blank"
                        )
                      }
                    >
                      REGISTER NOW!
                    </button>
                  </div>

                  <div className="border border-primary p-1 col-span-2 md:col-span-1">
                    <div className="border border-primary p-5">
                      <h1 className="text-2xl text-primary font-semibold">
                        Biotechnology
                      </h1>
                      <ul className="text-justify mt-3 text-sm sm:text-base list-disc pl-5 space-y-2">
                        <li>Biofuels</li> <li>Microbial Diagnostics</li>{" "}
                        <li>Industrial Biotechnology</li>{" "}
                        <li>Biomolecular Engineering</li>{" "}
                        <li>Computational Genomics</li>{" "}
                        <li>
                          Biotechnology for Livestock, Pests and Aquaculture
                        </li>{" "}
                        <li>Bioprocess and Biosystems</li>{" "}
                        <li>Microbial Energy Production</li>{" "}
                        <li>Environmental Biotechnology</li> <li>Biosensors</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-primary p-1 col-span-2 md:col-span-1">
                    <div className="border border-primary p-5">
                      <h1 className="text-2xl text-primary font-semibold">
                        Food Technology
                      </h1>
                      <ul className="text-justify mt-3 text-sm sm:text-base list-disc pl-5 space-y-2">
                        <li>Instant Foods</li> <li>Food Analysis</li>{" "}
                        <li>Nutraceuticals</li> <li>Pre/Probiotics</li>{" "}
                        <li>Edible Coatings</li> <li>Food Adulteration</li>{" "}
                        <li>Biopharmaceuticals</li>{" "}
                        <li>Food Product Development</li>{" "}
                        <li>Controlled Atmosphere Packaging</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-primary p-1 col-span-2 md:col-span-1">
                    <div className="border border-primary p-5">
                      <h1 className="text-2xl text-primary font-semibold">
                        Textile Technology
                      </h1>
                      <ul className="text-justify mt-3 text-sm sm:text-base list-disc pl-5 space-y-2">
                        <li>Green Textiles</li> <li>Protective Fabrics</li>{" "}
                        <li>Textile Composites</li> <li>Automobile Textiles</li>{" "}
                        <li>Aesthetics of Textiles</li>{" "}
                        <li>Smart Textile Applications</li>{" "}
                        <li>Textile Material Recycling</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-primary p-1 col-span-2 md:col-span-1">
                    <div className="border border-primary p-5">
                      <h1 className="text-2xl text-primary font-semibold">
                        Nanotechnology
                      </h1>
                      <ul className="text-justify mt-3 text-sm sm:text-base list-disc pl-5 space-y-2">
                        <li>Nanoelectronics</li> <li>Nanobiotechnology</li>{" "}
                        <li>Thin Film Technology</li>{" "}
                        <li>Nano - Communications</li>{" "}
                        <li>Nanodevice Fabrications</li>{" "}
                        <li>Advanced Nanomaterials</li>{" "}
                        <li>Electrochemical Corrosion</li>{" "}
                        <li>Multifunctional Materials</li>{" "}
                        <li>Sustainable Chemical Processing</li>{" "}
                        <li>Nanotechnology in Energy & Environment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Frames with Lecture Cards */}
      {frames.map((frame, frameIndex) => (
        <div key={frameIndex} className="mb-16">
          <div className="flex flex-wrap justify-center gap-6">
            {frame.lectures.map((lecture, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GuestLectureCard {...lecture} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestLecture;


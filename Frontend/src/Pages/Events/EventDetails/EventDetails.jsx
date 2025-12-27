import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Rewind & Crack - cse
// VoltEdge - eee
// SEMISPARK(PROJECT PRESENTATION) - vlsi
// Biotech Shark Tank – Pitch Your Idea - Bio tech - no
// ROBO SOCCER - MCT
// Figma Fusion: The UI/UX Design Showdown - CSBS
// ElectroBuzz - ECE
// Urban Nourish: Street Food Remix - FT
// Paper Presentation - mech
// Designathon - mech
// WebGenesis (Interactive Web Page Development) - IT
// codeathon - Aiml
// Rapid Coding- AIDS
// Cook with Prompt -AIDS
// Buildathon - civil
import Tech2 from "../../../assets/EventsImages/EventDetails/TechnicalImages/IT.png";
import Tech1 from "../../../assets/EventsImages/EventDetails/TechnicalImages/cse.png";
import Tech3 from "../../../assets/EventsImages/EventDetails/TechnicalImages/VLSI.png";
// import Tech4 from "../../../assets/EventsImages/EventDetails/TechnicalImages/ece2.png"
import Tech5 from "../../../assets/EventsImages/EventDetails/TechnicalImages/MCT.png";
import Tech6 from "../../../assets/EventsImages/EventDetails/TechnicalImages/CSBS.png";
import Tech7 from "../../../assets/EventsImages/EventDetails/TechnicalImages/ECE.png";
import Tech8 from "../../../assets/EventsImages/EventDetails/TechnicalImages/FOOD.png";
import Tech9 from "../../../assets/EventsImages/EventDetails/TechnicalImages/MECH.png";
import Tech11 from "../../../assets/EventsImages/EventDetails/TechnicalImages/AIML.png";
import Tech14 from "../../../assets/EventsImages/EventDetails/TechnicalImages/CIVIL.png";
import Tech16 from "../../../assets/EventsImages/EventDetails/TechnicalImages/TEXTILE.png";
import Tech15 from "../../../assets/EventsImages/EventDetails/TechnicalImages/PROJECTEXPO.png";
import Tech18 from "../../../assets/EventsImages/EventDetails/TechnicalImages/bt.jpg";
import Tech19 from "../../../assets/EventsImages/EventDetails/TechnicalImages/POSTER.png";
import Tech20 from "../../../assets/EventsImages/EventDetails/TechnicalImages/EEE.png";




import NonTech1 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF CSE.jpg";
import NonTech2 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF EEE.jpg";
import NonTech3 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF VLSI.jpg";
import NonTech4 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF BIO TECH.jpg";
import NonTech5 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF MECHATRONICS.jpg";
import NonTech6 from "../../../assets/EventsImages/EventDetails/Nontech/CSBS.jpg";
import NonTech7 from "../../../assets/EventsImages/EventDetails/Nontech/ft.jpg";
import NonTech8 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF MECH.jpg";
// import NonTech9 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF AIDS.jpg"
import NonTech10 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF ECE.jpg";
import NonTech11 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF CIVIL.jpg";
import NonTech12 from "../../../assets/EventsImages/EventDetails/Nontech/Department of InformationTechnology.jpg";
import NonTech13 from "../../../assets/EventsImages/EventDetails/Nontech/DEPARTMENT OF TEXTILE.jpg";

import Workshop1 from "../../../assets/EventsImages/EventDetails/Workshop/vlsi.jpg";
import Workshop2 from "../../../assets/EventsImages/EventDetails/Workshop/it.jpg";
import Workshop3 from "../../../assets/EventsImages/EventDetails/Workshop/aids.jpg";
import Workshop4 from "../../../assets/EventsImages/EventDetails/Workshop/aiml.jpg";
import Workshop5 from "../../../assets/EventsImages/EventDetails/Workshop/csbs.jpg";
import Workshop6 from "../../../assets/EventsImages/EventDetails/Workshop/cse.jpg";
import Workshop7 from "../../../assets/EventsImages/EventDetails/Workshop/eee.jpg";
import Workshop8 from "../../../assets/EventsImages/EventDetails/Workshop/biotech.jpg";
import Workshop9 from "../../../assets/EventsImages/EventDetails/Workshop/mechatronics.jpg";
import Workshop10 from "../../../assets/EventsImages/EventDetails/Workshop/ece.jpg";
import Workshop11 from "../../../assets/EventsImages/EventDetails/Workshop/ft.jpg";
import Workshop12 from "../../../assets/EventsImages/EventDetails/Workshop/mech.jpg";
import Workshop13 from "../../../assets/EventsImages/EventDetails/Workshop/civil.jpg";
import Workshop14 from "../../../assets/EventsImages/EventDetails/Workshop/textile.jpg";

import Culturals1 from "../../../assets/HORMONICS/MUSICAL.png";
import Culturals2 from "../../../assets/HORMONICS/INSTRUMENT.png";
import Culturals3 from "../../../assets/HORMONICS/GROUP.png";
import Culturals4 from "../../../assets/HORMONICS/SOLO DANCE.png";
import Culturals5 from "../../../assets/HORMONICS/short flim.png";

const EventDetails = () => {
  const { eventId } = useParams(); // Get the dynamic parameter from the URL
  const navigate = useNavigate();

  const eventDetails = {
    // Technical Events
    "technical-event-1": {
      title: "Rewind & Crack",
      description:
        "Rewind & Crack is a reverse coding competition that challenges participants to analyze and reconstruct algorithms. This event tests problem-solving skills, logical thinking, and coding efficiency through three progressive rounds.",
      image: Tech1,
      rounds: [
        {
          title: "Round 1",
          description: [
            "Duration: 30 Minutes",
            "Participants will solve basic machine learning problems and submit their solutions.",
          ],
        },
        {
          title: "Round-2: Intermediate Challenges",
          description: [
            "Duration: 45 Minutes",
            "Medium difficulty questions involving loops, conditions, and sorting logic. Some problems may include hidden test cases.",
          ],
        },
        {
          title: "Round-3: Advanced Reverse Coding",
          description: [
            "Duration: 60 Minutes",
            "Complex problems requiring data structure manipulations, encryption, or algorithm reconstruction.",
          ],
        },
      ],
      rules: [
        "The jury's decision is final.",
        "Any form of malpractice will lead to disqualification.",
      ],
      schedule: [
        {
          round: "Round",
          date: "March 28, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "CSE lab 1,IT Park",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs M.Varshana Devi",
            phone: "9597604228",
            email: "varshanadevi@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Alyushra A",
            phone: "6369548280",
            email: "alyushra96@gmail.com",
          },
          {
            name: "Peranandha KL",
            phone: "8148537603",
            email: "peranandha17@gmail.com",
          },
        ],
      },

      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-2": {
      title: "Neura Hack (Hackathon)",
      description:
        "Neura Hack 2026 is a 36-hour innovation marathon where brilliant minds unite to tackle pressing global challenges aligned with the UN Sustainable Development Goals (SDGs). Participants will collaborate, ideate, and build cutting-edge solutions leveraging technology to address issues like climate action, equality, health, and more. Join us to code, create, and catalyze change for a sustainable future!",
      image: Tech2,
      rounds: [
        {
          title: "Round 1",
          description: [
            "Duration: 30 Minutes",
            "Participants will solve basic machine learning problems and submit their solutions.",
          ],
        },
        {
          title: "Round-2: Intermediate Challenges",
          description: [
            "Duration: 45 Minutes",
            "Medium difficulty questions involving loops, conditions, and sorting logic. Some problems may include hidden test cases.",
          ],
        },
        {
          title: "Round-3: Advanced Reverse Coding",
          description: [
            "Duration: 60 Minutes",
            "Complex problems requiring data structure manipulations, encryption, or algorithm reconstruction.",
          ],
        },
      ],
      rules: [
        "The jury's decision is final.",
        "Any form of malpractice will lead to disqualification.",
        "Team: 2-3 Members",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "CSE lab 1,IT Park",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs M.Varshana Devi",
            phone: "9597604228",
            email: "varshanadevi@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Alyushra A",
            phone: "6369548280",
            email: "alyushra96@gmail.com",
          },
          {
            name: "Peranandha KL",
            phone: "8148537603",
            email: "peranandha17@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/rdVwYuEvx9Bpi5zk9", // Registration link
    },

    "technical-event-3": {
      title: "SEMISPARK(PROJECT PRESENTATION) ",
      description:
        "Project Presentation in the fields of IoT (Internet of Things),AI (Artificial Intelligence),Embedded Systems,E-Vehicle and Autonomous Vehicle, VLSI (Very Large Scale Integration), 3D Printing",
      image: Tech3,
      rounds: [
        {
          title: "TOPICS:",
          description: [
            "IoT (Internet of Things).",
            "AI (Artificial Intelligence).",
            "Embedded Systems.",
            "E-Vehicle and Autonomous Vehicle.",
            "VLSI (Very Large Scale Integration).",
            "3D Printing."
          ],
        },
        {
          title: "",
          description:
            "A technical project presentation competition where teams (1-3 members) showcase innovative projects in engineering, technology, or innovation. Each team gets 10 minutes to present and 5 minutes for Q&A, with originality being crucial. The winning team gets Rs. 1000, and attendance is mandatory for certification.",
        },

      ],
      rules: [
        "Each team consist of 1 to 3 members",
        "Each team will have 10 minutes to present their project.",
        "An additional 5 minutes will be allocated for Q&A.",
        "All projects be based on engineering, technology, or innovation",
        "Any form of plagiarism or copied work will result in immediate disqualification",
        "The attendance is mandatory for all session to getting certificate",
        "Winner Prize Amount is Rs. 1000 will be awarded to the winning team",
        "Presentation Structure:",
        "1.	Title Slide: Include the project title, team name, team members' names, institution/company and date.",
        "2. Methodology: Describe the approach, tools and techniques used.",
        "3.	Results & Findings: Present key data, graphs and observations.",
        "4. Conclusion & Future Work: Summarize key takeaways and propose future improvements.",
        "5.	References: List sources and citations used in the project.",
        "6.	Q&A Slide: Be prepared for audience questions.",
        "Submission Requirements:",
        "The hardware be demonstrated as part of the submission. (if applicable)",
        "Two copies of the Powerpoint presentation be submitted to the Student Coordinators.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "9:00 AM to 3:00 PM",
          location: "Announced Soon!",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. D. Poornakumar",
            email: "poornakumard@ksrct.ac.in",
            phone: "9003645614",
          },
          {
            name: "Mrs. C. Saranya",
            email: "saranyac@ksrct.ac.in",
            phone: "9994588990",
          },
        ],
        studentCoordinator: [
          {
            name: "Moulishwaran V",
            email: "moulishmoulishwaran44@gmail.com",
            phone: "8940451977",
          },
          {
            name: "Jaishree A",
            email: "jaishreea2005@gmail.com",
            phone: "9994371445",
          },
        ],
      },

      registrationLink: "https://forms.gle/Co3kBQwR53cbBH1B9", // Registration link
    },
    "technical-event-5": {
      title: "ROBO SOCCER",
      description:
        "Participants must design a manually controlled robot without using pre-made kits or commercial robots. Each bot must be exclusive to one team and fit within 30 cm x 30 cm x 30 cm (including wheels) with a maximum weight of 7 kg. Control can be wired or wireless, but only one person may operate the bot. Teams must bring their own power supply for wired bots, and all bots must be electrically powered (no IC engines) with a voltage limit of 24V DC. For safety, a manual emergency disconnect switch is mandatory",
      image: Tech5,
      rounds: [
        {
          title: " ",
          description: "",
        },
      ],
      rules: [
        "Team (maximum 4 members per team)",
        "Arena size – 10 x 8 feet",
        "Each match is given a time of 2-4 minutes based on number of teams registered.",
        "Each match has two halves",
        "Change of battery will not be allowed during the match",
        "The team with higher goals is considered winner of that match",
        "Intentional ramming of opponent bot is considered penalty.",
        "If each team scored equal points at the end of the match a 1 minute will be add on to the game.",
      ],
      schedule: [
        {
          round: "Round",
          date: "March 28, 2026",
          time: "11:00 AM to 1:30 PM",
          location: "MC 207,Mechatronics Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs. V. Indumathi",
            email: "indumathi@ksrct.ac.in",
            phone: "9965137001",
          },
        ],
        studentCoordinator: [
          {
            name: "Gokkarneashvarnath V",
            email: "gokkarmct@gmail.com ",
            phone: "9444177711",
          },
          {
            name: "Gokul V",
            email: "gokulv992004@gmail.com",
            phone: "6382116360",
          },
        ],
      },

      registrationLink: "https://forms.gle/gziLh4EoGaCQLSpg8", // Registration link
    },
    "technical-event-6": {
      title: "Figma Fusion: The UI/UX Design Showdown",
      description:
        "Participants will design a user interface (UI) and user experience (UX) for a provided project use case using Figma. 	Figma Account: Ensure you have an active Figma account before the event begins. If you don’t have one, sign up for free at figma.com.",
      image: Tech6,
      rounds: [
        {
          title: "Round 1: Research & Ideation",
          description:
            "Participants must thoroughly research the given use case, define user personas, and outline the design requirements.",
        },
        {
          title: "Round 2: UI/UX Design Creation",
          description:
            "High-fidelity UI designs must be created, incorporating user-friendly navigation, accessibility, and consistency. •	Prototypes are required for Round 2; ensure you link your screens to showcase how users interact with your design.",
        },
      ],
      rules: [
        "Participants must submit a Figma file with their design at the end of each round.",
        "Ensure that all files are well-organized and clearly named.",
        "Kindly bring your own laptop and use your personal internet connection for the session",
        "All designs must be original. Any form of plagiarism or copying of existing designs will lead to disqualification.",
        "Participants may use assets (icons, images, fonts) from free online resources, but they must be properly attributed if necessary.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "9:00 AM to 1:30 PM",
          location: "Academic Block Lab 2",
        },
        {
          round: "Round 2",
          date: "March 28, 2026",
          time: "1:30 PM to 4:00 PM",
          location: "Academic Block Lab 2",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. R. Karthik",
            email: "karthikr@ksrct.ac.in",
            phone: "9965010204",
          },
        ],
        studentCoordinator: [
          {
            name: "Dhanush Kumar S",
            email: "dk255767@gmail.com",
            phone: "7502218281",
          },
          {
            name: "Gokulnath M",
            email: "mohangokul4469@gmail.com",
            phone: "9944389099",
          },
        ],
      },
      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-7": {
      title: "ElectroBuzz",
      description:
        "The event consists of two stages where teams will compete to demonstrate their proficiency in handling electronic components and solving real-world circuit issues. In the first stage, participants will race against time to sort and organize electronic components, while in the second stage, they will diagnose and fix faults in a given circuit. The event encourages teamwork, quick thinking, and technical expertise, with winners being selected based on performance in each stage. The top three teams will be awarded prizes.",
      image: Tech7,
      rounds: [
        {
          title: "Round 1:",
          description: [
            "Participants will be given a set electronic components, arrange the given electronic components in increasing order within the specified time.",
            "Duration: 1 hour",
          ],
        },
        {
          title: "Round 2: Circuit Debugging",
          description: [
            "Participants will be given a electronic circuit , they want to identify and fix faults in the given circuit within the given time.",
            "Duration: 1.5 hours",
          ],
        },
      ],
      rules: [
        "Participants can compete individually or in teams of 2-4 members.",
        "Yes, inter-college team members are allowed",
        "Yes, inter-specialization team members are allowed.",
        "No external tools allowed.",
        "Complete tasks within the given time limit.",
        "Damaging equipment will lead to disqualification.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "9:00 AM to 11:00 AM",
          location: "Announced Soon!",
        },
        {
          round: "Round 2",
          date: "March 28, 2026",
          time: "1:00 PM to 3:00 PM",
          location: "Announced Soon!",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs.K.Gogiladevi (AP/ECE)",
            phone: "9715205353",
            email: "gogiladevi@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Sanjay Kumar R (III-Year/ECE)",
            phone: "7397031629",
            email: "sanjaykumar.ramasamy22@gmail.com",
          },
          {
            name: "Kowshika K (II-Year/ECE)",
            phone: "9342806195",
            email: "kowshika1912@gmail.com",
          },
        ],
      },

      registrationLink: "https://forms.gle/gziLh4EoGaCQLSpg8", // Registration link
    },
    // "technical-event-8": {
    //   title: "Urban Nourish: Street Food Remix",
    //   description:
    //     "Revolutionizing Street Food: A Fusion of Nutrition & Flavor This event aims to reinvent street food by integrating health-conscious innovations while maintaining cultural authenticity and taste. The goal is to develop a unique product that enhances nutrition without compromising on flavor.",
    //   image: Tech8,
    //   rounds: [
    //     {
    //       description: "Description:",
    //     },
    //     {
    //       description:
    //         "The Food Technology Department hosting a poster presentation on nutrient-infused street foods, focusing on functional foods, fortification, and balanced recipes. Participants have to showcase the innovative ways to enhance traditional street foods with added nutrients. Judges will evaluate posters on scientific accuracy, creativity, and practicality. The event encouraged discussions on nutrition, affordability, and consumer acceptance, promoting healthier eating choices.    ",
    //     },
    //   ],
    //   rules: [
    //     "Eligibility: Open to all departments. Teams can have a maximum of 2 members.",
    //     "Product Criteria: The product must be an innovative infusion of nutrition and flavor in street food. It should not be an exact replica of an existing market product.",
    //     "Poster Guidelines: Size: A2 (420 × 594 mm) , Must include product name, concept, ingredients, nutritional benefits, and uniqueness, Clear visuals, infographics, and creativity are encouraged",
    //     "Product Display: Each team must bring and showcase their product for evaluation.",
    //     "Presentation: Time Limit:5 minutes per team ,Must cover product innovation, nutritional benefits, and SDG alignment, Judges may ask questions after the presentation ",
    //   ],
    //   schedule: [
    //     {
    //       round: "Round",
    //       date: "May 22, 2026",
    //       time: "9:00 AM to 11:00 AM",
    //       location: "Tech Hub, Innovation Center",
    //     },
    //   ],
    //   contact: {
    //     facultyCoordinator: [
    //       {
    //         name: "Mr G Bharath, AP/FT",
    //         email: "bharathg@ksrct.ac.in",
    //         phone: "9047976171",
    //       },
    //     ],
    //     studentCoordinator: [
    //       {
    //         name: "Surya S, III Year/FT ",
    //         email: "suryaarjun813@gmail.com",
    //         phone: "9360492992",
    //       },
    //       {
    //         name: "Yatheeswar R, II Year/FT ",
    //         email: "r.yatheeswar852@gmail.com",
    //         phone: "9441236991",
    //       },
    //       {
    //         name: "Vijaya Yugeshwar R, II Year/FT ",
    //         phone: "9585768184",
    //       },
    //     ],
    //   },
    "technical-event-10": {
      title: "Designathon",
      description:
        "A creative design competition where participants transform sketches into 3D models, culminating in real-life product modeling.",
      image: Tech9,
      rounds: [
        {
          title: "Round 1",
          description: "Participants will work on 2D sketching.",
        },
        {
          title: "Round 2",
          description:
            "Participants will be given a 2D sketch to convert into a 3D model.",
        },
        {
          title: "Round 3",
          description:
            "Participants will receive a real-life product and model it on their own.",
        },
      ],
      rules: [
        "Students can bring their own laptops; computers are also available.",
        "Participants should use only SolidWorks, Fusion 360, or NX CAD software.",
        "Participants must follow the college’s instructions.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "9:00 AM to 11:00 AM",
          location: "Design Center,Mechanical Block",
        },
        {
          round: "Round 2",
          date: "March 28, 2026",
          time: "1:00 PM to 3:00 PM",
          location: "Design Center,Mechanical Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. C. Ramesh",
            email: "rameshc@ksrct.ac.in",
            phone: "9629767778",
          },
          {
            name: "Mr. M. Prasath",
            email: "prasathm@ksrct.ac.in",
            phone: "9788206877",
          },
        ],
        studentCoordinator: [
          {
            name: "K P Arunachalam",
            email: "arunachalam122004@gmail.com",
            phone: "9025972365",
          },
          {
            name: "Jaganathbalaaji N",
            email: "jbbalaaji74181@gmail.com",
            phone: "7418155343",
          },
        ],
      },

      registrationLink: "https://forms.gle/gziLh4EoGaCQLSpg8", // Registration link
    },
    "technical-event-14": {
      title: "Codathon",
      description:
        "Codathon is a competitive coding event where participants solve programming problems within a time limit. Hosted on the Unstop platform, this event challenges individuals or teams to showcase their coding skills, creativity, and problem-solving abilities. Participants will be judged on the correctness, innovation, and quality of their code.",
      image: Tech11,
      rounds: [
        {
          description:"Participants will be given a set of programming problems to solve within a specified time limit.Time Limit: 2 hours",

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
          round: "Round",
          date: "March 28, 2026",
          time: "9:30 AM",
          location: "Announced Soon!",
        },
      
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Ms. R.P. Harshini (AP/CSE(AIML))",
            email: "harshinirp@ksrct.ac.in",
            phone: "9361446506",
          },
        ],
        studentCoordinator: [
          {
            name: "Praveen S (II-Year/CSE(AIML))",
            email: "saravananpraveen1157@gmail.com",
            phone: "6369493352 ",
          },
          {
            name: "Pavithran G (II-Year/CSE(AIML))",
            email: "techpavithran18@gmail.com",
            phone: "9363575964",
          },
        ],
      },

      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-15": {
      title: "Buildathon",
      description:
        "Buildathon is an intensive design competition aimed at fostering innovation, creativity, and problem-solving skills among students. Participants will be challenged to develop innovative design solutions for real-world engineering and architectural problems using advanced design software SketchUp. The event will encourage critical thinking, teamwork, and the application of technical knowledge in a fast-paced environment. This event is designed for individual participants. The competition is structured into multiple rounds, each designed to test various aspects of the participants' design skills, from conceptualization to execution. The event will culminate in a final presentation, where participants will showcase their designs to a panel of industry experts and academicians.",
      image: Tech14,
      rounds: [],
      rules: [
        "Are inter-college team members allowed? Yes",
        "Are inter-specialization team members allowed? Yes",
        "The design brief, which will include the task, theme, and specific requirements, will be provided at the start of the Designathon.  Participants must create their design based on the provided brief, focusing on originality and creative solutions",
        "The design process is limited to a total duration of one hour. Only Google SketchUp can be used to create the design for this competition",
        "The judging will be based on the following criteria: Creativity, Time Management, Technical Execution, and Adherence to the Design brief. The jury's decision will be final and binding.",
        "Participation Type: Individual",
        "Charge per Person/Team: Rs.350",
        "Any form of plagiarism will lead to disqualification.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 28, 2026",
          time: "9:00 AM to 11:00 AM",
          location: "Announced Soon!",
        },
        {
          round: "Round 2",
          date: "March 28, 2026",
          time: "1:00 PM to 3:00 PM",
          location: "Announced Soon!",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.K.Vijaya Sundravel",
            email: "vijayasundravel@ksrct.ac.in",
            phone: "9688676665",
          },
        ],
        studentCoordinator: [
          {
            name: "T.Rithiga",
            email: "trithika36@gmail.com ",
            phone: "9344868518 ",
          },
          {
            name: "S.Sandhiya",
            email: "sandiyas704@gmail.comm",
            phone: "9659953151",
          },
        ],
      },

      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-16": {
      title: "Eye on Pick Glass",
      description:
        "The Eye on Pick Glass session is an insightful opportunity for textile students and professionals to enhance their expertise in fabric analysis. This workshop focuses on understanding the pick glass (thread counter)—a crucial tool for inspecting fabric construction, weave structure, and yarn density. Participants will learn practical techniques to analyze fabric quality, identify defects, and differentiate between various weaves with precision. Experts will demonstrate real-time fabric evaluation, providing hands-on experience in textile inspection. This session is ideal for those keen on mastering textile microscopy, ensuring quality control, and deepening their understanding of fabric construction.",
      image: Tech16,
      rounds: [],
      rules: [
        "Only one participant",
        "Have to detect the given fabric",
        "Counting glass will be provided and has to be returned Safely",
        "Duration:15 Minutes",
        "Juries Judgement is Final.",
      ],
      schedule: [
        {
          round: "",
          date: "March 28, 2026",
          time: "9:30AM -10:30AM",
          location: "Fabric manufacturing laboratory,TEXTILE BLOCK",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr.M.Arunkumar ",
            email: "arunkumar@ksrct.ac.in",
            phone: "8056989930",
          },
        ],
        studentCoordinator: [
          {
            name: "A.V. Raghavendhar ",
            email: "a.v.raghavendhar516@gmail.com",
            phone: "8778239221",
          },
          {
            name: "K.Harini ",
            email: "mailto:harinikumar25102005@gmail.com",
            phone: "8667393828",
          },
        ],
      },

      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-17": {
      title: "Paper presentation",
      description:
        "The Paper Presentation Competition is an opportunity for students to explore and present emerging technological advancements while addressing key global challenges. This event encourages innovation, research, and knowledge-sharing among students across various engineering and technology sectors.Participants will prepare and present a research paper on selected topics, demonstrating their understanding of cutting-edge technologies and their real-world applications.",
      image: Tech15,
      rounds: [
        {
          title: "TOPICS:",
        },
        {
          title: "Computer & IT Sector:",
          description: [
            "Cybersecurity in the Age of AI: Threats and Solutions",
            "Metaverse and Its Impact on Virtual Collaboration",
            "Homomorphic Encryption: The Future of Data Privacy",
          ],
        },
        {
          title: "Electrical & Electronics Sector:",
          description: [
            "Energy Harvesting from Ambient Sources for IoT Devices",
            "AI-Driven Chip Design for Next-Gen Processors",
            "Flexible and Wearable Electronics: The Future of Smart Devices",
          ],
        },
        {
          title: "Building & Mechanical Sector:",
          description: [
            "Self-Healing Materials for Infrastructure Longevity",
            "Autonomous Construction Robots: The Future of Smart Buildings",
            "Hybrid Air Vehicles: The Next Evolution in Aviation",
          ],
        },
        {
          title: "Artificial Intelligence & IoT Sector:",
          description: [
            "AI-Powered Emotion Recognition for Human-Machine Interaction",
            "Digital Twins: The Future of Predictive Maintenance",
            "AI-Based Disaster Prediction and Response Systems",
          ],
        },
      ],
      rules: [
        "1) Eligibility:",
        "i) Open to all UG, PG students, and Research Scholars.",
        "ii) Participants can register individually or in teams of up to 3 members.",
        "2)Paper Guidelines:",
        "i) The paper must include Abstract, Introduction, Literature Review, Methodology, Results, and Conclusion.",
        "3) Presentation:",
        "i) Time Limit: 10 minutes per team (7 minutes for presentation + 3 minutes for Q&A).",
        "ii) Slide Limit: Maximum of 10 slides, including the title and conclusion. ",
        "iii) Presentations must include technical insights, real-world applications, and SDG alignment.",
        "4)Judging Criteria:",
        "i) Content Relevance & Accuracy – 25%",
        "ii) Creativity & Innovation – 20%",
        "iii) Clarity & Organization – 20%",
        "iv) Visual Appeal – 15%",
        "v) Presentation & Communication Skills – 20%",

      ],
      schedule: [
        {
          round: "Venue",
          date: "March 28, 2026",
          time: "9:30AM -10:30AM",
          location: "announcing soon",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. Jayamani S (AP/ECE) ",
            phone: "9629297054",
          },
        ],
        studentCoordinator: [
          {
            name: "Rohith R ",
            phone: "93455 80330",
          },
        
        ],
      },

      registrationLink: "https://forms.gle/Co3kBQwR53cbBH1B9", // Registration link
    },
    "technical-event-18": {
      title: "Bacteriart",
      description:
        " A petri plate innovations where participants present innovative ideas related to life sciences.",
      image: Tech18,
      rounds: [
        {
          title: " ",
          description:
            "Participants can compete individually; group submissions are not allowed.Displaying the petri art and providing description about your art work",
        },
      ],
      rules: [
        "Participants must submit a visible art work without contamination along with a brief description (100–200 words) explaining the scientific relevance.",
        "Each participant can submit only one artwork",
        "Artwork must be submitted with a protective covering.",
        "judging criteria: Creativity & originality, relevance to theme artistic technique, presentation and concept clarity",
        "No inter-college team members allowed",
        "No inter-specialization team members allowed",
      ],
      schedule: [
        {
          round: "Venue",
          date: "March 28, 2026",
          time: "9:30AM -10:30AM",
          location: "announcing soon",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.M.Nithya",
            email: "nithyam@ksrct.ac.in",
            phone: " 7708844446",
          },
        ],
        studentCoordinator: [
          {
            name: "Sankar R",
            email: "sankarragu832@gmail.com",
            phone: "7397534931",
          },
          {
            name: "Mridula Dev D ",
            email: "mriduladev2004@gmail.com",
            phone: "8754184017",
          },
        ],
      },

      registrationLink: "https://forms.gle/2wBfChfRVPiKVw599", // Registration link
    },
    "technical-event-19": {
        title: "Poster Presentation",
        description:
          "The Poster Presentation Competition is an opportunity for students to explore and present emerging trends in their respective fields while addressing key global challenges outlined in the Sustainable Development Goals (SDGs).Participants will research and showcase innovative ideas through a visually engaging A1-sized poster, effectively communicating their findings to a diverse audience. This competition aims to foster creativity, critical thinking, and knowledge-sharing among students across multiple disciplines.",
        image: Tech19,
        rounds: [
          {
            title: "TOPICS:",
          },
          {
            title: "Life Science and Technology Sector:",
            description: [
              "The Future of Genetic Engineering.",
              "Urban Nourish: Street Food Remix.",
              "Eco-Friendly Dyes: Reducing Environmental Impact in Textile Processing.",
            ],
          },
          {
            title: "Computer & IT Sector:",
            description: [
              "Quantum Computing: Revolutionizing Data Processing.",
              "Blockchain Technology in Cybersecurity.",
              "Edge Computing: A Game-Changer for IoT Applications.",
            ],
          },
          {
            title: "Electrical & Electronics Sector:",
            description: [
              "The Future of Wireless Communication.",
              "Wireless Power Transmission: The Next Energy Revolution.",
            ],
          },
          {
            title: "Building and Mechanical Sector:",
            description: [
              "3D Printing in Manufacturing: A Sustainable Approach.",
              "Green Buildings: Designing a Sustainable Future.",
            ],
          },
          {
            title: "Artificial Intelligence & IoT Sector:",
            description: [
              "AI in Climate Change Prediction: A Sustainable Approach.",
              "Smart Cities: IoT Solutions for Urban Sustainability.",
            ],
          },
          {
            title: "Chemical & Pharmaceutical Sector:",
            description: [
              "Carbon Capture Technology: Fighting Global Warming.",
              "Green Hydrogen: The Future of Renewable Energy.",
              "Personalized Medicine: The Role of AI in Drug Development.",
            ],
          }
        ],
        rules: [
          "Open to all UG, PG Students and Research Scholars. Teams can have a maximum of 3 members.",
          "1) Poster Guidelines:",
          "  i) Size: A1 (594 × 841 mm).",
          "  ii) Must include title, name of the concept , and uniqueness.",
          "  iii) Clear visuals, infographics, and creativity are encouraged.",
          "2) Presentation:",
          "1) Poster Guidelines:",
          "  i) Time Limit:10 minutes per team.",
          "  ii) Includes presentation for 6 minutes and  Q and A sections  for 4 minutes.",
          "  iii) Must cover product innovation,  and SDG alignment",
          "  iv) Judges may ask questions after the presentation.",
          "3) Judging Criteria:",
          "i) Content Relevance & Accuracy – 25%",
          "ii) Creativity & Innovation – 20%",
          "iii) Clarity & Organization – 20%",
          "iv) Visual Appeal – 15%",
          "v) Presentation & Communication Skills – 20%",
        ],
        schedule: [
          {
            round: "Venue",
            date: "March 28, 2026",
            time: "9:30AM -10:30AM",
            location: "announcing soon",
          },
        ],
        contact: {
          facultyCoordinator: [
            {
              name: "Mr G Bharath, AP/FT",
              phone: "9047976171",
            },
          ],
          studentCoordinator: [
            {
              name: "Surya S",
              phone: "9360492992",
            },
            {
              name: "Yatheeswar R",
              phone: "9441236991",
            },
            {
                name: "Vijaya Yugeshwar R ",
                phone: "9585768184",
            },

          ],
        },
  
        registrationLink: "https://forms.gle/Co3kBQwR53cbBH1B9", // Registration link
      },
      "technical-event-20": {
        title: "VoltEdge (PAPER PRESENTATION)",
        description:
          "The Internet of Things (IoT) – Connecting the Future Discover how IoT is transforming industries with smart connectivity, automation, and real-time data, shaping a smarter and more efficient world.",
        image: Tech20,
        rounds: [
          
          {
            title: "TOPICS:",
            description: [
              "Internet of Things",
            ],
          },
        ],
        rules: [
          "The presentation should be within 5-7minutes, followed by a Q&A session of 2-3minutes.",
          "Use PowerPoint (PPT) or any specified tool for the slides.",
          "The number of slides should be 10-15, keeping it clear and concise.",
          "The presentation should have:",
          "Title Slide (Paper title, authors, affiliation)",
          "Introduction (Problem statement, objective)",
          "Methodology (Approach, technologies used)",
          "Results & Discussion (Findings, graphs, tables)",
          "Conclusion & Future Work",
          "References (if required)",
        ],
        schedule: [
          {
            round: "Venue",
            date: "March 28, 2026",
            time: "9:30AM -10:30AM",
            location: "announcing soon",
          },
        ],
        contact: {
          facultyCoordinator: [
            {
              name: "RAJASEKARAN N. AP / EEE",
              email:"rajasekaran.n@ksrct.ac.in",
              phone: "8056975723",
            },
          ],
          studentCoordinator: [
            {
              name: "TIVITH C",
              email:"tivithpoongodi@gmail.com",
              phone: "9345426277",
            },
            {
              name: "MOTUPALLI SHEKAR ",
              email:"shekarmotupalli@gmail.com ",
              phone: "8838510411",
            },

          ],
        },
  
        registrationLink: "https://forms.gle/Co3kBQwR53cbBH1B9", // Registration link
      },
    // Non-Technical Events
    "non-technical-event-1": {
      title: "trailblazers: The Clue Hunt",
      description:
        "Trailblazers is an interactive clue hunt event designed to test participants' problem-solving and teamwork skills. Teams will solve riddles, puzzles, and locate QR codes to progress through the challenge.",
      image: NonTech1,
      rounds: [
        {
          title: "",
          description: "",
        },
        {
          title: "",
          description: "",
        },
      ],
      rules: [
        "Teams must stay together during the hunt.",
        "No use of external help or mobile devices for assistance.",
        "Duration: 60 Minutes & Team : 2-3 Members",
        "Teams will solve riddles, find clues to unlock the next challenge.",
        "Participants must collect tokens or codes at each location as proof of completion.",
        "The team that collects the most treasures in the shortest time wins.",
      ],
      schedule: [
        {
          round: "Round",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "IT Park",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs B.Janani",
            phone: "9345215112",
            email: "janani@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Aswin K",
            phone: "6382491543",
            email: "aswinkannan0606@gmail.com",
          },
          {
            name: "Arun K ",
            phone: "9345784766",
            email: "ksarun459@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/F7ToBuAQk8jMRJe5A", // Registration link
    },
    "non-technical-event-2": {
      title: "Blind Maze",
      description:
        "Blind Maze Challenge encourages creative thinking and teamwork to tackle complex challenges in a fun and engaging way.",
      image: NonTech2,
      rounds: [
        {
          title: "Round",
          description: "Offline Blind Maze Challenge will be conducted.",
        },
        
      ],
      rules: [
        "Each team contain 2 students.",
        "Some obstacles are placed in floor, you need to reach the destination without hit on obstacles",
        "One student will be blindfold & another one will guide their teammate.",
        "Simultaneously two teams will be play, blindfold student has to observe their teammate guidance and has to finish the race quickly.",
        "Hitting on obstacles reduce your score, try to finish the race without hitting on obstacles",
        "The team to finish the race with less time will be announced as winner.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 29, 2026",
          time: "11:00 AM to 12:00 PM",
          location: "EEE 305,EEE 306 ,EEE Block",
        },
        {
          round: "Round 2",
          date: "March 29, 2026",
          time: "1:30 PM to 3:00 PM",
          location: "EEE 305,EEE 306 ,EEE Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dhanapal M",
            phone: "8012181649",
            email: "dhanpalm@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Nivitha V P",
            email: "nivithapalanisamy88@gmail.com",
            phone: "9003344108",
          },
          {
            name: "Mujamil S",
            phone: "7502968410",
            email: "mujamilsulai2006@gmail.com ",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    "non-technical-event-3": {
      title: "CONNEXION",
      description:
        "We are delighted to present CONNEXION, a fun and engaging non-tech game that challenges your imagination, observation, and quick thinking. The game consists of three thrilling rounds, where the players connect the clues in the given images to reach the correct conclusion.",
      image: NonTech3,
      rounds: [
        {
          title: "Round 1 – Guess Similar Words:",
          description:
            "Image will be shown to the team player they have to identify the represent a word or phrase by correlating the images within 30 seconds",
        },
        {
          title: "Round 2 – Guess the Movie Name: ",
          description:
            "Clue images will be given to the team. They have to connect the clue image and identify the movie name correctly within 40 seconds.",
        },
        {
          title: "Round 3 – Guess the Song:",
          description:
            "Prepare the challenge your music knowledge here clue images will be shown, providing clues for the popular song. Contestants should identify the song within a minute.",
        },
        {
          title: "All the Movie names, Songs and Words are tamil.",
          description: "",
        },
      ],
      rules: [
        "Maximum Two per team.",
        "The team will be given with three images with 30 seconds of time ",
        "The team has to identify the correct answer by connecting the pictures within the given time.",
        "Based on their performance they will lead to the next Rounds.",
        "In case of tie, they have to Compete another Round as Rapid-Fire Round",
        "The attendance is mandatory for all section to getting certificate.",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "Art Gallery, Creative Center",
        },
        {
          round: "Round 2",
          date: "March 29, 2026",
          time: "2:00 PM to 4:00 PM",
          location: "Art Gallery, Creative Center",
        },
        {
          round: "Round 3",
          date: "March 28, 2026",
          time: "2:00 PM to 4:00 PM",
          location: "Art Gallery, Creative Center",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr. N.Lalithamani ",
            email: "lalithamani@ksrct.ac.in",
            phone: "8925568867",
          },
          {
            name: "Dr. P.Suthanthirakumar",
            email: "suthanthirakumar@ksrct.ac.in",
            phone: "9500825738",
          },
        ],
        studentCoordinator: [
          {
            name: "Sathiya Jeeva M ",
            email: "sathiyajeevamtp@gmail.com",
            phone: "6380343664",
          },
          {
            name: "Deepasri M ",
            email: "deepasrimanikandan@gmail.com",
            phone: "7695945259",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    "non-technical-event-4": {
      title: "Dumb Charades - Act It Out!",
      description:
        "A fun and engaging event where participants act out biotech-related words or phrases without speaking",
      image: NonTech4,
      rounds: [
        {
          title: "Round 1 – Qualifiers:",
          description:
            "Each team gets 60 seconds per turn to act out and guess a word/phrase. Teams must guess at least 3 words to qualify for the next round",
        },
        {
          title: "Round 2 – Semi-Finals: ",
          description:
            "Difficulty level increases with phrases, movie titles, or scientific terms. Teams get 45 seconds per turn. Top teams proceed to the final round.",
        },
        {
          title: "Final Round:",
          description:
            "Teams must guess as many words/phrases as possible within 1 minutes. The team with the highest correct guesses wins",
        },
      ],
      rules: [
        "2 members per team",
        "No speaking, lip movement, or writing is allowed while acting",
        "Teams can pass a word but will lose points",
        "Use of gestures, facial expressions, and body language is encouraged",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "Art Gallery, Creative Center",
        },
        {
          round: "Round 2",
          date: "March 29, 2026",
          time: "2:00 PM to 4:00 PM",
          location: "Art Gallery, Creative Center",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. R. Arulvel",
            email: "arulvelr@ksrct.ac.in",
            phone: "8870921600",
          },
        ],
        studentCoordinator: [
          {
            name: "Pradeep Kumar A",
            email: "pradeeplatha16@gmail.com",
            phone: "8825656199",
          },
          {
            name: "Manoj R",
            email: "ravimano672@gmail.com",
            phone: "9345286006",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    "non-technical-event-5": {
      title: "Its Talk Time",
      description:
        "Two teams face off, taking turns to continue a given sentence within 5 seconds. Each team starts with 3 lives and failing to respond in time or providing an illogical continuation results in losing a life. The game continues until one team loses all three lives and gets eliminated. With pressure mounting and stories taking unexpected turns, teams must stay sharp and work together to keep the narrative flowing. The last team standing wins, proving their mastery of words and quick wit!",
      image: NonTech5,
      rounds: [
        {
          title: "",
          description: "",
        },
      ],
      rules: [
        "Teams & Lives: Each team (3 or fewer members) starts with 3 lives per round.",
        "Turn Time: Teams must continue the given sentence within 5 seconds or lose a life.",
        "Elimination: The first team to lose all 3 lives is eliminated",
        "Match Duration: If the round reaches 10 minutes, the team with more lives moves forward. If both teams have the same lives, the round restarts, but each team gets only 1 life.",
        "Language: Sentences must be in English or Tamil only.",
        "Originality: No repeating sentences, every response must be unique and meaningful.",
        "Final Round: Rules for the final round will be revealed on the spot",
      ],
      schedule: [
        {
          round: "Round",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "HPC LAB,Mechatronics Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr. C. Vijayakumar",
            email: "vijayakumarc@ksrct.ac.in",
            phone: "6379112939",
          },
          {
            name: "Dr. R Senthilmurugan",
            email: "senthilmurugan@ksrct.ac.in",
            phone: "9843488996",
          },
        ],
        studentCoordinator: [
          {
            name: "Akash Raam S",
            email: "akashadthi.sd@gmail.com",
            phone: "6381279741",
          },
          {
            name: "Deva S",
            email: "sivadeva2203@gmail.com",
            phone: "9976438984",
          },
        ],
      },
      registrationLink: "https://forms.gle/cgwAsboW12c9pWXFA", // Registration link
    },
    "non-technical-event-6": {
      title: "Auction Arena",
      description:
        "Auction Arena is a thrilling and interactive event designed to bring out the strategist in you! This fun-filled IPL-themed auction challenges participants to think analytically, bid smartly, and build the ultimate cricket squad. Participants must bid wisely, manage their budgets effectively, and build a well-balanced squad to outshine their competitors.",
      image: NonTech6,
      rounds: [],
      rules: [
        "Minimum Requirements: 2 Batters, 2 Bowlers, 1 Wicketkeeper, 5 Players who can bowl (e.g., 2 Bowlers + 3 All-rounders or 3 Bowlers + 2 All-rounders)",
        "Maximum 4 Foreign Players Allowed in the playing XI:",
        "Final Squad Composition: 11 Main Players, 1 Impact Player",
      ],
      schedule: [
        {
          round: "Slot1",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "AB(211),AB Block",
        },
        {
          round: "Slot2",
          date: "March 29, 2026",
          time: "1:00 PM to 4:00 PM",
          location: "AB(211),AB Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs.T.Udhaya",
            email: "udhaya@ksrct.ac.in",
            phone: "8675587180",
          },
        ],
        studentCoordinator: [
          {
            name: "Kishorekumar S",
            email: "kishoresenthilkumar25@gmail.com",
            phone: "9344276110",
          },
          {
            name: "Gogul J",
            email: "goguljeyaraj04@gmail.com",
            phone: "8807614376",
          },
        ],
      },
      registrationLink: "https://forms.gle/F7ToBuAQk8jMRJe5A", // Registration link
    },
    "non-technical-event-7": {
      title: "A Guess Challenge ",
      description:
        "Unmasking Brands & Flavors: A Journey Through Corporate Identities & Culinary Secrets This event is designed to challenge participantsknowledge of corporate branding and food recognition through an interactive three-level game. It tests awareness, teamwork, and quick thinking in a fun and engaging way.",
      image: NonTech7,
      rounds: [
        {
          title: "Round 1: Logo Guessing Challenge",
          description: [
            "Teams will be shown blurred or partial logos of food brands and must identify them.",
            "Each correct answer earns points; the top teams progress to the next level.",
          ],
        },
        {
          title: "Round 2: Food Dumb Charades",
          description: [
            "One team member will be given a food-related word/brand and must enact it without speaking.",
            "The other members must guess the word within a given time.",
            "Teams with the highest scores move to the final level",
          ],
        },
        {
          title: "Round 3: Guess the Ingredient",
          description: [
            "Teams will be presented with a mystery dish or product and must identify key ingredients.",
            "Limited time will be given for each guess.",
            "The team with the most correct ingredient identifications wins.",
          ],
        },
      ],
      rules: [
        "Use of mobile phones or external help is strictly prohibited.",
        "Teams must answer within the time limit for each round.",
        "Judges' decisions are final and binding",
      ],
      schedule: [
        {
          round: "Round 1",
          date: "March 29, 2026",
          time: "10:00 AM to 12:00 PM",
          location: "Art Gallery, Creative Center",
        },
        {
          round: "Round 2",
          date: "March 29, 2026",
          time: "2:00 PM to 4:00 PM",
          location: "Art Gallery, Creative Center",
        },
        {
          round: "Round 3",
          date: "March 29, 2026",
          time: "2:00 PM to 4:00 PM",
          location: "Art Gallery, Creative Center",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs. K. Kavitha , AP/Maths",
            phone: "9600933007",
            email: "kavithak@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Lega C, III Year/FT ",
            phone: "9360115935",
            email: "lega.chandhrasekar07@gmail.com",
          },
          {
            name: "Pavithra R, II Year/FT",
            phone: "9345894830",
            email: "rppavithra2006@gmail.com",
          },
          {
            name: "Hariprasath K, II Year/FT",
            phone: "9080753031",
            email: "prasath202hari@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    "non-technical-event-8": {
      title: "one Click",
      description:
        "Capture the beauty of our campus and showcase your photography skills in this exciting contest! Post your photo on social media with #ksrct1994 to gain bonus points based on likes. Participants receive certificates, and winners get a cash prize! 📸✨",
      image: NonTech8,
      rounds: [],
      rules: [
        "The photographs should be taken only within the campus.",
        "The photographs can be taken with any camera, i.e. DSLR, Mobile camera.",
        "Photo enhancements is allowed, but not allowed to manipulate the content.",
        "Photographs should be minimum 1MB in size.",
        "The originality of the photos will be checked.",
        "The participants have to post the photo in their social media handle using the hashtag #ksrct1994. Additional of five points will be awarded for the likes they got for the photo.",
        "For Individual 50 rupees",
      ],
      schedule: [
        {
          round: "Round",
          date: "March 29, 2026",
          time: "9:00 AM to 12:30 PM",
          location: "Mechanical Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr.S.Karthik",
            email: "skarthik@ksrct.ac.in",
            phone: "9790667321",
          },
        ],
        studentCoordinator: [
          {
            name: "Harshad Gajanan Shivpuje ",
            email: "harshadshivpujeg@gmail.com",
            phone: "7708927651",
          },
          {
            name: "Rajesh Kumar S ",
            email: "rajesh2342005@gmail.com",
            phone: "9361688130",
          },
        ],
      },
      registrationLink: "https://forms.gle/cgwAsboW12c9pWXFA", // Registration link
    },
    "non-technical-event-9": {
      title: "404:Meme Overload (Meme creation based on IT scenarios)",
      description:
        "IT Meme Battle is a fun and creative competition where teams of one or two members create original IT-related memes. Participants can use image + text, GIFs, or even hand-drawn memes for extra creativity. Plagiarized content will lead to disqualification, and all memes must be appropriate and respectful. Submissions must be made within the given time limit. Let your humor and tech knowledge shine in this battle of wit and creativity.",
      image: NonTech12,
      rounds: [],
      rules: [
        "Team Size: Each team can have 1 or 2 members.",
        "Originality Matters – Memes should be original and creative. Plagiarized content will lead to disqualification.",
        "Appropriate Content – No offensive and inappropriate memes. Keep it fun and respectful.",
        "Format Flexibility – Participants can create memes using:  Image + Text (classic meme style) ,  GIFs  ,Hand-drawn memes (for extra creativity!)",
        "Submission Time – Memes must be submitted within the given time limit.",
      ],
      schedule: [
        {
          round: "venue",
          date: "March 29, 2026",
          time: "9:30 PM to 12:00 PM",
          location: "IT lab 2,IT Park ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr.P.Dinesh Kumar",
            email: "p.dineshkumar@ksrct.ac.in",
            phone: "9688837873",
          },
        ],
        studentCoordinator: [
          {
            name: "Sandhiya M ",
            email: "sandhiyamanikandan17@gmail.com",
            phone: "9344806015",
          },
          {
            name: "Vignesh K ",
            email: "vigneshblue3162@gmail.com",
            phone: "6381083683",
          },
        ],
      },

      registrationLink: "https://forms.gle/F7ToBuAQk8jMRJe5A", // Registration link
    },

    "non-technical-event-11": {
      title: "Mind Maze",
      description:
        "Mind Maze is an exciting non-technical event that challenges participants to decode hidden clues from images using logic, pattern recognition, and creative thinking. Participants will engage their problem-solving skills to uncover the mystery, aiming to be the first to solve the clue within the time limit.",
      image: NonTech10,
      rounds: [
        {
          title: "Single Round",
          description: [
            "Participants will decode a hidden clue within an image.",
            "Speed, accuracy, and logical reasoning used to decipher the clue.",
          ],
        },
      ],
      rules: [
        "Participants must complete the task within the 15-minute time limit",
        "Only the first participant to solve the clue will be declared the winner.",
        "No external help or resources can be used during the event.",
      ],
      schedule: [],
      contact: {
        facultyCoordinator: [
          {
            name: " Dr. D. Mugilan (AP/ECE))",
            email: "mugilan@ksrct.ac.in",
            phone: "98946 07523",
          },
        ],
        studentCoordinator: [
          {
            name: "Prathipa T (II-Year/ECE)",
            email: "thangavelprathiba@gmail.com",
            phone: "9342626157",
          },
          {
            name: "Harish V(III-Year/ECE)",
            email: "harishpvr23@gmail.com ",
            phone: "8825508742",
          },
        ],
      },
      registrationLink: "https://forms.gle/F7ToBuAQk8jMRJe5A", // Registration link
    },
    "non-technical-event-12": {
      title: "Waste to Wealth 2026",
      description:
        "This event invites Engineering and Polytechnic students to showcase innovative solutions by transforming waste into creative, functional, or technological models. Participants will present their projects in a 5-7 minute pitch, focusing on creativity, sustainability, and practicality. The competition enhances problem-solving, entrepreneurial skills, and environmental awareness, offering career and networking opportunities in sustainability.",
      image: NonTech11,
      rounds: [
        {
          title: "Single Round",
          description: [
            "Each participant/team will get 5-7 minutes to present their project",
            "Craft and Art – Creative decorative items from waste.",
            "Utility and Innovation – Functional products from waste.",
            "Technology & Science Models – Prototypes for environmental sustainability",
          ],
        },
      ],
      rules: [
        "A poster or short PowerPoint presentation explaining the idea is recommended",
        "A short demonstration of the product/model is encouraged.",
        "All work must be original. Plagiarism or copied designs will lead to disqualification.",
        "The decision of the judges will be final and binding.",
        "Participants should ensure cleanliness and dispose of leftover waste properly.",
      ],
      schedule: [],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.M.Velumani/AP/Civil",
            email: "velumani@ksrct.ac.in",
            phone: "9787978886",
          },
        ],
        studentCoordinator: [
          {
            name: "R.K.Aswin",
            email: "rkaswin07@gmail.com",
            phone: "8148934756",
          },
          {
            name: "Nithiya Suriyan K",
            email: "viratsuryaviratsurya4@gmail.com",
            phone: "8056603518",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    "non-technical-event-13": {
      title: "Glorify the Face with Colours",
      description:
        "The Glorify the Face with Colours workshop is an exciting opportunity for students and enthusiasts to explore the art and science of facial aesthetics through color application. This session delves into color theory, skin tone analysis, and the impact of hues on facial appearance, focusing on textile-based cosmetics, fashion coordination, and makeup artistry. Participants will learn how to enhance facial features using the right color palettes, understand psychological effects of colors, and experiment with practical applications. Ideal for those interested in fashion, styling, and personal grooming, this workshop blends creativity with scientific principles for a transformative experience.",
      image: NonTech13,
      rounds: [
        {
          title: "Single Round",
          description: [
            "The Glorify the Face with Colours workshop is an exciting opportunity for students and enthusiasts to explore the art and science of facial aesthetics through color application. ",
          ],
        },
      ],
      rules: [
        "Theme:On the Spot",
        "Two Participants per Team",
        "Duration:1 Hr",
        "Participants have to bring their own colours, brushes etc",
        "Juries Judgement is Final",
      ],
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr.P. Maheswaran AP/Textile ",
            email: "pmaheswaran@ksrct.ac.in",
            phone: "9600589068",
          },
        ],
        studentCoordinator: [
          {
            name: "V.Sandhiya 2nd year / Textile ",
            email: "sandhiya07082006@gmail.com",
            phone: "6369670394",
          },
          {
            name: "S.A.Hariharan 2nd year / Textile",
            email: "harihraran18@gmail.com",
            phone: "7092102427",
          },
        ],
      },
      registrationLink: "https://forms.gle/5yq2dPubztMWun548", // Registration link
    },
    // Culturals
    "culturals-event-1": {
      title: "Musical Maverics",
      description:
        "A talented vocalist who mesmerizes the audience with a soulful performance, adding emotion and energy to the event.",
      image: Culturals1,
      rules: [
        "Time limit: 3–5 minutes per performance",
        "Languages & Genres: Participants can sing in any language and genre",
        "Music: Karaoke track or self-accompanied instrument is allowed (no pre-recorded vocals)",
        "Prohibited: No auto-tune or vocal effects allowed",
        "Judging Criteria: Voice Quality, Pitch, Rhythm, Expression, Song Selection",
      ],

      schedule: [
        {
          round: "Event Timing",
          date: "March 29, 2026",
          time: "10:00 AM to 3:00 PM",
          location: "KSRCT",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.M.Malarvizhi",
            phone: "9095792265",
            email: "malarvizhi@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Mouriya S",
            email: "balamouriya07@gmail.com",
            phone: "8903689846",
          },
          {
            name: "vishwanth V ",
            email: "wanthvish9894@gmail.com",
            phone: "9080012267",
          },
          {
            name: "B.S. Akshaya ",
            email: "Akshayasrini007@gmail.com",
            phone: "7871969769",
          },
        ],
      },
      registrationLink: "https://forms.gle/3pXHgWk3HHYvFqoP8", // Registration link
    },
    "culturals-event-2": {
      title: "Mastro Mania",
      description:
        "A skilled musician who enhances the event with a captivating performance, creating a memorable musical experience.",
      image: Culturals2,

      schedule: [
        {
          round: "Event Timing",
          date: "March 29, 2026",
          time: "10:00 AM to 3:00 PM",
          location: "KSRCT",
        },
      ],
      rules: [
        "Participants must bring their own instruments (guitar, keyboard, drums, violin, flute, or any other instrument).",
        "However, a keyboard will be provided by the organizers for those who need it.",
        "Time limit: 3–5 minutes per performance.",
        "Only instrumental music is allowed (no vocals).",
        "Pre-recorded background tracks are not permitted.",
        "Instruments requiring amplifiers (e.g., electric guitar, keyboard) should be self-arranged.",
        "Genre: Classical, Rock, Jazz, or any musical style.",
        "Judges will evaluate Technique, Creativity, Clarity, Stage Presence, and Overall Performance.",
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr. M. Mohanraj",
            email: "mohanrajm@ksrct.ac.in",
            phone: "8807515919",
          },
        ],
        studentCoordinator: [
          {
            name: "Karthikeyan D",
            email: "karthikeyan40@gmail.com",
            phone: "9790080274",
          },
          {
            name: "Athisaya Raj",
            email: "athisayaraj869@gmail.com",
            phone: "9566315990",
          },
          {
            name: "Lithisri. S",
            phone: "9363661955",
            email: "misslithi4326@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/3pXHgWk3HHYvFqoP8", // Registration link
    },
    "culturals-event-3": {
      title: "Beat Battle",
      description:
        "A thrilling showcase of teamwork, rhythm, and creativity as groups compete with electrifying dance performances!",
      image: Culturals3,

      schedule: [
        {
          round: "Event Timing",
          date: "March 29, 2026",
          time: "10:00 AM to 03:00 PM",
          // location: "AI Lab, Mechatronics Block",
        },
      ],
      rules: [
        "Song Duration should be between 4 to 5 min",
        "Team size should be between 3 to 8 members",
        "Song should be in mp3 format and must be brought by the participants",
        "Register before the final date",
        "Props: Allowed but should be pre-approved",
        "Winners will be judged by jury based on Coordination,Choreography, Costumes, Stage Presence, Overall Impact",
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Ms.V.Indumathi ",
            phone: "9965137001",
          },
        ],
        studentCoordinator: [
          {
            name: "Ramitha TR ",
            email: "ramithakavin@gmail.com",
            phone: "9345283931",
          },
          {
            name: "Gowshika M",
            email: "mgowshika22@gmail.com",
            phone: "8870593850",
          },
          {
            name: "Vasu K",
            phone: "9342396464",
            email: "vkvasukumar2002@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/vgcbHJpHuwMzxvpu8", // Registration link
    },
    "culturals-event-4": {
      title: "Spotlight Stepper",
      description:
        "Solo dance is a personal expression of rhythm, emotion, and creativity through graceful movements. It captivates audiences with unique styles and storytelling.",
      image: Culturals4,
      rules: [
        "Song Duration should be between 3 to 4 min",
        "Song should be in mp3 format and must be brought by the participants",
        "Register before the final date",
        "Props: Allowed but should be pre-approved",
        "Winners will be judged by jury based on Choreography, Costumes, Stage Presence, Overall Impact",
      ],
      // rounds: [
      //     {
      //         title: "Single Round",
      //         description: [

      //             "Register before the final date",
      //             "Onspot Registration must be completed before 9.30AM",
      //             "",
      //         ]
      //     },
      // ],
      schedule: [
        {
          round: "Event Timing",
          date: "March 29, 2026",
          time: "10:00 AM to 03:00 PM",
          location: "KSRCT",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Ms.S.Srinithi",
            phone: "9600404607",
            email: "srinithi@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Athityaa A",
            email: "athikuti4@gmail.com",
            phone: "9345664042",
          },
          {
            name: "Nithin R",
            email: "nithuraj0000@gmail.com",
            phone: "9025496002",
          },
          {
            name: "Liji Samyukthaa S K ",
            email: "skliji04@gmail.com",
            phone: "9342381500",
          },
        ],
      },
      registrationLink: "https://forms.gle/3pXHgWk3HHYvFqoP8", // Registration link
    },
    "culturals-event-5": {
      title: "flick fest",
      description:
        "theme : beyond the bell - the college life other than studies,Common for all teams",
      image: Culturals5,
      schedule: [
        {
          round: "Event Timing",
          date: "March 29, 2026",
          time: "10:00 AM to 03:00 PM",
          location: "KSRCT",
        },
      ],
      rules: [
        "The event is open to all individual participants and teams. Teams may consist of 1 to 3 members.",
        "The Short films can be based on the Theme : Beyond the Bell –  The college life other than studies",
        "The short film should be original",
        "Duration upto 15 minutes.",
        "All films must be submitted in video file format (MP4, MOV, or AVI).",
        "Winners will be judged based on creativity, storytelling, and overall impact",
        "No 18 + ,badwords and adult content",
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Raja S",
            phone: "7502871440",
            email: "rajas@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Karthikeyan S A",
            email: "karthikeyansa8@gmail.com",
            phone: "7358996885",
          },
          {
            name: "Tamilselvan C",
            email: "tamilambani056@gmail.com",
            phone: "6374148544",
          },
        ],
      },
      registrationLink: "https://forms.gle/sSFoH8BMWLLG5xGZA", // Registration link
    },

    // Workshop
    "workshop-1": {
      title:
        "Design for Testability (DFT) Demystified:The Basics you need to Know",
      description:
        "Join our workshop to gain a basic understanding of DFT and its importance in the semiconductor industry. Open to UG & PG students from all branches, with mandatory attendance for certification. Participation certificates will be provided to all attendees!",
      image: Workshop1,
      schedule: [
        {
          round: "Round  ",
          date: "March 28, 2026",
          time: "9:00 AM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.S.Gomathi",
            email: "gomathi@ksrct.ac.in",
            phone: "9894279244",
          },
          {
            name: "Mr.S.Pradeep ",
            email: "pradeeps@ksrct.ac.in",
            phone: "812213986",
          },
        ],

        studentCoordinator: [
          {
            name: "Hari Kesavaraj J , Second Year EE (VLSI D&T)",
            email: "harikesavaraj1806@gmail.com",
            phone: "8270278279",
          },
          {
            name: "Aishvarieya V , Second Year EE (VLSI D&T)",
            email: "aishvarieyav5@gmail.com",
            phone: "6374684519",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-2": {
      title: "A Walkthrough of Modern Techniques",
      description:
        "This workshop will introduce students to prompt engineering, a critical skill for optimizing AI interactions. Participants will learn how to craft precise, efficient, and structured prompts to get the best responses from AI models like ChatGPT, Gemini, and DeepSeek. The session will cover types of prompts, best practices, real-world applications, and hands-on exercises to help students develop a deeper understanding of AI communication.",
      image: Workshop2,
      schedule: [
        {
          round: "Venue ",
          date: "March 28, 2026",
          time: "9:00 PM to 3:00 PM",
          location: "IT lab 1,IT Park ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr.P.Dinesh Kumar ",
            phone: "9688837873",
            email: "p.dineshkumar@ksrct.ac.in",
          },
        ],
        studentCoordinator: [
          {
            name: "Anisa F",
            phone: "9942651212",
            email: "anisafairoz@gmail.com",
          },
          {
            name: "Balasastha E",
            phone: "8056520787",
            email: "balasastha85266@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-3": {
      title: "Ui Path Supported Workshop” Robotic Process Automation”",
      description:
        "Join our UiPath-Supported Workshop on Robotic Process Automation (RPA) led by Mr. M. Senthil, Lead Technical Trainer at ICT Academy, Chennai. Gain hands-on experience in automation tools and techniques to enhance workflow efficiency. Don’t miss this opportunity to elevate your automation skills! 🚀",
      image: Workshop3,
      schedule: [
        {
          round: "Workshop timing",
          date: "March 28, 2026",
          time: "10:00 AM to 3:00 PM",
          location: "AI Lab, Mechatronics Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr N.Giridharan ",
            email: "giridharan@ksrct.ac.in",
            phone: "8925325252",
          },
        ],
        studentCoordinator: [
          {
            name: "Gowrinath V",
            email: "gowrigowri75392@gmail.com",
            phone: "8056570574",
          },
          {
            name: "Durga S",
            email: "durgasaran2004@gmail.com",
            phone: "9080191925",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-4": {
      title: "AI in Game Developing",
      description:
        "The AI on Game Developing Workshop, organized by IITM Pravartak Technologies Foundation, is a two-day event designed to introduce participants to the integration of Artificial Intelligence (AI) in game development. This hands-on workshop covers key AI techniques such as pathfinding, decision-making algorithms, and neural networks, enabling participants to create intelligent game characters, optimize game mechanics, and enhance player experience. Open to students, professionals, and AI/game development enthusiasts, no prior experience is required—just a basic understanding of programming is recommended. Inter-specialization teams are welcome, and registration is free! 🚀🎮",
      image: Workshop4,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs. R.S. Sivarajani (AP/CSE(AIML))",
            email: "sivaranjani.rs@ksrct.ac.in",
            phone: "9677055783",
          },
        ],
        studentCoordinator: [
          {
            name: "Surendra Krishana R (III-Year/CSE(AIML))",
            email: "surendirakrishna.info@gmail.com",
            phone: "8438878063",
          },
          {
            name: "Sriharan S (III-Year/CSE(AIML))",
            email: "sriharan2544@gmail.com",
            phone: "9629729009",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-5": {
      title: "Blockchain 101",
      description:
        "Blockchain 101  is an introductory workshop designed to help developers understand blockchain technology and its practical applications. It covers key concepts such as decentralization, cryptographic security, consensus mechanisms, and smart contracts. Participants will gain hands-on experience in writing and deploying smart contracts using Solidity and working with blockchain development tools like Remix, Truffle, and MetaMask. By the end of the session, attendees will have a solid foundation in blockchain and the skills to start building decentralized applications (DApps).",
      image: Workshop5,
      schedule: [
        {
          round: "Event Timing",
          date: "March 28, 2026",
          time: "9:00 AM to 4:00 PM",
          location: "AB 209, Academic Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. P. Venkatesh",
            email: "venkateshp@ksrct.ac.in",
            phone: "8903366916",
          },
        ],
        studentCoordinator: [
          {
            name: "Mohanakumaran K",
            email: "mohanakumaran2004@gmail.com",
            phone: "8838401078",
          },
          {
            name: "Narendar P",
            email: "naren20062005@gmail.com",
            phone: "8508774247",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-6": {
      title:
        "Mobile Application Development By RemitBee India Private Limited - Chennai",
      description:
        "In today’s digital world, mobile applications are a key driver of how individuals and businesses engage with technology. This Mobile Application Development Workshop aims to equip participants with a solid grasp of mobile app development across both Android and iOS platforms. The workshop will feature hands-on training, live coding, and a mini-project to implement learned concepts in practice",
      image: Workshop6,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr K.Dinesh Kumar",
            email: "dineshkumark@ksrct.ac.in",
            phone: "9360287212",
          },
        ],
        studentCoordinator: [
          {
            name: "Kaviya S",
            email: "kaviyasenthil12005@gmail.com",
            phone: "6382491543",
          },
          {
            name: "Obu Sharva Dharshini O ",
            email: "obusharvadharshinio@gmail.com",
            phone: "6381014001",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-7": {
      title: "Do Engineering using NI Lab VIEW By Mew Technology, Bangalore",
      description:
        "Participants will learn to create virtual instruments, control hardware, and analyze data. The workshop focuses on practical applications in engineering and control systems.",
      image: Workshop7,
      schedule: [
        {
          round: "Venue",
          date: "March 28 & 22, 2026",
          time: "9:00 AM to 4:00 PM",
          location: "Computer Lab,EEE Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. Thangadurai A",
            email: "thangaduraia@ksrct.ac.in ",
            phone: "9095322233",
          },
        ],
        studentCoordinator: [
          {
            name: "Bhuwanesh R",
            email: "bhuwanesh2004@gmail.com",
            phone: "9342566322",
          },
          {
            name: "Karmuhilan V",
            email: "karmuhilan90252@gmail.com ",
            phone: "9025244374",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-8": {
      title:
        "Next Generation Sequencing technologies in Health Care By Genotypic Technology, Bengaluru",
      description:
        "An interactive workshop providing hands-on experience and insights into cutting-edge sequencing technologies.",
      image: Workshop8,
      schedule: [
        {
          round: "Round ",
          date: "March 28, 2026",
          time: "10:00 AM to 4:00 PM",
          location: "Bio tech smart class,BIOTECH Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr. Puniethaa Prabhu",
            email: "punithaa@ksrct.ac.in",
            phone: "9080195801",
          },
          {
            name: "Dr. Sidhra S",
            email: "sidhra@ksrct.ac.in",
            phone: "8870681797",
          },
        ],
        studentCoordinator: [
          {
            name: "Sanjay Kumar K",
            email: "sanjaysanjay212004@gmail.com",
            phone: "8807076569",
          },
          {
            name: "Mohammed Arkam K",
            email: "mohammedarkamsheriff@gmail.com",
            phone: "7904655755",
          },
          {
            name: "Raamprasaanth S",
            email: "raamprasaanths7607@gmail.com",
            phone: "8838616292",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-9": {
      title:
        "Soaring High: Hands-on Drone Building and Flight workshop By Garuda Aerospace",
      description:
        "Join our Hands-on Drone Building and Flight Workshop and experience the thrill of creating and flying your own drone! This interactive session covers drone assembly, aerodynamics, and real-world applications, giving you practical insights into UAV technology. With expert guidance, you'll build your drone from scratch and take it for a test flight, mastering essential piloting skills. Whether you're a beginner or a tech enthusiast, this workshop will elevate your knowledge and take you to new heights!",
      image: Workshop9,
      schedule: [
        {
          round: "Round ",
          date: "March 28 & 29, 2026",
          time: "9:00 AM to 4:00 PM",
          location:
            "Centre of Excellence in Drone Technology,Mechatronics Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. S. Hari Prasadh",
            email: "hariprasadh@ksrct.ac.in",
            phone: "7092821630",
          },
          {
            name: "Mr. R. Vivek",
            email: "vivekr@ksrct.ac.in",
            phone: "7200458826",
          },
        ],
        studentCoordinator: [
          {
            name: "Soundarrajan A",
            email: "soundarrajan2004@gmail.com",
            phone: "9442727410",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-10": {
      title:
        "Industry IoT using LoRaWAN Technology By Enthu Technology Solutions India Pvt Ltd",
      description:
        "Workshop delves into LoRaWAN technology and its role in Industrial IoT (IIoT), enabling long-range, low-power wireless communication for various applications. Participants will gain insights into LoRaWAN architecture, device communication, network deployment, and security protocols. The workshop will cover smart manufacturing, asset tracking, environmental monitoring, and predictive maintenance, with hands-on sessions and real-world case studies to equip attendees with practical skills for implementing IoT solutions in industrial automation and efficiency.",
      image: Workshop10,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mrs. Jayamani S (AP/ECE)",
            email: "jayamani@ksrct.ac.in",
            phone: "9629297054",
          },
        ],
        studentCoordinator: [
          {
            name: "Rohith R (III-Year/ECE)",
            email: "rohith66r@gmail.com",
            phone: "9345580330",
          },
          {
            name: "Rithan V (II-Year/ECE)",
            email: "rithanv78@gmail.com",
            phone: "9025033891",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-11": {
      title: "",
      description:
        "'Value Addition in Millet': Millets are highly nutritious, climate-resilient grains that offer immense potential for health benefits and economic growth. This workshop aims to explore innovative ways to enhance the value of millets through processing, product development, and marketing strategies.",
      image: Workshop11,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Mr. S. Nithishkumar, AP/FT",
            email: "nithishkumar@ksrct.ac.in",
            phone: "8973333396",
          },
        ],
        studentCoordinator: [
          {
            name: "Pugazh Vendhan R, III Year/FT",
            phone: "7550348891",
            email: "vendhanpugazh0@gmail.com",
          },
          {
            name: "Shahana B, II Year/FT",
            phone: "7418883634",
            email: "shahanabhaskaran041@gmail.com",
          },
          {
            name: "Santhosh S, II Year/FT",
            phone: "7305844895",
            email: "santhoshhaterz05@gmail.com",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-12": {
      title:
        "Design and development of automotive Product By Mr.K.Santhosh Kumar, Support Manger, Macbro Technology Pvt Ltd, Erode.",
      description:
        "The Design and Development of Automotive Products is a comprehensive process that combines innovation, engineering, and cutting-edge technology to create high-performance vehicles and components. From conceptualization and prototyping to testing and manufacturing, this process ensures safety, efficiency, and sustainability in automotive solutions. Engineers and designers work collaboratively to optimize aerodynamics, materials, and electronic systems, integrating advanced technologies like AI, IoT, and automation. Whether developing electric vehicles, smart mobility solutions, or high-performance car components, this field plays a crucial role in shaping the future of transportation. ",
      image: Workshop12,
      schedule: [
        {
          round: "Round",
          date: "March 28, 2026",
          time: "9:00 AM to 3:00 PM",
          location: "Idea lab,Main Block",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.K.Raja",
            email: "rajak@ksrct.ac.in",
            phone: "9842314481",
          },
        ],
        studentCoordinator: [
          {
            name: "Lingeshwaran S L",
            email: "lingeshwaransl04@gmail.com",
            phone: "8012439250",
          },
          {
            name: "Raghunath E",
            email: "raghunath10091@gmail.com",
            phone: "8248732445",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-13": {
      title:
        "Building Information Modeling (BIM) By ICT Academy, Chennai, Tamil Nadu",
      description:
        "The Building Information Modeling (BIM) workshop aims to introduce participants to the fundamentals of BIM technology and its applications in the construction industry. Participants will gain hands-on experience with BIM software tools and learn how to effectively utilize BIM for project planning, design, construction, and management. The Workshop “BIM in structural Design Development’ focused on enhancing architectural design skills through hands-on activities and software training. Participants utilized BIM Revit Architecture software to create 3D plans, elevations, and views. The workshop featured a building plan as exercise and emphasized innovation and creativity in design solutions. Mentors provided guidance and feedback throughout the workshop to refine participants, architectural concepts. Overall, the Workshop inspired participants to push the boundaries of architectural design and pursue excellence in their craft.",
      image: Workshop13,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr. S. Gunasekar",
            email: "gunasekar@ksrct.ac.in",
            phone: "9976876238",
          },
        ],
        studentCoordinator: [
          {
            name: "B. Susimitha",
            email: "bsusimitha18@gmail.com",
            phone: "6374735128",
          },
          {
            name: "S. Suja",
            email: "sujavishalini234@gmail.com",
            phone: "9500534225",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
    "workshop-14": {
      title:
        "Medi Tex By Mr.T.Sureshram, Proprietor Care 4 U India Pvt, Ltd.,Tirupur",
      description:
        "The Medi-Tex Workshop is a valuable opportunity for students, researchers, and professionals in textile technology to explore advancements in medical textiles. This workshop will cover key topics such as smart textiles for healthcare, antibacterial fabrics, wound care materials, compression garments, and innovations in bio-textiles. Experts from the industry and academia will provide insights into material selection, fabrication techniques, and applications in medical fields. Participants will gain hands-on experience, engage in discussions on sustainability and regulations, and network with professionals. This workshop is ideal for those looking to enhance their knowledge and explore career opportunities in the growing field of medical textiles.",
      image: Workshop14,
      schedule: [
        {
          round: "Round ",
          date: "March 29, 2026",
          time: "2:00 PM to 3:00 PM",
          location: "Textile chemical processing laboratory,Textile Block ",
        },
      ],
      contact: {
        facultyCoordinator: [
          {
            name: "Dr.K.R.Nanadagopal AP/Textile ",
            email: "nandagopakr@ksrct.ac.in",
            phone: "9003436705",
          },
          {
            name: "Mr.G.Devanand, AP / Textile",
            email: "devanandg@ksrct.ac.in ",
            phone: "9952841869",
          },
        ],
        studentCoordinator: [
          {
            name: "Akshaya , 3rd  /Textile ",
            email: "akshayasrini007@gmail.com",
            phone: "7871969769",
          },
          {
            name: "R.Hiruthik , 2nd /Textile ",
            email: "hiruthik4463@gmail.com",
            phone: "9965227394",
          },
        ],
      },
      registrationLink: "https://forms.gle/JzY7C819nFQnmC2D9", // Registration link
    },
  };

  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const ScrollAnimation = ({ children }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  const event = eventDetails[eventId];

  if (!event) {
    return (
      <div className="text-center text-3xl font-bold mt-24">
        Event not found!
      </div>
    );
  }

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

  const isTechnicalOrNonTechnical =
    eventId.startsWith("technical-event") ||
    eventId.startsWith("non-technical-event");
  const isCultural = eventId.startsWith("culturals-event");

  let registrationFee = "";
  if (eventId === "culturals-event-3") {
    registrationFee = "Rs. 600";
  } else if (eventId === "technical-event-3") {
    registrationFee = "Rs. 300";
  } else if (eventId === "technical-event-17") {
    registrationFee = "Rs. 300";
  } else if (eventId === "technical-event-8") {
    registrationFee = "Rs. 300";
  } else if (eventId === "technical-event-10") {
    registrationFee = "Rs. 250";
  } else if (eventId === "technical-event-1") {
    registrationFee = "Rs. 250";
  } else if (eventId === "technical-event-20") {
    registrationFee = "Rs. 300";
  } else if (eventId === "technical-event-17") {
    registrationFee = "Rs. 300";
  } else if (eventId === "technical-event-19") {
    registrationFee = "Rs. 300";
  } else if (eventId.startsWith("technical-event")) {
    registrationFee = "Rs. 250";
  } else if (eventId.startsWith("culturals")) {
    registrationFee = "Rs. 150";
  } else if (eventId.startsWith("workshop")) {
    registrationFee = "Rs. 300";
  } else if (eventId.startsWith("non-technical-event")) {
    registrationFee = "Rs. 150";
  }

  return (
    <div className="p-4 md:p-10 mt-24 text-white min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-sky-700 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <div className="max-w-4xl mx-auto text-white p-4 md:p-6">
        <ScrollAnimation>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-[#9DD3FF]">
            {event.title}
          </h1>
        </ScrollAnimation>

        {/* Display Registration Fee */}
        {registrationFee && (
          <div className="text-center text-primary text-xl md:text-2xl font-semibold mb-4">
            Registration Fee: {registrationFee}
          </div>
        )}

        {/* Register Now Button */}
        <motion.button
          className="mb-8 w-60 ml-12 md:w-auto block md:ml-[310px] px-6 py-3 bg-primary clip bg-opacity-70 border-2 border-primary-dark hover:bg-primary-dark transition-all text-white font-semibold text-xl md:text-2xl shadow-xl"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.9 }}
          variants={pulseAnimation} // Infinite pulsing animation
          animate="animate" // Ensure the animation is always running
          onClick={() => window.open(event.registrationLink, "_blank")} // Open registration link in a new tab
        >
          REGISTER NOW!
        </motion.button>
        <motion.button
          className="mb-8 w-60 md:w-auto block mx-auto px-5 py-2 border-2 border-primary-dark hover:bg-primary-dark transition-all text-primary font-semibold text-lg md:text-lg shadow-xl"
          variants={pulseAnimation} // Infinite pulsing animation
          animate="animate" // Ensure the animation is always running
          onClick={() => navigate("/accomodation")}
        >
          Registration For Accommodation & Food
        </motion.button>
        <ScrollAnimation>
          <div className="border border-primary-dark p-2">
            <div className="text-center border border-primary-dark clip-bottom-right flex flex-col gap-4 p-4 md:p-10 items-center bg-primary-dark/20">
              <p className="font-semibold text-2xl md:text-3xl text-primary border border-primary-dark px-3 py-3">
                Description
              </p>
              <img
                src={event.image}
                alt={event.title}
                className="w-40 h-40 md:w-96 md:h-96 object-cover mb-4 shadow-md"
              />
              <p className="text-lg md:text-xl text-justify mb-4 text-primary">
                {event.description}
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {isTechnicalOrNonTechnical && (
          <>
            <ScrollAnimation>
              <div className="flex flex-col md:flex-row justify-between my-10 gap-4">
                {["Description", "Rounds", "Rules", "Schedule", "Contact"].map(
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
                      }}
                    >
                      <h1 className="bg-primary-dark cursor-default px-4 md:px-10 py-3 text-primary bg-opacity-80 clip-bottom-right-2">
                        {item}
                      </h1>
                    </motion.div>
                  )
                )}
              </div>
            </ScrollAnimation>

            {/* Rounds Section */}
            <ScrollAnimation>
              <div className="border border-primary-dark p-2" id="Rounds">
                <div className="border border-primary-dark shadow-lg p-4 md:p-10">
                  <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
                    Rounds
                  </h2>
                  <div className="flex flex-col gap-7">
                    {event.rounds.map((round, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col gap-3"
                        variants={itemVariants}
                      >
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
                          <p className="text-lg md:text-xl text-justify text-primary">
                            {round.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Rules Section */}
            <ScrollAnimation>
              <div className="border border-primary-dark p-2 mt-6" id="Rules">
                <div className="bg-primary-dark/30 shadow-lg p-4 md:p-10">
                  <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary bg-inherit border border-primary-dark px-3 py-3">
                    Rules
                  </h2>
                  <ul className="list-disc pl-6 text-lg text-justify md:text-xl text-primary">
                    {event.rules.map((rule, index) => (
                      <motion.li key={index} variants={itemVariants}>
                        {rule}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          </>
        )}

        {isCultural && (
          <>
            <ScrollAnimation>
              <div className="flex flex-col md:flex-row justify-between my-10 gap-4">
                {["Description", "Rules", "Schedule", "Contact"].map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      className="border-2 border-primary-dark p-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <h1 className="bg-primary-dark px-4 md:px-10 py-3 text-primary bg-opacity-80 clip-bottom-right-2">
                        {item}
                      </h1>
                    </motion.div>
                  )
                )}
              </div>
            </ScrollAnimation>

            {/* Rules Section */}
            <ScrollAnimation>
              <div className="border border-primary-dark p-2 mt-6" id="Rules">
                <div className="bg-primary-dark/30 shadow-lg p-4 md:p-10">
                  <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-primary border border-primary-dark px-3 py-3">
                    Rules
                  </h2>
                  {event.rules && event.rules.length > 0 ? (
                    <ul className="list-disc pl-6 text-lg md:text-xl text-primary">
                      {event.rules.map((rule, index) => (
                        <motion.li key={index} variants={itemVariants}>
                          {rule}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 text-center">
                      No rules available.
                    </p>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          </>
        )}

        {/* Schedule Section */}
        <div className="border border-primary-dark p-2 mt-6" id="Schedule">
          <div className="p-4 md:p-10">
            <h2 className="text-2xl md:text-3xl text-center font-semibold mb-8 text-primary border border-primary-dark bg-primary-dark/30 px-3 py-3">
              Schedule
            </h2>

            {event?.schedule?.length > 0 ? (
              event.schedule.map((schedule, index) => (
                <motion.div
                  key={index}
                  className="border-gray-300 pb-2 mb-2"
                  variants={itemVariants}
                >
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
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
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
                </motion.div>
              ))
            ) : (
              <p className="text-gray-300 text-center">
                No schedule available.
              </p>
            )}
          </div>
        </div>
        {/* Contact Section */}
        <ScrollAnimation>
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
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default EventDetails;


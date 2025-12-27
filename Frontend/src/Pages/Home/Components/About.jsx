import React from "react";
import college from "../../../assets/college.png";
import logo from "../../../assets/logo1.png";
import startupLogo from "../../../assets/startup/logo.png";

function About() {
  return (
    <>
      {/* Mobile View (up to md breakpoint) and Desktop Heading */}
      <div className="mt-10 md:mt-8">
        <p
          className="text-3xl sm:text-5xl md:text-7xl text-secondary font-semibold text-center font-orbitron"
          data-aos="fade-down"
        >
          About Us
        </p>

        {/* Mobile View for KSRCT */}
        <div className="flex flex-col md:hidden mx-4 sm:mx-8 md:mx-16 lg:mx-28 mt-6 sm:mt-12 md:mt-16 justify-center items-center gap-4 sm:gap-8 md:gap-12">
          <div
            className="w-full border-2 border-primary-dark p-2 sm:p-3 md:p-4 h-full"
            data-aos="fade-right"
          >
            <img
              className="w-full md:w-1/2 max-w-[500px] border-2 border-primary-dark p-2 sm:p-3 md:p-4"
              src={college}
              alt="KSRCT Campus"
              data-aos="fade-left"
            />
            <div className="h-auto bg-primary-dark bg-opacity-50 p-3 sm:p-6 md:p-8 relative">
              <p className="absolute px-3 sm:px-6 md:px-8 py-1 sm:py-3 top-0 left-0 text-base sm:text-xl md:text-2xl font-orbitron text-white bg-secondary bg-opacity-80">
                K.S.Rangasamy College of Technology
              </p>
              <p className="text-primary font-poppins leading-5 sm:leading-7 mt-10 sm:mt-14 md:mt-16 text-justify text-xs sm:text-base md:text-lg">
                K.S.Rangasamy College of Technology (KSRCT) was started in 1994.
                Located near Tiruchengode, Tamil Nadu, it offers quality
                technical education with 14 U.G., 11 P.G. and 12 Ph.D. programs.
                Approved by AICTE and affiliated with Anna University, Chennai,
                KSRCT has Autonomous status from UGC. It ranked 99th in NIRF
                2017 and 51-100 band in NIRF Innovation Ranking 2023 for
                Engineering. Accredited with NAAC A++ grade and NBA Tier 1
                departments, it features modern infrastructure including
                AICTE-IDEA Lab, ATAL Community Innovation Centre, and MSME
                incubation centre. With NTTM funding of 6.5 crore rupees, it
                fosters cutting-edge research and collaborates with DST, DBT,
                DAE, CSIR, DRDO, and ISRO.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View for KSRCT */}
        <div className="hidden md:flex mx-28 mt-16 justify-center items-center gap-12">
          <div
            className="w-3/5 border-2 border-primary-dark p-3 h-full"
            data-aos="fade-right"
          >
            <div
              className="h-auto w-full bg-primary-dark bg-opacity-50 p-8 relative clip-bottom-right"
              data-aos="fade-right"
            >
              <p className="absolute px-8 pr-12 py-3 top-0 left-0 text-2xl clip-path-slant-right font-orbitron text-white bg-secondary bg-opacity-80">
                K.S.Rangasamy College of Technology
              </p>
              <p className="text-primary font-poppins leading-6 mt-16 text-justify">
                {/* Your paragraph content */}
                K.S.Rangasamy College of Technology (KSRCT) was started in 1994.
                Located near Tiruchengode, Tamil Nadu, it offers quality
                technical education with 14 U.G., 11 P.G. and 12 Ph.D. programs.
                Approved by AICTE and affiliated with Anna University, Chennai,
                KSRCT has Autonomous status from UGC. It ranked 99th in NIRF
                2017 and 51-100 band in NIRF Innovation Ranking 2023 for
                Engineering. Accredited with NAAC A++ grade and NBA Tier 1
                departments, it features modern infrastructure including
                AICTE-IDEA Lab, ATAL Community Innovation Centre, and MSME
                incubation centre. With NTTM funding of 6.5 crore rupees, it
                fosters cutting-edge research and collaborates with DST, DBT,
                DAE, CSIR, DRDO, and ISRO.
              </p>
            </div>
          </div>
          <img
            className="w-2/5 border-2 border-primary-dark p-3"
            src={college}
            alt="KSRCT Campus"
            data-aos="fade-left"
          />
        </div>
      </div>

      {/* Mobile View for Dakshaa T26 */}
      <div className="my-10 sm:my-20 md:my-28">
        <div className="flex flex-col md:hidden mx-4 sm:mx-8 md:mx-16 lg:mx-28 mt-6 sm:mt-12 md:mt-16 justify-center items-center gap-4 sm:gap-8 md:gap-12">
          <div
            className="w-full border-2 border-primary-dark p-4 sm:p-5 md:p-6 h-full"
            data-aos="fade-right"
          >
            <img
              className="w-full md:w-2/3 max-w-[600px] mx-auto"
              src={logo}
              alt="Dakshaa T26 Logo"
              data-aos="fade-left"
            />
            <div className="h-auto bg-primary-dark bg-opacity-50 p-3 sm:p-6 md:p-8 relative">
              <p className="absolute px-3 sm:px-6 md:px-8 py-1 sm:py-3 top-0 left-0 text-base sm:text-xl md:text-2xl font-poppins text-white bg-sky-500 bg-opacity-70">
                Dakshaa T26
              </p>
              <p className="text-sky-400 font-poppins leading-5 sm:leading-7 mt-10 sm:mt-14 md:mt-16 text-justify text-xs sm:text-base md:text-lg pb-4 sm:pb-8 md:pb-10">
                DaKshaa T26 is a premier National Level Techno-Cultural Fest
                that brings together innovation, creativity, and talent under
                one grand stage. Designed to foster technical excellence and
                artistic expression, this fest serves as a vibrant platform for
                students and professionals across the country to showcase their
                skills, exchange ideas, and compete at the highest level. With a
                perfect blend of technology, culture, and entertainment, DaKshaa
                T26 features an array of events, including technical challenges,
                hackathons, workshops, cultural performances, and interactive
                sessions with industry experts. Whether you're a tech enthusiast
                eager to dive into the latest advancements or an artist looking
                to mesmerize the audience, DaKshaa T26 has something for
                everyone. Join us as we celebrate innovation, embrace
                creativity, and redefine excellence at one of the most awaited
                techno-cultural festivals in the country!
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View for Dakshaa T26 */}
        <div className="hidden md:flex flex-row-reverse mx-28 mt-16 justify-center items-center gap-12">
          <div
            className="w-3/5 border-2 border-primary-dark p-3 h-full"
            data-aos="fade-right"
          >
            <div className="h-auto w-full bg-primary-dark bg-opacity-50 p-8 relative clip-bottom-left">
              <p className="absolute px-8 pr-12 py-3 top-0 left-0 text-2xl clip-path-slant-right font-poppins text-white bg-sky-500 bg-opacity-70">
                Dakshaa T26
              </p>
              <p className="text-sky-400 font-poppins leading-6 mt-16 text-justify pb-6">
                DaKshaa T26 is a premier National Level Techno-Cultural Fest
                that brings together innovation, creativity, and talent under
                one grand stage. Designed to foster technical excellence and
                artistic expression, this fest serves as a vibrant platform for
                students and professionals across the country to showcase their
                skills, exchange ideas, and compete at the highest level. With a
                perfect blend of technology, culture, and entertainment, DaKshaa
                T26 features an array of events, including technical challenges,
                hackathons, workshops, cultural performances, and interactive
                sessions with industry experts. Whether you're a tech enthusiast
                eager to dive into the latest advancements or an artist looking
                to mesmerize the audience, DaKshaa T26 has something for
                everyone. Join us as we celebrate innovation, embrace
                creativity, and redefine excellence at one of the most awaited
                techno-cultural festivals in the country!
              </p>
            </div>
          </div>
          <img
            className="w-1/2"
            src={logo}
            alt="Dakshaa T26 Logo"
            data-aos="fade-left"
          />
        </div>

        {/* Mobile View for Startup TN */}
        <div className="my-10 sm:my-20 md:my-28">
          <div className="flex flex-col md:hidden mx-4 sm:mx-8 md:mx-16 lg:mx-28 mt-6 sm:mt-12 md:mt-16 justify-center items-center gap-4 sm:gap-8 md:gap-12">
            <div
              className="w-full border-2 border-primary-dark p-4 sm:p-5 md:p-6 h-full"
              data-aos="fade-right"
            >
              <img
                className="w-full md:w-2/3 max-w-[600px] mx-auto bg-white p-4"
                src={startupLogo}
                alt="Startup TN Logo"
                data-aos="fade-left"
              />
              <div className="h-auto bg-primary-dark bg-opacity-50 p-3 sm:p-6 md:p-8 relative">
                <p className="absolute px-3 sm:px-6 md:px-8 py-1 sm:py-3 top-0 left-0 text-base sm:text-xl md:text-2xl font-poppins text-white bg-sky-500 bg-opacity-70">
                  StartupTN
                </p>
                <p className="text-sky-400 font-poppins leading-5 sm:leading-7 mt-10 sm:mt-14 md:mt-16 text-justify text-xs sm:text-base md:text-lg pb-4 sm:pb-8 md:pb-10">
                  StartupTN, in collaboration with K.S. Rangasamy College of
                  Technology, proudly presents the Idea Elevator Pitching
                  Contest as part of DaKshaa T26. This prestigious event serves
                  as a dynamic platform for aspiring students to showcase their
                  groundbreaking ideas in a fast-paced and impactful setting. As
                  a parallel session of the Global Startup Meet, the contest
                  brings together visionary minds, industry leaders, and
                  investors, fostering an environment of innovation,
                  collaboration, and entrepreneurial excellence. Participants
                  will have the opportunity to pitch their ideas, receive
                  valuable insights from experts, and gain exposure to potential
                  funding and mentorship opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View for TN Startup */}
        <div className="hidden md:flex flex-row-reverse mx-28 mt-16 justify-center items-center gap-12">
          <img
            className="w-1/2 bg-white p-4"
            src={startupLogo}
            alt="Startup TN Logo"
            data-aos="fade-left"
          />
          <div
            className="w-3/5 border-2 border-primary-dark p-3 h-full"
            data-aos="fade-right"
          >
            <div className="h-auto w-full bg-primary-dark bg-opacity-50 p-8 relative clip-bottom-left">
              <p className="absolute px-8 pr-12 py-3 top-0 left-0 text-2xl clip-path-slant-right font-poppins text-white bg-sky-500 bg-opacity-70">
                StartupTN
              </p>
              <p className="text-sky-400 font-poppins leading-6 mt-16 text-justify pb-6">
                StartupTN, in collaboration with K.S. Rangasamy College of
                Technology, proudly presents the Idea Elevator Pitching Contest
                as part of DaKshaa T26. This prestigious event serves as a
                dynamic platform for aspiring students to showcase their
                groundbreaking ideas in a fast-paced and impactful setting. As a
                parallel session of the Global Startup Meet, the contest brings
                together visionary minds, industry leaders, and investors,
                fostering an environment of innovation, collaboration, and
                entrepreneurial excellence. Participants will have the
                opportunity to pitch their ideas, receive valuable insights from
                experts, and gain exposure to potential funding and mentorship
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

import { Globe } from "../components/Globe";
import React, { useRef } from "react";
import Card from "../components/Card";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks.jsx";
// import { Particles } from "../components/Particles";
import { motion } from "framer-motion";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Stagger delay between each card
    },
  },
};

const cardFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, duration: 0.8 },
  },
};

const cardFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, duration: 0.8 },
  },
};

const About = () => {
  const tiltRef1 = useRef();
  const tiltRef2 = useRef();
  const tiltRef3 = useRef();
  const tiltRef4 = useRef();
  const tiltRef5 = useRef();
  const grid2Container = useRef();

  return (
    <section id="about" className="c-space section-spacing">
      <h2 className="text-heading">About Me </h2>

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: false, // 👈 Ensures it can run again
          amount: 0.1, // 👈 Lower amount makes it trigger faster
          margin: "-100px 0px -100px 0px", // 👈 Forces the section to be 'out of view' when it's sufficiently off-screen
        }} // Animation runs once when 20% visible
      >
        {/* Grid 1:  */}
        <motion.div
          ref={tiltRef1}
          className="grid-1 tilt-hover relative p-6 rounded-3xl overflow-hidden md:col-span-2 md:row-span-2"
          variants={cardFromLeft}
        >
          {/* <Particles
            className="absolute inset-0 -z-50"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
          /> */}
          <div className="flex items-start space-x-6">
            <div className="relative flex-shrink-0">
              <img
                src="assets/aboutImage.png"
                alt="Mansi Avatar"
                className="size-30 rounded-full object-cover border-4 border-gray-400 shadow-xl ring-2 ring-gray-500"
              />
            </div>

            <div className="pt-4 flex-grow">
              <p className="text-white text-sm font-semibold mb-4">
                I'm a Full Stack Developer
              </p>

              <div className="grid grid-cols-1 gap-y-1 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <img
                    src="/assets/university.png"
                    alt="Resume icon"
                    className="w-5 h-5 opacity-70"
                  />
                  <span>Dr. A. P. J. Abdul Kalam Technical University</span>
                </div>

                {/* Resume Row */}
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src="/assets/resume.png"
                    alt="Resume icon"
                    className="w-5 h-5 opacity-70"
                  />

                  <span className="text-sm text-gray-400">Resume</span>

                  <a
                    href="/assets/Mansi(Resume).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 group"
                  >
                    <span className="text-sm text-gray-500 group-hover:text-gray-300 transition">
                      View
                    </span>

                    <span className="text-gray-500 group-hover:text-gray-300 transition-transform duration-300 group-hover:translate-x-[2px]">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-700/50">
            <p className="text-gray-100 text-sm mt-2">
              Full Stack Developer crafting scalable, high-performance web applications that seamlessly blend intuitive design with robust functionality. Passionate about writing clean, maintainable code and delivering exceptional digital experiences that create real-world impact.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <h3 className="text-gray-100 text-lg  mb-3">Connect with me</h3>{" "}
            {/* Reduced mb-4 to mb-3 */}
            <div className="space-y-3 mb-0">
              {" "}
              <a
                href="https://www.linkedin.com/in/mansi-saini-852456327?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-gray hover:text-blue-400 transition-colors duration-300 group"
              >
                <img
                  src="socials/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6 group-hover:scale-105 transition-transform"
                />

                <span className="text-lg ">Mansi Saini</span>
                <span className="ml-auto text-gray group-hover:text-blue-400">
                  ↗
                </span>
              </a>
              {/* GitHub Link */}
              <a
                href="https://github.com/mansiisainii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-white hover:text-purple-400 transition-colors duration-300 group"
              >
                <img
                  src="assets/logos/social.png"
                  alt="GitHub"
                  className="w-6 h-6 group-hover:scale-105 transition-transform"
                />
                <span className="text-lg ">mansiisainii</span>
                <span className="ml-auto text-gray-00 group-hover:text-purple-400">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Grid 2:  */}
        <motion.div
          ref={tiltRef2}
          className="grid-black-color  grid-2"
          variants={cardFromRight}
        >
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>

            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="Database"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "60%", left: "45%" }}
              text="Frontend"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Backend"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="UI/UX"
              containerRef={grid2Container}
            />

          </div>
        </motion.div>

        {/* Grid 3: */}
        <motion.div
          ref={tiltRef3}
          className="grid-black-color grid-3 relative overflow-hidden cursor-pointer flex flex-col justify-center items-center text-center group" 
          variants={cardFromRight}
          onClick={() => window.open('https://cp.certmetrics.com/amazon/en/public/verify/credential/1ae777a4c2054a96ab837bc11a4a2612', '_blank')}
        >
          <div className="z-10 w-full px-6 flex flex-col items-center justify-center">
            <img 
              src="https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/aws-certified-cloud-practitioner.png" 
              alt="AWS Certified" 
              className="w-24 h-24 mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <p className="headtext text-xl text-white">AWS Certified</p>
            <p className="subtext mt-2 text-sm text-gray-400">
              Credential ID: <span className="font-mono text-gray-300">1ae777a4c2054a96ab837bc11a4a2612</span>
            </p>
            <p className="mt-3 text-sm text-blue-400 group-hover:text-blue-300 flex items-center justify-center gap-1 transition-colors">
              Verify Credential ↗
            </p>
          </div>
        </motion.div>

        {/* Grid 4: */}
        <motion.div
          ref={tiltRef4}
          className="grid-black-color grid-4 "
          variants={cardFromLeft}
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start the project together?
            </p>
            <CopyEmailButton />
          </div>
        </motion.div>

        {/* Grid 5: */}
        <motion.div
          ref={tiltRef5}
          className="grid-black-color grid-5 "
          variants={cardFromRight}
        >
          <div className="z-10 w-[50%] ">
            <p className="headtext">Stack & Skills</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks and tools that
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

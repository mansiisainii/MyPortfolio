// // import { useState } from "react";
// import Project from "../components/Project";
// import { myProjects } from "../constants";
// import { useState } from "react";
// import { motion, useMotionValue } from "framer-motion"; // Ensure you import from 'framer-motion'
// import { useSpring } from "framer-motion";
// // 1. Define the variants for a single item coming from the left
// const cardFromLeft = {
//   initial: { x: -100, opacity: 0 },
//   animate: {
//     x: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 50, duration: 0.8 },
//   },
// };

// // 2. Define the container variants to stagger the items
// const containerVariants = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1, // Stagger delay between each project
//     },
//   },
// };

// const Projects = () => {
//   // ... (Hooks and Handlers remain the same) ...
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const springX = useSpring(x, { damping: 10, stiffness: 50 });
//   const springY = useSpring(y, { damping: 10, stiffness: 50 });
  
//   const handleMouseMove = (e) => {
//     x.set(e.clientX + 20);
//     y.set(e.clientY + 20);
//   };
  
//   const [preview, setPreview] = useState(null);

//   return (
//     <section 
//       id="projects"
//       onMouseMove={handleMouseMove}
//       className="relative c-space section-spacing" 
//     >
//       <h2 className="text-heading">My Selected Projects</h2>
//       <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
//       <motion.div
//         variants={containerVariants}
//         initial="initial"
//         whileInView="animate"
//         // ⚠️ THE CRITICAL CHANGE IS HERE ⚠️
//         viewport={{ 
//           once: false, // <-- Set to false to allow re-running the animation
//           amount: 0.2 // Trigger when 20% of the container is visible
//         }} 
//       >

//         {myProjects.map((project) => (
//           <motion.div key={project.id} variants={cardFromLeft}>
//             <Project {...project} setPreview={setPreview} />
//             {/* <Project {...project}/> */}
//           </motion.div>
//         ))}
//       </motion.div>

//       {preview && (
//         <motion.img
//           className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
//           src={preview}
//           style={{ x: springX, y: springY }}
//         />
//       )}
      
//     </section>
//   );
// };

// export default Projects;


import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { myProjects } from "../constants/index";

const Projects = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Calculate scroll amount based on card width
  const scrollAmount = () => {
    if (!scrollRef.current) return 350;
    const cardWidth = scrollRef.current.firstChild.offsetWidth + 24;
    return cardWidth;
  };

  // LOOPING NEXT SCROLL
  const scrollNext = () => {
    if (!scrollRef.current) return;

    const scroller = scrollRef.current;
    const cardWidth = scrollAmount();
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    // If at last → go to first
    if (scroller.scrollLeft + 5 >= maxScrollLeft) {
      scroller.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scroller.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };



  // Auto-scroll ONLY on mobile + tablet
  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024;
    if (!isMobileOrTablet) return;

    let interval;

    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (!isHovering && !isUserInteracting) {
          scrollNext();
        }
      }, 3000);
    };

    startAutoScroll();
    return () => clearInterval(interval);
  }, [isHovering, isUserInteracting]);

  // Detect user manual scroll (pause auto-scroll)
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const handleUserScroll = () => {
      setIsUserInteracting(true);

      clearTimeout(scroller.resumeTimeout);
      scroller.resumeTimeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 4000);
    };

    scroller.addEventListener("scroll", handleUserScroll);
    return () => scroller.removeEventListener("scroll", handleUserScroll);
  }, []);

  // Update pagination dots
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const cardWidth = scrollAmount();
    const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  // Click dot → go to specific slide
  const goToSlide = (index) => {
    const cardWidth = scrollAmount();

    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      id="projects"
      className="py-24 px-4 relative w-full"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* HEADING */}
        <h2 className="text-heading text-white">Projects</h2>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-6 h-[1px] w-full" />

        {/* MAIN WRAPPER */}
        <div className="relative mt-12 flex flex-col items-center w-full">

          {/* SCROLLABLE ROW */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 overflow-x-auto scroll-smooth 
              snap-x snap-mandatory scrollbar-hide w-full
            "
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {myProjects.map((project, index) => (
              <div
                key={index}
                className="
                  snap-start 
                  min-w-[85%] 
                  sm:min-w-[50%] 
                  lg:min-w-[30%] 

                  bg-black/60 
                  border border-neutral-800
                  rounded-xl 
                  overflow-hidden
                  shadow-lg

                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                "
              >
                
                {/* IMAGE */}
                <div className="h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mt-1 mb-3">
                    {project.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${index}-${tagIndex}`}
                        className="
                          px-2 py-1 text-xs font-medium 
                          border border-white/10 
                          rounded-full 
                          bg-black/40 
                          text-white/70
                        "
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-2">
                    <a
                      href={project.href}
                      target="_blank"
                      className="
                        p-2 bg-black/60 rounded-full 
                        hover:bg-primary/70 transition text-white
                      "
                    >
                      <ExternalLink size={16} />
                    </a>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="
                          p-2 bg-black/60 rounded-full 
                          hover:bg-primary/70 transition text-white
                        "
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        

          {/* PAGINATION DOTS */}
          <div className="flex gap-3 mt-6">
            {myProjects.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full cursor-pointer transition-all 
                  ${activeIndex === index ? "bg-white" : "bg-white/40"}
                `}
              ></div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            className="
              cosmic-button w-fit flex items-center mx-auto 
              gap-2 text-white/80 hover:text-white transition
            "
            target="_blank"
            href="https://github.com/mansiisainii"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;

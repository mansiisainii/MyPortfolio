import React, { useState, useRef, useMemo } from "react";
// Import motion and useInView from framer-motion
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

// --- Animation Variants ---
const slideUpVariant = {
  initial: { y: 100, opacity: 0 }, // Start 100px below and invisible
  animate: {
    y: 0, // Slide to final position
    opacity: 1,
    transition: { type: "spring", stiffness: 50, duration: 0.8 },
  },
};

const Contact = () => {
  // 🔑 ANIMATION RESET LOGIC SETUP 🔑
  const contactRef = useRef(null);

  // Use useInView to detect if the section is on screen.
  const isInView = useInView(contactRef, {
    // Use negative margin to ensure the animation resets quickly when scrolled past
    margin: "-100px 0px -100px 0px",
    once: false, // This is crucial for constant visibility tracking
  });

  // Dynamic key: Forces the motion.div to unmount/remount (and reset state)
  // every time isInView changes.
  const animationKey = useMemo(
    () => (isInView ? "contact-visible" : "contact-hidden"),
    [isInView]
  );

  // --- Form Logic (Remains the same) ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);
      await emailjs.send(
        "service_e8l7v8e",
        "template_u6h4dsi",
        {
          from_name: formData.name,
          to_name: "Mansi Saini",
          from_email: formData.email,
          to_email: "mansiisaini29@gmail.com",
          message: formData.message,
        },
        "Q8O_VPJoBQxXX9_S5"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  // --- Render ---
  return (
    <section
      id="contact"
      ref={contactRef} // 1. Attach the ref to the section
      className="relative flex items-center c-space section-spacing pb-20"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* 2. motion.div wraps the content and controls the animation */}
      <motion.div
        key={animationKey} // 3. Dynamic key forces reset on re-entry
        variants={slideUpVariant}
        initial="initial"
        animate={isInView ? "animate" : "initial"} // 4. Animate when in view
        className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary"
      >
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Form Fields... */}
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Your Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="Your Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // NEW CLASSES: Gradient uses high-contrast Orange, Pink, and Cyan/Teal
            className="relative w-full py-3 text-lg font-semibold text-white rounded-xl 
               bg-gradient-to-r to-cyan-950 
               transition-all duration-300 hover:scale-[1.02] 
               hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] focus:outline-none 
               disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;

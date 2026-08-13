import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
// import LogoSection from "./sections/LogoSection"

function App() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      {/* <LogoSection/> */}
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

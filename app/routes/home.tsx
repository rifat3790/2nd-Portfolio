import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Background3D from "../components/Background3D";
import Preloader from "../components/Preloader";
import AOS from "aos";
import "aos/dist/aos.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MD. REFAYET HOSSEN | Full Stack Developer" },
    { name: "description", content: "Portfolio of MD. Refayet Hossen, a passionate Full Stack Developer." },
  ];
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS Animation Library globally
    AOS.init({
      once: false,
      offset: 50,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
      AOS.refresh(); // Refresh AOS after preloader completes
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      {/* 3D Background is ALWAYS visible, even during preloading */}
      <Background3D />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Main content fades in after preloading */}
      <main className={`relative z-10 min-h-screen transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        <div className="flex flex-col gap-8 md:gap-12">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </div>

        <Footer />
      </main>
    </>
  );
}

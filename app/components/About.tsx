import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-box",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10 overflow-hidden">
      <div className="text-center mb-16 relative" data-aos="fade-up" data-aos-duration="800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full z-[-1]"></div>
        <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-3 block">Discover</span>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          About <span className="text-gradient">Me</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Main Bio - Spans 2 cols */}
        <div className="bento-box glass-panel md:col-span-2 lg:col-span-2 row-span-2 flex flex-col justify-center bg-gradient-to-br from-white/60 to-white/30 dark:from-[#11131a]/90 dark:to-[#0a0a0f]/80 relative overflow-hidden group hover:border-cyan-500/50 p-8 md:p-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/15 rounded-full blur-[80px] -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
          
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 z-10 tracking-tight">
            Driven by <span className="text-cyan-600 dark:text-cyan-400">Excellence</span> & <br className="hidden md:block" /><span className="text-purple-600 dark:text-purple-400">Innovation</span>
          </h3>
          
          <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed z-10">
            <p>
              I am a passionate <strong className="text-cyan-600 dark:text-cyan-400 font-bold">Web Developer & Team Leader</strong> specializing in crafting modern, responsive, and highly interactive digital experiences. I have successfully completed my <strong className="font-semibold text-gray-900 dark:text-gray-100">B.Sc. in Computer Science & Engineering</strong> from Green University of Bangladesh.
            </p>
            <p>
              Currently, I am working at <strong className="font-semibold text-gray-900 dark:text-gray-100">Softvence Agency</strong>, guiding teams to build premium digital solutions. My expertise spans across the MERN stack, Next.js, and advanced styling using Tailwind CSS.
            </p>
            <p>
              I also possess deep experience in building high-converting e-commerce stores on <strong className="font-semibold text-gray-900 dark:text-gray-100">Shopify</strong> using Liquid, as well as developing custom CMS architectures with <strong className="font-semibold text-gray-900 dark:text-gray-100">Webflow</strong> and <strong className="font-semibold text-gray-900 dark:text-gray-100">Wix</strong>.
            </p>
          </div>
        </div>

        {/* Highlight Box 1 */}
        <div className="bento-box glass-panel md:col-span-1 lg:col-span-1 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-900/20 dark:to-gray-900/50 border-t-4 border-t-cyan-500 flex flex-col items-center justify-center text-center p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center mb-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
          </div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">150+</h3>
          <p className="text-sm font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">Projects Completed</p>
        </div>

        {/* Highlight Box 2 */}
        <div className="bento-box glass-panel md:col-span-1 lg:col-span-1 bg-gradient-to-bl from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900/50 border-t-4 border-t-purple-500 flex flex-col items-center justify-center text-center p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">98%</h3>
          <p className="text-sm font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">Happy Clients</p>
        </div>

        {/* Highlight Box 3 */}
        <div className="bento-box glass-panel md:col-span-1 lg:col-span-1 bg-gradient-to-tr from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900/50 border-t-4 border-t-blue-500 flex flex-col items-center justify-center text-center p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">2+</h3>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Years Experience</p>
        </div>

        {/* Highlight Box 4 (Wide) */}
        <div className="bento-box glass-panel md:col-span-2 lg:col-span-1 bg-gradient-to-tl from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-900/50 border-t-4 border-t-teal-500 flex flex-col items-center justify-center text-center p-8 group hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">Softvence</h3>
          <p className="text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Team Leader</p>
        </div>

      </div>
    </section>
  );
}

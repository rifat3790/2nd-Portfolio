import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Typewriter Effect Data
    const words = ["Full Stack Developer", "Team Leader", "Shopify Expert", "Webflow Developer"];
    let i = 0;
    let timer: NodeJS.Timeout;

    const typeWriter = () => {
      const el = document.getElementById("typewriter");
      if (el) {
        const word = words[i];
        let j = 0;
        let isDeleting = false;

        const type = () => {
          if (!isDeleting && j <= word.length) {
            el.innerHTML = word.substring(0, j);
            j++;
            timer = setTimeout(type, 100);
          } else if (isDeleting && j >= 0) {
            el.innerHTML = word.substring(0, j);
            j--;
            timer = setTimeout(type, 50);
          } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
              i = (i + 1) % words.length;
            }
            timer = setTimeout(type, isDeleting ? 2000 : 500);
          }
        };
        type();
      }
    };
    
    typeWriter();

    // Blinking cursor
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "steps(1)"
      });
    }

    // Main entrance animations
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(
        ".hero-text-elem",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Image entrance with float
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotationY: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            gsap.to(imageRef.current, {
              y: -20,
              repeat: -1,
              yoyo: true,
              duration: 3,
              ease: "sine.inOut"
            });
          }
        }
      );
    }, heroRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left Column - Text Content */}
        <div ref={textRef} className="space-y-6 lg:pr-10">
          <div className="hero-text-elem inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-800 dark:text-cyan-100 uppercase tracking-wider">Available for new projects</span>
          </div>
          
          <h1 className="hero-text-elem text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Hi, I'm <br />
            <span className="text-gradient">MD. Refayet</span>
          </h1>
          
          <div className="hero-text-elem text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 h-10">
            I am a <span id="typewriter" className="text-cyan-600 dark:text-cyan-400"></span>
            <span ref={cursorRef} className="text-cyan-600 dark:text-cyan-400">|</span>
          </div>
          
          <p className="hero-text-elem text-gray-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
            Leading teams and building premium, high-performance web applications. Over 150+ successful projects delivered with a 98% client satisfaction rate across Shopify, Webflow, and modern MERN architectures.
          </p>
          
          <div className="hero-text-elem flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="btn-primary group">
              View My Work
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
            <a href="/resume.pdf" download="MD_Refayet_Hossen_Resume.pdf" className="btn-outline group flex items-center gap-2 border-cyan-500/50 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white dark:hover:text-white">
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download Resume
            </a>
          </div>

          <div className="hero-text-elem flex gap-6 pt-6 items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-950 bg-gray-800 flex items-center justify-center overflow-hidden z-10" style={{ zIndex: 10 - i }}>
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">150+ Happy Clients</span>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div ref={imageRef} className="relative w-72 h-72 md:w-96 md:h-96 z-10 flex items-center justify-center">
            
            {/* Glowing Morphing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 blur-2xl opacity-50 animate-pulse morph-shape scale-110"></div>
            
            {/* Animated SVG Ring */}
            <div className="absolute inset-0 z-0 animate-[spin_15s_linear_infinite] opacity-50 dark:opacity-30">
              <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-500" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6">
                <circle cx="100" cy="100" r="95" />
              </svg>
            </div>
            
            {/* Image Container */}
            <div className="absolute inset-2 border-4 border-white/30 dark:border-white/10 overflow-hidden glass-panel p-1 shadow-[0_0_50px_rgba(0,229,255,0.3)] morph-shape bg-white dark:bg-gray-900 transition-transform duration-500 hover:scale-105">
              <div className="w-full h-full overflow-hidden relative morph-shape bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                <img 
                  src="/rifat.png" 
                  alt="MD. Refayet Hossen" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80 mix-blend-overlay"></div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -right-6 top-10 glass-panel p-3 rounded-2xl animate-[bounce_4s_ease-in-out_infinite] delay-100 border border-white/20 shadow-xl bg-white/10 dark:bg-gray-900/60 backdrop-blur-md">
              <span className="text-2xl">🛍️</span>
            </div>
            <div className="absolute -left-8 bottom-20 glass-panel p-3 rounded-2xl animate-[bounce_3s_ease-in-out_infinite] delay-300 border border-white/20 shadow-xl bg-white/10 dark:bg-gray-900/60 backdrop-blur-md">
              <span className="text-2xl">⚛️</span>
            </div>
            <div className="absolute -right-2 -bottom-4 glass-panel p-4 rounded-2xl animate-[bounce_5s_ease-in-out_infinite] border border-white/20 shadow-xl bg-white/10 dark:bg-gray-900/60 backdrop-blur-md">
              <div className="text-cyan-600 dark:text-cyan-400 font-black text-xl">2+</div>
              <div className="text-[10px] text-gray-700 dark:text-gray-300 uppercase tracking-widest font-bold">Years Exp</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

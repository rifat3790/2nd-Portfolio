import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressPercentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);

  // Simulate loading progress with smooth increment
  useEffect(() => {
    let currentProgress = 0;
    const duration = 2000; // 2 seconds total
    const startTime = performance.now();

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic for smooth finish
      const eased = 1 - Math.pow(1 - t, 3);
      currentProgress = Math.floor(eased * 100);
      setProgress(currentProgress);
      if (t < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  // Count-up effect for percent display
  useEffect(() => {
    let animationFrame: number;
    const updateDisplay = () => {
      setDisplayPercent(prev => {
        if (prev < progress) {
          const step = Math.ceil((progress - prev) / 8);
          return Math.min(prev + step, progress);
        }
        return prev;
      });
      animationFrame = requestAnimationFrame(updateDisplay);
    };
    animationFrame = requestAnimationFrame(updateDisplay);
    return () => cancelAnimationFrame(animationFrame);
  }, [progress]);

  // Particle system for background
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedX: number;
      speedY: number;
    }> = [];
    const particleCount = 80;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Exit animation when progress reaches 100
  useEffect(() => {
    if (progress === 100) {
      const ctx = gsap.context(() => {
        // First fade out text and progress elements
        const tl = gsap.timeline({
          onComplete: onComplete,
          ease: "power4.inOut",
        });

        tl.to(textRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.6,
          ease: "back.in",
        })
          .to(progressFillRef.current, {
            width: "100%",
            duration: 0.4,
            ease: "power2.out",
          }, "<0.2")
          .to(progressPercentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.4,
          }, "<")
          .to(logoRef.current, {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
          }, "<0.2")
          .to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
          });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 30% 40%, #0a0f1a 0%, #03050b 100%)",
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-600/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Particle canvas background */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Main content */}
      <div ref={logoRef} className="relative z-10 mb-8">
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 blur-xl opacity-50 -z-10" />
        </div>
      </div>

      <div ref={textRef} className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent mb-3">
          Refayet.
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm tracking-[0.3em] uppercase font-light">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Loading experience</span>
        </div>
      </div>

      {/* Premium progress bar */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-72 z-10">
        <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            ref={progressFillRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Glow effect on progress bar */}
          <div
            className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
            style={{ left: `${progress - 10}%`, opacity: progress > 5 ? 1 : 0 }}
          />
        </div>
        <div
          ref={progressPercentRef}
          className="text-right mt-3 font-mono text-sm text-cyan-400/80 tracking-wider"
        >
          {displayPercent}%
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-500/30 rounded-br-2xl" />
    </div>
  );
}
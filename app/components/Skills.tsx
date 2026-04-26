export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Redux", "HTML/CSS"]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: ["Node.js", "Express", "MongoDB", "MySQL", "REST APIs", "Prisma", "JWT"]
    },
    {
      title: "CMS & Platforms",
      icon: "🛍️",
      skills: ["Shopify", "Liquid", "Webflow", "Wix", "WordPress", "Headless CMS"]
    },
    {
      title: "Tools & Other",
      icon: "🛠️",
      skills: ["Git", "GitHub", "Figma", "Vercel", "Postman", "Responsive Design", "SEO"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16 relative" data-aos="fade-up" data-aos-duration="800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full z-[-1]"></div>
        <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-3 block">Expertise</span>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          My <span className="text-gradient">Skills</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, idx) => (
          <div 
            key={idx} 
            className="glass-panel group hover:border-cyan-500/40 hover:bg-white/60 dark:hover:bg-[#11131a]/80 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            data-aos-duration="800"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none"></div>
            
            <div className="text-5xl mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-center inline-block drop-shadow-md">
              {category.icon}
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4">{category.title}</h3>
            
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3.5 py-1.5 bg-gray-100/80 hover:bg-white dark:bg-white/5 dark:hover:bg-cyan-900/30 border border-gray-200/80 dark:border-white/10 dark:hover:border-cyan-500/50 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

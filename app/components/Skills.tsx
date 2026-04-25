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
      <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
        <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2 block">Expertise</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          My <span className="text-gradient">Skills</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, idx) => (
          <div 
            key={idx} 
            className="glass-panel group hover:border-purple-500/50 transition-colors"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            data-aos-duration="800"
          >
            <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 origin-left inline-block">
              {category.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-2">{category.title}</h3>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-gray-100 hover:bg-cyan-50 dark:bg-white/5 dark:hover:bg-cyan-900/30 border border-gray-200 dark:border-white/10 dark:hover:border-cyan-500/50 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all cursor-default"
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

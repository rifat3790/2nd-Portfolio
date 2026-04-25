export default function Experience() {
  const experiences = [
    {
      role: "Web Developer & Team Leader",
      company: "Softvence Agency",
      duration: "Present",
      description: "Leading a team of developers to build premium digital experiences. Managing complex projects, architecting scalable MERN stack and Next.js applications, and delivering high-converting Shopify and Webflow solutions for global clients."
    },
    {
      role: "Web Developer",
      company: "Sardar IT",
      duration: "2023 - 2024",
      description: "Developed and maintained highly responsive web applications. Collaborated with cross-functional teams to integrate APIs, optimize frontend performance, and deliver custom eCommerce solutions."
    },
    {
      role: "B.Sc. in Computer Science & Engineering",
      company: "Green University of Bangladesh",
      duration: "Graduation Complete",
      description: "Completed my graduation with a strong focus on software engineering, data structures, algorithms, and full-stack web development. Participated in multiple competitive programming and tech events."
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
        <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2 block">Career & Education</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          My <span className="text-gradient">Journey</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-cyan-500/30 dark:border-white/10 ml-4 md:ml-12 space-y-12">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="relative pl-8 md:pl-12"
            data-aos="fade-left"
            data-aos-delay={index * 150}
            data-aos-duration="800"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff] border-2 border-gray-950"></div>
            
            <div className="glass-panel group hover:border-cyan-500/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-bold border border-cyan-200 dark:border-cyan-800/50 shadow-sm">
                    {exp.duration}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

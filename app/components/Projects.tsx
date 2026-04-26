import { useEffect, useState } from "react";
import { shopifyProjects, otherProjects } from "../data/projects";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"All" | "E-commerce" | "Healthcare" | "Portfolio" | "Business / Lead Generation">("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const pinnedNames = [
    "Sperax",
    "Kitfix",
    "AMONE Fragrance",
    "Masonic Jewellery",
    "RenewedMind Co.",
    "Dizzy Doodle Apparel",
    "ARMRA Skincare",
    "Health Fire Ice"
  ];

  // 1. Combine all projects
  const allProjectsRaw = [...otherProjects, ...shopifyProjects];

  // 2. Sort by ID descending (highest ID first)
  allProjectsRaw.sort((a, b) => b.id - a.id);

  // 3. Separate pinned and regular projects
  const pinnedProjects: any[] = [];
  const regularProjects: any[] = [];

  allProjectsRaw.forEach(p => {
    if (pinnedNames.includes(p.title)) {
      pinnedProjects.push(p);
    } else {
      regularProjects.push(p);
    }
  });

  // 4. Sort pinned projects exactly in the order of the pinnedNames array
  pinnedProjects.sort((a, b) => pinnedNames.indexOf(a.title) - pinnedNames.indexOf(b.title));

  // 5. Final sorted list
  const sortedAllProjects = [...pinnedProjects, ...regularProjects];

  const filteredProjects = activeTab === "All" 
    ? sortedAllProjects 
    : sortedAllProjects.filter(p => p.category === activeTab);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  useEffect(() => {
    // We rely on AOS for animation, so we don't need GSAP ScrollTrigger here anymore
  }, [activeTab, visibleCount]);

  const categories = ["All", "E-commerce", "Healthcare", "Portfolio", "Business / Lead Generation"];

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
      <div className="text-center mb-16 relative" data-aos="fade-up" data-aos-duration="800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full z-[-1]"></div>
        <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-3 block">Portfolio</span>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
          Featured <span className="text-gradient-alt">Projects</span>
        </h2>
        
        {/* Advanced Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => { setActiveTab(cat as any); setVisibleCount(8); }}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === cat 
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProjects.map((project, index) => (
          <div 
            key={`${project.id}-${index}`} 
            data-aos="fade-up" 
            data-aos-delay={String((index % 8) * 100)}
            data-aos-duration="800"
            className="project-card glass-panel flex flex-col h-full overflow-hidden group hover:border-cyan-500/50 p-0 transform transition-all duration-500 hover:-translate-y-3 relative"
          >
            {/* Show Featured/Pinned Badge if it is in pinned list */}
            {pinnedNames.includes(project.title) && (
              <div className="absolute top-0 left-0 z-30">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl shadow-[0_4px_20px_rgba(0,229,255,0.4)] tracking-wider">
                  FEATURED
                </div>
              </div>
            )}

            <div className="w-full h-56 relative overflow-hidden bg-gray-900 group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10 opacity-80"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-top transition-all duration-[5000ms] ease-in-out group-hover:object-bottom"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Project+Image' }}
              />
              <div className="absolute top-3 right-3 z-20">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-gray-50/90 dark:bg-[#0f1115]/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-5 flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                  <span key={i} className="text-[10px] font-bold tracking-wide text-cyan-300 bg-cyan-900/40 px-2.5 py-1 rounded-md border border-cyan-800/60">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] font-bold tracking-wide text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-md">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center mt-auto">
                {project.liveLink ? (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-2 transition-all group/link">
                    View Live <span className="group-hover/link:translate-x-1.5 transition-transform">→</span>
                  </a>
                ) : (
                  <span className="text-sm text-gray-500 font-medium tracking-wide">Private Project</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length > visibleCount && (
        <div className="text-center mt-12" data-aos="fade-up" data-aos-duration="600">
          <p className="text-gray-400 mb-4">Showing {visibleCount} of {filteredProjects.length} projects</p>
          <button 
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="btn-outline px-8 py-3 rounded-full hover:bg-white/5 transition-all active:scale-95"
          >
            Load More Projects
          </button>
        </div>
      )}
    </section>
  );
}

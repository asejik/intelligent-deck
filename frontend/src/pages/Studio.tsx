import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import type { Slide, Project } from "@/types/schema";
import { motion } from "framer-motion";
import { LayoutTemplate, Image as ImageIcon, Type, ChevronLeft } from "lucide-react";

interface StudioProps {
  projectId: string;
  onBack: () => void;
}

export const Studio = ({ projectId, onBack }: StudioProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Project Info
      const { data: projectData } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      setProject(projectData);

      // 2. Fetch Slides
      const { data: slidesData } = await supabase
        .from("slides")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });

      if (slidesData) setSlides(slidesData);
      setLoading(false);
    };

    fetchData();
  }, [projectId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 relative z-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{project?.title}</h1>
          <p className="text-white/40 text-sm font-medium">Draft Mode • {slides.length} Slides</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20"
          >
            {/* Slide Header (Layout Badge) */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent z-10">
              <span className="text-xs font-mono text-white/50 bg-black/50 px-2 py-0.5 rounded">#{slide.sort_order}</span>
              <LayoutIcon type={slide.layout_type} />
            </div>

            {/* Slide Content Preview */}
            <div className="p-6 pt-10 h-full flex flex-col">
              <h3 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2">
                {slide.content.title}
              </h3>
              <ul className="space-y-2">
                {slide.content.body_points?.slice(0, 3).map((point, i) => (
                  <li key={i} className="text-sm text-white/60 truncate flex gap-2 items-center">
                     <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                     <span className="truncate">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Action</span>
                <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:scale-105 transition-transform hover:bg-emerald-50">
                    Open Editor
                </button>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper Icon Component
const LayoutIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'title_slide': return <div title="Title Slide"><Type className="w-4 h-4 text-purple-400" /></div>;
    case 'image_left': return <div title="Image Left"><ImageIcon className="w-4 h-4 text-blue-400" /></div>;
    case 'image_right': return <div title="Image Right"><ImageIcon className="w-4 h-4 text-blue-400" /></div>;
    default: return <div title="Bullet List"><LayoutTemplate className="w-4 h-4 text-emerald-400" /></div>;
  }
};
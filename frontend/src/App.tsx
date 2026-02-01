import { useState } from "react";
import { GlassBackground } from "@/components/ui/GlassBackground";
import { Generator } from "@/components/studio/Generator";
import { Studio } from "@/pages/Studio";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [view, setView] = useState<'home' | 'studio'>('home');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const handleEnterStudio = (projectId: string) => {
    setCurrentProjectId(projectId);
    setView('studio');
  };

  const handleBack = () => {
    setView('home');
    setCurrentProjectId(null);
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-hidden">
      <GlassBackground />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-20">

        {view === 'home' ? (
          <>
            {/* Header Section - Only visible on Home */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium tracking-wide text-white/70 uppercase">
                  System Online
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-6"
              >
                Intelligent Deck <br /> Architect
              </motion.h1>
            </div>

            {/* Input/Generator Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full"
            >
              <Generator onEnterStudio={handleEnterStudio} />
            </motion.div>
          </>
        ) : (
          /* Studio View */
          <Studio projectId={currentProjectId!} onBack={handleBack} />
        )}

      </main>
    </div>
  );
}

export default App;
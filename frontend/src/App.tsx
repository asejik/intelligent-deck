import { GlassBackground } from "@/components/ui/GlassBackground";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-blue-500/30">
      <GlassBackground />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-white/70 uppercase">
            System Online
          </span>
        </motion.div>

        {/* Hero Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-6"
        >
          Intelligent Deck <br /> Architect
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl text-lg text-white/60 leading-relaxed mb-10"
        >
          Transform dense documentation into professional presentations instantly.
          <br /> Powered by Gemini 2.5 Flash & Python-PPTX.
        </motion.p>

        {/* Glass Button Interaction */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group relative px-8 py-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
          <span className="relative font-medium text-white group-hover:text-black transition-colors duration-300">
            Start New Project
          </span>
        </motion.button>
      </main>
    </div>
  );
}

export default App;
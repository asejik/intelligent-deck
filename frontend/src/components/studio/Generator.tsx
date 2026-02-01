// 1. Update Imports
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deckService } from "@/services/api";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";

// 2. Add Props Interface
interface GeneratorProps {
  onEnterStudio: (projectId: string) => void;
}

// 3. Update Component Definition
export const Generator = ({ onEnterStudio }: GeneratorProps) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await deckService.generateOutline(text);
      setProjectId(data.project_id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (projectId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Blueprint Ready</h3>
        <p className="text-white/60 mb-6">Your deck outline has been architected successfully.</p>

        {/* 4. Update Button onClick */}
        <button
          onClick={() => onEnterStudio(projectId)}
          className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors cursor-pointer"
        >
          Enter Studio
        </button>
      </motion.div>
    );
  }

  // ... (The return statement for the Input Form remains EXACTLY the same as before)
  return (
    <div className="w-full max-w-2xl mx-auto relative z-20">
      {/* ... Keep the existing Input UI code identical ... */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes, article, or thoughts here..."
            className="w-full h-48 bg-transparent text-white/90 p-6 text-lg focus:outline-none resize-none placeholder:text-white/20"
            disabled={isLoading}
          />

          <div className="flex items-center justify-between px-6 pb-4 pt-2">
            <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
              {text.length} chars
            </span>

            <button
              onClick={handleGenerate}
              disabled={!text.trim() || isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                !text.trim() || isLoading
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-white text-black hover:bg-blue-50 hover:scale-105 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Architecting...
                </>
              ) : (
                <>
                  Generate Deck
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
import { useState } from "react";
import { type Slide } from "@/types/schema";
import { supabase } from "@/services/supabaseClient";
import { X, Save, Wand2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface SlideEditorProps {
  slide: Slide;
  onClose: () => void;
  onSave: () => void;
}

export const SlideEditor = ({ slide, onClose, onSave }: SlideEditorProps) => {
  const [title, setTitle] = useState(slide.content.title || "");
  const [points, setPoints] = useState<string[]>(slide.content.body_points || []);
  const [imagePrompt, setImagePrompt] = useState(slide.image_prompt || "");
  const [imageUrl, setImageUrl] = useState(slide.image_url || "");
  const [isSaving, setIsSaving] = useState(false);

  // Pollinations.ai is URL-based. We just construct the URL.
  const handleGenerateImage = () => {
    if (!imagePrompt) return;
    const encodedPrompt = encodeURIComponent(imagePrompt + " minimalist, professional, 4k, abstract, cinematic lighting");
    // Add a random seed to force refresh if they click it again
    const seed = Math.floor(Math.random() * 1000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${seed}&width=1920&height=1080`;
    setImageUrl(url);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from("slides")
      .update({
        content: { title, body_points: points },
        image_prompt: imagePrompt,
        image_url: imageUrl,
      })
      .eq("id", slide.id);

    if (!error) {
      onSave(); // Refresh parent
      onClose();
    }
    setIsSaving(false);
  };

  const updatePoint = (index: number, value: string) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-6xl h-[90vh] bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* LEFT COLUMN: Visuals */}
        <div className="md:w-2/3 bg-black/50 relative flex flex-col p-6 border-r border-white/5">
          <div className="flex-1 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group">
            {imageUrl ? (
              <img src={imageUrl} alt="Slide Visual" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-white/20">
                No Image Generated
              </div>
            )}

            {/* Image Prompt Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">
              <label className="text-xs text-white/50 uppercase tracking-widest font-bold mb-2 block">AI Image Prompt</label>
              <div className="flex gap-2">
                <input
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleGenerateImage}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded text-white text-sm font-medium flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" /> Render
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Editor */}
        <div className="md:w-1/3 flex flex-col bg-[#1a1a1a]">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Slide Editor</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-white/50" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div>
              <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Slide Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-medium focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Bullet Points</label>
              <div className="space-y-3">
                {points.map((point, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-emerald-500 font-bold mt-2">•</span>
                    <textarea
                      value={point}
                      onChange={(e) => updatePoint(i, e.target.value)}
                      rows={2}
                      className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-white/5 bg-black/20">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Updates
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
import { motion } from "framer-motion";

export const GlassBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* 1. Base Gradient (Deep Blue/Purple/Black) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1e2e_0%,#000000_100%)] opacity-80" />

      {/* 2. Slow Drifting Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/20 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [-20, 20, -20],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[100px]"
      />

      {/* 3. Grid Shimmer Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 4. Noise Texture (Optional for that 'film' look) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
    </div>
  );
};
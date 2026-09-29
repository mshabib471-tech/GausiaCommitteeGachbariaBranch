import React from 'react';
import { Megaphone, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';

export default function Marquee({ text }: { text: string }) {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div className="bg-[#f7e9b9] py-1 border-b border-slate-200 flex items-center overflow-hidden">
      <div className="bg-[#1a5d3b] text-white px-4 py-1.5 flex items-center gap-2 z-10 shadow-sm">
        <Megaphone size={18} />
      </div>
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          animate={isPaused ? {} : { x: ['100%', '-100%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="whitespace-nowrap px-4 py-1 text-slate-800 font-semibold"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {text}
        </motion.div>
      </div>
      <div className="px-4 border-l border-slate-300">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 hover:bg-black/5 rounded transition-colors text-slate-600"
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}

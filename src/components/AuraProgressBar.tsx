import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function AuraProgressBar() {
  const auraLevel = 78;
  const auraLabel = auraLevel >= 80 ? "AURA MÁXIMA" : auraLevel >= 60 ? "AURA ALTA" : "AURA MÉDIA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <div className="glass rounded-3xl p-6 glow-red-intense relative overflow-hidden">
        {/* Background pulse effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-aura-red/[0.03] via-transparent to-aura-red/[0.03]" />
        
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-aura-red animate-pulse" strokeWidth={1.5} />
            <span className="text-sm font-bold text-aura-red uppercase tracking-wider">
              {auraLabel}
            </span>
          </div>
          <span className="text-sm text-white/60 font-bold">{auraLevel}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${auraLevel}%` }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-aura-red via-red-500 to-rose-400 relative"
          >
            <div className="absolute inset-0 bg-white/30 rounded-full blur-sm" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(194,19,19,0.8)]" />
          </motion.div>
        </div>
        <div className="relative flex items-center justify-between mt-4">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Disciplina</span>
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Dominação</span>
        </div>
      </div>
    </motion.div>
  );
}

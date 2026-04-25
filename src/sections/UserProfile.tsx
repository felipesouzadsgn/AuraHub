import { motion } from "framer-motion";
import { User, TrendingUp, Zap, Calendar, Award } from "lucide-react";

export function UserProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aura-red/20 to-aura-red/5 border border-aura-red/20 flex items-center justify-center">
          <User className="w-8 h-8 text-aura-red" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white/90">Alexandre</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-white/40">Nível 12</span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-aura-red font-medium">Warrior</span>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">XP para nível 13</span>
          <span className="text-[10px] text-white/60 font-medium">2,840 / 3,000</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "94.6%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-aura-red to-red-400"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-aura-red" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Aura</span>
          </div>
          <span className="text-lg font-bold text-white">78%</span>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Streak</span>
          </div>
          <span className="text-lg font-bold text-white">21 dias</span>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar className="w-3 h-3 text-blue-400" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Membro</span>
          </div>
          <span className="text-lg font-bold text-white">84 dias</span>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Award className="w-3 h-3 text-amber-400" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Conquistas</span>
          </div>
          <span className="text-lg font-bold text-white">3/10</span>
        </div>
      </div>
    </motion.div>
  );
}

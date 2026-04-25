import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Lock, Flame, DollarSign, Dumbbell, BookOpen, Droplets, Clock, Target, Star } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  rarity: "comum" | "raro" | "epico" | "lendario";
  progress?: number;
  max?: number;
}

const badges: Badge[] = [
  {
    id: "1",
    name: "Primeiro Check-in",
    description: "Complete seu primeiro hábito",
    icon: Flame,
    unlocked: true,
    rarity: "comum",
  },
  {
    id: "2",
    name: "Streak 7 Dias",
    description: "7 dias consecutivos de hábitos",
    icon: Flame,
    unlocked: true,
    rarity: "raro",
  },
  {
    id: "3",
    name: "Streak 30 Dias",
    description: "30 dias consecutivos de hábitos",
    icon: Flame,
    unlocked: false,
    rarity: "epico",
    progress: 21,
    max: 30,
  },
  {
    id: "4",
    name: "Primeiro Milhão",
    description: "Acumule R$ 1M em patrimônio",
    icon: DollarSign,
    unlocked: false,
    rarity: "lendario",
    progress: 127450,
    max: 1000000,
  },
  {
    id: "5",
    name: "Leitor Ávido",
    description: "Leia 12 livros em um ano",
    icon: BookOpen,
    unlocked: true,
    rarity: "raro",
  },
  {
    id: "6",
    name: "Hidratação Master",
    description: "30 dias bebendo 3L de água",
    icon: Droplets,
    unlocked: false,
    rarity: "epico",
    progress: 18,
    max: 30,
  },
  {
    id: "7",
    name: "Powerlifter",
    description: "Levante 200kg no total (S+B+D)",
    icon: Dumbbell,
    unlocked: false,
    rarity: "lendario",
    progress: 340,
    max: 500,
  },
  {
    id: "8",
    name: "Focus Master",
    description: "Complete 100 sessões de foco",
    icon: Clock,
    unlocked: false,
    rarity: "epico",
    progress: 23,
    max: 100,
  },
  {
    id: "9",
    name: "Goal Crusher",
    description: "Complete 5 metas",
    icon: Target,
    unlocked: false,
    rarity: "raro",
    progress: 2,
    max: 5,
  },
  {
    id: "10",
    name: "Aura Máxima",
    description: "Alcance 100% de Aura por 7 dias",
    icon: Star,
    unlocked: false,
    rarity: "lendario",
    progress: 3,
    max: 7,
  },
];

const rarityColors = {
  comum: "#6B7280",
  raro: "#3B82F6",
  epico: "#A855F7",
  lendario: "#F59E0B",
};

export function Achievements() {
  const [filter, setFilter] = useState<"todos" | "desbloqueados" | "bloqueados">("todos");

  const filtered = badges.filter((b) => {
    if (filter === "desbloqueados") return b.unlocked;
    if (filter === "bloqueados") return !b.unlocked;
    return true;
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-aura-red/10">
            <Award className="w-5 h-5 text-aura-red" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white/90">Conquistas</h2>
            <span className="text-xs text-white/40">
              {unlockedCount}/{badges.length} desbloqueadas
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {(["todos", "desbloqueados", "bloqueados"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all ${
                filter === f
                  ? "bg-white/[0.06] text-white border border-white/[0.1]"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {filtered.map((badge, idx) => {
          const Icon = badge.icon;
          const color = rarityColors[badge.rarity];
          const hasProgress = badge.progress !== undefined && badge.max !== undefined;
          const progressPercent = hasProgress ? (badge.progress! / badge.max!) * 100 : 0;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className={`group relative rounded-2xl p-4 text-center transition-all ${
                badge.unlocked
                  ? "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]"
                  : "bg-white/[0.01] border border-white/[0.03] opacity-60"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all ${
                  badge.unlocked ? "" : "grayscale"
                }`}
                style={{
                  backgroundColor: badge.unlocked ? `${color}15` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${badge.unlocked ? `${color}30` : "rgba(255,255,255,0.04)"}`,
                }}
              >
                {badge.unlocked ? (
                  <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
                ) : (
                  <Lock className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                )}
              </div>

              <h3 className="text-xs font-semibold text-white/80 mb-1">{badge.name}</h3>
              <p className="text-[10px] text-white/30 leading-snug mb-2">{badge.description}</p>

              <span
                className="text-[9px] uppercase tracking-wider font-medium"
                style={{ color }}
              >
                {badge.rarity}
              </span>

              {hasProgress && !badge.unlocked && (
                <div className="mt-2">
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(progressPercent, 100)}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <span className="text-[9px] text-white/20 mt-1 block">
                    {badge.progress}/{badge.max}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

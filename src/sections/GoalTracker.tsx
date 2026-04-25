import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus, Trash2, CheckCircle2, Zap } from "lucide-react";

interface Goal {
  id: number;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  color: string;
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Patrimônio Líquido",
    category: "Financeiro",
    target: 500000,
    current: 127450,
    unit: "R$",
    deadline: "Dez 2026",
    color: "#10B981",
  },
  {
    id: 2,
    title: "Supino Reto",
    category: "Força",
    target: 120,
    current: 80,
    unit: "kg",
    deadline: "Jun 2026",
    color: "#C21313",
  },
  {
    id: 3,
    title: "Livros Lidos",
    category: "Conhecimento",
    target: 52,
    current: 18,
    unit: "livros",
    deadline: "Dez 2026",
    color: "#3B82F6",
  },
  {
    id: 4,
    title: "Peso Corporal",
    category: "Corpo",
    target: 78,
    current: 82,
    unit: "kg",
    deadline: "Ago 2026",
    color: "#F59E0B",
  },
];

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target: "", unit: "", deadline: "" });

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      category: "Personalizado",
      target: Number(newGoal.target),
      current: 0,
      unit: newGoal.unit || "un",
      deadline: newGoal.deadline || "Indefinido",
      color: "#C21313",
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: "", target: "", unit: "", deadline: "" });
    setShowAdd(false);
  };

  const deleteGoal = (id: number) => setGoals(goals.filter((g) => g.id !== id));

  const updateProgress = (id: number, delta: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, current: Math.max(0, g.current + delta) } : g)));
  };

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
            <Target className="w-5 h-5 text-aura-red" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white/90">Goal Tracker</h2>
            <span className="text-xs text-white/40">{goals.length} metas ativas</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAdd(!showAdd)}
          className="p-2 rounded-xl bg-aura-red/10 border border-aura-red/20 text-aura-red hover:bg-aura-red/20 transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3"
          >
            <input
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="Nome da meta..."
              className="w-full bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aura-red/40"
            />
            <div className="flex gap-2">
              <input
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="Meta"
                type="number"
                className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aura-red/40"
              />
              <input
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                placeholder="Unidade"
                className="w-24 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aura-red/40"
              />
            </div>
            <div className="flex gap-2">
              <input
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                placeholder="Prazo"
                className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aura-red/40"
              />
              <button
                onClick={addGoal}
                className="px-4 py-2 rounded-xl bg-aura-red/10 border border-aura-red/20 text-aura-red text-sm font-medium hover:bg-aura-red/20 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {goals.map((goal, idx) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 hover:border-white/[0.08] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                    <span className="text-xs text-white/40 uppercase tracking-wider">
                      {goal.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-white/20 hover:text-rose-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-white/80 mb-2">{goal.title}</h3>

                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-xl font-bold text-white tracking-tight">
                    {goal.unit === "R$" ? "R$ " : ""}
                    {goal.current.toLocaleString()}
                    {goal.unit !== "R$" ? ` ${goal.unit}` : ""}
                  </span>
                  <span className="text-xs text-white/30">
                    / {goal.unit === "R$" ? "R$ " : ""}
                    {goal.target.toLocaleString()}
                    {goal.unit !== "R$" ? ` ${goal.unit}` : ""}
                  </span>
                </div>

                <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: goal.color }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/30">{goal.deadline}</span>
                  <span className="text-[10px] font-bold" style={{ color: goal.color }}>
                    {Math.round(progress)}%
                  </span>
                </div>

                {progress < 100 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => updateProgress(goal.id, goal.target * 0.05)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02] text-[10px] text-white/50 hover:text-white/80 transition-colors"
                    >
                      <Zap className="w-3 h-3" strokeWidth={1.5} />
                      +5%
                    </button>
                    <button
                      onClick={() => updateProgress(goal.id, goal.target * 0.1)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02] text-[10px] text-white/50 hover:text-white/80 transition-colors"
                    >
                      <Zap className="w-3 h-3" strokeWidth={1.5} />
                      +10%
                    </button>
                  </div>
                )}

                {progress >= 100 && (
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/[0.04] text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">Meta Concluída</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

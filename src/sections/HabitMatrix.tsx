import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Target, Flame } from "lucide-react";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const habits = [
  { id: 1, name: "Acordar 5h", icon: "sun", streak: 12 },
  { id: 2, name: "Meditação", icon: "brain", streak: 8 },
  { id: 3, name: "Leitura", icon: "book", streak: 15 },
  { id: 4, name: "Água 3L", icon: "droplet", streak: 5 },
  { id: 5, name: "Código", icon: "code", streak: 21 },
];

const initialMatrix: Record<number, boolean[]> = {
  1: [true, true, true, false, true, true, false],
  2: [true, false, true, true, true, false, true],
  3: [true, true, true, true, true, true, true],
  4: [false, true, false, true, true, false, true],
  5: [true, true, true, true, true, true, false],
};

export function HabitMatrix() {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [hovered, setHovered] = useState(false);

  const toggleHabit = (habitId: number, dayIndex: number) => {
    setMatrix((prev) => {
      const newRow = [...(prev[habitId] || [])];
      newRow[dayIndex] = !newRow[dayIndex];
      return { ...prev, [habitId]: newRow };
    });
  };

  const totalChecks = Object.values(matrix).flat().filter(Boolean).length;
  const maxChecks = habits.length * 7;
  const completionRate = Math.round((totalChecks / maxChecks) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass rounded-3xl p-5 transition-all duration-500 ${
        hovered ? "glow-red-intense" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-aura-red/10">
            <Target className="w-4 h-4 text-aura-red" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-white/90">Habit Matrix</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-aura-red/10">
          <Flame className="w-3 h-3 text-aura-red" strokeWidth={1.5} />
          <span className="text-[10px] font-bold text-aura-red">{completionRate}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="w-20" />
        {weekDays.map((d, i) => (
          <span
            key={i}
            className="w-7 text-center text-[10px] font-medium text-white/40"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {habits.map((habit, habitIdx) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + habitIdx * 0.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-20 flex items-center gap-1.5">
              <span className="text-[11px] text-white/70 font-medium truncate">
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {(matrix[habit.id] || []).map((checked, dayIdx) => (
                <motion.button
                  key={dayIdx}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleHabit(habit.id, dayIdx)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    checked
                      ? "bg-aura-red/20 border border-aura-red/40 text-aura-red"
                      : "bg-white/[0.02] border border-white/[0.04] text-white/10 hover:text-white/30"
                  }`}
                >
                  {checked ? (
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Circle className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[10px] text-white/30">
          {totalChecks}/{maxChecks} check-ins
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-white/50">Maior streak:</span>
          <span className="text-[10px] font-bold text-aura-red">
            {Math.max(...habits.map((h) => h.streak))} dias
          </span>
        </div>
      </div>
    </motion.div>
  );
}

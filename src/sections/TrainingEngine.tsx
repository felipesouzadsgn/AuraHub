import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, TrendingUp, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const volumeData = [
  { day: "Seg", volume: 12500 },
  { day: "Ter", volume: 8900 },
  { day: "Qua", volume: 0 },
  { day: "Qui", volume: 14200 },
  { day: "Sex", volume: 11000 },
  { day: "Sab", volume: 15800 },
  { day: "Dom", volume: 0 },
];

const exercises = [
  { name: "Supino Reto", current: 80, previous: 75, unit: "kg" },
  { name: "Agachamento", current: 120, previous: 110, unit: "kg" },
  { name: "Levantamento Terra", current: 140, previous: 130, unit: "kg" },
  { name: "Desenvolvimento", current: 50, previous: 45, unit: "kg" },
];

export function TrainingEngine() {
  const [hovered, setHovered] = useState(false);
  const totalVolume = volumeData.reduce((acc, d) => acc + d.volume, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass rounded-3xl p-5 transition-all duration-500 ${
        hovered ? "glow-red-intense" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-aura-red/10">
            <Dumbbell className="w-4 h-4 text-aura-red" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-white/90">Training Engine</span>
        </div>
        <ChevronRight className="w-4 h-4 text-white/30" strokeWidth={1.5} />
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">
            {totalVolume.toLocaleString()}
          </span>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">kg/vol</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
          <span className="text-[10px] text-emerald-400 font-medium">+12% vs semana anterior</span>
        </div>
      </div>

      <div className="h-[80px] -mx-2 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volumeData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgba(2,2,2,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} kg`, "Volume"]}
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
              {volumeData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.volume > 0 ? "#C21313" : "rgba(255,255,255,0.04)"}
                  fillOpacity={entry.volume > 0 ? 0.8 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {exercises.map((exercise, idx) => {
          const progress = (exercise.current / (exercise.previous * 1.2)) * 100;
          return (
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-white/70 font-medium">
                    {exercise.name}
                  </span>
                  <span className="text-[10px] text-white/50">
                    {exercise.current}
                    {exercise.unit}
                  </span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-aura-red to-red-400"
                  />
                </div>
              </div>
              {exercise.current > exercise.previous && (
                <div className="flex items-center gap-0.5 text-emerald-400">
                  <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold">
                    +{exercise.current - exercise.previous}
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

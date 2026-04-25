import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Activity, TrendingUp, TrendingDown, Flame, DollarSign, Dumbbell, Clock } from "lucide-react";

const weeklyData = [
  { day: "Seg", habits: 5, training: 1, focus: 3, finance: 2400 },
  { day: "Ter", habits: 4, training: 0, focus: 2, finance: -200 },
  { day: "Qua", habits: 5, training: 1, focus: 4, finance: 7700 },
  { day: "Qui", habits: 3, training: 1, focus: 2, finance: 1508 },
  { day: "Sex", habits: 5, training: 0, focus: 3, finance: 3000 },
  { day: "Sab", habits: 4, training: 1, focus: 1, finance: 600 },
  { day: "Dom", habits: 5, training: 0, focus: 2, finance: 2800 },
];

const metrics = [
  { label: "Hábitos", value: "31/35", change: "+12%", icon: Flame, color: "#C21313" },
  { label: "Treinos", value: "4/6", change: "-1", icon: Dumbbell, color: "#F59E0B" },
  { label: "Foco", value: "17 sessões", change: "+5", icon: Clock, color: "#3B82F6" },
  { label: "Financeiro", value: "+R$ 17.8k", change: "+8%", icon: DollarSign, color: "#10B981" },
];

export function WeeklyAnalytics() {
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
            <Activity className="w-5 h-5 text-aura-red" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white/90">Weekly Analytics</h2>
            <span className="text-xs text-white/40">Resumo da semana</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith("+") || !metric.change.startsWith("-");
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Icon className="w-3.5 h-3.5" style={{ color: metric.color }} strokeWidth={1.5} />
                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
              <span className="text-lg font-bold text-white block">{metric.value}</span>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
                ) : (
                  <TrendingDown className="w-3 h-3 text-rose-400" strokeWidth={1.5} />
                )}
                <span
                  className={`text-[10px] font-medium ${
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Chart */}
      <div className="h-[200px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barGap={2}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgba(2,2,2,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Bar dataKey="habits" radius={[4, 4, 0, 0]}>
              {weeklyData.map((_, i) => (
                <Cell key={i} fill="#C21313" fillOpacity={0.6} />
              ))}
            </Bar>
            <Bar dataKey="training" radius={[4, 4, 0, 0]}>
              {weeklyData.map((_, i) => (
                <Cell key={i} fill="#F59E0B" fillOpacity={0.6} />
              ))}
            </Bar>
            <Bar dataKey="focus" radius={[4, 4, 0, 0]}>
              {weeklyData.map((_, i) => (
                <Cell key={i} fill="#3B82F6" fillOpacity={0.6} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-aura-red/60" />
          <span className="text-[10px] text-white/40">Hábitos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="text-[10px] text-white/40">Treinos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500/60" />
          <span className="text-[10px] text-white/40">Foco</span>
        </div>
      </div>
    </motion.div>
  );
}

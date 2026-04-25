import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight } from "lucide-react";

const data = [
  { day: "Seg", entrada: 2400, saida: 1800 },
  { day: "Ter", entrada: 1398, saida: 1200 },
  { day: "Qua", entrada: 9800, saida: 2100 },
  { day: "Qui", entrada: 3908, saida: 2400 },
  { day: "Sex", entrada: 4800, saida: 1800 },
  { day: "Sab", entrada: 3800, saida: 3200 },
  { day: "Dom", entrada: 4300, saida: 1500 },
];

export function FinancialNode() {
  const [hovered, setHovered] = useState(false);

  const totalEntradas = data.reduce((acc, d) => acc + d.entrada, 0);
  const totalSaidas = data.reduce((acc, d) => acc + d.saida, 0);
  const patrimonio = 127_450;
  const saldoSemanal = totalEntradas - totalSaidas;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass rounded-3xl p-5 transition-all duration-500 ${
        hovered ? "glow-red-intense" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-aura-red/10">
            <Wallet className="w-4 h-4 text-aura-red" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-white/90">Financial Node</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/30" strokeWidth={1.5} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-white/[0.02] p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Entradas</span>
          </div>
          <span className="text-sm font-bold text-emerald-400">
            R$ {totalEntradas.toLocaleString()}
          </span>
        </div>
        <div className="rounded-2xl bg-white/[0.02] p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-rose-400" strokeWidth={1.5} />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Saídas</span>
          </div>
          <span className="text-sm font-bold text-rose-400">
            R$ {totalSaidas.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-white tracking-tight">
            R$ {patrimonio.toLocaleString()}
          </span>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-wider">
          Patrimônio Total
        </span>
      </div>

      <div className="h-[100px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C21313" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#C21313" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            />
            <Area
              type="monotone"
              dataKey="entrada"
              stroke="#10B981"
              strokeWidth={1.5}
              fill="url(#colorEntrada)"
            />
            <Area
              type="monotone"
              dataKey="saida"
              stroke="#C21313"
              strokeWidth={1.5}
              fill="url(#colorSaida)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div
          className={`px-2 py-1 rounded-lg text-[10px] font-semibold ${
            saldoSemanal >= 0
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-rose-500/10 text-rose-400"
          }`}
        >
          {saldoSemanal >= 0 ? "+" : ""}
          {saldoSemanal.toLocaleString()} essa semana
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Coffee, Brain, Flame } from "lucide-react";

const MODES = {
  focus: { label: "Foco Profundo", minutes: 25, color: "#C21313", icon: Brain },
  short: { label: "Pausa Curta", minutes: 5, color: "#10B981", icon: Coffee },
  long: { label: "Pausa Longa", minutes: 15, color: "#3B82F6", icon: Coffee },
};

type ModeKey = keyof typeof MODES;

export function FocusTimer() {
  const [mode, setMode] = useState<ModeKey>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions] = useState(4);
  const [completedToday, setCompletedToday] = useState(3);

  const currentMode = MODES[mode];
  const totalTime = currentMode.minutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (mode === "focus") setCompletedToday((c) => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
  }, [currentMode.minutes]);

  const switchMode = (newMode: ModeKey) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const ModeIcon = currentMode.icon;

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
            <Timer className="w-5 h-5 text-aura-red" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white/90">Focus Engine</h2>
            <span className="text-xs text-white/40">Sessões de produtividade</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02]">
          <Flame className="w-3 h-3 text-aura-red" strokeWidth={1.5} />
          <span className="text-[10px] font-bold text-white/60">{completedToday} hoje</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(MODES) as ModeKey[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              mode === m
                ? "bg-white/[0.06] text-white border border-white/[0.1]"
                : "text-white/30 hover:text-white/60 bg-transparent border border-transparent"
            }`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-48 h-48 mb-4">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="3"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={currentMode.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 0 }}
              animate={{
                strokeDashoffset: (2 * Math.PI * 42 * (100 - progress)) / 100,
              }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ModeIcon
              className="w-5 h-5 mb-2"
              style={{ color: currentMode.color }}
              strokeWidth={1.5}
            />
            <span className="text-4xl font-bold text-white tracking-tight tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">
              {currentMode.label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRunning(!isRunning)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
            style={{ backgroundColor: `${currentMode.color}20`, border: `1px solid ${currentMode.color}40` }}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" style={{ color: currentMode.color }} strokeWidth={1.5} />
            ) : (
              <Play className="w-6 h-6" style={{ color: currentMode.color }} strokeWidth={1.5} />
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white/70 transition-all"
          >
            <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <span className="text-lg font-bold text-white block">{completedToday}</span>
          <span className="text-[10px] text-white/30">Completas</span>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <span className="text-lg font-bold text-white block">{sessions}</span>
          <span className="text-[10px] text-white/30">Meta diária</span>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <span className="text-lg font-bold text-white block">
            {completedToday * 25}
          </span>
          <span className="text-[10px] text-white/30">Minutos foco</span>
        </div>
      </div>
    </motion.div>
  );
}

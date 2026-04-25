import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuraSidebar } from "@/components/AuraSidebar";
import { AuraProgressBar } from "@/components/AuraProgressBar";
import { FinancialNode } from "@/sections/FinancialNode";
import { HabitMatrix } from "@/sections/HabitMatrix";
import { TrainingEngine } from "@/sections/TrainingEngine";
import { KnowledgeBase } from "@/sections/KnowledgeBase";
import { GoalTracker } from "@/sections/GoalTracker";
import { FocusTimer } from "@/sections/FocusTimer";
import { Achievements } from "@/sections/Achievements";
import { WeeklyAnalytics } from "@/sections/WeeklyAnalytics";
import { UserProfile } from "@/sections/UserProfile";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" as const },
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white relative overflow-x-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-aura-red/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-aura-red/[0.02] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[80px]" />
      </div>

      <AuraSidebar activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Main Content */}
      <main className="ml-[64px] lg:ml-[220px] min-h-screen">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" && (
              <motion.div key="dashboard" {...pageTransition} className="space-y-6">
                {/* Top Row: Progress + Profile */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <AuraProgressBar />
                  </div>
                  <div className="lg:col-span-1">
                    <UserProfile />
                  </div>
                </div>

                {/* Analytics Row */}
                <WeeklyAnalytics />

                {/* Bento Grid - Main Modules */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FinancialNode />
                  <TrainingEngine />
                  <HabitMatrix />
                  <KnowledgeBase />
                </div>

                {/* Bottom Row: Goals + Timer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GoalTracker />
                  <FocusTimer />
                </div>

                {/* Achievements */}
                <Achievements />
              </motion.div>
            )}

            {activeSection === "financial" && (
              <motion.div key="financial" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Financial Node</h1>
                  <p className="text-sm text-white/40 mt-1">Controle completo do seu patrimônio</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FinancialNode />
                  <FinancialNode />
                </div>
              </motion.div>
            )}

            {activeSection === "habits" && (
              <motion.div key="habits" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Habit Matrix</h1>
                  <p className="text-sm text-white/40 mt-1">Disciplina diária, dominação eterna</p>
                </div>
                <HabitMatrix />
              </motion.div>
            )}

            {activeSection === "training" && (
              <motion.div key="training" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Training Engine</h1>
                  <p className="text-sm text-white/40 mt-1">Forja o corpo, fortalece a mente</p>
                </div>
                <TrainingEngine />
              </motion.div>
            )}

            {activeSection === "knowledge" && (
              <motion.div key="knowledge" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Second Brain</h1>
                  <p className="text-sm text-white/40 mt-1">Seu espaço de conhecimento</p>
                </div>
                <KnowledgeBase />
              </motion.div>
            )}

            {activeSection === "goals" && (
              <motion.div key="goals" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Goal Tracker</h1>
                  <p className="text-sm text-white/40 mt-1">Metas claras, resultados reais</p>
                </div>
                <GoalTracker />
              </motion.div>
            )}

            {activeSection === "focus" && (
              <motion.div key="focus" {...pageTransition} className="space-y-6">
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-white tracking-tight">Focus Engine</h1>
                  <p className="text-sm text-white/40 mt-1">Foco profundo, produção máxima</p>
                </div>
                <div className="max-w-xl mx-auto">
                  <FocusTimer />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

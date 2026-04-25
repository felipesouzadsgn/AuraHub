import { motion } from "framer-motion";
import { AuraLogo } from "./AuraLogo";
import {
  LayoutDashboard,
  Wallet,
  Target,
  Dumbbell,
  Brain,
  Trophy,
  Timer,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "financial", label: "Financeiro", icon: Wallet },
  { id: "habits", label: "Hábitos", icon: Target },
  { id: "training", label: "Treino", icon: Dumbbell },
  { id: "knowledge", label: "Notas", icon: Brain },
  { id: "goals", label: "Metas", icon: Trophy },
  { id: "focus", label: "Foco", icon: Timer },
];

export function AuraSidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[64px] lg:w-[220px] glass-strong border-r border-white/[0.06] z-50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <AuraLogo className="w-8 h-8 text-white shrink-0" />
        <div className="hidden lg:flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight text-white leading-none">
            AuraHub
          </h1>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium leading-none mt-1">
            Comando Central
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-aura-red/10 border border-aura-red/20 text-aura-red"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.02] border border-transparent"
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  isActive ? "text-aura-red" : "text-white/40 group-hover:text-white/60"
                }`}
                strokeWidth={1.5}
              />
              <span className="hidden lg:block text-sm font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="hidden lg:block w-4 h-4 ml-auto" strokeWidth={1.5} />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/[0.06]">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.02] transition-all">
          <Settings className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
          <span className="hidden lg:block text-sm font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}

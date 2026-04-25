import { motion } from "framer-motion";
import { AuraLogo } from "./AuraLogo";
import { Bell, Settings } from "lucide-react";

export function AuraHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-5"
    >
      <div className="flex items-center gap-3">
        <AuraLogo className="w-8 h-8 text-white" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight text-white leading-none">
            AuraHub
          </h1>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium leading-none mt-1">
            Comando Central
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full glass hover:bg-white/5 transition-colors">
          <Bell className="w-[18px] h-[18px] text-white/70" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-aura-red" />
        </button>
        <button className="p-2 rounded-full glass hover:bg-white/5 transition-colors">
          <Settings className="w-[18px] h-[18px] text-white/70" strokeWidth={1.5} />
        </button>
      </div>
    </motion.header>
  );
}

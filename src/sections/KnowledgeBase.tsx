import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Plus, Trash2, Pin, BookOpen } from "lucide-react";

interface Note {
  id: number;
  content: string;
  date: string;
  pinned: boolean;
}

const initialNotes: Note[] = [
  {
    id: 1,
    content: "Focar em processos, não resultados. O resultado é consequência.",
    date: "Hoje",
    pinned: true,
  },
  {
    id: 2,
    content: "Meta Q3: Aumentar renda em 40% através de novos projetos.",
    date: "Ontem",
    pinned: true,
  },
  {
    id: 3,
    content: "Livro atual: 'Extreme Ownership' - Jocko Willink",
    date: "2 dias atrás",
    pinned: false,
  },
];

export function KnowledgeBase() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [hovered, setHovered] = useState(false);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now(),
      content: newNote,
      date: "Agora",
      pinned: false,
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id: number) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const sortedNotes = [...notes].sort((a, b) =>
    a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass rounded-3xl p-5 transition-all duration-500 ${
        hovered ? "glow-red-intense" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-aura-red/10">
            <Brain className="w-4 h-4 text-aura-red" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-white/90">Second Brain</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02]">
          <BookOpen className="w-3 h-3 text-white/40" strokeWidth={1.5} />
          <span className="text-[10px] text-white/40">{notes.length} notas</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Nova nota rápida..."
          className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-aura-red/40 transition-colors"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={addNote}
          className="p-2 rounded-xl bg-aura-red/10 border border-aura-red/20 text-aura-red hover:bg-aura-red/20 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {sortedNotes.map((note, idx) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className={`group relative rounded-xl p-3 transition-all ${
                note.pinned
                  ? "bg-aura-red/5 border border-aura-red/10"
                  : "bg-white/[0.02] border border-white/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-white/80 leading-relaxed flex-1">
                  {note.content}
                </p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => togglePin(note.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      note.pinned
                        ? "text-aura-red bg-aura-red/10"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <Pin className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded-lg text-white/30 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <span className="text-[10px] text-white/20 mt-1.5 block">
                {note.date}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

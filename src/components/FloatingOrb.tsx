import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function FloatingOrb() {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <motion.button
      onClick={openModal}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center text-navy group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <MessageSquare size={24} className="relative z-10" />
    </motion.button>
  );
}

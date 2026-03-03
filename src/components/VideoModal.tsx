import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function VideoModal() {
  const { isVideoModalOpen, closeVideoModal } = useAppStore();

  return (
    <AnimatePresence>
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
            className="absolute inset-0 bg-navy/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              <X size={24} />
            </button>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy/40 to-black">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-cyan/20 backdrop-blur-xl border border-cyan/50 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Play size={40} className="text-cyan fill-cyan ml-1" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white mb-2 sm:mb-4">Lumina Law Partners</h3>
                <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto px-4">
                  Discover how we are redefining the legal landscape for the digital age.
                </p>
              </div>
              
              {/* Fake video overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-cyan" 
                    />
                  </div>
                  <span className="text-xs font-mono text-white/60">02:14 / 04:50</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

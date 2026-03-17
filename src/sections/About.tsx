import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

export function About() {
  const { language } = useAppStore();
  const t = translations[language].about;

  return (
    <section id="about" className="py-24 md:py-32 bg-[#060C18] relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white mb-8">
              {t.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">{t.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
              {t.desc1}
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8 md:mb-12">
              {t.desc2}
            </p>

            <div className="flex flex-wrap gap-4">
              {t.values.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <LiquidGlass intensity="light" className="px-6 py-3 rounded-full border-cyan/20">
                    <span className="text-sm font-medium tracking-wide text-white/80 uppercase">{value}</span>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-navy/20 to-transparent" />
            
            <div className="space-y-12">
              {t.timeline.map((item, index) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white border-2 border-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">
                    <span className="text-cyan mr-4">{item.year}</span>
                    {item.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

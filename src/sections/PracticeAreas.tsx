import { motion } from "motion/react";
import { Shield, Cpu, Network, Briefcase, Globe, Scale } from "lucide-react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const icons = [
  <Cpu size={32} className="text-cyan" />,
  <Shield size={32} className="text-navy" />,
  <Briefcase size={32} className="text-gold" />,
  <Network size={32} className="text-cyan" />,
  <Globe size={32} className="text-navy" />,
  <Scale size={32} className="text-gold" />,
];

export function PracticeAreas() {
  const { language } = useAppStore();
  const t = translations[language].practice;

  return (
    <section id="practice" className="py-24 md:py-32 bg-[#FAFAFA] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-navy mb-6">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan">{t.titleHighlight}</span>
          </h2>
          <p className="text-lg text-navy/80 font-light">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.items.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
            >
              <LiquidGlass 
                intensity="light" 
                className="p-8 h-full group relative transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,229,255,0.1)] border-white/40 hover:border-cyan/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mb-6 inline-block p-3 rounded-2xl bg-white/50 border border-white/80 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-navy mb-4 group-hover:text-cyan transition-colors duration-300">
                    {practice.title}
                  </h3>
                  <p className="text-navy/60 leading-relaxed font-light group-hover:text-navy/80 transition-colors duration-300">
                    {practice.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center text-xs font-semibold tracking-widest text-cyan opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 uppercase">
                    <span>{language === 'pl' ? 'Dowiedz się więcej' : 'Learn More'}</span>
                    <div className="ml-2 w-8 h-[1px] bg-cyan" />
                  </div>
                </motion.div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

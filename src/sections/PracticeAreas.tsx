import { motion } from "motion/react";
import { Shield, Cpu, Network, Briefcase, Globe, Scale } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const icons = [
  Cpu,
  Shield,
  Briefcase,
  Network,
  Globe,
  Scale,
];

const accentColors = [
  "text-cyan border-cyan/30 bg-cyan/5",
  "text-white border-white/20 bg-white/5",
  "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5",
  "text-cyan border-cyan/30 bg-cyan/5",
  "text-white border-white/20 bg-white/5",
  "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5",
];

const numberColors = ["text-cyan/40", "text-white/20", "text-[#D4AF37]/40", "text-cyan/40", "text-white/20", "text-[#D4AF37]/40"];

export function PracticeAreas() {
  const { language } = useAppStore();
  const t = translations[language].practice;

  return (
    <section id="practice" className="bg-[#080F1E] relative z-10 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-xs font-medium tracking-[0.2em] text-cyan uppercase">
                {language === "pl" ? "Specjalizacje" : "Specializations"}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-white leading-[1.05]">
              {t.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white/80 to-[#D4AF37]">
                {t.titleHighlight}
              </span>
            </h2>
          </div>
          <p className="text-white/50 font-light leading-relaxed max-w-sm text-sm md:text-base">
            {t.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((practice, index) => {
            const Icon = icons[index];
            const isLast = index === t.items.length - 1;
            const isSecondLast = index === t.items.length - 2;
            const noRightBorder = (index + 1) % 3 === 0;
            const noRightBorderMd = (index + 1) % 2 === 0;

            return (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative p-8 md:p-10 border-b border-white/[0.06] cursor-default
                  ${!noRightBorder ? "lg:border-r lg:border-white/[0.06]" : ""}
                  ${!noRightBorderMd ? "md:border-r md:border-white/[0.06] lg:border-r-0" : ""}
                  ${noRightBorderMd && !noRightBorder ? "md:border-r-0 lg:border-r lg:border-white/[0.06]" : ""}
                `}
              >
                {/* hover fill */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* number */}
                  <span className={`block text-7xl font-display font-bold leading-none mb-6 select-none transition-opacity duration-300 group-hover:opacity-60 ${numberColors[index]}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* icon */}
                  <div className={`inline-flex p-3 rounded-xl border mb-6 transition-transform duration-300 group-hover:scale-110 ${accentColors[index]}`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-semibold text-white mb-3 group-hover:text-cyan transition-colors duration-300 leading-snug">
                    {practice.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                    {practice.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                    <div className="w-6 h-px bg-cyan" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-cyan font-semibold">
                      {language === "pl" ? "Dowiedz się więcej" : "Learn More"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-[#080F1E] to-[#060C18]" />
    </section>
  );
}

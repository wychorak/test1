import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const images = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=600",
];

export function Cases() {
  const { language } = useAppStore();
  const t = translations[language].cases;

  return (
    <section id="cases" className="py-24 md:py-32 bg-navy text-white relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-6">
              {t.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan">{t.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/90 font-light">
              {t.subtitle}
            </p>
          </div>
          <a href="#" className="inline-flex items-center text-cyan hover:text-white transition-colors font-medium group">
            {t.viewAll}
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {t.items.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={images[index]}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors duration-500" />
                
                <div className="absolute top-4 left-4">
                  <LiquidGlass intensity="light" className="px-4 py-1.5 rounded-full border-white/20 backdrop-blur-md">
                    <span className="text-xs font-medium tracking-wide text-white uppercase">{item.client}</span>
                  </LiquidGlass>
                </div>
              </div>
              
              <h3 className="text-2xl font-display font-semibold text-white mb-3">{item.result}</h3>
              <p className="text-white/80 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

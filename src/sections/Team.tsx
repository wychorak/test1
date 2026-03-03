import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { Linkedin, Mail } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const images = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800",
];

export function Team() {
  const { language } = useAppStore();
  const t = translations[language].team;

  return (
    <section id="team" className="py-24 md:py-32 bg-[#FAFAFA] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-navy mb-6">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan">{t.titleHighlight}</span>
          </h2>
          <p className="text-lg text-navy/80 font-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <img
                  src={images[index]}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <LiquidGlass intensity="medium" className="p-4 backdrop-blur-xl border-white/30">
                    <p className="text-white/90 text-sm font-light leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-cyan hover:text-navy transition-colors">
                        <Linkedin size={14} />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-cyan hover:text-navy transition-colors">
                        <Mail size={14} />
                      </a>
                    </div>
                  </LiquidGlass>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-display font-semibold text-navy mb-1">{member.name}</h3>
                <p className="text-cyan font-medium text-sm mb-1 uppercase tracking-wider">{member.role}</p>
                <p className="text-navy/70 text-sm font-light">{member.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

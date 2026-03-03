import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const images = [
  "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800&h=600",
];

const phones = ["+48 22 123 45 67", "+44 20 7123 4567", "+1 212 555 0198"];
const emails = ["warsaw@luminalaw.com", "london@luminalaw.com", "ny@luminalaw.com"];

export function Contact() {
  const { openModal, language } = useAppStore();
  const t = translations[language].contact;

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative z-10 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-navy/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-navy mb-6">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-gold">{t.titleHighlight}</span>
          </h2>
          <p className="text-lg text-navy/80 font-light mb-8">
            {t.subtitle}
          </p>
          <Button onClick={openModal} className="text-lg px-8 py-4">
            {t.schedule}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <LiquidGlass intensity="light" className="h-full overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={images[index]}
                    alt={office.city}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-display font-semibold text-white drop-shadow-md">{office.city}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-cyan mt-1 mr-3 shrink-0" />
                    <p className="text-navy/80 font-light leading-relaxed">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-cyan mr-3 shrink-0" />
                    <p className="text-navy/80 font-light">{phones[index]}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="text-cyan mr-3 shrink-0" />
                    <p className="text-navy/80 font-light">{emails[index]}</p>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { ArrowUpRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const images = [
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800&h=600",
];

export function Insights() {
  const { language } = useAppStore();
  const t = translations[language].insights;

  return (
    <section id="insights" className="py-24 md:py-32 bg-[#060C18] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white mb-6">
              {t.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan">{t.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/60 font-light">
              {t.subtitle}
            </p>
          </div>
          <a href="#" className="inline-flex items-center text-cyan hover:text-navy transition-colors font-medium group">
            {t.readAll}
            <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.items.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group h-full"
            >
              <LiquidGlass intensity="light" className="flex flex-col h-full overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={images[index]}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium tracking-wide text-white bg-black/60 backdrop-blur-md rounded-full uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-white/50 mb-4 uppercase tracking-wider font-medium">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-4 group-hover:text-cyan transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center text-sm font-medium text-white/60 group-hover:text-cyan transition-colors">
                    {t.readArticle}
                    <ArrowUpRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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

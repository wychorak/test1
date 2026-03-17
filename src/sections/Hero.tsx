import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const stats = [
  { value: "50+", labelPl: "Klientów Jednorożców", labelEn: "Unicorn Clients" },
  { value: "$50B+", labelPl: "Zamkniętych Transakcji", labelEn: "Closed Transactions" },
  { value: "12+", labelPl: "Jurysdykcji", labelEn: "Jurisdictions" },
];

const marqueeItems = ["Regulacje AI", "Fuzje & Przejęcia", "Arbitraż Międzynarodowy", "Własność Intelektualna", "Prywatność Danych", "Ład Korporacyjny", "Fintech", "Startupy"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { openVideoModal, language } = useAppStore();
  const t = translations[language].hero;

  const scrollToForm = () => {
    document.querySelector("#letter-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const lineReveal = {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050A14]">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, -40, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Watermark LUMINA */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white font-display font-bold leading-none opacity-[0.025]" style={{ fontSize: "22vw", letterSpacing: "-0.02em" }}>
          LUMINA
        </span>
      </div>

      {/* Vertical text left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-medium" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          LUMINA LAW PARTNERS
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-white/20" />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-28 left-6 w-8 h-8 border-l border-t border-white/10 hidden lg:block" />
      <div className="absolute top-28 right-6 w-8 h-8 border-r border-t border-white/10 hidden lg:block" />
      <motion.div
        className="absolute top-28 right-6 w-1.5 h-1.5 rounded-full bg-cyan hidden lg:block"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto w-full"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-cyan"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">
                Kancelaria Premium · Est. 2018 · Warszawa · Londyn · NY
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-6 overflow-hidden">
            <motion.div variants={lineReveal} className="overflow-hidden">
              <h1 className="text-6xl sm:text-7xl md:text-[9rem] font-display font-semibold text-white leading-[0.9] tracking-tight">
                {language === "pl" ? "Prawo dla" : "Justice"}
              </h1>
            </motion.div>
            <motion.div variants={lineReveal} className="overflow-hidden">
              <h1 className="text-6xl sm:text-7xl md:text-[9rem] font-display font-semibold leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white/90 to-[#D4AF37] pb-2">
                {language === "pl" ? "Nowej Ery." : "Reimagined."}
              </h1>
            </motion.div>
          </div>

          {/* Animated line */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: "480px" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="text-center text-lg sm:text-xl text-white/50 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              >
                <span className="text-2xl font-display font-bold text-cyan">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
                  {language === "pl" ? stat.labelPl : stat.labelEn}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={scrollToForm} variant="white" className="w-full sm:w-auto text-base px-8 py-4">
              {t.ctaPrimary}
            </Button>
            <Button onClick={openVideoModal} variant="glass" className="w-full sm:w-auto text-base px-8 py-4 text-white hover:text-white">
              {t.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm py-3">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs font-medium tracking-[0.25em] uppercase text-white/25 shrink-0">
              {item}
              <span className="ml-10 text-cyan/30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

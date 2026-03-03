import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/Button";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

const navLinks = [
  { key: "practice", href: "#practice" },
  { key: "about", href: "#about" },
  { key: "team", href: "#team" },
  { key: "cases", href: "#cases" },
  { key: "insights", href: "#insights" },
  { key: "contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal, language, setLanguage } = useAppStore();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'pl' ? 'en' : 'pl');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(href, { offset: -80 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] px-6 py-3"
                : "bg-transparent px-0 py-0"
            }`}
          >
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, "#")}
              className={`text-2xl font-display font-semibold tracking-tight transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
            >
              LUMINA
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors ${scrolled ? 'text-navy/80 hover:text-navy' : 'text-white/80 hover:text-white'}`}
                >
                  {/* @ts-ignore */}
                  {t[link.key]}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${scrolled ? 'text-navy/80 hover:text-navy' : 'text-white/80 hover:text-white'}`}
              >
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
              </button>
              <Button onClick={openModal} variant={scrolled ? "primary" : "glass"}>
                {t.book}
              </Button>
            </div>

            <button
              className={`md:hidden p-2 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-white/80 flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-2xl font-display font-semibold text-navy">LUMINA</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-navy">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-display text-navy hover:text-cyan transition-colors"
                >
                  {/* @ts-ignore */}
                  {t[link.key]}
                </a>
              ))}
              <button 
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xl font-medium text-navy/80 hover:text-navy transition-colors"
              >
                <Globe size={24} />
                <span>{language === 'pl' ? 'English' : 'Polski'}</span>
              </button>
              <Button onClick={() => { setMobileMenuOpen(false); openModal(); }} className="mt-8">
                {t.book}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

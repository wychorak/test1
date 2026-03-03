import { ArrowUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useAppStore();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFAFA] py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-display font-semibold tracking-tight text-navy">
          LUMINA
        </div>
        
        <div className="text-sm text-navy/70 text-center md:text-left">
          © {new Date().getFullYear()} Lumina Law Partners – {t.rights}
        </div>

        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}

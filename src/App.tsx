import { useEffect } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { PracticeAreas } from './sections/PracticeAreas';
import { About } from './sections/About';
import { Team } from './sections/Team';
import { Cases } from './sections/Cases';
import { Insights } from './sections/Insights';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { FloatingOrb } from './components/FloatingOrb';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // @ts-ignore
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-navy font-sans overflow-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Team />
        <Cases />
        <Insights />
        <Contact />
      </main>

      <Footer />
      
      <FloatingOrb />
      <BookingModal />
      <VideoModal />
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#0A1428',
          borderRadius: '1rem',
        }
      }} />
    </div>
  );
}

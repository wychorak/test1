import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { PracticeAreas } from './sections/PracticeAreas';
import { About } from './sections/About';
import { Team } from './sections/Team';
import { Insights } from './sections/Insights';
import { Contact } from './sections/Contact';
import { LetterForm } from './sections/LetterForm';
import { Footer } from './components/Footer';
import { FloatingOrb } from './components/FloatingOrb';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';

export default function App() {

  return (
    <div className="relative min-h-screen bg-[#050A14] text-white font-sans overflow-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Team />
        <Insights />
        <Contact />
        <LetterForm />
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

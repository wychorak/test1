import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import * as THREE from "three";

function ScalesOfJustice() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} scale={1.5}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 32]} />
          <MeshTransmissionMaterial backside thickness={0.5} roughness={0.1} transmission={1} ior={1.5} chromaticAberration={0.05} />
        </mesh>
        <mesh position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 32]} />
          <MeshTransmissionMaterial backside thickness={0.5} roughness={0.1} transmission={1} ior={1.5} chromaticAberration={0.05} />
        </mesh>
        <mesh position={[-1.5, 1, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshTransmissionMaterial backside thickness={1} roughness={0} transmission={1} ior={1.5} chromaticAberration={0.1} color="#00E5FF" />
        </mesh>
        <mesh position={[1.5, 1, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshTransmissionMaterial backside thickness={1} roughness={0} transmission={1} ior={1.5} chromaticAberration={0.1} color="#D4AF37" />
        </mesh>
      </group>
    </Float>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { openModal, openVideoModal, language } = useAppStore();
  const t = translations[language].hero;

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-navy">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-navy/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/20 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
          alt="Modern dark architectural glass" 
          className="w-full h-[120%] object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <ScalesOfJustice />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="relative z-20 h-full min-h-[100dvh] flex items-center justify-center px-6 pt-32 pb-48">
        <motion.div 
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
          >
            <span className="text-sm font-medium tracking-wide text-white/90 uppercase">{t.tagline}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl font-display font-semibold tracking-tight text-white mb-8 leading-[1.1]"
          >
            {t.title} <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-cyan/80">{t.titleHighlight}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light"
          >
            {t.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button onClick={openModal} variant="white" className="w-full sm:w-auto text-lg px-8 py-4">
              {t.ctaPrimary}
            </Button>
            <Button onClick={openVideoModal} variant="glass" className="w-full sm:w-auto text-lg px-8 py-4 text-white hover:text-white">
              {t.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
}

import React, { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMousePosition } from './hooks/useMousePosition';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import SectionScene from './canvas/SectionScene';

function AppContent() {
  const { scrollProgress } = useScrollProgress();
  const mouse = useMousePosition();

  return (
    <div style={{ position: 'relative', background: 'var(--color-bg-primary)', minHeight: '100dvh' }}>
      {/* Ambient background particles throughout the whole page */}
      <Suspense fallback={null}>
        <SectionScene />
      </Suspense>

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero mouse={mouse} scrollProgress={scrollProgress} />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { ToastProvider } from './hooks/useToast';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import Events from './sections/Events';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

export default function App() {
  return (
    // reducedMotion="user" makes every Framer animation honour the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent-violet focus:px-4 focus:py-2 focus:text-snow"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Education />
          <Events />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </ToastProvider>
    </MotionConfig>
  );
}

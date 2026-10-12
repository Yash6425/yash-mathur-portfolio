import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks, profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { DownloadResumeLink } from './ResumeLinks';
import ThemeToggle from './ThemeToggle';

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${profile.name} — back to top`}>
          <span className="whitespace-nowrap font-display text-lg font-bold text-white transition-colors group-hover:text-accent-violet">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DownloadResumeLink className="btn-primary btn-sm hidden whitespace-nowrap sm:inline-flex">
            <span className="xl:hidden">Resume</span>
            <span className="hidden xl:inline">Download Resume</span>
          </DownloadResumeLink>
          <DownloadResumeLink kind="cv" className="btn-primary btn-sm hidden whitespace-nowrap sm:inline-flex">
            <span className="xl:hidden">CV</span>
            <span className="hidden xl:inline">Download CV</span>
          </DownloadResumeLink>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active === link.id ? 'bg-white/[0.07] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <DownloadResumeLink className="btn-primary w-full" onNavigate={() => setOpen(false)} />
              </li>
              <li>
                <DownloadResumeLink kind="cv" className="btn-ghost w-full" onNavigate={() => setOpen(false)} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

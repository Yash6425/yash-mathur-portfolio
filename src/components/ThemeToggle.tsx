import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#050816', light: '#f4f6fc' };

function readSaved(): Theme | null {
  try {
    const v = localStorage.getItem('theme');
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

/** Sun/moon button that switches between light and dark mode and remembers the choice. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark',
  );

  // Follow the device setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      if (readSaved()) return;
      const next: Theme = e.matches ? 'light' : 'dark';
      apply(next);
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked — the theme still changes for this visit */
    }
  };

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={`icon-btn relative h-10 w-10 overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {isLight ? <FiMoon size={18} /> : <FiSun size={18} className="text-amber-300" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

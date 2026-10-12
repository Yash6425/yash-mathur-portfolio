import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** Cycles through role titles with a vertical slide animation. */
export default function RoleTicker({ roles, interval = 2600 }: { roles: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), reduce ? interval * 1.5 : interval);
    return () => window.clearInterval(id);
  }, [roles.length, interval, reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      {/* Screen readers get the full list once instead of constant announcements. */}
      <span className="sr-only">{roles.join(', ')}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text animate-gradient whitespace-nowrap font-semibold"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-accent-violet" />
    </span>
  );
}

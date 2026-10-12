import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import { FaJava, FaReact, FaLinux } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import { profile } from '../data/profile';

/**
 * Profile photo card. Place your own photo at public/images/profile.jpg.
 * Until it exists, a clean initials placeholder is shown (never a stock photo).
 */
export default function ProfilePhoto() {
  const [state, setState] = useState<'loading' | 'loaded' | 'missing'>('loading');

  const floatingBadges = [
    { Icon: FaJava, label: 'Java', className: 'left-0 top-4 sm:-left-2', color: '#f89820', delay: 0 },
    { Icon: FaReact, label: 'React', className: 'right-0 top-10 sm:-right-2', color: '#61dafb', delay: 1.2 },
    { Icon: SiMongodb, label: 'MongoDB', className: 'left-1 bottom-6 sm:-left-1', color: '#47a248', delay: 0.6 },
    { Icon: FaLinux, label: 'Linux', className: 'right-1 bottom-2 sm:-right-1', color: '#fcc624', delay: 1.8 },
  ];

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[18rem] flex-col items-center sm:max-w-[20rem]"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full px-6 py-4"
      >
        {/* soft glow */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-blue/40 via-accent-violet/35 to-transparent blur-3xl" aria-hidden="true" />

        {/* circular photo with rotating gradient ring */}
        <div className="relative mx-auto aspect-square w-full max-w-[15rem] overflow-hidden rounded-full p-[4px] shadow-2xl shadow-violet-900/40 sm:max-w-[16.5rem]">
          <div
            className="absolute -inset-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,#38bdf8,#4f8cff,#8b5cf6,#ec4899,#38bdf8)]"
            aria-hidden="true"
          />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-ink-950 bg-ink-900">
            {state !== 'missing' && (
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                width={480}
                height={480}
                decoding="async"
                onLoad={() => setState('loaded')}
                onError={() => setState('missing')}
                className={`h-full w-full origin-[50%_28%] scale-[1.3] object-cover object-[50%_22%] transition-opacity duration-500 ${
                  state === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {state !== 'loaded' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,rgba(79,140,255,0.25),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(139,92,246,0.3),transparent_55%)]">
                <span className="font-display text-5xl font-bold text-white">
                  {state === 'missing' ? profile.initials : <FiUser className="text-slate-500" />}
                </span>
                {state === 'missing' && (
                  <p className="px-8 text-center font-mono text-[10px] text-slate-500">add public/images/profile.jpg</p>
                )}
              </div>
            )}
          </div>
        </div>

        {floatingBadges.map(({ Icon, label, className, color, delay }) => (
          <motion.div
            key={label}
            className={`absolute ${className} grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-ink-800/90 shadow-lg backdrop-blur sm:h-12 sm:w-12`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
            title={label}
            aria-hidden="true"
          >
            <Icon size={22} color={color} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

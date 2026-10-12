import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { profile } from '../data/profile';
import ProfilePhoto from '../components/ProfilePhoto';
import RoleTicker from '../components/RoleTicker';
import { DownloadResumeLink, ViewResumeLink } from '../components/ResumeLinks';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pt-32">
      {/* background */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 animate-gradient rounded-full bg-gradient-to-r from-accent-blue/25 via-accent-violet/20 to-accent-cyan/20 bg-[length:200%_200%] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.p variants={item} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships & software roles
          </motion.p>

          <motion.p variants={item} className="font-mono text-sm text-accent-cyan sm:text-base">
            Hello, I'm
          </motion.p>
          <motion.h1 variants={item} className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-display text-xl font-semibold text-slate-200 sm:text-2xl">
            {profile.headline}
          </motion.p>
          <motion.p variants={item} className="mt-3 text-lg text-slate-400 sm:text-xl">
            <span className="mr-2">I'm a</span>
            <RoleTicker roles={profile.roles} />
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#projects" className="btn-primary group">
              Explore My Work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <DownloadResumeLink className="btn-ghost" />
            <DownloadResumeLink kind="cv" className="btn-ghost" />
          </motion.div>
          <motion.div variants={item} className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start">
            <span>Preview:</span>
            <ViewResumeLink className="btn-ghost btn-sm" />
            <ViewResumeLink kind="cv" className="btn-ghost btn-sm" />
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile (opens in new tab)">
              <FaGithub size={19} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in new tab)">
              <FaLinkedin size={19} />
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
              <FiMapPin aria-hidden="true" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <ProfilePhoto />
      </div>
    </section>
  );
}

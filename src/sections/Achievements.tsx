import { motion } from 'framer-motion';
import { FiBookmark, FiBriefcase, FiCode, FiUsers } from 'react-icons/fi';
import { achievements } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const icons = [FiUsers, FiBriefcase, FiCode, FiBookmark];

export default function Achievements() {
  return (
    <section id="achievements" className="section pt-0 sm:pt-0" aria-labelledby="achievements-title">
      <div className="container-x">
        <SectionHeading id="achievements-title" eyebrow="Achievements & activities" title="Beyond the classroom" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={a.title} delay={i * 0.08}>
                <motion.article whileHover={{ y: -5 }} className="glass group h-full p-6 transition-colors hover:border-accent-violet/40">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/25 text-accent-cyan ring-1 ring-white/10 transition group-hover:rotate-6">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="chip">{a.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.detail}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

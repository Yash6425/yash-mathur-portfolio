import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-72 bg-gradient-to-r from-accent-blue/5 via-accent-violet/10 to-transparent blur-3xl" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title="Technologies I work with"
          description="The languages, tools and concepts from my coursework, training programs and projects."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06} className={gi === skillGroups.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <div className="glass h-full p-5 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet" aria-hidden="true" />
                  {group.title}
                </h3>
                <ul className="grid grid-cols-2 gap-2.5">
                  {group.skills.map(({ name, icon: Icon, color }) => (
                    <motion.li
                      key={name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.06] bg-ink-900/60 px-3 py-2.5 transition-colors hover:border-white/15"
                    >
                      <Icon size={20} color={color} className="shrink-0 text-white" aria-hidden="true" />
                      <span className="text-sm leading-tight text-slate-200">{name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

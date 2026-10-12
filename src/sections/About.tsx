import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiLayers, FiSmartphone } from 'react-icons/fi';
import { profile } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const focusAreas = [
  { icon: FiCode, title: 'Software Development', text: 'Building practical applications with clean, object-oriented code.' },
  { icon: FiLayers, title: 'Java & Full Stack Development', text: 'Java training plus full-stack work across HTML, CSS, JavaScript and React.js.' },
  { icon: FiDatabase, title: 'Database Technologies', text: 'Working with SQL, MongoDB and core DBMS concepts.' },
  { icon: FiSmartphone, title: 'Android & ML Projects', text: 'A Kotlin stopwatch app and a Python spam-detection model.' },
];

const facts = [
  { label: 'Program', value: 'Integrated BCA + MCA' },
  { label: 'University', value: 'Galgotias University' },
  { label: 'Batch', value: '2024 – 2029' },
  { label: 'Based in', value: 'Gurugram, India' },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-x">
        <SectionHeading id="about-title" eyebrow="About me" title="Learning by building real software" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-300">{profile.about}</p>
            <p className="leading-relaxed text-slate-400">{profile.seeking}</p>
            <dl className="glass grid grid-cols-2 gap-px overflow-hidden p-0">
              {facts.map((f) => (
                <div key={f.label} className="bg-ink-950/40 p-4 sm:p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{f.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-white sm:text-base">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <motion.article whileHover={{ y: -4 }} className="glass group h-full p-5 transition-colors hover:border-accent-violet/40">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 text-accent-cyan ring-1 ring-white/10 transition group-hover:scale-110">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

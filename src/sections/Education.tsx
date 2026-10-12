import { FiBookOpen, FiCalendar } from 'react-icons/fi';
import { education } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container-x">
        <SectionHeading id="education-title" eyebrow="Education" title="Academic journey" />
        <ol className="relative ml-3 border-l border-white/10 sm:ml-4">
          {education.map((e, i) => (
            <li key={e.institution} className="relative pb-2 pl-8 sm:pl-12">
              <span className="absolute -left-[13px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-accent-blue to-accent-violet ring-4 ring-ink-950" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-snow" />
              </span>
              <Reveal delay={i * 0.1}>
                <article className="glass p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-accent-cyan ring-1 ring-white/10 sm:grid">
                        <FiBookOpen size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold sm:text-2xl">{e.institution}</h3>
                        <p className="mt-1 text-slate-300">{e.program}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
                        <FiCalendar aria-hidden="true" /> {e.duration}
                      </span>
                      <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                        {e.status}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

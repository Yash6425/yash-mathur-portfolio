import { useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FiAward, FiCalendar, FiHeart, FiMic, FiShield, FiUsers } from 'react-icons/fi';
import { events, type EventIcon, type EventItem } from '../data/events';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const iconMap: Record<EventIcon, IconType> = {
  sports: FiAward,
  hackathon: FiShield,
  orientation: FiMic,
  community: FiHeart,
};

const gradients: Record<EventIcon, string> = {
  sports: 'from-emerald-500/30 via-teal-500/20 to-sky-600/30',
  hackathon: 'from-orange-500/25 via-rose-500/20 to-violet-600/30',
  orientation: 'from-sky-500/30 via-indigo-500/25 to-violet-600/30',
  community: 'from-amber-400/25 via-rose-500/20 to-fuchsia-600/30',
};

function EventCover({ event }: { event: EventItem }) {
  const [failed, setFailed] = useState(false);
  const photo = event.photos?.[0];
  const Icon = iconMap[event.icon];

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={`${event.title}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[event.icon]}`}>
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <Icon size={52} className="relative text-white/90 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
    </div>
  );
}

export default function Events() {
  return (
    <section id="events" className="section" aria-labelledby="events-title">
      <div className="container-x">
        <SectionHeading
          id="events-title"
          eyebrow="Leadership & events"
          title="Leading tech at campus events"
          description="As Tech Head of the SCAT Department, I manage the technical side of department events, and I volunteered with the cyber cell at Smart India Hackathon 2025."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass group flex h-full flex-col overflow-hidden transition-colors hover:border-accent-violet/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                  <EventCover event={event} />
                  {event.year && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950/80 px-2.5 py-1 font-mono text-[11px] text-slate-200 ring-1 ring-white/10 backdrop-blur">
                      <FiCalendar aria-hidden="true" /> {event.year}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold">{event.title}</h3>
                  <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-violet/25 px-2.5 py-1 text-xs font-semibold text-sky-200 ring-1 ring-white/10">
                    <FiUsers aria-hidden="true" /> {event.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{event.organisation}</p>
                  {event.description && <p className="mt-2 text-sm leading-relaxed text-slate-400">{event.description}</p>}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

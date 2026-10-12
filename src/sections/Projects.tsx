import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight, FiCheckCircle, FiExternalLink, FiInfo } from 'react-icons/fi';
import { isProjectRecord, projects as localProjects, withProjectStyle, type Project } from '../data/projects';
import { useApiList } from '../hooks/useApiList';
import DataSourceBadge from '../components/DataSourceBadge';
import { profile } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Modal from '../components/Modal';

function ProjectThumb({ project, large = false }: { project: Project; large?: boolean }) {
  const Icon = project.icon;
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover ${large ? 'aspect-[16/8]' : 'aspect-[16/9]'}`}
      />
    );
  }
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} ${
        large ? 'aspect-[16/7]' : 'aspect-[16/9]'
      }`}
      role="img"
      aria-label={`Illustration for ${project.title}`}
    >
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute left-4 top-4 flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <Icon className="relative text-white/90 drop-shadow-[0_8px_24px_rgba(79,140,255,0.5)] transition-transform duration-500 group-hover:scale-110" size={large ? 84 : 64} aria-hidden="true" />
      <span className="absolute bottom-3 right-4 font-mono text-[10px] text-white/50">{project.tech[0].toLowerCase()} · project</span>
    </div>
  );
}

function RepoLink({ project, small = false }: { project: Project; small?: boolean }) {
  const cls = small ? 'btn-ghost btn-sm' : 'btn-ghost';
  if (project.repoUrl) {
    return (
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={cls}>
        <FaGithub aria-hidden="true" /> GitHub Repository
      </a>
    );
  }
  // No public repo link on the resume yet — point honestly to the GitHub profile instead.
  return (
    <a href={profile.github} target="_blank" rel="noopener noreferrer" className={cls} title="Repository link not published yet">
      <FaGithub aria-hidden="true" /> GitHub Profile
    </a>
  );
}

export default function Projects() {
  const { items: records, source } = useApiList('/projects', 'projects', localProjects, isProjectRecord);
  const projects = useMemo(() => withProjectStyle(records), [records]);
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  // Keep the last project rendered while the modal plays its exit animation.
  const lastRef = useRef<Project | null>(null);
  if (selected) lastRef.current = selected;
  const current = selected ?? lastRef.current;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Things I've built"
          description="Current and completed projects across AI, Android and full-stack web development."
        />

        <DataSourceBadge source={source} className="-mt-8 mb-8" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass group flex h-full flex-col overflow-hidden transition-colors hover:border-accent-violet/40"
              >
                <div className="overflow-hidden border-b border-white/[0.06]">
                  <ProjectThumb project={project} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {project.status && (
                    <p className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/25">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" aria-hidden="true" />
                      {project.status}
                    </p>
                  )}
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {project.tech.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <button type="button" className="btn-primary btn-sm" onClick={() => setSelected(project)}>
                      <FiInfo aria-hidden="true" /> View Details
                    </button>
                    <RepoLink project={project} small />
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
                        <FiExternalLink aria-hidden="true" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white">
            See more on GitHub <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>

      <Modal open={!!selected} onClose={close} labelledBy="project-modal-title">
        {current && (
          <div>
            <ProjectThumb project={current} large />
            <div className="p-6 sm:p-8">
              <h3 id="project-modal-title" className="text-2xl font-bold">{current.title}</h3>
              {current.status && <p className="mt-2 text-sm font-semibold text-amber-200">{current.status}</p>}
              <p className="mt-3 leading-relaxed text-slate-400">{current.summary}</p>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-300">What I did</h4>
              <ul className="mt-3 space-y-2.5">
                {current.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-300">Tech stack</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <RepoLink project={current} />
                {current.liveUrl && (
                  <a href={current.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <FiExternalLink aria-hidden="true" /> Live Demo
                  </a>
                )}
              </div>
              {!current.repoUrl && (
                <p className="mt-4 text-xs text-slate-500">The repository link for this project hasn't been published yet.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

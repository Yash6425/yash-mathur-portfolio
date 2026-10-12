import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiDownload, FiExternalLink, FiMaximize2, FiSearch, FiShield, FiX } from 'react-icons/fi';
import { certCategories, certificates as localCertificates, isCertificate, type CertCategory, type Certificate } from '../data/certificates';
import { useApiList } from '../hooks/useApiList';
import DataSourceBadge from '../components/DataSourceBadge';
import { useAssetAvailable } from '../hooks/useAssetAvailable';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Modal from '../components/Modal';
import CertificateMedia from '../components/CertificateMedia';

type Filter = 'All' | CertCategory;

function fileName(path: string) {
  return path.split('/').pop() ?? 'certificate';
}

function CertificateCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  const status = useAssetAvailable(cert.file);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="glass group flex h-full w-full flex-col overflow-hidden text-left transition-[border-color,box-shadow] hover:border-accent-violet/45 hover:shadow-[0_24px_50px_-20px_rgba(139,92,246,0.45)]"
      aria-label={`Open ${cert.title}${cert.issuer ? ` by ${cert.issuer}` : ''}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/[0.06] bg-ink-900">
        <CertificateMedia cert={cert} status={status} variant="card" />
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-300 ring-1 ring-white/10 backdrop-blur">
          {cert.type}
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-ink-950/70 text-slate-300 opacity-0 ring-1 ring-white/10 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
          <FiMaximize2 size={14} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-white">{cert.title}</h3>
        {(cert.issuer || cert.note) && <p className="mt-1 text-sm text-slate-400">{cert.issuer ?? cert.note}</p>}
        {(cert.issueDate || cert.credentialId) && (
          <p className="mt-1 font-mono text-[11px] text-slate-500">
            {cert.issueDate}
            {cert.issueDate && cert.credentialId && ' · '}
            {cert.credentialId && `ID ${cert.credentialId}`}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {cert.categories.map((c) => (
            <span key={c} className="chip text-[10px]">{c}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function CertificatePreview({ cert }: { cert: Certificate }) {
  const status = useAssetAvailable(cert.file);
  const available = status === 'available' && !!cert.file;

  return (
    <div>
      <div className="flex min-h-[260px] items-center justify-center overflow-hidden border-b border-white/[0.06] bg-ink-950 sm:min-h-[340px]">
        <div className={`w-full ${available ? '' : 'h-[300px] sm:h-[360px]'}`}>
          <CertificateMedia key={cert.id} cert={cert} status={status} variant="preview" />
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent-cyan">{cert.type}</p>
        <h3 id="cert-modal-title" className="mt-2 pr-10 text-2xl font-bold">{cert.title}</h3>
        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {cert.issuer && (
            <div><dt className="text-slate-500">Issued by</dt><dd className="text-slate-200">{cert.issuer}</dd></div>
          )}
          {cert.note && (
            <div><dt className="text-slate-500">Details</dt><dd className="text-slate-200">{cert.note}</dd></div>
          )}
          {cert.issueDate && (
            <div><dt className="text-slate-500">Date</dt><dd className="text-slate-200">{cert.issueDate}</dd></div>
          )}
          {cert.credentialId && (
            <div><dt className="text-slate-500">Credential ID</dt><dd className="font-mono text-slate-200">{cert.credentialId}</dd></div>
          )}
          <div><dt className="text-slate-500">Category</dt><dd className="text-slate-200">{cert.categories.join(', ')}</dd></div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {available && cert.file ? (
            <>
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FiExternalLink aria-hidden="true" /> View Full Certificate
              </a>
              <a href={cert.file} download={fileName(cert.file)} className="btn-ghost">
                <FiDownload aria-hidden="true" /> Download Certificate
              </a>
            </>
          ) : status === 'checking' ? null : (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
              The certificate file hasn't been uploaded yet, so viewing and downloading are unavailable for now.
            </p>
          )}
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FiShield aria-hidden="true" /> Verify Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const { items: certificates, source } = useApiList('/certificates', 'certificates', localCertificates, isCertificate);
  // Newest first: 2026 → 2021.
  const sortedCertificates = useMemo(
    () => [...certificates].sort((a, b) => b.date.localeCompare(a.date)),
    [certificates],
  );
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedCertificates.filter((c) => {
      const matchesFilter = filter === 'All' || c.categories.includes(filter);
      const haystack = [c.title, c.issuer, c.note, c.type, c.date.slice(0, 4), ...c.categories].join(' ').toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [filter, query, sortedCertificates]);

  // Group the visible certificates by year (already newest-first).
  const groups = useMemo(() => {
    const byYear = new Map<string, Certificate[]>();
    visible.forEach((c) => {
      const year = c.date.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), c]);
    });
    return [...byYear.entries()];
  }, [visible]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['All', certificates.length]]);
    certCategories.forEach((cat) => map.set(cat, certificates.filter((c) => c.categories.includes(cat)).length));
    return map;
  }, [certificates]);

  // Next/previous moves through the currently filtered list.
  const index = visible.findIndex((c) => c.id === openId);
  const current = index >= 0 ? visible[index] : null;
  const lastRef = useRef<Certificate | null>(null);
  if (current) lastRef.current = current;
  const shown = current ?? lastRef.current;

  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index < 0 || visible.length < 2) return;
      setOpenId(visible[(index + dir + visible.length) % visible.length].id);
    },
    [index, visible],
  );
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    },
    [step],
  );

  const filters: Filter[] = ['All', ...certCategories];

  return (
    <section id="certificates" className="section" aria-labelledby="certificates-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_65%)]" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          id="certificates-title"
          eyebrow="Credentials"
          title="Certifications & Workshops"
          description={`${certificates.length} verified certificates from training programs, courses, an internship, workshops and events. Tap any card to view the full certificate.`}
        />

        {/* Toolbar */}
        <Reveal className="glass mb-8 p-4 sm:p-5">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <label htmlFor="cert-search" className="sr-only">Search certificates by name or issuer</label>
            <input
              id="cert-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or issuer — e.g. Oracle, Cisco, Java"
              className="input pl-11 pr-11"
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible" role="group" aria-label="Filter certificates by category">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active ? 'text-snow' : 'border border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="cert-filter" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  {f} <span className={active ? 'text-snow/70' : 'text-slate-600'}>{counts.get(f)}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-500" aria-live="polite">
            Showing {visible.length} of {certificates.length}
          </p>
          <DataSourceBadge source={source} />
        </div>

        {visible.length ? (
          <div className="space-y-12">
            {groups.map(([year, items]) => (
              <section key={year} aria-label={`Certificates from ${year}`}>
                <div className="mb-5 flex items-center gap-4">
                  <h3 className="gradient-text font-display text-2xl font-bold sm:text-3xl">{year}</h3>
                  <span className="chip">{items.length} {items.length === 1 ? 'certificate' : 'certificates'}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" aria-hidden="true" />
                </div>
                <motion.ul layout className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((cert) => (
                      <motion.li
                        key={cert.id}
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CertificateCard cert={cert} onOpen={() => setOpenId(cert.id)} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
            <FiSearch size={28} className="text-slate-500" aria-hidden="true" />
            <p className="text-slate-300">No certificates match your search.</p>
            <button type="button" className="btn-ghost btn-sm" onClick={() => { setQuery(''); setFilter('All'); }}>
              Reset filters
            </button>
          </div>
        )}
      </div>

      <Modal open={!!current} onClose={close} labelledBy="cert-modal-title" onKey={onKey} maxWidth="max-w-4xl">
        {shown && (
          <>
            <CertificatePreview cert={shown} />
            {visible.length > 1 && index >= 0 && (
              <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4 sm:px-8">
                <button type="button" className="btn-ghost btn-sm" onClick={() => step(-1)} aria-label="Previous certificate">
                  <FiChevronLeft aria-hidden="true" /> Previous
                </button>
                <span className="font-mono text-xs text-slate-500">{index + 1} / {visible.length}</span>
                <button type="button" className="btn-ghost btn-sm" onClick={() => step(1)} aria-label="Next certificate">
                  Next <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </Modal>
    </section>
  );
}

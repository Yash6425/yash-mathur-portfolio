import type { MouseEvent, ReactNode } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';
import { profile } from '../data/profile';
import { useAssetAvailable } from '../hooks/useAssetAvailable';
import { useToast } from '../hooks/useToast';

/** The two downloadable documents: the one-page resume and the detailed CV. */
const DOCS = {
  resume: { url: profile.resumeUrl, file: profile.resumeDownloadName, label: 'Resume' },
  cv: { url: profile.cvUrl, file: profile.cvDownloadName, label: 'CV' },
} as const;

export type DocKind = keyof typeof DOCS;

function useDocGuard(kind: DocKind) {
  const doc = DOCS[kind];
  const status = useAssetAvailable(doc.url);
  const { notify } = useToast();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (status === 'missing') {
      e.preventDefault();
      notify(`The ${doc.label} PDF is not available right now. Please email ${profile.email} and a copy will be sent to you.`);
    }
  };
  return { doc, onClick };
}

interface LinkProps {
  className?: string;
  children?: ReactNode;
  onNavigate?: () => void;
  kind?: DocKind;
}

export function DownloadDocLink({ className = 'btn-primary', children, onNavigate, kind = 'resume' }: LinkProps) {
  const { doc, onClick } = useDocGuard(kind);
  return (
    <a
      href={doc.url}
      download={doc.file}
      className={className}
      onClick={(e) => {
        onClick(e);
        onNavigate?.();
      }}
    >
      <FiDownload aria-hidden="true" />
      {children ?? `Download ${doc.label}`}
    </a>
  );
}

export function ViewDocLink({ className = 'btn-ghost', children, onNavigate, kind = 'resume' }: LinkProps) {
  const { doc, onClick } = useDocGuard(kind);
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        onClick(e);
        onNavigate?.();
      }}
    >
      <FiEye aria-hidden="true" />
      {children ?? `View ${doc.label}`}
      <span className="sr-only">(opens PDF in a new tab)</span>
    </a>
  );
}

// Names used elsewhere in the site.
export const DownloadResumeLink = DownloadDocLink;
export const ViewResumeLink = ViewDocLink;

import { useState } from 'react';
import { FiAward, FiFileText, FiUploadCloud } from 'react-icons/fi';
import type { Certificate } from '../data/certificates';
import { isImage, isPdf, type AssetStatus } from '../hooks/useAssetAvailable';

interface Props {
  cert: Certificate;
  status: AssetStatus;
  variant: 'card' | 'preview';
}

/** Placeholder shown while a genuine certificate file has not been uploaded. */
function Placeholder({ cert, variant }: { cert: Certificate; variant: Props['variant'] }) {
  const big = variant === 'preview';
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(79,140,255,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.22),transparent_50%)] text-center ${
        big ? 'gap-4 p-8' : 'gap-2 p-4'
      }`}
    >
      {/* decorative certificate frame */}
      <div className="absolute inset-3 rounded-xl border border-dashed border-white/15" aria-hidden="true" />
      <span className={`grid place-items-center rounded-full bg-gradient-to-br from-accent-blue/25 to-accent-violet/25 text-accent-cyan ring-1 ring-white/10 ${big ? 'h-16 w-16' : 'h-11 w-11'}`}>
        <FiAward size={big ? 28 : 20} aria-hidden="true" />
      </span>
      {big ? (
        <p className="relative max-w-[90%] font-display text-xl font-semibold text-white">{cert.title}</p>
      ) : (
        <p className="relative max-w-[85%] truncate font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
          {cert.issuer ?? cert.note ?? 'Certificate'}
        </p>
      )}
      <p className={`relative inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 font-mono text-amber-200 ${big ? 'text-xs' : 'text-[10px]'}`}>
        <FiUploadCloud aria-hidden="true" />
        {big ? 'Certificate file not uploaded yet' : 'File not uploaded yet'}
      </p>
      {big && (
        <p className="relative max-w-sm text-sm text-slate-400">
          This entry is listed on the resume. The scanned certificate will appear here once it's added.
        </p>
      )}
    </div>
  );
}

function PdfTile({ cert, variant }: { cert: Certificate; variant: Props['variant'] }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#f1f5f9] to-[#cbd5e1] p-4 text-center">
      <FiFileText size={variant === 'preview' ? 48 : 34} className="text-rose-500" aria-hidden="true" />
      <p className="line-clamp-2 max-w-[85%] font-display text-sm font-semibold text-[#1e293b]">{cert.title}</p>
      <span className="rounded bg-rose-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-snow">PDF</span>
    </div>
  );
}

/** Renders the right preview for a certificate: image, PDF, or a clearly marked placeholder. */
export default function CertificateMedia({ cert, status, variant }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const available = status === 'available';

  if (status === 'checking') {
    return <div className="h-full w-full animate-pulse bg-white/[0.04]" aria-label="Loading certificate preview" />;
  }

  // Large preview
  if (variant === 'preview' && available && cert.file) {
    if (isImage(cert.file) && !imgFailed) {
      return (
        <img
          src={cert.file}
          alt={`${cert.title} certificate`}
          decoding="async"
          onError={() => setImgFailed(true)}
          className="max-h-[65vh] w-full bg-snow object-contain"
        />
      );
    }
    if (isPdf(cert.file)) {
      return (
        <object data={`${cert.file}#view=FitH`} type="application/pdf" className="h-[65vh] w-full bg-snow" aria-label={`${cert.title} certificate PDF`}>
          {/* Shown on browsers that cannot embed PDFs (most mobile browsers). */}
          <div className="h-[40vh]">
            <PdfTile cert={cert} variant="preview" />
          </div>
        </object>
      );
    }
  }

  // Card thumbnail: prefer an explicit thumbnail, then the image file itself.
  const thumb = cert.thumbnail ?? (available && isImage(cert.file) ? cert.file : undefined);
  if (variant === 'card' && thumb && !imgFailed) {
    return (
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setImgFailed(true)}
        className="h-full w-full bg-snow object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  if (available && isPdf(cert.file)) return <PdfTile cert={cert} variant={variant} />;
  return <Placeholder cert={cert} variant={variant} />;
}

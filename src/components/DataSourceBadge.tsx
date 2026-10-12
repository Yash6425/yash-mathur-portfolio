import { FiDatabase } from 'react-icons/fi';
import type { DataSource } from '../hooks/useApiList';

/** Small label showing that a section's data was loaded live from the Express API + MongoDB. */
export default function DataSourceBadge({ source, className = '' }: { source: DataSource; className?: string }) {
  if (source !== 'api') return null;
  return (
    <p className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300 ${className}`}>
      <FiDatabase aria-hidden="true" />
      Live from MongoDB via Express API
    </p>
  );
}

/**
 * CERTIFICATES DATA
 * -----------------
 * Every detail below is copied from the actual certificate images.
 *
 * Certificates are shown newest first, grouped by year, using `date`.
 *
 * To add a new certificate:
 *   1. Put the file in public/certificates/ (JPG, PNG, WebP or PDF)
 *   2. Optional: a small preview image in public/certificates/thumbs/
 *   3. Copy any line below, paste it at the end of the list and change the details.
 */

export type CertCategory =
  | 'Java'
  | 'Programming & Systems'
  | 'Web Development'
  | 'Databases'
  | 'Cybersecurity'
  | 'AI/ML'
  | 'Workshops & Events';

export type CertType =
  | 'Training'
  | 'Certification'
  | 'Course'
  | 'Workshop'
  | 'Internship'
  | 'Event'
  | 'Volunteer'
  | 'Competition';

export interface Certificate {
  id: string;
  /** Used to sort certificates newest-first and group them by year (YYYY-MM-DD). */
  date: string;
  title: string;
  issuer?: string;
  /** Extra line shown under the issuer, e.g. duration or role. */
  note?: string;
  type: CertType;
  categories: CertCategory[];
  /** Full certificate file, e.g. '/certificates/oracle-sql.jpg'. */
  file?: string;
  /** Small preview image for the card. */
  thumbnail?: string;
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
}

export const certCategories: CertCategory[] = [
  'Java',
  'Programming & Systems',
  'Web Development',
  'Databases',
  'Cybersecurity',
  'AI/ML',
  'Workshops & Events',
];

const f = (name: string) => ({
  file: `/certificates/${name}.jpg`,
  thumbnail: `/certificates/thumbs/${name}.webp`,
});

export const certificates: Certificate[] = [
  {
    id: 'jyesta-internship',
    date: '2026-01-24',
    title: 'Full Stack Web Development Internship',
    issuer: 'Jyesta Corporate Entity',
    note: '12 Nov 2025 – 12 Jan 2026',
    type: 'Internship',
    categories: ['Web Development'],
    issueDate: 'Issued 24 Jan 2026',
    credentialId: 'JC-20260124-YE6TAZNM',
    ...f('jyesta-full-stack-internship'),
  },
  {
    id: 'tca-full-stack-java',
    date: '2023-07-02',
    title: 'Full Stack Using Java Training Program',
    issuer: 'TCA Gurgaon (Mentortca Technology Pvt. Ltd.)',
    note: 'Six months · Grade A',
    type: 'Training',
    categories: ['Java', 'Web Development'],
    issueDate: '03 Jan 2023 – 02 Jul 2023',
    credentialId: 'TCA4270',
    ...f('tca-full-stack-java'),
  },
  {
    id: 'oracle-java-programming',
    date: '2026-05-25',
    title: 'Java Programming',
    issuer: 'Oracle Academy',
    type: 'Course',
    categories: ['Java'],
    issueDate: '25 May 2026',
    ...f('oracle-java-programming'),
  },
  {
    id: 'oracle-java-fundamentals',
    date: '2026-05-05',
    title: 'Java Fundamentals',
    issuer: 'Oracle Academy',
    type: 'Course',
    categories: ['Java'],
    issueDate: '05 May 2026',
    ...f('oracle-java-fundamentals'),
  },
  {
    id: 'tca-java',
    date: '2022-06-17',
    title: 'Java Training Program',
    issuer: 'TCA Gurgaon (Mentortca Technology Pvt. Ltd.)',
    note: 'Three months · Grade A',
    type: 'Training',
    categories: ['Java'],
    issueDate: '18 Mar 2022 – 17 Jun 2022',
    credentialId: 'TCA2874',
    ...f('tca-java-training'),
  },
  {
    id: 'tca-c-cpp',
    date: '2022-03-17',
    title: 'C & C++ Programming Training Program',
    issuer: 'TCA Gurgaon (Mentortca Technology Pvt. Ltd.)',
    note: 'Three months · Grade A',
    type: 'Training',
    categories: ['Programming & Systems'],
    issueDate: '18 Dec 2021 – 17 Mar 2022',
    credentialId: 'TCA2873',
    ...f('tca-c-cpp-training'),
  },
  {
    id: 'oracle-sql',
    date: '2025-06-19',
    title: 'Database Programming with SQL',
    issuer: 'Oracle Academy',
    type: 'Course',
    categories: ['Databases'],
    issueDate: '19 Jun 2025',
    ...f('oracle-sql'),
  },
  {
    id: 'wscube-sql',
    date: '2026-07-11',
    title: 'Master SQL for Data/Business Analytics with AI Skills',
    issuer: 'WsCube Tech',
    type: 'Course',
    categories: ['Databases', 'AI/ML'],
    issueDate: '11 Jul 2026',
    credentialId: 'WS/2026/M/56296',
    ...f('wscube-master-sql'),
  },
  {
    id: 'guvi-mongodb',
    date: '2026-03-14',
    title: 'MongoDB from Zero to CRUD – Hands-on Database Workshop',
    issuer: 'HCL GUVI',
    type: 'Workshop',
    categories: ['Databases', 'Workshops & Events'],
    issueDate: '14 Mar 2026',
    ...f('guvi-mongodb-zero-to-crud'),
  },
  {
    id: 'cisco-linux',
    date: '2025-06-05',
    title: 'Linux Unhatched',
    issuer: 'Cisco Networking Academy',
    note: 'Offered by Galgotias University',
    type: 'Course',
    categories: ['Programming & Systems'],
    issueDate: '05 Jun 2025',
    ...f('cisco-linux-unhatched'),
  },
  {
    id: 'cisco-cyber-threat',
    date: '2026-01-10',
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    note: 'Offered by Galgotias University',
    type: 'Course',
    categories: ['Cybersecurity'],
    issueDate: '10 Jan 2026',
    ...f('cisco-cyber-threat-management'),
  },
  {
    id: 'ethical-hacking-sep-2026',
    date: '2026-09-14',
    title: 'Ethical Hacking & Cybersecurity Workshop',
    issuer: 'VaultofCodes',
    note: '2-hour workshop',
    type: 'Workshop',
    categories: ['Cybersecurity', 'Workshops & Events'],
    issueDate: '14 Sep 2026',
    ...f('vaultofcodes-ethical-hacking-sep-2026'),
  },
  {
    id: 'ethical-hacking-jan-2026',
    date: '2026-01-15',
    title: 'Ethical Hacking & Cybersecurity Workshop',
    issuer: 'VaultofCodes',
    note: '2-hour workshop',
    type: 'Workshop',
    categories: ['Cybersecurity', 'Workshops & Events'],
    issueDate: '15 Jan 2026',
    ...f('vaultofcodes-ethical-hacking-jan-2026'),
  },
  {
    id: 'be10x-ai-tools',
    date: '2026-01-07',
    title: 'AI Tools & ChatGPT Workshop',
    issuer: 'be10X',
    type: 'Workshop',
    categories: ['AI/ML', 'Workshops & Events'],
    issueDate: '07 Jan 2026',
    ...f('be10x-ai-tools'),
  },
  {
    id: 'springpad-stock-ai',
    date: '2026-05-30',
    title: 'Stock Market Using AI Workshop',
    issuer: 'SpringPad',
    type: 'Workshop',
    categories: ['AI/ML', 'Workshops & Events'],
    issueDate: '30 May 2026',
    ...f('springpad-stock-market-ai'),
  },
  {
    id: 'guvi-full-stack',
    date: '2026-01-08',
    title: 'The Future of Full Stack Development: Key Skills Needed in 2026',
    issuer: 'HCL GUVI',
    type: 'Workshop',
    categories: ['Web Development', 'Workshops & Events'],
    issueDate: '08 Jan 2026',
    ...f('guvi-future-of-full-stack'),
  },
  {
    id: 'sih-2025',
    date: '2025-12-12',
    title: 'Smart India Hackathon 2025 – Volunteer',
    issuer: 'Ministry of Education, Govt. of India · AICTE',
    note: 'Grand Finale (Hardware Edition) at Galgotias University',
    type: 'Volunteer',
    categories: ['Workshops & Events'],
    issueDate: '8 – 12 Dec 2025',
    ...f('sih-2025-volunteer'),
  },
  {
    id: 'ieee-decode-the-code',
    date: '2025-04-03',
    title: 'Decode The Code – Certificate of Appreciation',
    issuer: 'IEEE Galgotias University Student Branch',
    note: 'Young Minds · ICCSAI',
    type: 'Event',
    categories: ['Workshops & Events'],
    issueDate: '03 Apr 2025',
    ...f('ieee-decode-the-code'),
  },
  {
    id: 'nism-quiz',
    date: '2026-01-01',
    title: 'National Financial Literacy Quiz 2026 (College Round)',
    issuer: 'NISM · SEBI',
    note: 'Certificate of Participation',
    type: 'Competition',
    categories: ['Workshops & Events'],
    issueDate: '2026',
    ...f('nism-financial-literacy-quiz-2026'),
  },
];

export function isCertificate(v: unknown): v is Certificate {
  const r = v as Record<string, unknown>;
  return (
    !!r && typeof r.id === 'string' && typeof r.title === 'string' && typeof r.date === 'string' &&
    typeof r.type === 'string' && Array.isArray(r.categories)
  );
}

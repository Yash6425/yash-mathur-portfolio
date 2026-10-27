import type { IconType } from 'react-icons';
import { FaBookOpen, FaCode, FaEnvelopeOpenText, FaHandsHelping, FaLaptopCode, FaShieldAlt, FaStopwatch } from 'react-icons/fa';

export interface Project {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  icon: IconType;
  /** Gradient used for the illustrated thumbnail (not a screenshot). */
  gradient: string;
  /** Optional real screenshot, e.g. '/images/projects/spam-detection.png'. */
  image?: string;
  /** Add the real repository URL when the repo is public. */
  repoUrl?: string;
  /** Add only if a real deployment exists. */
  liveUrl?: string;
  /** e.g. 'In progress' for current projects. */
  status?: string;
}

// Content comes from the resume. repoUrl / liveUrl are intentionally left empty
// until real links exist — the UI then links to the GitHub profile instead.
export const projects: Project[] = [
  {
    id: 'studygen',
    title: 'StudyGen — AI Study Material & Question Generator',
    summary: 'A live web app that turns uploaded study material into notes, quizzes and personalised revision recommendations using AI.',
    highlights: [
      'Upload study material and get AI-generated, easy-to-revise notes.',
      'Generates quiz questions from the uploaded content to test understanding.',
      'Gives personalised revision recommendations; deployed live on Render.',
    ],
    tech: ['AI', 'Web App', 'Render'],
    icon: FaBookOpen,
    gradient: 'from-teal-400/25 via-cyan-500/20 to-indigo-600/30',
    liveUrl: 'https://studygen-38wg.onrender.com/',
  },
  {
    id: 'sarthx',
    title: 'Sarthx — AI-Powered Citizen Welfare Discovery Engine',
    summary: 'An AI-powered engine that helps citizens discover the government welfare schemes they are eligible for.',
    highlights: ['Building an AI-powered engine that helps citizens discover the government welfare schemes they are eligible for.'],
    tech: ['AI', 'Machine Learning'],
    icon: FaHandsHelping,
    gradient: 'from-amber-400/25 via-orange-500/20 to-rose-500/30',
    status: 'In progress',
  },
  {
    id: 'safeher',
    title: 'SafeHer',
    summary: "An Android app focused on women's safety.",
    highlights: ["Developing an Android app focused on women's safety."],
    tech: ['Android Development'],
    icon: FaShieldAlt,
    gradient: 'from-fuchsia-500/25 via-pink-500/20 to-violet-600/30',
    status: 'In progress',
  },
  {
    id: 'email-spam-detection',
    title: 'Email Spam Detection',
    summary: 'A machine learning-based system that classifies emails as spam or not spam, with a Tkinter desktop interface.',
    highlights: [
      'Developed a machine learning-based spam email detection system using Python.',
      'Implemented classification logic to detect spam and non-spam emails.',
      'Integrated GUI functionality using Tkinter for improved user interaction.',
    ],
    tech: ['Python', 'Machine Learning', 'Tkinter'],
    icon: FaEnvelopeOpenText,
    gradient: 'from-sky-500/30 via-indigo-500/25 to-violet-600/30',
  },
  {
    id: 'stopwatch-android-app',
    title: 'Stopwatch Android App',
    summary: 'An Android stopwatch application built with Kotlin, with start, pause and reset controls and a responsive UI.',
    highlights: [
      'Developed an Android stopwatch application using Kotlin.',
      'Implemented start, pause, and reset functionalities with responsive UI.',
      'Focused on mobile application performance and clean design.',
    ],
    tech: ['Kotlin', 'Android Development', 'Android Studio'],
    icon: FaStopwatch,
    gradient: 'from-emerald-500/25 via-cyan-500/25 to-blue-600/30',
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    summary: 'This full-stack portfolio: a React frontend, a Node.js/Express API and a MongoDB Atlas database, deployed on Netlify.',
    highlights: [
      'Built the frontend with React, TypeScript, Tailwind CSS and Framer Motion, with dark and light themes.',
      'Created a Node.js + Express REST API (Netlify Functions) that serves projects and certificates and stores contact messages.',
      'Stored project, certificate and message data in MongoDB Atlas, and deployed the site on Netlify.',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
    icon: FaLaptopCode,
    gradient: 'from-violet-500/30 via-fuchsia-500/20 to-sky-500/30',
    liveUrl: 'https://yashmathur6425.netlify.app',
    repoUrl: 'https://github.com/Yash6425/yash-mathur-portfolio',
  },
];

/** Project fields that come from the database (icons and colours stay in the frontend). */
export type ProjectRecord = Pick<Project, 'id' | 'title' | 'summary' | 'highlights' | 'tech' | 'repoUrl' | 'liveUrl' | 'image' | 'status'>;

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

export function isProjectRecord(v: unknown): v is ProjectRecord {
  const r = v as Record<string, unknown>;
  return (
    !!r && typeof r.id === 'string' && typeof r.title === 'string' && typeof r.summary === 'string' &&
    isStringArray(r.highlights) && isStringArray(r.tech)
  );
}

const fallbackStyle = { icon: FaCode, gradient: 'from-sky-500/25 via-indigo-500/20 to-violet-600/30' };

/** Adds each project's icon and colours (matched by id) to records loaded from the database. */
export function withProjectStyle(records: ProjectRecord[]): Project[] {
  return records.map((r) => {
    const local = projects.find((p) => p.id === r.id);
    return { ...(local ?? fallbackStyle), ...r } as Project;
  });
}

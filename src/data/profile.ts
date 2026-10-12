// Single source of truth for personal details — all taken from Yash_Mathur_Resume.pdf.

export const profile = {
  name: 'Yash Mathur',
  initials: 'YM',
  headline: 'Aspiring Full Stack Java Developer',
  roles: ['Java Developer', 'Full Stack Developer', 'Software Developer', 'Machine Learning Enthusiast'],
  intro:
    'Pursuing an Integrated BCA + MCA at Galgotias University and Tech Head of the SCAT Department. I work with Java, full-stack web development, SQL and Linux, and I build Android apps and machine learning projects.',
  about:
    'Pursuing an Integrated BCA + MCA at Galgotias University, focused on Java and full stack development. Hands-on with Java, SQL, React.js and Linux, with projects in Android development and machine learning. I enjoy building practical software that solves real problems while continuously improving my technical skills.',
  seeking:
    'Seeking opportunities in Software Development, Java Development, Full Stack Development, and IT roles.',
  email: 'ymathur6425@gmail.com',
  location: 'Gurugram, Haryana, India',
  github: 'https://github.com/Yash6425',
  githubHandle: 'Yash6425',
  linkedin: 'https://linkedin.com/in/yash-mathur-4b941126b',
  linkedinHandle: 'yash-mathur-4b941126b',
  /** Public path of the resume PDF (file lives in /public). */
  resumeUrl: '/Yash_Mathur_Resume.pdf',
  resumeDownloadName: 'Yash_Mathur_Resume.pdf',
  /** Detailed CV (public/Yash_Mathur_CV.pdf). */
  cvUrl: '/Yash_Mathur_CV.pdf',
  cvDownloadName: 'Yash_Mathur_CV.pdf',
  /** Drop a photo at public/images/profile.jpg — a placeholder shows until then. */
  photoUrl: '/images/profile.jpg',
} as const;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
] as const;

export const education = [
  {
    institution: 'Galgotias University',
    program: 'Integrated BCA + MCA in Computer Science',
    duration: '2024 – 2029',
    status: 'In progress',
  },
];

export const achievements = [
  {
    title: 'Tech Head, SCAT Department',
    detail: 'Handle the technical side of department events such as the SCAT Sports League, SCAT Orientation and NSS events.',
    tag: 'Leadership',
  },
  {
    title: 'Full Stack Web Development Internship',
    detail: 'Completed a two-month internship with Jyesta Corporate Entity (Nov 2025 – Jan 2026).',
    tag: 'Internship',
  },
  {
    title: 'Android & Machine Learning Projects',
    detail: 'Built an Android stopwatch app in Kotlin and an ML spam-detection system in Python.',
    tag: 'Projects',
  },
  {
    title: 'Continuous Learning',
    detail: '19 certificates across Java, databases, Linux, cybersecurity and AI from Oracle, Cisco, TCA and more.',
    tag: 'Learning',
  },
];

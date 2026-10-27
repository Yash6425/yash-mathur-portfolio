// Data copied into MongoDB when the API starts: any record whose id is not in the database yet is added.
// After that, MongoDB is the source of truth: edit records in MongoDB Atlas (Browse Collections).

export const seedProjects = [
{
  "id": "studygen",
  "order": -3,
  "title": "StudyGen — AI Study Material & Question Generator",
  "summary": "A live web app that turns uploaded study material into notes, quizzes and personalised revision recommendations using AI.",
  "highlights": [
    "Upload study material and get AI-generated, easy-to-revise notes.",
    "Generates quiz questions from the uploaded content to test understanding.",
    "Gives personalised revision recommendations; deployed live on Render."
  ],
  "tech": [
    "AI",
    "Web App",
    "Render"
  ],
  "liveUrl": "https://studygen-38wg.onrender.com/"
},
{
  "id": "sarthx",
  "order": -2,
  "status": "In progress",
  "title": "Sarthx — AI-Powered Citizen Welfare Discovery Engine",
  "summary": "An AI-powered engine that helps citizens discover the government welfare schemes they are eligible for.",
  "highlights": [
    "Building an AI-powered engine that helps citizens discover the government welfare schemes they are eligible for."
  ],
  "tech": [
    "AI",
    "Machine Learning"
  ]
},
{
  "id": "safeher",
  "order": -1,
  "status": "In progress",
  "title": "SafeHer",
  "summary": "An Android app focused on women's safety.",
  "highlights": [
    "Developing an Android app focused on women's safety."
  ],
  "tech": [
    "Android Development"
  ]
},
  {
    "id": "email-spam-detection",
    "order": 1,
    "title": "Email Spam Detection",
    "summary": "A machine learning-based system that classifies emails as spam or not spam, with a Tkinter desktop interface.",
    "highlights": [
      "Developed a machine learning-based spam email detection system using Python.",
      "Implemented classification logic to detect spam and non-spam emails.",
      "Integrated GUI functionality using Tkinter for improved user interaction."
    ],
    "tech": [
      "Python",
      "Machine Learning",
      "Tkinter"
    ]
  },
  {
    "id": "stopwatch-android-app",
    "order": 2,
    "title": "Stopwatch Android App",
    "summary": "An Android stopwatch application built with Kotlin, with start, pause and reset controls and a responsive UI.",
    "highlights": [
      "Developed an Android stopwatch application using Kotlin.",
      "Implemented start, pause, and reset functionalities with responsive UI.",
      "Focused on mobile application performance and clean design."
    ],
    "tech": [
      "Kotlin",
      "Android Development",
      "Android Studio"
    ]
  },
  {
    "id": "personal-portfolio",
    "order": 3,
    "title": "Personal Portfolio Website",
    "summary": "This full-stack portfolio: a React frontend, a Node.js/Express API and a MongoDB Atlas database, deployed on Netlify.",
    "highlights": [
      "Built the frontend with React, TypeScript, Tailwind CSS and Framer Motion, with dark and light themes.",
      "Created a Node.js + Express REST API (Netlify Functions) that serves projects and certificates and stores contact messages.",
      "Stored project, certificate and message data in MongoDB Atlas, and deployed the site on Netlify."
    ],
    "tech": [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Netlify"
    ],
    "liveUrl": "https://yashmathur6425.netlify.app"
  }
];

export const seedCertificates = [
  {
    "id": "jyesta-internship",
    "date": "2026-01-24",
    "title": "Full Stack Web Development Internship",
    "issuer": "Jyesta Corporate Entity",
    "note": "12 Nov 2025 – 12 Jan 2026",
    "type": "Internship",
    "categories": [
      "Web Development"
    ],
    "issueDate": "Issued 24 Jan 2026",
    "credentialId": "JC-20260124-YE6TAZNM",
    "file": "/certificates/jyesta-full-stack-internship.jpg",
    "thumbnail": "/certificates/thumbs/jyesta-full-stack-internship.webp"
  },
  {
    "id": "tca-full-stack-java",
    "date": "2023-07-02",
    "title": "Full Stack Using Java Training Program",
    "issuer": "TCA Gurgaon (Mentortca Technology Pvt. Ltd.)",
    "note": "Six months · Grade A",
    "type": "Training",
    "categories": [
      "Java",
      "Web Development"
    ],
    "issueDate": "03 Jan 2023 – 02 Jul 2023",
    "credentialId": "TCA4270",
    "file": "/certificates/tca-full-stack-java.jpg",
    "thumbnail": "/certificates/thumbs/tca-full-stack-java.webp"
  },
  {
    "id": "oracle-java-programming",
    "date": "2026-05-25",
    "title": "Java Programming",
    "issuer": "Oracle Academy",
    "type": "Course",
    "categories": [
      "Java"
    ],
    "issueDate": "25 May 2026",
    "file": "/certificates/oracle-java-programming.jpg",
    "thumbnail": "/certificates/thumbs/oracle-java-programming.webp"
  },
  {
    "id": "oracle-java-fundamentals",
    "date": "2026-05-05",
    "title": "Java Fundamentals",
    "issuer": "Oracle Academy",
    "type": "Course",
    "categories": [
      "Java"
    ],
    "issueDate": "05 May 2026",
    "file": "/certificates/oracle-java-fundamentals.jpg",
    "thumbnail": "/certificates/thumbs/oracle-java-fundamentals.webp"
  },
  {
    "id": "tca-java",
    "date": "2022-06-17",
    "title": "Java Training Program",
    "issuer": "TCA Gurgaon (Mentortca Technology Pvt. Ltd.)",
    "note": "Three months · Grade A",
    "type": "Training",
    "categories": [
      "Java"
    ],
    "issueDate": "18 Mar 2022 – 17 Jun 2022",
    "credentialId": "TCA2874",
    "file": "/certificates/tca-java-training.jpg",
    "thumbnail": "/certificates/thumbs/tca-java-training.webp"
  },
  {
    "id": "tca-c-cpp",
    "date": "2022-03-17",
    "title": "C & C++ Programming Training Program",
    "issuer": "TCA Gurgaon (Mentortca Technology Pvt. Ltd.)",
    "note": "Three months · Grade A",
    "type": "Training",
    "categories": [
      "Programming & Systems"
    ],
    "issueDate": "18 Dec 2021 – 17 Mar 2022",
    "credentialId": "TCA2873",
    "file": "/certificates/tca-c-cpp-training.jpg",
    "thumbnail": "/certificates/thumbs/tca-c-cpp-training.webp"
  },
  {
    "id": "oracle-sql",
    "date": "2025-06-19",
    "title": "Database Programming with SQL",
    "issuer": "Oracle Academy",
    "type": "Course",
    "categories": [
      "Databases"
    ],
    "issueDate": "19 Jun 2025",
    "file": "/certificates/oracle-sql.jpg",
    "thumbnail": "/certificates/thumbs/oracle-sql.webp"
  },
  {
    "id": "wscube-sql",
    "date": "2026-07-11",
    "title": "Master SQL for Data/Business Analytics with AI Skills",
    "issuer": "WsCube Tech",
    "type": "Course",
    "categories": [
      "Databases",
      "AI/ML"
    ],
    "issueDate": "11 Jul 2026",
    "credentialId": "WS/2026/M/56296",
    "file": "/certificates/wscube-master-sql.jpg",
    "thumbnail": "/certificates/thumbs/wscube-master-sql.webp"
  },
  {
    "id": "guvi-mongodb",
    "date": "2026-03-14",
    "title": "MongoDB from Zero to CRUD – Hands-on Database Workshop",
    "issuer": "HCL GUVI",
    "type": "Workshop",
    "categories": [
      "Databases",
      "Workshops & Events"
    ],
    "issueDate": "14 Mar 2026",
    "file": "/certificates/guvi-mongodb-zero-to-crud.jpg",
    "thumbnail": "/certificates/thumbs/guvi-mongodb-zero-to-crud.webp"
  },
  {
    "id": "cisco-linux",
    "date": "2025-06-05",
    "title": "Linux Unhatched",
    "issuer": "Cisco Networking Academy",
    "note": "Offered by Galgotias University",
    "type": "Course",
    "categories": [
      "Programming & Systems"
    ],
    "issueDate": "05 Jun 2025",
    "file": "/certificates/cisco-linux-unhatched.jpg",
    "thumbnail": "/certificates/thumbs/cisco-linux-unhatched.webp"
  },
  {
    "id": "cisco-cyber-threat",
    "date": "2026-01-10",
    "title": "Cyber Threat Management",
    "issuer": "Cisco Networking Academy",
    "note": "Offered by Galgotias University",
    "type": "Course",
    "categories": [
      "Cybersecurity"
    ],
    "issueDate": "10 Jan 2026",
    "file": "/certificates/cisco-cyber-threat-management.jpg",
    "thumbnail": "/certificates/thumbs/cisco-cyber-threat-management.webp"
  },
  {
    "id": "ethical-hacking-sep-2026",
    "date": "2026-09-14",
    "title": "Ethical Hacking & Cybersecurity Workshop",
    "issuer": "VaultofCodes",
    "note": "2-hour workshop",
    "type": "Workshop",
    "categories": [
      "Cybersecurity",
      "Workshops & Events"
    ],
    "issueDate": "14 Sep 2026",
    "file": "/certificates/vaultofcodes-ethical-hacking-sep-2026.jpg",
    "thumbnail": "/certificates/thumbs/vaultofcodes-ethical-hacking-sep-2026.webp"
  },
  {
    "id": "ethical-hacking-jan-2026",
    "date": "2026-01-15",
    "title": "Ethical Hacking & Cybersecurity Workshop",
    "issuer": "VaultofCodes",
    "note": "2-hour workshop",
    "type": "Workshop",
    "categories": [
      "Cybersecurity",
      "Workshops & Events"
    ],
    "issueDate": "15 Jan 2026",
    "file": "/certificates/vaultofcodes-ethical-hacking-jan-2026.jpg",
    "thumbnail": "/certificates/thumbs/vaultofcodes-ethical-hacking-jan-2026.webp"
  },
  {
    "id": "be10x-ai-tools",
    "date": "2026-01-07",
    "title": "AI Tools & ChatGPT Workshop",
    "issuer": "be10X",
    "type": "Workshop",
    "categories": [
      "AI/ML",
      "Workshops & Events"
    ],
    "issueDate": "07 Jan 2026",
    "file": "/certificates/be10x-ai-tools.jpg",
    "thumbnail": "/certificates/thumbs/be10x-ai-tools.webp"
  },
  {
    "id": "springpad-stock-ai",
    "date": "2026-05-30",
    "title": "Stock Market Using AI Workshop",
    "issuer": "SpringPad",
    "type": "Workshop",
    "categories": [
      "AI/ML",
      "Workshops & Events"
    ],
    "issueDate": "30 May 2026",
    "file": "/certificates/springpad-stock-market-ai.jpg",
    "thumbnail": "/certificates/thumbs/springpad-stock-market-ai.webp"
  },
  {
    "id": "guvi-full-stack",
    "date": "2026-01-08",
    "title": "The Future of Full Stack Development: Key Skills Needed in 2026",
    "issuer": "HCL GUVI",
    "type": "Workshop",
    "categories": [
      "Web Development",
      "Workshops & Events"
    ],
    "issueDate": "08 Jan 2026",
    "file": "/certificates/guvi-future-of-full-stack.jpg",
    "thumbnail": "/certificates/thumbs/guvi-future-of-full-stack.webp"
  },
  {
    "id": "sih-2025",
    "date": "2025-12-12",
    "title": "Smart India Hackathon 2025 – Volunteer",
    "issuer": "Ministry of Education, Govt. of India · AICTE",
    "note": "Grand Finale (Hardware Edition) at Galgotias University",
    "type": "Volunteer",
    "categories": [
      "Workshops & Events"
    ],
    "issueDate": "8 – 12 Dec 2025",
    "file": "/certificates/sih-2025-volunteer.jpg",
    "thumbnail": "/certificates/thumbs/sih-2025-volunteer.webp"
  },
  {
    "id": "ieee-decode-the-code",
    "date": "2025-04-03",
    "title": "Decode The Code – Certificate of Appreciation",
    "issuer": "IEEE Galgotias University Student Branch",
    "note": "Young Minds · ICCSAI",
    "type": "Event",
    "categories": [
      "Workshops & Events"
    ],
    "issueDate": "03 Apr 2025",
    "file": "/certificates/ieee-decode-the-code.jpg",
    "thumbnail": "/certificates/thumbs/ieee-decode-the-code.webp"
  },
  {
    "id": "nism-quiz",
    "date": "2026-01-01",
    "title": "National Financial Literacy Quiz 2026 (College Round)",
    "issuer": "NISM · SEBI",
    "note": "Certificate of Participation",
    "type": "Competition",
    "categories": [
      "Workshops & Events"
    ],
    "issueDate": "2026",
    "file": "/certificates/nism-financial-literacy-quiz-2026.jpg",
    "thumbnail": "/certificates/thumbs/nism-financial-literacy-quiz-2026.webp"
  }
];

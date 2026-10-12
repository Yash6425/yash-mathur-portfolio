import type { IconType } from 'react-icons';
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaCubes,
  FaLayerGroup,
  FaBrain,
  FaServer,
} from 'react-icons/fa';
import { SiC, SiCplusplus, SiMongodb, SiAndroidstudio } from 'react-icons/si';

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

// Exactly the skills listed on the resume — no proficiency levels are claimed.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'C', icon: SiC, color: '#5c8dbc' },
      { name: 'C++', icon: SiCplusplus, color: '#659ad2' },
      { name: 'Python', icon: FaPython, color: '#ffd43b' },
    ],
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML', icon: FaHtml5, color: '#e34f26' },
      { name: 'CSS', icon: FaCss3Alt, color: '#2965f1' },
      { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
      { name: 'React.js', icon: FaReact, color: '#61dafb' },
    ],
  },
  {
    title: 'Database Technologies',
    skills: [
      { name: 'SQL', icon: FaDatabase, color: '#7aa2ff' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'DBMS', icon: FaServer, color: '#a78bfa' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#f05032' },
      { name: 'GitHub', icon: FaGithub, color: 'currentColor' },
      { name: 'Linux', icon: FaLinux, color: '#fcc624' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3ddc84' },
    ],
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'Object-Oriented Programming', icon: FaCubes, color: '#38bdf8' },
      { name: 'Full Stack Development', icon: FaLayerGroup, color: '#8b5cf6' },
      { name: 'Machine Learning', icon: FaBrain, color: '#f472b6' },
    ],
  },
];

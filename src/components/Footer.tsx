import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React · Node.js &amp; Express · MongoDB · Netlify.
        </p>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn h-10 w-10" aria-label="GitHub profile">
            <FaGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn h-10 w-10" aria-label="LinkedIn profile">
            <FaLinkedin />
          </a>
          <a href={`mailto:${profile.email}`} className="icon-btn h-10 w-10" aria-label="Send an email">
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  );
}

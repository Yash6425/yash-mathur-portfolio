import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiAlertCircle, FiCheckCircle, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { profile } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { sendContact } from '../lib/api';

/**
 * Messages are sent to the Express API (POST /api/contact), which validates them
 * and stores them in MongoDB. Success is shown only after the server confirms the save.
 */

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; text?: string };

const empty: Fields = { name: '', email: '', subject: '', message: '' };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

const contactItems = [
  { icon: FiMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaLinkedin, label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin, external: true },
  { icon: FaGithub, label: 'GitHub', value: profile.githubHandle, href: profile.github, external: true },
  { icon: FiMapPin, label: 'Location', value: profile.location },
];

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  // Hidden anti-spam field: people never see or fill it.
  const [honeypot, setHoneypot] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    const result = await sendContact({ ...fields, company: honeypot });
    if (result.ok) {
      setFields(empty);
      setStatus({ kind: 'success', text: "Thanks! Your message was saved and I'll get back to you soon." });
      return;
    }
    if (result.reason === 'invalid' && result.errors) {
      setErrors(result.errors as Errors);
      setStatus({ kind: 'idle' });
      return;
    }
    setStatus({ kind: 'error', text: `Sorry, the message couldn't be sent right now. Please email ${profile.email} directly.` });
  };

  const field = (name: keyof Fields, label: string, type = 'text') => (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium text-slate-300">{label}</label>
      {name === 'message' ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          rows={5}
          value={fields[name]}
          onChange={onChange}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          className="input resize-y"
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={type}
          value={fields[name]}
          onChange={onChange}
          autoComplete={name === 'subject' ? 'off' : name}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          className="input"
        />
      )}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-rose-300">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's work together"
          description="I'm looking for internships and opportunities in software, Java and full-stack development. The quickest way to reach me is email."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-3">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/25 text-accent-cyan ring-1 ring-white/10">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-slate-500">{label}</span>
                    <span className="block break-words text-sm font-medium text-slate-200 sm:text-base">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="glass flex items-center gap-4 p-4 transition-colors hover:border-accent-violet/40"
                >
                  {inner}
                </motion.a>
              ) : (
                <div key={label} className="glass flex items-center gap-4 p-4">{inner}</div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass relative space-y-4 p-6 sm:p-8" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                {field('name', 'Name')}
                {field('email', 'Email', 'email')}
              </div>
              {field('subject', 'Subject')}
              {field('message', 'Message')}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.kind === 'sending'}>
                <FiSend aria-hidden="true" />
                {status.kind === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              <div aria-live="polite">
                {status.text && (
                  <p
                    className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                      status.kind === 'error'
                        ? 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20'
                        : 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-400/20'
                    }`}
                  >
                    {status.kind === 'error' ? <FiAlertCircle className="mt-0.5 shrink-0" /> : <FiCheckCircle className="mt-0.5 shrink-0" />}
                    {status.text}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

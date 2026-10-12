import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}

export default function SectionHeading({ eyebrow, title, description, id }: Props) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
        <span aria-hidden="true">// </span>
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
    </Reveal>
  );
}

import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import { TEAM } from '../data/team.js';

const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const LinkedInIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const WhatsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.78 9.78 0 0 1-1.5-5.2c0-5.41 4.4-9.82 9.83-9.82a9.76 9.76 0 0 1 6.95 2.88 9.76 9.76 0 0 1 2.87 6.95c0 5.42-4.4 9.82-9.82 9.82zm8.36-18.18A11.75 11.75 0 0 0 12.04.17C5.5.17.18 5.49.18 12.03c0 2.09.55 4.13 1.59 5.93L.08 24l6.18-1.62a11.82 11.82 0 0 0 5.78 1.47h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.47-8.39z" />
  </svg>
);

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Nossa equipe" subtitle="Quem está construindo o Lastro, do problema validado à plataforma" />
      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:mt-8 xl:grid-cols-3">
        {TEAM.map((m) => (
          <Card key={m.nome} className="flex flex-col p-5 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lastro-navy text-lg font-bold text-white">
                {initials(m.nome)}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-ink">{m.nome}</h2>
                <p className="text-sm text-ink-soft">
                  <span className="font-medium text-lastro-deep">{m.papel}</span>
                  {m.headline && <> · {m.headline}</>}
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#0A66C2] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              )}
              {m.telefone && (
                <a href={`https://wa.me/${m.telefone}`} target="_blank" rel="noreferrer" title={`WhatsApp de ${m.nome}`} aria-label={`WhatsApp de ${m.nome}`} className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#25D366] text-white hover:opacity-90">
                  <WhatsIcon className="h-4 w-4" />
                </a>
              )}
              {!m.linkedin && !m.telefone && <span className="text-xs text-slate-400">Contato em breve</span>}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

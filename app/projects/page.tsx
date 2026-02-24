import { ProjectGrid } from '@/components/sections/projects-grid';
import { loadProjects, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects.',
};

export default async function ProjectsPage() {
  const lang = await getLanguage();

  const [projectsResult, translationsResult] = await Promise.all([
    loadProjects(lang),
    loadTranslations(lang),
  ]);

  const projects = projectsResult.data;
  const t = translationsResult.data;

  const projectCount = projects.length;

  return (
    <main className="min-h-screen pt-36 sm:pt-44 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">

        {/* Header */}
        <div className="mb-28 sm:mb-36">
          <div className="flex items-center gap-4 mb-8">
            <p className="text-primary text-xs font-mono tracking-[0.25em] uppercase">
              Portfolio
            </p>
            <div className="accent-line h-px flex-1 max-w-32 opacity-40" />
            <span className="text-xs font-mono text-muted-foreground/40 tabular-nums">
              {String(projectCount).padStart(2, '0')} {lang === 'fr' ? 'projets' : 'projects'}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display mb-8 leading-[0.95]">
            <span className="text-gradient-warm">{t.projects.title}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground/60 max-w-2xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        <ProjectGrid projects={projects} featured={false} lang={lang} />
      </div>
    </main>
  );
}

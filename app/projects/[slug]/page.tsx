import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectById, loadProjects, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import { formatTechnologies } from '@/lib/utils';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projectsResult = await loadProjects('en');
  return projectsResult.data.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const lang = await getLanguage();
  const projectResult = await getProjectById(params.slug, lang);
  if (!projectResult.data) return { title: 'Not Found' };
  return { title: projectResult.data.title, description: projectResult.data.shortDescription };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const lang = await getLanguage();
  const [projectResult, translationsResult] = await Promise.all([
    getProjectById(params.slug, lang),
    loadTranslations(lang),
  ]);

  if (!projectResult.data) notFound();

  const project = projectResult.data;
  const t = translationsResult.data;
  const techs = formatTechnologies(project.technologies);

  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-primary transition-colors mb-12 sm:mb-16 min-h-[44px]"
        >
          <ArrowLeft className="size-4" />
          {t.projects.backToProjects}
        </Link>

        <div className="mb-12">
          {project.featured && (
            <span className="inline-flex items-center text-xs font-mono text-primary bg-primary/10 border border-primary/15 rounded-full px-3 py-1 mb-6">
              {t.projects.featured}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground/70 leading-relaxed max-w-2xl">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target={EXTERNAL_LINKS.security.target}
              rel={EXTERNAL_LINKS.security.rel}
              className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <Github className="size-4" />
              {t.projects.viewSourceCode}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={EXTERNAL_LINKS.security.target}
              rel={EXTERNAL_LINKS.security.rel}
              className="inline-flex items-center gap-2 h-11 px-6 border border-border/30 text-foreground text-sm font-medium rounded-lg hover:border-primary/30 hover:text-primary transition-colors"
            >
              <ExternalLink className="size-4" />
              {t.projects.liveDemo}
            </a>
          )}
        </div>

        {project.image && (
          <div className="mb-20 rounded-2xl border border-border/20 overflow-hidden">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <div className="mb-20">
          <h2 className="text-xs font-mono text-primary tracking-widest uppercase mb-6">{t.projects.about}</h2>
          <div className="text-base text-muted-foreground/80 leading-[1.8] whitespace-pre-line">
            {project.detailedDescription}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-xs font-mono text-primary tracking-widest uppercase mb-6">{t.projects.technologies}</h2>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded-md bg-secondary/80 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border/15 pt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" />
            {t.projects.viewAllProjects}
          </Link>
        </div>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard, ProjectHeroCard } from '@/components/project/project-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { cn } from '@/lib/utils';
import { ProjectGridProps } from '@/lib/types';

export function ProjectGrid({ projects, featured = false, lang, className }: ProjectGridProps) {
  const filteredProjects = featured
    ? projects.filter((p) => p.featured)
    : projects;

  const sortedProjects = filteredProjects.sort((a, b) => a.order - b.order);

  const t = {
    empty: lang === 'fr' ? 'Aucun projet disponible.' : 'No projects available.',
    viewAll: lang === 'fr' ? 'Voir tous les projets' : 'View all projects',
  };

  if (sortedProjects.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-muted-foreground text-sm">{t.empty}</p>
      </div>
    );
  }

  const heroProject = featured ? sortedProjects[0] : null;
  const restProjects = featured ? sortedProjects.slice(1) : sortedProjects;

  if (!featured) {
    return (
      <div className={cn('space-y-10', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {restProjects.map((project, i) => (
            <BlurFade key={project.id} delay={0.1 + i * 0.08} inView>
              <ProjectCard project={project} index={i} className="h-full" />
            </BlurFade>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-5', className)}>
      {heroProject && (
        <BlurFade delay={0.1} inView>
          <ProjectHeroCard project={heroProject} lang={lang} />
        </BlurFade>
      )}

      {restProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {restProjects.map((project, i) => (
            <BlurFade key={project.id} delay={0.15 + i * 0.06} inView>
              <ProjectCard project={project} className="h-full" />
            </BlurFade>
          ))}
        </div>
      )}

      {featured && (
        <BlurFade delay={0.35} inView>
          <div className="text-center pt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors group"
            >
              {t.viewAll}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </BlurFade>
      )}
    </div>
  );
}

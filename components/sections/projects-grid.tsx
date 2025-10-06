'use client';

import { ProjectCard } from '@/components/project/project-card';
import { cn } from '@/lib/utils';
import { ProjectGridProps } from '@/lib/types';

export function ProjectGrid({ projects, featured = false, lang, className }: ProjectGridProps) {
  // Filter projects based on featured status
  const filteredProjects = featured 
    ? projects.filter(project => project.featured)
    : projects;

  // Sort projects by order
  const sortedProjects = filteredProjects.sort((a, b) => a.order - b.order);

  // Translations
  const t = {
    noFeaturedProjects: lang === 'fr' ? 'Aucun projet en vedette disponible.' : 'No featured projects available.',
    noProjects: lang === 'fr' ? 'Aucun projet disponible.' : 'No projects available.',
    viewAllProjects: lang === 'fr' ? 'Voir Tous les Projets' : 'View All Projects',
  };

  if (sortedProjects.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-muted-foreground text-lg">
          {featured ? t.noFeaturedProjects : t.noProjects}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', className)}>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="h-full"
          />
        ))}
      </div>

      {/* Show More Button (if not showing all projects) */}
      {featured && projects.length > sortedProjects.length && (
        <div className="text-center mt-8">
          <a
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200 rounded-lg font-medium"
          >
            {t.viewAllProjects}
          </a>
        </div>
      )}
    </div>
  );
}

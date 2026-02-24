'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { cn, formatTechnologies } from '@/lib/utils';
import { ProjectCardProps } from '@/lib/types';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from '@/components/magicui/border-beam';

const TECH_COLORS: Record<string, string> = {
  'Next.js': 'bg-foreground/10 text-foreground/90',
  'TypeScript': 'bg-blue-500/10 text-blue-400',
  'Tailwind CSS': 'bg-cyan-500/10 text-cyan-400',
  'Supabase': 'bg-emerald-500/10 text-emerald-400',
  'Java': 'bg-orange-500/10 text-orange-400',
  'Bash': 'bg-green-500/10 text-green-400',
  'Vercel': 'bg-foreground/10 text-foreground/80',
  'AI Matching': 'bg-purple-500/10 text-purple-400',
  'SEO': 'bg-yellow-500/10 text-yellow-400',
  'Resend': 'bg-pink-500/10 text-pink-400',
  'OpenAI API': 'bg-emerald-500/10 text-emerald-400',
  'Recharts': 'bg-red-500/10 text-red-400',
  'shadcn/ui': 'bg-foreground/8 text-foreground/70',
};

function getTechColor(tech: string): string {
  return TECH_COLORS[tech] || 'bg-secondary/80 text-foreground/70';
}

interface ExtendedProjectCardProps extends ProjectCardProps {
  index?: number;
}

export function ProjectCard({ project, index, className }: ExtendedProjectCardProps) {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang(saved === 'fr' ? 'fr' : 'en');
  }, []);

  const techs = formatTechnologies(project.technologies);

  return (
    <div className={cn('group relative h-full', className)}>
      <MagicCard gradientOpacity={0.12} className="h-full">
        {/* Accent top bar */}
        <div className="accent-line h-[2px] w-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 sm:p-8 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              {typeof index === 'number' && (
                <span className="text-[11px] font-mono text-primary/40 tabular-nums tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              {typeof index === 'number' && (
                <div className="w-5 h-px bg-border/50" />
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target={EXTERNAL_LINKS.security.target}
                  rel={EXTERNAL_LINKS.security.rel}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
                >
                  <Github className="size-[18px]" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target={EXTERNAL_LINKS.security.target}
                  rel={EXTERNAL_LINKS.security.rel}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/40 hover:text-primary transition-colors duration-300"
                >
                  <ExternalLink className="size-[18px]" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display tracking-tight mb-3 transition-all duration-500 group-hover:text-gradient-warm">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground/60 leading-[1.7] flex-1 mb-6">
            {project.shortDescription}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-5">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    'text-[11px] font-mono px-2.5 py-1 rounded-md transition-colors duration-300',
                    getTechColor(tech)
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-border/20">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors duration-300 group/link min-h-[44px]"
              >
                {lang === 'fr' ? 'Voir le projet' : 'View project'}
                <ArrowUpRight className="size-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {project.featured && <BorderBeam size={150} duration={12} />}
      </MagicCard>
    </div>
  );
}

interface ProjectHeroCardProps extends ProjectCardProps {
  lang?: string;
}

export function ProjectHeroCard({ project, className, lang: langProp }: ProjectHeroCardProps) {
  const [lang, setLang] = useState<'en' | 'fr'>(langProp === 'fr' ? 'fr' : 'en');

  useEffect(() => {
    if (!langProp) {
      const saved = localStorage.getItem('preferred-language');
      setLang(saved === 'fr' ? 'fr' : 'en');
    }
  }, [langProp]);

  const techs = formatTechnologies(project.technologies);

  return (
    <div className={cn('group relative', className)}>
      <MagicCard gradientSize={350} gradientOpacity={0.1} className="w-full">
        <div className="accent-line h-[2px] w-full opacity-70" />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-start">
            <div className="space-y-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/15 rounded-full px-3 py-1">
                  {lang === 'fr' ? 'Projet vedette' : 'Featured'}
                </span>
                {project.liveUrl && (
                  <span className="text-xs font-mono text-muted-foreground/40">
                    {new URL(project.liveUrl).hostname}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
                <span className="text-gradient-warm">{project.title}</span>
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground/60 leading-relaxed max-w-xl">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'text-[11px] font-mono px-2.5 py-1 rounded-md',
                      getTechColor(tech)
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-3 lg:pt-8">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 min-h-[44px] rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {lang === 'fr' ? 'Voir le projet' : 'View project'}
                <ArrowUpRight className="size-4" />
              </Link>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target={EXTERNAL_LINKS.security.target}
                    rel={EXTERNAL_LINKS.security.rel}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 min-h-[44px] rounded-lg border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
                  >
                    <Github className="size-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target={EXTERNAL_LINKS.security.target}
                    rel={EXTERNAL_LINKS.security.rel}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 min-h-[44px] rounded-lg border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <BorderBeam size={200} duration={12} />
      </MagicCard>
    </div>
  );
}

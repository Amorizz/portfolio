'use client';

/// <reference types="@/lib/types.d.ts" />

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate, formatTechnologies } from '@/lib/utils';
import { ProjectCardProps } from '@/lib/types';
import { EXTERNAL_LINKS } from '@/lib/constants';

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang((saved === 'fr' ? 'fr' : 'en'));
  }, []);

  const viewText = lang === 'fr' ? 'Voir' : 'View';

  return (
    <Card className={cn(
      'group bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 max-w-sm h-full flex flex-col pt-10 overflow-clip',
      className
    )}>


      {/* Project Content */}
      <CardContent className="px-4 py-0 flex-1 flex flex-col">
        <div className="space-y-3 flex-1 flex flex-col">
          {/* Project Title */}
          <h3 className="text-sm font-semibold text-card-foreground group-hover:text-accent transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {formatTechnologies(project.technologies).slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-background text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors text-xs px-2 py-1"
              >
                {tech}
              </Badge>
            ))}
            {formatTechnologies(project.technologies).length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{formatTechnologies(project.technologies).length - 3}
              </Badge>
            )}
          </div>

          {/* Project Date */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      {/* Project Actions */}
      <CardFooter className="px-4 py-1 flex gap-2">
        <Button
          asChild
          variant="default"
          size="sm"
          className="flex-1 bg-accent hover:bg-violet-600/30 hover: text-accent-foreground text-xs h-7 transition-colors border border-violet-500/30 hover:border-none"
        >
          <Link href={`/projects/${project.id}`}>
            {viewText}
          </Link>
        </Button>

        {project.githubUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:bg-background hover:text-foreground h-7 w-7 p-0"
          >
            <a 
              href={project.githubUrl}
              target={EXTERNAL_LINKS.security.target}
              rel={EXTERNAL_LINKS.security.rel}
            >
              <Github className="h-3 w-3" />
            </a>
          </Button>
        )}

        {project.liveUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:bg-background hover:text-foreground h-7 w-7 p-0"
          >
            <a 
              href={project.liveUrl}
              target={EXTERNAL_LINKS.security.target}
              rel={EXTERNAL_LINKS.security.rel}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

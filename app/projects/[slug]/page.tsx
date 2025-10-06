import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProjectById, loadProjects, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import { formatDate, formatTechnologies } from '@/lib/utils';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // Generate static params for English (default)
  // At build time, we generate all possible slugs
  const projectsResult = await loadProjects('en');
  const projects = projectsResult.data;

  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const lang = await getLanguage();
  const projectResult = await getProjectById(params.slug, lang);
  
  if (!projectResult.data) {
    return {
      title: 'Project Not Found',
    };
  }

  const project = projectResult.data;

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Amaud Portfolio`,
      description: project.shortDescription,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.imageAlt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const lang = await getLanguage();
  const [projectResult, translationsResult] = await Promise.all([
    getProjectById(params.slug, lang),
    loadTranslations(lang),
  ]);
  
  if (!projectResult.data) {
    notFound();
  }

  const project = projectResult.data;
  const t = translationsResult.data;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.projects.backToProjects}
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {project.title}
          </h1>
          
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {project.featured && (
              <Badge className="bg-accent/20 text-accent border-accent/30">
                {t.projects.featured}
              </Badge>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(project.createdAt)}
            </span>
          </div>
        </div>

        {/* Project Image - Only show if exists, no cropping */}
        {project.image && (
          <div className="mb-10">
            <div className="relative rounded-lg border border-border/50 overflow-hidden bg-card/30">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={project.githubUrl}
            target={EXTERNAL_LINKS.security.target}
            rel={EXTERNAL_LINKS.security.rel}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
            >
              <Github className="h-4 w-4" />
              {t.projects.viewSourceCode}
            </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={EXTERNAL_LINKS.security.target}
              rel={EXTERNAL_LINKS.security.rel}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground text-sm font-medium rounded-md hover:bg-accent/10 hover:border-accent/50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {t.projects.liveDemo}
            </a>
          )}
        </div>

        {/* Project Description */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">{t.projects.about}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3 whitespace-pre-line">
            {project.detailedDescription}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">{t.projects.technologies}</h2>
          <div className="flex flex-wrap gap-2">
            {formatTechnologies(project.technologies).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-card border border-border rounded-md text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>
        
        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            ← {t.projects.viewAllProjects}
          </Link>
        </div>
      </div>
    </main>
  );
}

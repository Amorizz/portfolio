import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProjectById, loadProjects } from '@/lib/data-loader';
import { formatDate, formatTechnologies } from '@/lib/utils';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projectsResult = await loadProjects();
  const projects = projectsResult.data;

  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const projectResult = await getProjectById(params.slug);
  
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
  const projectResult = await getProjectById(params.slug);
  
  if (!projectResult.data) {
    notFound();
  }

  const project = projectResult.data;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-accent"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.featured && (
              <Badge className="bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Image */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1200}
              height={600}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              priority
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.detailedDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {formatTechnologies(project.technologies).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-background text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Links */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Project Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <a
                    href={project.githubUrl}
                    target={EXTERNAL_LINKS.security.target}
                    rel={EXTERNAL_LINKS.security.rel}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                </Button>

                {project.liveUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <a
                      href={project.liveUrl}
                      target={EXTERNAL_LINKS.security.target}
                      rel={EXTERNAL_LINKS.security.rel}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">{formatDate(project.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="text-foreground">{formatDate(project.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-accent">Completed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <Separator className="my-12 bg-border" />
        
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

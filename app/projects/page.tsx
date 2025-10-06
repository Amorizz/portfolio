import { ProjectGrid } from '@/components/sections/projects-grid';
import { loadProjects, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects showcasing my skills in web development, full-stack applications, and innovative solutions.',
  openGraph: {
    title: 'Projects | Amaud Portfolio',
    description: 'Explore my portfolio of projects showcasing my skills in web development, full-stack applications, and innovative solutions.',
  },
};

export default async function ProjectsPage() {
  // Get current language
  const lang = await getLanguage();
  
  const [projectsResult, translationsResult] = await Promise.all([
    loadProjects(lang),
    loadTranslations(lang),
  ]);
  
  const projects = projectsResult.data;
  const t = translationsResult.data;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectGrid 
          projects={projects} 
          featured={false}
          lang={lang}
        />
      </div>
    </main>
  );
}

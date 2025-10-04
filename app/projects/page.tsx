import { ProjectGrid } from '@/components/sections/projects-grid';
import { loadProjects } from '@/lib/data-loader';
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
  
  const projectsResult = await loadProjects(lang);
  const projects = projectsResult.data;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that demonstrate my passion for creating innovative solutions 
            and my expertise in modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectGrid 
          projects={projects} 
          featured={false}
        />
      </div>
    </main>
  );
}

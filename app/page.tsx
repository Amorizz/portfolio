import { Hero } from '@/components/layout/hero';
import { ProjectGrid } from '@/components/sections/projects-grid';
import { VisionQuote } from '@/components/sections/vision-quote';
import { loadPersonalInfo, loadSocialLinks, getFeaturedProjects, getEnabledVisionQuotes } from '@/lib/data-loader';
import Link from 'next/link';

export default async function Home() {
  // Load data for homepage
  const [personalInfoResult, socialLinksResult, featuredProjectsResult, visionQuotesResult] = await Promise.all([
    loadPersonalInfo(),
    loadSocialLinks(),
    getFeaturedProjects(),
    getEnabledVisionQuotes(),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;
  const featuredProjects = featuredProjectsResult.data;
  const visionQuotes = visionQuotesResult.data;

  // Get the first enabled vision quote
  const visionQuote = visionQuotes.length > 0 ? visionQuotes[0] : null;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        personalInfo={personalInfo}
        socialLinks={socialLinks}
      />

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work, highlighting my passion for creating innovative solutions
            </p>

          </div>

          <ProjectGrid
            projects={featuredProjects}
            featured={true}
          />
          <div className="mt-13 text-center">
            <Link
              href="/projects"
              className="text-md hover:text-violet-600 hover:underline transition-colors text-accent"
            >
              <strong>View all projects &rarr;</strong>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Quote Section */}
      {visionQuote && (
        <VisionQuote quote={visionQuote} />
      )}
    </main>
  );
}

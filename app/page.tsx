import { Hero } from '@/components/layout/hero';
import { ProjectGrid } from '@/components/sections/projects-grid';
import { VisionQuote } from '@/components/sections/vision-quote';
import { CertificationsStack } from '@/components/sections/certifications-stack';
import { Badge } from '@/components/ui/badge';
import { loadPersonalInfo, loadSocialLinks, getFeaturedProjects, getEnabledVisionQuotes, getEnabledCertifications, getEnabledSkills } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import Link from 'next/link';

export default async function Home() {
  // Get current language
  const lang = await getLanguage();
  
  // Load data for homepage
  const [personalInfoResult, socialLinksResult, featuredProjectsResult, visionQuotesResult, certificationsResult, skillsResult] = await Promise.all([
    loadPersonalInfo(lang),
    loadSocialLinks(lang),
    getFeaturedProjects(lang),
    getEnabledVisionQuotes(lang),
    getEnabledCertifications(lang),
    getEnabledSkills(lang),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;
  const featuredProjects = featuredProjectsResult.data;
  const visionQuotes = visionQuotesResult.data;
  const certifications = certificationsResult.data;
  const skills = skillsResult.data;

  // Get the first enabled vision quote
  const visionQuote = visionQuotes.length > 0 ? visionQuotes[0] : null;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        personalInfo={personalInfo}
        socialLinks={socialLinks}
      />

      {/* Skills & Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Learning by building — from academic foundations to real-world projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
                <div className="text-3xl mb-3">{skill.icon}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{skill.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.skills.map((item, index) => (
                    <Badge key={index} className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="text-md hover:text-accent hover:underline transition-colors text-accent"
            >
              <strong>View all projects &rarr;</strong>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications & CV Section */}
      {certifications.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 overflow-visible">
          <div className="max-w-7xl mx-auto overflow-visible">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Credentials & Documents
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore my professional certifications, CV, and portfolio documents
              </p>
            </div>

            <CertificationsStack certifications={certifications} />
          </div>
        </section>
      )}

      {/* Vision Quote Section */}
      {visionQuote && (
        <VisionQuote quote={visionQuote} />
      )}
    </main>
  );
}

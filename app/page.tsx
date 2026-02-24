import { Hero } from '@/components/layout/hero';
import { ProfileSnapshot } from '@/components/sections/profile-snapshot';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectGrid } from '@/components/sections/projects-grid';
import { CertificationsStack } from '@/components/sections/certifications-stack';
import { CallToAction } from '@/components/sections/call-to-action';
import { BlurFade } from '@/components/magicui/blur-fade';
import { loadPersonalInfo, loadSocialLinks, getFeaturedProjects, getEnabledSkills, getEnabledCertifications, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';

export default async function Home() {
  const lang = await getLanguage();

  const [personalInfoResult, socialLinksResult, featuredProjectsResult, skillsResult, certificationsResult, translationsResult] = await Promise.all([
    loadPersonalInfo(lang),
    loadSocialLinks(lang),
    getFeaturedProjects(lang),
    getEnabledSkills(lang),
    getEnabledCertifications(lang),
    loadTranslations(lang),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;
  const featuredProjects = featuredProjectsResult.data;
  const skills = skillsResult.data;
  const certifications = certificationsResult.data;
  const t = translationsResult.data;

  const availabilityText = lang === 'fr'
    ? 'Disponible pour stage — Été 2026'
    : 'Available for internship — Summer 2026';

  return (
    <main className="min-h-screen">
      <Hero
        personalInfo={personalInfo}
        socialLinks={socialLinks}
        availability={availabilityText}
      />

      <ProfileSnapshot lang={lang} />

      <SkillsSection
        skills={skills}
        title={t.home.skillsTitle}
        subtitle={t.home.skillsSubtitle}
      />

      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <BlurFade delay={0.05} inView>
            <p className="text-primary text-xs font-mono tracking-widest uppercase mb-4">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display mb-6">
              {t.home.featuredProjectsTitle}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mb-20 sm:mb-24">
              {t.home.featuredProjectsSubtitle}
            </p>
          </BlurFade>

          <ProjectGrid
            projects={featuredProjects}
            featured={true}
            lang={lang}
          />
        </div>
      </section>

      <CertificationsStack
        certifications={certifications}
        title={t.home.credentialsTitle}
        subtitle={t.home.credentialsSubtitle}
      />

      <CallToAction email={personalInfo.email} lang={lang} />
    </main>
  );
}

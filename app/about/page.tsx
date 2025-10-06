import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, FileText, Download } from 'lucide-react';
import { loadPersonalInfo, loadSocialLinks, getEnabledTimeline, getEnabledAboutCards, getEnabledSkills, loadTranslations } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';
import { SocialLinks } from '@/components/sections/social-links';
import { Timeline } from '@/components/sections/timeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my journey as a developer, my passion for technology, and what drives me to create innovative solutions.',
  openGraph: {
    title: 'About | Amaury Dufrenot',
    description: 'Learn more about my journey as a developer, my passion for technology, and what drives me to create innovative solutions.',
  },
};

export default async function AboutPage() {
  // Get current language
  const lang = await getLanguage();
  
  const [personalInfoResult, socialLinksResult, timelineResult, aboutCardsResult, skillsResult, translationsResult] = await Promise.all([
    loadPersonalInfo(lang),
    loadSocialLinks(lang),
    getEnabledTimeline(lang),
    getEnabledAboutCards(lang),
    getEnabledSkills(lang),
    loadTranslations(lang),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;
  const timeline = timelineResult.data;
  const aboutCards = aboutCardsResult.data;
  const skills = skillsResult.data;
  const t = translationsResult.data;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Profile Section - Image Left, Info Right */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          {/* Profile Image - Left */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.avatarAlt}
                width={350}
                height={350}
                className="w-full h-auto rounded-2xl border border-border shadow-xl"
                priority
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-accent/10 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Information Block - Right */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-lg text-accent font-medium mb-3">
                {personalInfo.title}
              </p>
              <div className="w-16 h-0.5 bg-accent mb-4"></div>
            </div>

            {/* Bio */}
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>{personalInfo.bio}</p>
              <p>
                {t.about.specializingIn}
              </p>
            </div>

            {/* Contact Details - Row */}
                <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📍</span>
                      <span>{personalInfo.location}</span>
                    </div>
                  
                      <a 
                        href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                      >
                  <span className="text-base">✉️</span>
                  <span>{personalInfo.email}</span>
                      </a>
                  
                      <a 
                        href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                      >
                  <span className="text-base">📞</span>
                  <span>{personalInfo.phone}</span>
                      </a>
                </div>

              {/* Social Links - Bottom Row, Better Aligned */}
              <div className="flex items-center">
                  <SocialLinks socialLinks={socialLinks} />
                </div>
            </div>
          </div>
        </section>

        {/* Who I Am */}
        <section className="px-40">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.about.whoIAm}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {aboutCards.map((card) => (
                <div key={card.id} className="space-y-3">
                  <div className="text-4xl mb-2">{card.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - CV & Contact */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t.about.workTogether}
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {t.about.workTogetherSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CV Card */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t.about.myResume}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t.about.resumeDescription}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button asChild className="flex-1">
                      <Link href="/cv">
                        <FileText className="mr-2 h-4 w-4" />
                        {t.about.viewCV}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t.about.contactMe}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t.about.contactDescription}
                    </p>
                  </div>
                  <div className="space-y-3 w-full text-left">
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{personalInfo.email}</span>
                    </a>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.about.skillsTitle}
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {t.about.skillsSubtitle}
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
        </section>

        {/* Timeline Roadmap Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.about.myJourney}
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {t.about.myJourneySubtitle}
            </p>
          </div>
          
          <Timeline items={timeline} />
        </section>
      </div>
    </main>
  );
}

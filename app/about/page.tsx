import Image from 'next/image';
import { Mail } from 'lucide-react';
import { loadPersonalInfo, loadSocialLinks, getEnabledTimeline } from '@/lib/data-loader';
import { SocialLinks } from '@/components/sections/social-links';
import { Timeline } from '@/components/sections/timeline';
import { Badge } from '@/components/ui/badge';
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
  const [personalInfoResult, socialLinksResult, timelineResult] = await Promise.all([
    loadPersonalInfo(),
    loadSocialLinks(),
    getEnabledTimeline(),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;
  const timeline = timelineResult.data;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Profile Section - Image Left, Info Right */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                Specializing in network and telecommunications, I combine technical excellence with 
                creative problem-solving to build robust, scalable applications.
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

        {/* Skills & Expertise Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Learning by building — from academic foundations to real-world projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Network & Systems */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-base font-semibold text-foreground mb-2">Network & Systems</h3>
              <p className="text-xs text-muted-foreground mb-3">Academic studies + hands-on projects</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">TCP/IP</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Linux</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">System Admin</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Network Config</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Cisco Packet Tracer</Badge>

              </div>
            </div>

            {/* Cybersecurity */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-base font-semibold text-foreground mb-2">Cybersecurity</h3>
              <p className="text-xs text-muted-foreground mb-3">Global Cybersecurity Knowledge</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Web Security</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">CTF</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Red Team</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">OSINT</Badge>

              </div>
            </div>

            {/* AI & Neural Networks */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-base font-semibold text-foreground mb-2">AI</h3>
              <p className="text-xs text-muted-foreground mb-3">Studies & hands-on experience</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Neural Networks</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Python ML</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Hugging Face</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Cursor AI</Badge>
              </div>
            </div>

            {/* Programming & Web Dev */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="text-base font-semibold text-foreground mb-2">Programming & Web Dev</h3>
              <p className="text-xs text-muted-foreground mb-3">Still learning with AI assistance</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Python</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">JavaScript/TypeScript</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Next.js/React</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">HTML/CSS</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Tailwind CSS</Badge>
              </div>
            </div>

            {/* Backend & Deployment */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">🗄️</div>
              <h3 className="text-base font-semibold text-foreground mb-2">Database & Backend</h3>
              <p className="text-xs text-muted-foreground mb-3">Building & deploying full-stack projects</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Supabase</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">PostgreSQL</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">REST APIs</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">DNS/Domain Config</Badge>
              </div>
        </div>

            {/* Tools & Workflow */}
            <div className="bg-card/30 border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
              <div className="text-3xl mb-3">🛠️</div>
              <h3 className="text-base font-semibold text-foreground mb-2">Dev Tools & Workflow</h3>
              <p className="text-xs text-muted-foreground mb-3">Modern development environment</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Git</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Docker</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">VS Code</Badge>
                <Badge className="bg-violet-600/10 text-foreground hover:bg-violet-600/20 text-[10px]">Figma</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Roadmap Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              My Journey
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              A roadmap of milestones, achievements, and the path that shaped my career
            </p>
          </div>
          
          <Timeline items={timeline} />
        </section>

        {/* Beyond the Code - Hobbies & Personality */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Beyond the Code
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              The person behind the developer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What Drives Me */}
              <div className="bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">What Drives Me</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Passionate about solving complex problems and building solutions that make a real impact. 
                      I believe in continuous learning and pushing boundaries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">Interests & Hobbies</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tech enthusiast, always exploring new technologies. Love traveling, experiencing different 
                      cultures, and finding inspiration in new perspectives.
                    </p>
                  </div>
                </div>
            </div>

              {/* Learning Philosophy */}
              <div className="bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📚</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">Learning Philosophy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Believer in learning by doing. Whether it's a new framework or a challenging project, 
                      I dive in hands-first and learn through experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Collaboration */}
              <div className="bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">Collaboration Style</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Team player who values clear communication and shared goals. I thrive in environments 
                      where ideas flow freely and innovation is encouraged.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import { Mail, Phone, MapPin } from 'lucide-react';
import { loadPersonalInfo, loadSocialLinks, getEnabledTimeline } from '@/lib/data-loader';
import { SocialLinks } from '@/components/sections/social-links';
import { Timeline } from '@/components/sections/timeline';
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
      <div className="max-w-5xl mx-auto">
        {/* Hero Section - Minimal & Clean */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {personalInfo.name}
          </p>
        </div>

        {/* Story Section - Epurated */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">My Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="text-foreground font-semibold">{personalInfo.name}</span>, 
                a {personalInfo.title.toLowerCase()} based in {personalInfo.location}. 
                My journey in technology is driven by a deep passion for creating innovative solutions 
                that bridge the gap between complex systems and user needs.
              </p>
              <p>
                Specializing in network and telecommunications, I combine technical excellence with 
                creative problem-solving to build robust, scalable applications. Every project is an 
                opportunity to learn, innovate, and push the boundaries of what's possible.
              </p>
              <p>
                I believe in the power of technology to transform ideas into reality, and I'm committed 
                to continuous learning and growth in this ever-evolving field.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information - Clean Cards */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Card */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="group bg-card border border-border rounded-xl p-6 text-center hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Email</h3>
                <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                  {personalInfo.email}
                </p>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="group bg-card border border-border rounded-xl p-6 text-center hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                  {personalInfo.phone}
                </p>
              </a>

              {/* Location Card */}
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex justify-center">
              <SocialLinks socialLinks={socialLinks} />
            </div>
          </div>
        </section>

        {/* Journey Timeline - Beautiful Vertical Line */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">My Journey</h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              A roadmap of milestones, achievements, and the path that shaped my career
            </p>
            <Timeline items={timeline} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Let's Build Something Great
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              <Mail className="w-5 h-5" />
              Send Me a Message
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

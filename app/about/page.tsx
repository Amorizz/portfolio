import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { loadPersonalInfo, loadSocialLinks } from '@/lib/data-loader';
import { SocialLinks } from '@/components/sections/social-links';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my journey as a developer, my passion for technology, and what drives me to create innovative solutions.',
  openGraph: {
    title: 'About | Amaud Portfolio',
    description: 'Learn more about my journey as a developer, my passion for technology, and what drives me to create innovative solutions.',
  },
};

export default async function AboutPage() {
  const [personalInfoResult, socialLinksResult] = await Promise.all([
    loadPersonalInfo(),
    loadSocialLinks(),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;

  const skills = [
    'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js',
    'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
    'Git', 'Tailwind CSS', 'GraphQL', 'REST APIs'
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Current Role',
      period: '2023 - Present',
      description: 'Building scalable web applications and leading development teams.',
    },
    {
      title: 'Frontend Developer',
      company: 'Previous Role',
      period: '2021 - 2023',
      description: 'Specialized in React and modern frontend technologies.',
    },
    {
      title: 'Junior Developer',
      company: 'First Role',
      period: '2020 - 2021',
      description: 'Started my journey in web development and learned the fundamentals.',
    },
  ];

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            About Me
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative solutions and pushing the boundaries of what's possible
          </p>
        </div>

        {/* Personal Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.avatarAlt}
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-2xl border border-border"
                priority
              />
            </div>
          </div>

          {/* Personal Details */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{personalInfo.name}</CardTitle>
                <p className="text-accent text-lg">{personalInfo.title}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {personalInfo.bio}
                </p>
                
                <div className="space-y-4">
                  {personalInfo.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-accent">📍</span>
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  
                  {personalInfo.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-accent">✉️</span>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="hover:text-accent transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  )}
                  
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-accent">📞</span>
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="hover:text-accent transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <SocialLinks socialLinks={socialLinks} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <Card className="bg-card border-border mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-background text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="bg-card border-border mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Professional Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-accent text-sm">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground font-medium mb-1">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                  {index < experiences.length - 1 && (
                    <Separator className="mt-4 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Philosophy Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">My Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of technology to solve real-world problems and create meaningful experiences. 
                My approach to development is rooted in continuous learning, attention to detail, and a passion 
                for creating solutions that make a difference.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community. I'm always excited to take on new challenges 
                and collaborate with like-minded individuals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, getInitials } from '@/lib/utils';
import { BlurFade } from '@/components/magicui/blur-fade';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    avatarAlt: string;
    location?: string;
    email: string;
  };
  socialLinks: { platform: string; url: string; label: string }[];
  availability?: string;
  className?: string;
}

export function Hero({ personalInfo, socialLinks, availability, className }: HeroProps) {
  const linkedIn = socialLinks.find((l) => l.platform === 'linkedin');
  const github = socialLinks.find((l) => l.platform === 'github');

  return (
    <section className={cn('relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden', className)}>
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-[0.04]"
        cr={1}
        cx={1}
        cy={1}
        width={32}
        height={32}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,hsl(28_67%_50%/0.04),transparent)]" />

      <div className="relative max-w-6xl mx-auto w-full pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 items-center">
          <div className="space-y-7">
            <BlurFade delay={0.05} inView>
              <span className="inline-flex items-center gap-2.5 text-xs font-mono text-primary bg-primary/6 border border-primary/12 rounded-full px-4 py-2 tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {availability || 'Open to opportunities'}
              </span>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter font-display leading-[0.95] break-words">
                <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
                <br />
                <span className="text-foreground/90">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 accent-line" />
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium font-display tracking-tight">
                  {personalInfo.title}
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="text-base sm:text-[17px] text-muted-foreground/60 leading-[1.7] max-w-lg">
                {personalInfo.bio}
              </p>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground/40 font-mono tracking-wide">
                  <MapPin className="size-3.5 text-primary/50" />
                  {personalInfo.location}
                </div>
              )}
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {linkedIn && (
                  <a
                    href={linkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/40 px-4 py-2.5 min-h-[44px] text-sm text-muted-foreground transition-all hover:border-primary/25 hover:bg-primary/8 hover:text-primary"
                  >
                    <Linkedin className="size-4" />
                    <span className="font-mono text-xs tracking-wide">LinkedIn</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/40 px-4 py-2.5 min-h-[44px] text-sm text-muted-foreground transition-all hover:border-border/40 hover:bg-secondary/80 hover:text-foreground"
                  >
                    <Github className="size-4" />
                    <span className="font-mono text-xs tracking-wide">GitHub</span>
                  </a>
                )}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/40 px-4 py-2.5 min-h-[44px] text-sm text-muted-foreground transition-all hover:border-primary/25 hover:bg-primary/8 hover:text-primary"
                >
                  <Mail className="size-4" />
                  <span className="font-mono text-xs tracking-wide">Email</span>
                </a>
                <Link
                  href="/cv"
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-2.5 min-h-[44px] text-sm text-primary transition-all hover:border-primary/40 hover:bg-primary/12"
                >
                  <FileText className="size-4" />
                  <span className="font-mono text-xs tracking-wide">View CV</span>
                </Link>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.15} inView>
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="relative rounded-full p-[2px]">
                <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,hsl(28_67%_50%/0.12),transparent_70%)]" />
                <Avatar className="relative w-52 h-52 xl:w-60 xl:h-60 border border-border/20 ring-1 ring-primary/10 ring-offset-2 ring-offset-background">
                  <AvatarImage src={personalInfo.avatar} alt={personalInfo.avatarAlt} className="object-cover" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-4xl font-bold font-display">
                    {getInitials(personalInfo.name)}
                  </AvatarFallback>
                </Avatar>
                <BorderBeam size={120} duration={10} borderWidth={1.5} colorFrom="#d57a2a" colorTo="#f7d708" />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

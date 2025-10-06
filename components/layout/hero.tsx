'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';
import { HeroProps } from '@/lib/types';
import { SocialLinks } from '@/components/sections/social-links';
import Link from 'next/link';

export function Hero({ personalInfo, socialLinks, t, className }: HeroProps) {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 hero-circles', className)}>
      {/* Third violet circle */}
      <div className="hero-circle-3"></div>
      
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="text-center">
          {/* Avatar */}
          <div className="mb-6">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage
                src={personalInfo.avatar}
                alt={personalInfo.avatarAlt}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-lg font-semibold">
                {getInitials(personalInfo.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name and Title */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {personalInfo.name}
            </h1>
            <h2 className="text-lg sm:text-xl text-accent font-medium mb-2">
              {personalInfo.title}
            </h2>
            {personalInfo.location && (
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                <span className="text-accent">📍</span>
                <span>{personalInfo.location}</span>
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-6 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <SocialLinks socialLinks={socialLinks} />
          </div>

          {/* Know More About Me Button */}
          <div className="mb-6">
            <Link href="/about">
              <Button variant="default" className="rounded-md hover:bg-accent hover:text-white hover:cursor-pointer">
                {t?.hero?.knowMoreAboutMe || 'Know More About Me'}
              </Button>
            </Link>
          </div>

          {/* Contact Information */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-muted-foreground">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1 hover:text-accent transition-colors text-sm px-2 py-1 rounded space-hover"
                >
                  <span className="text-accent">✉️</span>
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-1 hover:text-accent transition-colors text-sm px-2 py-1 rounded space-hover"
                >
                  <span className="text-accent">📞</span>
                  <span>{personalInfo.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

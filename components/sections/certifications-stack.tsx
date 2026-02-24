'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Certification } from '@/lib/types';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import Link from 'next/link';

interface CertificationsStackProps {
  certifications: Certification[];
  title: string;
  subtitle: string;
  className?: string;
}

const statusConfig = {
  completed: {
    en: 'Completed',
    fr: 'Terminé',
    className: 'text-[var(--black-forest-400)] bg-[var(--black-forest-400)]/10 border-[var(--black-forest-400)]/20',
    icon: CheckCircle,
  },
  'in-progress': {
    en: 'In Progress',
    fr: 'En cours',
    className: 'text-[var(--cornsilk-500)] bg-[var(--cornsilk-500)]/10 border-[var(--cornsilk-500)]/20',
    icon: Clock,
  },
  active: {
    en: 'Active',
    fr: 'Actif',
    className: 'text-primary bg-primary/10 border-primary/20',
    icon: CheckCircle,
  },
};

export function CertificationsStack({ certifications, title, subtitle, className }: CertificationsStackProps) {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang(saved === 'fr' ? 'fr' : 'en');
  }, []);

  const viewLabel = lang === 'fr' ? 'Voir' : 'View';

  return (
    <section className={cn('py-32 sm:py-40 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-6xl mx-auto w-full">
        <BlurFade delay={0.05} inView>
          <p className="text-primary text-xs font-mono tracking-widest uppercase mb-4">
            {lang === 'fr' ? 'Certifications' : 'Credentials'}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display mb-6">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mb-20 sm:mb-24">
            {subtitle}
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const status = cert.status ? statusConfig[cert.status] : null;
            const StatusIcon = status?.icon;
            const hasLink = !!cert.url;

            const cardContent = (
              <MagicCard gradientOpacity={0.1} className="h-full">
                <div className="p-7 sm:p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-3xl">{cert.icon}</span>
                    {status && (
                      <span className={cn('inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border', status.className)}>
                        {StatusIcon && <StatusIcon className="size-3" />}
                        {lang === 'fr' ? status.fr : status.en}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-display mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed flex-1">
                    {cert.description}
                  </p>

                  {hasLink && (
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
                      {viewLabel}
                      <ArrowUpRight className="size-4" />
                    </div>
                  )}
                </div>
              </MagicCard>
            );

            return (
              <BlurFade key={cert.id} delay={0.1 + i * 0.06} inView>
                {hasLink ? (
                  cert.type === 'cv' ? (
                    <Link href={cert.url} className="block h-full group">
                      {cardContent}
                    </Link>
                  ) : (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
                      {cardContent}
                    </a>
                  )
                ) : (
                  <div className="h-full">{cardContent}</div>
                )}
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

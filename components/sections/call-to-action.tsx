'use client';

import Link from 'next/link';
import { Mail, FileText } from 'lucide-react';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

interface CallToActionProps {
  email: string;
  lang: string;
}

const copy = {
  en: {
    label: 'Get in Touch',
    title: "Let's Work Together",
    description: 'Looking for an ambitious intern who builds, ships, and learns fast? I\'m available for a 6-month internship starting summer 2026.',
    emailBtn: 'Send me an email',
    cvBtn: 'View my CV',
  },
  fr: {
    label: 'Contact',
    title: 'Travaillons Ensemble',
    description: 'Vous cherchez un stagiaire ambitieux qui construit, livre et apprend vite ? Je suis disponible pour un stage de 6 mois à partir de l\'été 2026.',
    emailBtn: 'Envoyez-moi un email',
    cvBtn: 'Voir mon CV',
  },
};

export function CallToAction({ email, lang }: CallToActionProps) {
  const t = lang === 'fr' ? copy.fr : copy.en;

  return (
    <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0.05} inView>
            <p className="text-primary text-xs font-mono tracking-widest uppercase mb-4">{t.label}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display mb-6">
              {t.title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground/70 leading-relaxed mb-12">
              {t.description}
            </p>
          </BlurFade>

          <BlurFade delay={0.15} inView>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`mailto:${email}`}>
                <ShimmerButton className="h-12 px-8 text-sm font-medium">
                  <Mail className="size-4 mr-2" />
                  {t.emailBtn}
                </ShimmerButton>
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium rounded-full border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
              >
                <FileText className="size-4" />
                {t.cvBtn}
              </Link>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}

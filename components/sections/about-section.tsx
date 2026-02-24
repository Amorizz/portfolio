'use client';

import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { AboutCard } from '@/lib/types';

interface AboutSectionProps {
  aboutCards: AboutCard[];
  title: string;
}

export function AboutSection({ aboutCards, title }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/40">
      <div className="max-w-5xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-mono tracking-wider uppercase mb-3">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display">
              {title}
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutCards.map((card, i) => (
            <BlurFade key={card.id} delay={0.15 + i * 0.1} inView>
              <MagicCard className="h-full p-6" gradientOpacity={0.06}>
                <div className="space-y-3">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="text-base font-semibold text-foreground font-display">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

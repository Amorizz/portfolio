'use client';

import { BlurFade } from '@/components/magicui/blur-fade';

interface ProfileSnapshotProps {
  lang: string;
}

interface SnapshotBlock {
  keyword: string;
  detail: string;
  color: string;
}

const data: Record<string, { sectionLabel: string; sectionTitle: string; intro: string; blocks: SnapshotBlock[] }> = {
  en: {
    sectionLabel: 'At a Glance',
    sectionTitle: 'Who I Am',
    intro: 'Builder, student, and competitor — I thrive where creativity meets ambition.',
    blocks: [
      {
        keyword: 'Entrepreneur',
        detail: 'Founder of Novad · Co-founder of PlayTennisEverywhere',
        color: 'var(--copperwood-500)',
      },
      {
        keyword: 'Student',
        detail: 'Engineering · Networks & Telecom — UTT',
        color: 'var(--black-forest-400)',
      },
      {
        keyword: '4 Languages',
        detail: 'FR native · EN C1 · ES B1 · CN A2',
        color: 'var(--cornsilk-500)',
      },
      {
        keyword: 'Open to Work',
        detail: '6-month internship · Network Infra · Summer 2026',
        color: 'var(--olive-leaf-400)',
      },
    ],
  },
  fr: {
    sectionLabel: 'En un coup d\'œil',
    sectionTitle: 'Qui je suis',
    intro: 'Bâtisseur, étudiant et compétiteur — j\'avance là où créativité et ambition se rencontrent.',
    blocks: [
      {
        keyword: 'Entrepreneur',
        detail: 'Fondateur de Novad · Co-fondateur de PlayTennisEverywhere',
        color: 'var(--copperwood-500)',
      },
      {
        keyword: 'Étudiant',
        detail: 'Ingénieur · Réseaux & Télécoms — UTT',
        color: 'var(--black-forest-400)',
      },
      {
        keyword: '4 Langues',
        detail: 'FR natif · EN C1 · ES B1 · CN A2',
        color: 'var(--cornsilk-500)',
      },
      {
        keyword: 'Disponible',
        detail: 'Stage 6 mois · Infra Réseau · Été 2026',
        color: 'var(--olive-leaf-400)',
      },
    ],
  },
};

export function ProfileSnapshot({ lang }: ProfileSnapshotProps) {
  const t = lang === 'fr' ? data.fr : data.en;

  return (
    <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <BlurFade delay={0.05} inView>
          <p className="text-primary text-xs font-mono tracking-widest uppercase mb-4">{t.sectionLabel}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display mb-6">{t.sectionTitle}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mb-20 sm:mb-24">{t.intro}</p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-x-20 lg:gap-x-28 sm:gap-y-16">
          {t.blocks.map((block, i) => (
            <BlurFade key={i} delay={0.12 + i * 0.08} inView>
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: block.color }}
                  />
                  <h3
                    className="text-2xl sm:text-3xl font-bold font-display tracking-tight"
                    style={{ color: block.color }}
                  >
                    {block.keyword}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground/70 pl-[22px]">{block.detail}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

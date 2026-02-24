'use client';

import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard } from '@/components/magicui/magic-card';
import { Skill } from '@/lib/types';

interface SkillsSectionProps {
  skills: Skill[];
  title: string;
  subtitle: string;
}

const accentMap: Record<string, { color: string; hex: string }> = {
  '🌐': { color: 'var(--copperwood-400)', hex: '#dd9455' },
  '🔐': { color: 'var(--sunlit-clay-400)', hex: '#db9d57' },
  '🤖': { color: 'var(--cornsilk-400)', hex: '#f9df39' },
  '💻': { color: 'var(--black-forest-400)', hex: '#9cc072' },
  '🗄️': { color: 'var(--olive-leaf-400)', hex: '#aaba78' },
  '🛠️': { color: 'var(--olive-leaf-500)', hex: '#95a857' },
};

export function SkillsSection({ skills, title, subtitle }: SkillsSectionProps) {
  return (
    <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <BlurFade delay={0.05} inView>
          <p className="text-primary text-xs font-mono tracking-widest uppercase mb-4">Skills</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display mb-6">{title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mb-20 sm:mb-24">{subtitle}</p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => {
            const accent = accentMap[skill.icon] || accentMap['🛠️'];
            return (
              <BlurFade key={skill.id} delay={0.1 + i * 0.06} inView>
                <MagicCard
                  gradientColor={accent.hex}
                  gradientOpacity={0.12}
                  className="h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div
                      className="h-0.5 w-10 rounded-full mb-6"
                      style={{ backgroundColor: accent.color }}
                    />

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl leading-none">{skill.icon}</span>
                      <h3 className="text-base font-bold font-display text-foreground">
                        {skill.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground/60 mb-5">{skill.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {skill.skills.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/80 text-foreground/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

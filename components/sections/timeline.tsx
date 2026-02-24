'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TimelineItem } from '@/lib/types';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const reversedItems = [...items].reverse();

  return (
    <div className={cn('relative py-8', className)}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Vertical line: left on mobile, center on md+ */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/20 md:-translate-x-1/2" />

        <div className="space-y-10 md:space-y-12">
          {reversedItems.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isLast = item.isLast === true;

            if (isLast) {
              return (
                <BlurFade key={item.id} delay={0.1 + index * 0.1} inView>
                  {/* Mobile: left-aligned */}
                  <div className="relative md:hidden pl-16">
                    <div className="absolute left-[29px] top-1/2 -translate-y-1/2 flex items-center">
                      <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[10px] border-l-transparent border-r-transparent border-b-primary" />
                    </div>
                    <div className="bg-card border border-border/20 px-4 py-2.5 rounded-full inline-flex flex-col">
                      <p className="text-xs font-medium text-primary font-display">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {/* Desktop: centered */}
                  <div className="relative h-12 hidden md:block">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[10px] border-l-transparent border-r-transparent border-b-primary" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-14 text-center">
                      <div className="bg-card border border-border/20 px-4 py-2 rounded-full">
                        <p className="text-xs font-medium text-primary whitespace-nowrap font-display">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              );
            }

            return (
              <BlurFade key={item.id} delay={0.1 + index * 0.1} inView>
                {/* Mobile layout: single column, left-aligned */}
                <div className="relative md:hidden pl-16">
                  <div className="absolute left-[26px] top-1/2 -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 bg-card border border-border/20 px-3 py-1.5 rounded-full">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold text-primary font-mono">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-foreground leading-tight font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Desktop layout: alternating two-column */}
                <div className="relative hidden md:block">
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className={cn(
                      'flex items-center gap-3',
                      isLeft ? 'justify-end pr-6' : 'justify-end pr-6 opacity-0 pointer-events-none'
                    )}>
                      {isLeft && (
                        <>
                          <div className="text-right flex-1">
                            <h3 className="text-sm font-medium text-foreground leading-tight font-display">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 bg-card border border-border/20 px-3 py-1.5 rounded-full flex-shrink-0">
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="text-xs font-semibold text-primary whitespace-nowrap font-mono">
                              {item.year}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className={cn(
                      'flex items-center gap-3',
                      !isLeft ? 'justify-start pl-6' : 'justify-start pl-6 opacity-0 pointer-events-none'
                    )}>
                      {!isLeft && (
                        <>
                          <div className="flex items-center gap-1.5 bg-card border border-border/20 px-3 py-1.5 rounded-full flex-shrink-0">
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="text-xs font-semibold text-primary whitespace-nowrap font-mono">
                              {item.year}
                            </span>
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="text-sm font-medium text-foreground leading-tight font-display">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { TimelineItem } from '@/lib/types';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative py-12', className)}>
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-accent/0 via-accent to-accent/0" />

      {/* Timeline Items */}
      <div className="space-y-16">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16',
              'group'
            )}
          >
            {/* Left Side Content */}
            <div
              className={cn(
                'md:text-right',
                item.side === 'right' && 'md:order-1'
              )}
            >
              {item.side === 'left' ? (
                <div className="space-y-3">
                  <div className="inline-block">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ) : (
                <div className="hidden md:block">
                  <div className="text-6xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">
                    {item.year}
                  </div>
                </div>
              )}
            </div>

            {/* Center Point */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
              <div className="w-5 h-5 rounded-full bg-accent border-4 border-background group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-accent/50 transition-all duration-300" />
            </div>

            {/* Right Side Content */}
            <div
              className={cn(
                'md:text-left',
                item.side === 'left' && 'md:order-2'
              )}
            >
              {item.side === 'right' ? (
                <div className="space-y-3">
                  <div className="md:hidden mb-2">
                    <div className="text-4xl font-bold text-accent/40">
                      {item.year}
                    </div>
                  </div>
                  <div className="inline-block">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ) : (
                <>
                  <div className="md:hidden mb-2">
                    <div className="text-4xl font-bold text-accent/40">
                      {item.year}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-6xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">
                      {item.year}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Center Point */}
            <div className="absolute -left-3 top-0 md:hidden">
              <div className="w-3 h-3 rounded-full bg-accent border-2 border-background" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


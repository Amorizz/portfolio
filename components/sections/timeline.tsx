'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimelineItem } from '@/lib/types';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative py-16', className)}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Straight vertical line in the center - VIOLET */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-violet-500/60 -translate-x-1/2 shadow-sm shadow-violet-500/20" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={item.id}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-12 items-center">
                  {/* LEFT SIDE */}
                  <div className={cn(
                    "flex items-center gap-3",
                    isLeft ? "justify-end pr-6" : "justify-end pr-6 opacity-0 pointer-events-none"
                  )}>
                    {isLeft ? (
                      <>
                        <div className="text-right flex-1">
                          <h3 className="text-sm font-medium text-foreground leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-violet-500/10 backdrop-blur-sm px-2 py-1 rounded-full border border-violet-500/30 flex-shrink-0">
                          <Calendar className="w-2.5 h-2.5 text-violet-400" />
                          <span className="text-[10px] font-medium text-violet-300 whitespace-nowrap">
                            {item.year}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* RIGHT SIDE */}
                  <div className={cn(
                    "flex items-center gap-3",
                    !isLeft ? "justify-start pl-6" : "justify-start pl-6 opacity-0 pointer-events-none"
                  )}>
                    {!isLeft ? (
                      <>
                        <div className="flex items-center gap-1 bg-violet-500/10 backdrop-blur-sm px-2 py-1 rounded-full border border-violet-500/30 flex-shrink-0">
                          <Calendar className="w-2.5 h-2.5 text-violet-400" />
                          <span className="text-[10px] font-medium text-violet-300 whitespace-nowrap">
                            {item.year}
                          </span>
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-sm font-medium text-foreground leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Center Point - Subtle Bounce, Aligned */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center w-3 h-3">
                    {/* Glowing dot with subtle bounce */}
                    <div 
                      className="absolute inset-0 w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/80" 
                      style={{ 
                        animation: 'subtleBounce 2s ease-in-out infinite',
                        animationDelay: `${index * 0.3}s` 
                      }} 
                    />
                    {/* Ping effect */}
                    <div 
                      className="absolute inset-0 w-3 h-3 rounded-full bg-violet-500 animate-ping opacity-60"
                      style={{ 
                        animationDuration: '2s', 
                        animationDelay: `${index * 0.3}s` 
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


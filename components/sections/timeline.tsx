'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimelineItem } from '@/lib/types';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  // Reverse the items array so timeline goes from bottom to top
  const reversedItems = [...items].reverse();
  
  // Calculate total animation duration based on number of non-last items
  const nonLastItems = reversedItems.filter((item) => !item.isLast);
  const totalDuration = nonLastItems.length * 0.5;
  
  return (
    <div className={cn('relative py-16', className)}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Straight vertical line in the center - VIOLET */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-violet-500/60 -translate-x-1/2 shadow-sm shadow-violet-500/20" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {reversedItems.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isLast = item.isLast === true;
            
            // For the last item, show it centered with arrow pointing up
            if (isLast) {
              return (
                <div key={item.id} className="relative h-15">
                  {/* Upward Arrow at the top */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-violet-500" />
                  </div>

                  {/* Centered Text Above Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-16 text-center">
                    <div className="bg-violet-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-500/30">
                      <p className="text-xs font-medium text-violet-300 whitespace-nowrap">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

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
                        <div className="flex items-center gap-1.5 bg-violet-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-500/30 flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-violet-400" />
                          <span className="text-xs font-semibold text-violet-300 whitespace-nowrap">
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
                        <div className="flex items-center gap-1.5 bg-violet-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-500/30 flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-violet-400" />
                          <span className="text-xs font-semibold text-violet-300 whitespace-nowrap">
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
                        animation: `subtleBounce ${totalDuration}s ease-in-out infinite`,
                        animationDelay: `${index * 0.5}s` 
                      }} 
                    />
                    {/* Ping effect */}
                    <div 
                      className="absolute inset-0 w-3 h-3 rounded-full bg-violet-500 animate-ping opacity-60"
                      style={{ 
                        animationDuration: `${totalDuration}s`, 
                        animationDelay: `${index * 0.5}s` 
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


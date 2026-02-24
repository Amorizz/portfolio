'use client';

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisionQuoteProps } from '@/lib/types';
import { BlurFade } from '@/components/magicui/blur-fade';

export function VisionQuote({ quote, className }: VisionQuoteProps) {
  return (
    <section className={cn('py-16 sm:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <BlurFade delay={0.1} inView>
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="h-8 w-8 text-primary/30 mx-auto mb-6" />

          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/90 leading-relaxed mb-6 italic font-display">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>

          {quote.author && (
            <footer className="text-sm text-primary font-medium font-mono">
              {quote.author}
            </footer>
          )}
        </div>
      </BlurFade>
    </section>
  );
}

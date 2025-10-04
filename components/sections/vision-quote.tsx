'use client';

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisionQuoteProps } from '@/lib/types';

export function VisionQuote({ quote, className }: VisionQuoteProps) {
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
          {/* Quote Icon */}
          <div className="mb-6">
            <Quote className="h-12 w-12 text-accent mx-auto" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-card-foreground leading-relaxed mb-6">
            "{quote.quote}"
          </blockquote>

          {/* Quote Author */}
          {quote.author && (
            <footer className="text-lg text-accent font-medium">
              — {quote.author}
            </footer>
          )}
        </div>
      </div>
    </section>
  );
}

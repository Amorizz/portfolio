'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Certification } from '@/lib/types';

interface CertificationsStackProps {
  certifications: Certification[];
  className?: string;
}

export function CertificationsStack({ certifications, className }: CertificationsStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalCards = certifications.length;

  // Auto-retract after 3 seconds when cursor leaves
  useEffect(() => {
    if (hoveredIndex !== null && !isExpanded) {
      setIsExpanded(true);
    }
  }, [hoveredIndex, isExpanded]);

  const handleMouseEnterCard = (index: number) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredIndex(index);
    setIsExpanded(true);
  };

  const handleMouseLeaveContainer = () => {
    // Set timeout to retract after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      setIsExpanded(false);
    }, 3000);
  };

  const handleMouseEnterContainer = () => {
    // Clear timeout when mouse re-enters
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getCardPosition = (index: number) => {
    const baseOffset = 8; // Small offset to show stacking effect
    
    if (!isExpanded) {
      // Stacked/overlapping state - cards peek from behind
      return {
        transform: `translateX(${index * baseOffset}px) translateY(${index * baseOffset}px) rotate(${index * 1}deg)`,
        zIndex: totalCards - index, // First card on top
        left: '50%',
        marginLeft: '-140px',
        opacity: index === 0 ? 1 : 0.6 + (index * 0.1), // First card fully opaque, others slightly transparent
      };
    } else {
      // Classic flex row layout when expanded, centered
      return {
        transform: `translateX(0px) translateY(0px) rotate(0deg)`,
        zIndex: hoveredIndex === index ? 100 : index,
        left: 'auto',
        marginLeft: '0px',
        opacity: 1,
      };
    }
  };

  return (
    <div className={cn('relative py-12', className)}>
      {/* Container for stacked cards */}
      <div 
        className="relative mx-auto overflow-visible"
        style={{ 
          height: '400px',
          maxWidth: !isExpanded ? '700px' : '100%',
        }}
        onMouseLeave={handleMouseLeaveContainer}
        onMouseEnter={handleMouseEnterContainer}
      >
        <div className={cn(
          "relative h-full flex items-center",
          isExpanded ? "justify-center flex-wrap gap-6" : "justify-center"
        )}>
          {certifications.map((cert, index) => {
            const position = getCardPosition(index);
            const isHovered = hoveredIndex === index;
            const isFirstCard = index === 0;
            
            return (
              <div
                key={cert.id}
                className={cn(
                  'transition-all duration-500 ease-out',
                  isExpanded ? 'relative' : 'absolute'
                )}
                style={{
                  transform: position.transform,
                  zIndex: position.zIndex,
                  left: position.left,
                  marginLeft: position.marginLeft,
                  opacity: position.opacity,
                }}
                onMouseEnter={() => handleMouseEnterCard(index)}
              >
                <a
                  href={cert.url}
                  target={cert.downloadable ? '_blank' : '_self'}
                  rel={cert.downloadable ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  <Card 
                    className={cn(
                      'w-[280px] h-[350px] overflow-hidden bg-black',
                      'transition-all duration-500 cursor-pointer',
                      'hover:shadow-2xl',
                      isHovered
                        ? 'border-accent shadow-2xl shadow-accent/30 scale-105'
                        : 'border-border shadow-lg hover:border-accent/50'
                    )}
                  >
                    {/* Card Header with Icon and Badge */}
                    <CardHeader className={cn(
                      'relative h-32 flex flex-col items-center justify-center p-4',
                      'bg-gradient-to-br from-accent/20 to-accent/5',
                      isHovered && 'from-accent/30 to-accent/10',
                      'transition-all duration-500'
                    )}>
                      {/* Icon */}
                      <div className="text-6xl mb-2">
                        {!isExpanded && isFirstCard ? '📚' : cert.icon}
                      </div>
                      
                      {/* Type Badge */}
                      {(isExpanded || isFirstCard) && (
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant="secondary"
                            className={cn(
                              'bg-background/80 border border-accent/30',
                              isHovered ? 'text-accent' : 'text-accent/80'
                            )}
                          >
                            {!isExpanded && isFirstCard 
                              ? `${totalCards} Items` 
                              : cert.type === 'cv' ? 'CV' : cert.type === 'certification' ? 'Certificate' : 'Portfolio'
                            }
                          </Badge>
                        </div>
                      )}
                    </CardHeader>

                    {/* Card Content */}
                    <CardContent className="p-6 space-y-4 relative h-[218px] flex flex-col justify-between">
                      <div className="space-y-2">
                        <CardTitle className={cn(
                          'text-xl transition-colors',
                          isHovered ? 'text-accent' : 'text-foreground'
                        )}>
                          {!isExpanded && isFirstCard ? 'All My Documents' : cert.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed line-clamp-3">
                          {!isExpanded && isFirstCard 
                            ? `Explore my professional certifications, CV, portfolio, and credentials - ${totalCards} documents available`
                            : cert.description
                          }
                        </CardDescription>
                      </div>

                      {/* Action Button */}
                      <div className={cn(
                        'flex items-center gap-2 text-sm font-medium transition-colors',
                        isHovered ? 'text-accent' : 'text-muted-foreground'
                      )}>
                        {!isExpanded && isFirstCard ? (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            <span>View All</span>
                          </>
                        ) : cert.downloadable ? (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            <span>View</span>
                          </>
                        )}
                      </div>

                      {/* Decorative Corner */}
                      <div className={cn(
                        'absolute bottom-0 right-0 w-24 h-24 pointer-events-none',
                        'bg-gradient-to-tl from-accent/10 to-transparent',
                        'transition-opacity duration-500',
                        isHovered ? 'opacity-100' : 'opacity-0'
                      )} />
                    </CardContent>
                  </Card>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

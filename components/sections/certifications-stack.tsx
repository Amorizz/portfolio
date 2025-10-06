'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, CheckCircle, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Certification } from '@/lib/types';
import Link from 'next/link';

interface CertificationsStackProps {
  certifications: Certification[];
  className?: string;
}

export function CertificationsStack({ certifications, className }: CertificationsStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang((saved === 'fr' ? 'fr' : 'en'));
  }, []);
  
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

  // Translations
  const t = {
    completed: lang === 'fr' ? 'Terminé' : 'Completed',
    inProgress: lang === 'fr' ? 'En Cours' : 'In Progress',
    active: lang === 'fr' ? 'Actif' : 'Active',
    items: lang === 'fr' ? 'Éléments' : 'Items',
    cv: 'CV',
    certificate: lang === 'fr' ? 'Certificat' : 'Certificate',
    portfolio: 'Portfolio',
    allDocuments: lang === 'fr' ? 'Tous Mes Documents' : 'All My Documents',
    exploreDocuments: lang === 'fr' 
      ? `Explorez mes certifications professionnelles, CV, portfolio et diplômes - ${totalCards} documents disponibles`
      : `Explore my professional certifications, CV, portfolio, and credentials - ${totalCards} documents available`,
    viewAll: lang === 'fr' ? 'Voir Tout' : 'View All',
    viewCV: lang === 'fr' ? 'Voir le CV' : 'View CV',
    download: lang === 'fr' ? 'Télécharger' : 'Download',
    viewCertificate: lang === 'fr' ? 'Voir le Certificat' : 'View Certificate',
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-600/20 text-green-600 hover:bg-green-600/30 border-green-600/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.completed}
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-orange-600/20 text-orange-600 hover:bg-orange-600/30 border-orange-600/30">
            <Clock className="w-3 h-3 mr-1" />
            {t.inProgress}
          </Badge>
        );
      case 'active':
        return (
          <Badge className="bg-blue-600/20 text-blue-600 hover:bg-blue-600/30 border-blue-600/30">
            <FileText className="w-3 h-3 mr-1" />
            {t.active}
          </Badge>
        );
      default:
        return null;
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
            
            const renderCard = () => (
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
                      
                      {/* Type Badge - Top Right */}
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
                              ? `${totalCards} ${t.items}` 
                              : cert.type === 'cv' ? t.cv : cert.type === 'certification' ? t.certificate : t.portfolio
                            }
                          </Badge>
                        </div>
                      )}
                      
                      {/* Status Badge - Top Left (only for in-progress) */}
                      {isExpanded && cert.status === 'in-progress' && (
                        <div className="absolute top-3 left-3">
                          {getStatusBadge(cert.status)}
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
                          {!isExpanded && isFirstCard ? t.allDocuments : cert.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed line-clamp-3">
                          {!isExpanded && isFirstCard 
                            ? t.exploreDocuments
                            : cert.description
                          }
                        </CardDescription>
                      </div>

                      {/* Action Button */}
                      {cert.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            'w-full transition-all',
                            isHovered && 'border-accent text-accent hover:bg-accent/10'
                          )}
                          onClick={(e) => {
                            if (!cert.url) {
                              e.preventDefault();
                            }
                          }}
                        >
                          {!isExpanded && isFirstCard ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              <span>{t.viewAll}</span>
                            </>
                          ) : cert.type === 'cv' ? (
                            <>
                              <FileText className="w-4 h-4 mr-2" />
                              <span>{t.viewCV}</span>
                            </>
                          ) : cert.downloadable ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              <span>{t.download}</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              <span>{t.viewCertificate}</span>
                            </>
                          )}
                        </Button>
                      )}

                      {/* Decorative Corner */}
                      <div className={cn(
                        'absolute bottom-0 right-0 w-24 h-24 pointer-events-none',
                        'bg-gradient-to-tl from-accent/10 to-transparent',
                        'transition-opacity duration-500',
                        isHovered ? 'opacity-100' : 'opacity-0'
                      )} />
                    </CardContent>
                  </Card>
            );

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
                {cert.url ? (
                  cert.type === 'cv' ? (
                    <Link href={cert.url} className={cn("block", "cursor-pointer")}>
                      {renderCard()}
                    </Link>
                  ) : (
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn("block", "cursor-pointer")}
                    >
                      {renderCard()}
                    </a>
                  )
                ) : (
                  <div className="block">
                    {renderCard()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

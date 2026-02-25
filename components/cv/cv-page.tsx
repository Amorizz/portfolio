'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Globe, Github, Linkedin, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    tagline: string;
    location: string;
    phone?: string;
    email: string;
    website: string;
    linkedin: string;
    github: string;
    languages: Array<{ name: string; level: string }>;
  };
  professionalSummary: string;
  education: Array<{
    institution: string;
    degree: string;
    specialization: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    description: string;
    achievements: string[];
    courses: string[];
  }>;
  experience: Array<{
    company: string;
    position: string;
    employmentType: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    location: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
  }>;
  projects: Array<{
    id?: string;
    name: string;
    role: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    shortDescription: string;
    technologies: string[];
    features: string[];
  }>;
  skills: {
    technical: Array<{
      category: string;
      skills: Array<{
        name: string;
        level: string;
        yearsOfExperience: number;
      }>;
    }>;
    soft: Array<{
      name: string;
      description: string;
    }>;
  };
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    status: string;
    description: string;
  }>;
  interests: Array<{
    name: string;
    description: string;
  }>;
  careerObjective: string;
  availability: {
    internshipStart: string;
    internshipDuration: string;
    preferredLocations: string[];
    willingToRelocate: boolean;
    remoteWork: string;
  };
}

interface CVPageProps {
  cvData: CVData;
  lang: string;
  pdfMode?: boolean;
}

export default function CVPage({ cvData, lang, pdfMode = false }: CVPageProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const pdfUrl = `/cv/cv-${lang}.pdf`;
  const pdfFilename = lang === 'fr'
    ? `CV_Amaury_Dufrenot_${new Date().getFullYear()}.pdf`
    : `Resume_Amaury_Dufrenot_${new Date().getFullYear()}.pdf`;

  const formatDate = (dateString: string) => {
    if (!dateString) return lang === 'fr' ? 'Present' : 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const t = {
    contact: 'Contact',
    skills: lang === 'fr' ? 'Compétences' : 'Skills',
    languages: lang === 'fr' ? 'Langues' : 'Languages',
    interests: lang === 'fr' ? 'Intérêts' : 'Interests',
    certifications: 'Certifications',
    profile: lang === 'fr' ? 'Profil' : 'Profile',
    experience: lang === 'fr' ? 'Expérience' : 'Experience',
    education: lang === 'fr' ? 'Formation' : 'Education',
    projects: lang === 'fr' ? 'Projets' : 'Projects',
    present: lang === 'fr' ? 'Présent' : 'Present',
    download: lang === 'fr' ? 'Télécharger le CV' : 'Download CV',
    availability: lang === 'fr'
      ? 'Disponible pour stage | Été 2026 | Mobilité nationale et internationale | Permis B'
      : 'Available for internship | Summer 2026 | National & international mobility | Driving license',
  };

  const projectPriority: Record<string, number> = {
    'archive-server': 1,
    'translate-project': 2,
    'pocket-imperium': 3,
    'play-tennis-everywhere': 4,
    'tiny-habits': 5,
  };

  const sortedProjects = [...cvData.projects].sort((a, b) => {
    const pa = projectPriority[a.id ?? ''] ?? 999;
    const pb = projectPriority[b.id ?? ''] ?? 999;
    return pa - pb;
  });

  const highlightProjectKeywords = (text: string) => {
    const keywords = [
      'Outstanding Business Potential', 'Best Public Speaking',
      'distance euclidienne', 'Euclidean distance',
      'vector-based', 'vectoriel', 'client-serveur', 'client-server',
      'drag-and-drop', 'Mistral 7B', 'llama.cpp',
      'PostgreSQL', 'TypeScript', 'Streamlit', 'Supabase',
      'Next.js', 'FastAPI', 'Whisper', 'M2M100', 'OpenAI',
      'netcat', 'Python', 'Bash', 'Java', 'Swing',
      'TCP', 'SEO', '700+', '300+',
    ];

    const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'g');
    const parts = text.split(regex);

    const keywordsLower = keywords.map((k) => k.toLowerCase());
    return parts.map((part, index) => {
      const isKeyword = keywordsLower.includes(part.toLowerCase());
      return isKeyword
        ? <strong key={`kw-${index}`} className="font-semibold text-[#111827]">{part}</strong>
        : <span key={`tx-${index}`}>{part}</span>;
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center relative ${
        pdfMode ? 'py-0 px-0' : 'py-12 px-4 print:p-0'
      }`}
    >
      {/* Download */}
      <div className={`mb-8 relative z-10 print:hidden ${pdfMode ? 'hidden' : ''}`}>
        <Button
          asChild
          size="lg"
          className="font-semibold px-8 py-3 rounded-full border"
          style={{ background: '#d57a2a', color: '#fff', borderColor: 'rgba(213,122,42,0.3)' }}
        >
          <a href={pdfUrl} download={pdfFilename}>
            <Download className="mr-2 h-5 w-5" />
            {t.download}
          </a>
        </Button>
      </div>

      {/* CV */}
      <div className="relative z-10 w-full max-w-[210mm] mx-auto print:max-w-full">
        <div
          ref={cvRef}
          id="cv-content"
          suppressHydrationWarning
          className="bg-white mx-auto rounded-lg print:rounded-none overflow-hidden"
          style={{
            width: '210mm',
            height: pdfMode ? '297mm' : undefined,
            minHeight: '297mm',
            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
          }}
        >
          <div className="flex h-full" style={{ height: pdfMode ? '297mm' : undefined, minHeight: '297mm' }}>

            {/* ════════ LEFT COLUMN (sidebar) ════════ */}
            <div className="w-[34%] flex flex-col" style={{ background: '#1e2211', color: '#e8ecd8', padding: '20px 18px' }}>

              {/* Photo */}
              <div className="flex justify-center" style={{ marginBottom: '16px' }}>
                <div className="relative w-28 h-28 rounded-full overflow-hidden" style={{ border: '3px solid #b5651d' }}>
                  <Image src="/images/IMG_3840.png" alt={cvData.personalInfo.fullName} fill className="object-cover" priority />
                </div>
              </div>

              {/* Contact */}
              <SidebarSection title={t.contact}>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  <SidebarRow icon={<Mail className="h-3 w-3" />}>
                    <a href={`mailto:${cvData.personalInfo.email}`} className="text-[10.5px]">{cvData.personalInfo.email}</a>
                  </SidebarRow>
                  {cvData.personalInfo.phone && (
                    <SidebarRow icon={<Phone className="h-3 w-3" />}>
                      <a href={`tel:${cvData.personalInfo.phone}`} className="text-[10.5px]">{cvData.personalInfo.phone}</a>
                    </SidebarRow>
                  )}
                  <SidebarRow icon={<MapPin className="h-3 w-3" />}>
                    <span className="text-[10.5px]">{cvData.personalInfo.location}</span>
                  </SidebarRow>
                  <SidebarRow icon={<Globe className="h-3 w-3" />}>
                    <a href={cvData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-[10.5px]">amaury-dufrenot.com</a>
                  </SidebarRow>
                  <SidebarRow icon={<Linkedin className="h-3 w-3" />}>
                    <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10.5px]">/amaury-dufrenot</a>
                  </SidebarRow>
                  <SidebarRow icon={<Github className="h-3 w-3" />}>
                    <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-[10.5px]">/Amorizz</a>
                  </SidebarRow>
                </div>
              </SidebarSection>

              {/* Skills */}
              <SidebarSection title={t.skills}>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {cvData.skills.technical.map((cat, i) => (
                    <div key={i}>
                      <p className="text-[10.5px] font-semibold text-white" style={{ marginBottom: '2px' }}>{cat.category}</p>
                      <div className="flex flex-col" style={{ gap: '2px' }}>
                        {cat.skills.map((s, j) => (
                          <p key={j} className="text-[9.5px] leading-[1.45]" style={{ color: '#cdd4b8' }}>
                            {s.name}{(s.level === 'Base' || s.level === 'Basic') && <span style={{ color: '#9ca3af' }}> ({s.level})</span>}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              {/* Languages */}
              <SidebarSection title={t.languages}>
                <div className="flex flex-col" style={{ gap: '4px' }}>
                  {cvData.personalInfo.languages.map((l, i) => (
                    <div key={i} className="flex justify-between text-[10.5px]">
                      <span>{l.name}</span>
                      <span style={{ color: '#cdd4b8' }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              {/* Certifications */}
              <SidebarSection title={t.certifications}>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  {cvData.certifications.map((cert, i) => (
                    <div key={i} className="text-[9.5px]">
                      <p className="font-semibold text-white leading-snug">{cert.name}</p>
                      <p style={{ color: '#cdd4b8' }}>{cert.issuer} | {cert.status}</p>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              {/* Interests */}
              <SidebarSection title={t.interests}>
                <div className="flex flex-col" style={{ gap: '4px' }}>
                  {cvData.interests.map((interest, i) => (
                    <p key={i} className="text-[9.5px] leading-[1.45]" style={{ color: '#cdd4b8' }}>{interest.name}</p>
                  ))}
                </div>
              </SidebarSection>
            </div>

            {/* ════════ RIGHT COLUMN (main content) ════════ */}
            <div className="w-[66%] flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1f2937', padding: '20px 22px 16px 22px' }}>

              {/* Header */}
              <div style={{ paddingBottom: '8px', borderBottom: '2px solid #b5651d' }}>
                <h1 className="text-[40px] font-bold tracking-tight leading-none" style={{
                  color: '#111827',
                  fontFamily: 'Space Grotesk, system-ui, sans-serif',
                }}>
                  {cvData.personalInfo.fullName}
                </h1>
                <p className="text-[12px] font-semibold" style={{ color: '#92400e', marginTop: '6px' }}>
                  {cvData.personalInfo.title}
                </p>
                <p className="text-[10.5px]" style={{ color: '#6b7280', marginTop: '2px' }}>
                  {cvData.personalInfo.tagline}
                </p>
              </div>

              {/* Profile */}
              <section style={{ marginTop: '10px' }}>
                <h2 className="text-[12px] font-bold uppercase tracking-wider" style={{
                  color: '#111827',
                  fontFamily: 'Space Grotesk, system-ui, sans-serif',
                  marginBottom: '4px',
                }}>
                  {t.profile}
                </h2>
                <p className="text-[10.5px] leading-[1.5]" style={{ color: '#374151' }}>
                  {cvData.professionalSummary}
                </p>
              </section>

              {/* Experience */}
              <MainSection title={t.experience}>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {cvData.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[11px] font-bold min-w-0 break-words" style={{ color: '#111827' }}>{exp.position}</h3>
                        <span className="text-[9px] shrink-0 ml-2" style={{ color: '#6b7280' }}>
                          {formatDate(exp.startDate)} – {exp.current ? t.present : formatDate(exp.endDate!)}
                        </span>
                      </div>
                      <p className="text-[10.5px] font-semibold" style={{ color: '#92400e' }}>{exp.company}</p>
                      {exp.description && (
                        <p className="text-[10px] leading-[1.45]" style={{ color: '#374151', marginTop: '2px' }}>
                          {highlightProjectKeywords(exp.description)}
                        </p>
                      )}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul style={{ marginTop: '2px' }}>
                          {exp.achievements.map((a, j) => (
                            <li key={j} className="text-[10px] pl-3 relative leading-[1.4]" style={{ color: '#374151' }}>
                              <span className="absolute left-0">-</span>{a}
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <p className="text-[8.5px] font-mono" style={{ color: '#6b7280', marginTop: '3px' }}>
                          {exp.technologies.join(' · ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </MainSection>

              {/* Education */}
              <MainSection title={t.education}>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {cvData.education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[11px] font-bold min-w-0 break-words" style={{ color: '#111827' }}>{edu.degree}</h3>
                        <span className="text-[9px] shrink-0 ml-2" style={{ color: '#6b7280' }}>
                          {edu.startDate ? `${formatDate(edu.startDate)} – ${edu.current ? t.present : formatDate(edu.endDate)}` : formatDate(edu.endDate)}
                        </span>
                      </div>
                      <p className="text-[10.5px] font-semibold" style={{ color: '#92400e' }}>
                        {edu.institution} | {edu.location}
                      </p>
                      {edu.specialization && (
                        <p className="text-[10px] leading-[1.45]" style={{ color: '#374151', marginTop: '2px' }}>{edu.specialization}</p>
                      )}
                      {edu.achievements.length > 0 && (
                        <ul style={{ marginTop: '2px' }}>
                          {edu.achievements.map((a, j) => (
                            <li key={j} className="text-[10px] pl-3 relative leading-[1.4]" style={{ color: '#374151' }}>
                              <span className="absolute left-0">-</span>{a}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </MainSection>

              {/* Projects */}
              <MainSection title={t.projects}>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {sortedProjects.map((project, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[11px] font-bold min-w-0 break-words" style={{ color: '#92400e' }}>
                          {project.name}
                          {project.role && <span className="font-normal" style={{ color: '#6b7280' }}> | {project.role}</span>}
                        </h3>
                        <span className="text-[9px] shrink-0 ml-2" style={{ color: '#6b7280' }}>
                          {formatDate(project.startDate)} – {project.current ? t.present : formatDate(project.endDate!)}
                        </span>
                      </div>
                      <p className="text-[10px] leading-[1.45]" style={{ color: '#374151', marginTop: '2px' }}>
                        {highlightProjectKeywords(project.shortDescription)}
                      </p>
                      <p className="text-[8.5px] font-mono" style={{ color: '#6b7280', marginTop: '3px' }}>
                        {project.technologies.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </MainSection>

              {/* Footer */}
              <div className="mt-auto text-center text-[8.5px]" style={{ borderTop: '1px solid #e5e7eb', color: '#6b7280', paddingTop: '8px' }}>
                {t.availability}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '12px' }}>
      <h3 className="text-[10.5px] font-bold uppercase tracking-wider" style={{
        color: '#eecaaa',
        borderBottom: '1px solid rgba(238, 202, 170, 0.2)',
        fontFamily: 'Space Grotesk, system-ui, sans-serif',
        paddingBottom: '3px',
        marginBottom: '6px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function SidebarRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5" style={{ color: '#e8ecd8' }}>
      <span className="shrink-0" style={{ color: '#b5651d' }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
      <h2 className="text-[12px] font-bold uppercase tracking-wider" style={{
        color: '#111827',
        fontFamily: 'Space Grotesk, system-ui, sans-serif',
        marginBottom: '6px',
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

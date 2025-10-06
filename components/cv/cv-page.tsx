'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, Globe, Github, Linkedin, MapPin } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
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
      icon: string;
      skills: Array<{
        name: string;
        level: string;
        yearsOfExperience: number;
      }>;
    }>;
    softSkills?: Array<{
      name: string;
      icon: string;
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
    icon: string;
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
}

export default function CVPage({ cvData, lang }: CVPageProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: lang === 'fr' 
      ? `CV_Amaury_Dufrenot_${new Date().getFullYear()}`
      : `Resume_Amaury_Dufrenot_${new Date().getFullYear()}`,
  });

  const handleDownloadPDF = () => {
    handlePrint();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return lang === 'fr' ? 'Présent' : 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center relative print:p-0">
      {/* Subtle background gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none print:hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Download Button */}
      <div className="mb-10 relative z-10 print:hidden">
        <Button
          onClick={handleDownloadPDF}
          size="lg"
          className="shadow-lg bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white hover:shadow-xl transition-all duration-300 border border-white/20 font-semibold px-8 py-3"
        >
          <Download className="mr-2 h-5 w-5" />
          {lang === 'fr' ? 'Télécharger le CV' : 'Download CV'}
        </Button>
      </div>

      {/* CV Container */}
      <div className="relative z-10 w-full max-w-[210mm] mx-auto print:max-w-full">
        <div
          ref={cvRef}
          className="bg-white relative overflow-hidden mx-auto rounded-lg print:rounded-none"
          id="cv-content"
          style={{
            width: '210mm',
            minHeight: '297mm',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
        <div className="flex h-full">
          {/* LEFT SIDEBAR - 35% width */}
          <div className="w-[35%] text-white p-6" style={{
            background: 'linear-gradient(to bottom, #334155, #1e293b)'
          }}>
            {/* Photo */}
            <div className="mb-6 flex justify-center">
              <div className="relative">                
                {/* Photo container */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl" style={{
                  borderColor: '#1e3a5f'
                }}>
                  <Image
                    src="/images/IMG_3840.png"
                    alt={cvData.personalInfo.fullName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-white border-b border-white/30 pb-1">
                {lang === 'fr' ? 'Contact' : 'Contact'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Phone className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${cvData.personalInfo.email}`} className="hover:text-blue-300 break-all">
                    {cvData.personalInfo.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>{cvData.personalInfo.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <a href={cvData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                    amaury-dufrenot.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Linkedin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                    /amaury-dufrenot
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Github className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                    {"/Amorizz"}
                  </a>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-white border-b border-white/30 pb-1">
                {lang === 'fr' ? 'Compétences Techniques' : 'Technical Skills'}
              </h3>
              <div className="space-y-3">
                {cvData.skills.technical.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-semibold mb-1.5 text-blue-300">
                      {category.category}
                    </h4>
                    <p className="text-[10px] leading-relaxed">
                      {category.skills.map(skill => skill.name).join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            {cvData.skills.softSkills && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-white border-b border-white/30 pb-1">
                  {lang === 'fr' ? 'Qualités' : 'Soft Skills'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {cvData.skills.softSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-sm">{skill.icon}</span>
                      <span className="text-[10px]">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-white border-b border-white/30 pb-1">
                {lang === 'fr' ? 'Langues' : 'Languages'}
              </h3>
              <div className="space-y-1.5 text-xs">
                {cvData.personalInfo.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{language.name}</span>
                    <span className="text-[10px] text-blue-300">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-white border-b border-white/30 pb-1">
                {lang === 'fr' ? 'Centres d\'Intérêt' : 'Interests'}
              </h3>
              <div className="space-y-1.5 text-xs">
                {cvData.interests.map((interest, index) => (
                  <div key={index} className="text-[10px] leading-relaxed">
                    • {interest.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT - 65% width */}
          <div className="w-[65%] p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-1">
                {cvData.personalInfo.fullName}
              </h1>
              <h2 className="text-base text-blue-700 font-semibold mb-3">
                {cvData.personalInfo.title}
              </h2>
            </div>

            <div className="space-y-5">
            {/* Profile */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-blue-700">
                {lang === 'fr' ? 'Profil' : 'Profile'}
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">
                {cvData.professionalSummary}
              </p>
            </section>

            {/* Experience */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-blue-700">
                {lang === 'fr' ? 'Expérience' : 'Experience'}
              </h2>
              <div className="space-y-3">
                {/* Main experience only */}
                {cvData.experience.slice(0, 1).map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-[10px] text-gray-600 italic">
                        {formatDate(exp.startDate)} - {exp.current ? (lang === 'fr' ? 'Présent' : 'Present') : formatDate(exp.endDate!)}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">{exp.company}</p>
                    <ul className="list-disc list-inside text-[11px] text-gray-700 ml-1 space-y-0.5">
                      <li>{exp.description}</li>
                      <li>{exp.achievements[0]}</li>
                    </ul>
                  </div>
                ))}
                
                {/* Stage Robert-Paysage */}
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-xs font-bold text-gray-900">
                      {lang === 'fr' ? 'Stage Ouvrier' : 'Worker Internship'}
                    </h3>
                    <span className="text-[10px] text-gray-600 italic">
                      {lang === 'fr' ? 'Été 2023' : 'Summer 2023'}
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 font-semibold mb-1">Robert-Paysage</p>
                  <p className="text-[11px] text-gray-700">
                    {lang === 'fr'
                      ? 'Travail en équipe sur chantiers, respect des consignes et délais. Prime de stage pour qualité du travail.'
                      : 'Teamwork on sites, compliance with instructions. Internship bonus for quality work.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-blue-700">
                {lang === 'fr' ? 'Formation' : 'Education'}
              </h2>
              <div className="space-y-2.5">
                {cvData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-[10px] text-gray-600 italic">
                        {formatDate(edu.startDate)} - {edu.current ? (lang === 'fr' ? 'En cours' : 'Present') : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 font-semibold">{edu.institution}</p>
                    {edu.specialization && (
                      <p className="text-[11px] text-gray-700 mt-0.5">
                        {edu.specialization}
                      </p>
                    )}
                    {edu.achievements.length > 0 && (
                      <p className="text-[11px] text-gray-700 mt-0.5">
                        • {edu.achievements.slice(0, 2).join(' • ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-blue-700">
                {lang === 'fr' ? 'Projets Clés' : 'Key Projects'}
              </h2>
              <div className="space-y-2.5">
                {cvData.projects.filter(p => p.id === 'tiny-habits' || p.id === 'ai-video-translator').map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs font-bold text-gray-900">
                        {project.name}
                      </h3>
                      <span className="text-[10px] text-gray-600 italic">
                        {formatDate(project.startDate)}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">
                      {project.role}
                    </p>
                    <p className="text-[11px] text-gray-700 mb-1">
                      {project.shortDescription}
                    </p>
                    <p className="text-[10px] text-gray-600">
                      {project.technologies.slice(0, 4).join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-blue-700">
                {lang === 'fr' ? 'Certifications' : 'Certifications'}
              </h2>
              <div className="space-y-1">
                {cvData.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-gray-900">{cert.name}</span>
                      <span className="text-[11px] text-gray-600"> - {cert.issuer}</span>
                    </div>
                    <span className="text-[10px] text-blue-700 font-semibold italic">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="absolute bottom-0 left-0 right-0 text-white text-center py-2" 
          style={{ backgroundColor: '#1e293b' }}
        >
          <p className="text-[10px] italic">
            {lang === 'fr'
              ? 'Disponible pour stage de 6 mois • Septembre 2026 • Mobilité nationale et internationale • Permis B'
              : 'Available for 6-month internship • September 2026 • National and international mobility • Driving license'}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

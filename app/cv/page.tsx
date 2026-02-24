import { Metadata } from 'next';
import { getLanguage } from '@/lib/get-language';
import { promises as fs } from 'fs';
import path from 'path';
import CVPage from '@/components/cv/cv-page';

export const metadata: Metadata = {
  title: 'Curriculum Vitae | Amaury Dufrenot',
  description: 'CV of Amaury Dufrenot — Network & Telecom Engineering Student, CTO & Co-founder, Startup Builder',
};

async function loadCVData(lang: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', lang, 'cv.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to load CV data:', error);
    // Fallback to English
    if (lang === 'fr') {
      const fallbackPath = path.join(process.cwd(), 'data', 'en', 'cv.json');
      const fileContents = await fs.readFile(fallbackPath, 'utf8');
      return JSON.parse(fileContents);
    }
    throw error;
  }
}

export default async function CV() {
  const lang = await getLanguage();
  const cvData = await loadCVData(lang);

  return (
    <div className="min-h-screen pt-24 bg-background">
      <CVPage cvData={cvData} lang={lang} />
    </div>
  );
}

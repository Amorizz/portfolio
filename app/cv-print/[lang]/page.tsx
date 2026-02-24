import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import CVPage from '@/components/cv/cv-page';

type Lang = 'en' | 'fr';

async function loadCVData(lang: Lang) {
  const filePath = path.join(process.cwd(), 'data', lang, 'cv.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function CVPrintPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'fr') {
    notFound();
  }

  const cvData = await loadCVData(lang);
  return <CVPage cvData={cvData} lang={lang} pdfMode />;
}

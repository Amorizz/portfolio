// Data loading utilities for Personal Portfolio with Obsidian Dark Theme

import { promises as fs } from 'fs';
import path from 'path';
import { Project, PersonalInfo, SocialLink, VisionQuote, TimelineItem, Certification, Skill, AboutCard, DataLoaderResult } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Get current language from localStorage (client-side) or default to 'en'
 */
function getLanguage(): 'en' | 'fr' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-language');
    return (saved === 'fr' ? 'fr' : 'en');
  }
  return 'en';
}

/**
 * Generic function to load JSON data from files with language support
 */
async function loadJsonData<T>(filename: string, lang?: 'en' | 'fr'): Promise<DataLoaderResult<T>> {
  try {
    const language = lang || 'en';
    const filePath = path.join(DATA_DIR, language, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as T;
    return { data };
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    // Fallback to English if French file doesn't exist
    if (lang === 'fr') {
      try {
        const fallbackPath = path.join(DATA_DIR, 'en', filename);
        const fileContents = await fs.readFile(fallbackPath, 'utf8');
        const data = JSON.parse(fileContents) as T;
        return { data };
      } catch (fallbackError) {
        return { 
          data: {} as T, 
          error: `Failed to load ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    }
    return { 
      data: {} as T, 
      error: `Failed to load ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Load all projects from projects.json
 */
export async function loadProjects(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Project[]>> {
  return loadJsonData<Project[]>('projects.json', lang);
}

/**
 * Load personal information from personal-info.json
 */
export async function loadPersonalInfo(lang?: 'en' | 'fr'): Promise<DataLoaderResult<PersonalInfo>> {
  return loadJsonData<PersonalInfo>('personal-info.json', lang);
}

/**
 * Load social links from social-links.json
 */
export async function loadSocialLinks(lang?: 'en' | 'fr'): Promise<DataLoaderResult<SocialLink[]>> {
  return loadJsonData<SocialLink[]>('social-links.json', lang);
}

/**
 * Load vision quotes from vision-quotes.json
 */
export async function loadVisionQuotes(lang?: 'en' | 'fr'): Promise<DataLoaderResult<VisionQuote[]>> {
  return loadJsonData<VisionQuote[]>('vision-quotes.json', lang);
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Project[]>> {
  const result = await loadProjects(lang);
  if (result.error) {
    return result;
  }
  
  const featuredProjects = result.data.filter(project => project.featured);
  return { data: featuredProjects };
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string, lang?: 'en' | 'fr'): Promise<DataLoaderResult<Project | null>> {
  const result = await loadProjects(lang);
  if (result.error) {
    return { data: null, error: result.error };
  }
  
  const project = result.data.find(p => p.id === id);
  return { data: project || null };
}

/**
 * Get enabled social links sorted by order
 */
export async function getEnabledSocialLinks(lang?: 'en' | 'fr'): Promise<DataLoaderResult<SocialLink[]>> {
  const result = await loadSocialLinks(lang);
  if (result.error) {
    return result;
  }
  
  const enabledLinks = result.data
    .filter(link => link.enabled)
    .sort((a, b) => a.order - b.order);
  
  return { data: enabledLinks };
}

/**
 * Get enabled vision quotes sorted by order
 */
export async function getEnabledVisionQuotes(lang?: 'en' | 'fr'): Promise<DataLoaderResult<VisionQuote[]>> {
  const result = await loadVisionQuotes(lang);
  if (result.error) {
    return result;
  }
  
  const enabledQuotes = result.data
    .filter(quote => quote.enabled)
    .sort((a, b) => a.order - b.order);
  
  return { data: enabledQuotes };
}

/**
 * Validate project data structure
 */
export function validateProject(project: any): project is Project {
  return (
    typeof project === 'object' &&
    project !== null &&
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.shortDescription === 'string' &&
    typeof project.detailedDescription === 'string' &&
    typeof project.image === 'string' &&
    typeof project.imageAlt === 'string' &&
    Array.isArray(project.technologies) &&
    typeof project.githubUrl === 'string' &&
    typeof project.featured === 'boolean' &&
    typeof project.order === 'number' &&
    typeof project.createdAt === 'string' &&
    typeof project.updatedAt === 'string'
  );
}

/**
 * Validate personal info data structure
 */
export function validatePersonalInfo(info: any): info is PersonalInfo {
  return (
    typeof info === 'object' &&
    info !== null &&
    typeof info.name === 'string' &&
    typeof info.title === 'string' &&
    typeof info.bio === 'string' &&
    typeof info.avatar === 'string' &&
    typeof info.avatarAlt === 'string' &&
    typeof info.email === 'string'
  );
}

/**
 * Validate social link data structure
 */
export function validateSocialLink(link: any): link is SocialLink {
  return (
    typeof link === 'object' &&
    link !== null &&
    typeof link.platform === 'string' &&
    ['linkedin', 'github', 'instagram', 'twitter', 'email'].includes(link.platform) &&
    typeof link.url === 'string' &&
    typeof link.icon === 'string' &&
    typeof link.label === 'string' &&
    typeof link.order === 'number' &&
    typeof link.enabled === 'boolean'
  );
}

/**
 * Validate vision quote data structure
 */
export function validateVisionQuote(quote: any): quote is VisionQuote {
  return (
    typeof quote === 'object' &&
    quote !== null &&
    typeof quote.id === 'string' &&
    typeof quote.quote === 'string' &&
    typeof quote.order === 'number' &&
    typeof quote.enabled === 'boolean'
  );
}

/**
 * Load timeline items from timeline.json
 */
export async function loadTimeline(lang?: 'en' | 'fr'): Promise<DataLoaderResult<TimelineItem[]>> {
  return loadJsonData<TimelineItem[]>('timeline.json', lang);
}

/**
 * Get enabled timeline items
 */
export async function getEnabledTimeline(lang?: 'en' | 'fr'): Promise<DataLoaderResult<TimelineItem[]>> {
  const result = await loadTimeline(lang);
  
  if (result.error) {
    return result;
  }
  
  const enabledItems = result.data.filter(item => item.enabled);
  return { data: enabledItems };
}

/**
 * Load certifications from certifications.json
 */
export async function loadCertifications(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Certification[]>> {
  return loadJsonData<Certification[]>('certifications.json', lang);
}

/**
 * Get enabled certifications sorted by order
 */
export async function getEnabledCertifications(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Certification[]>> {
  const result = await loadCertifications(lang);
  
  if (result.error) {
    return result;
  }
  
  const enabledCerts = result.data
    .filter(cert => cert.enabled)
    .sort((a, b) => a.order - b.order);
  
  return { data: enabledCerts };
}

/**
 * Load skills from skills.json
 */
export async function loadSkills(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Skill[]>> {
  return loadJsonData<Skill[]>('skills.json', lang);
}

/**
 * Get enabled skills sorted by order
 */
export async function getEnabledSkills(lang?: 'en' | 'fr'): Promise<DataLoaderResult<Skill[]>> {
  const result = await loadSkills(lang);
  
  if (result.error) {
    return result;
  }
  
  const enabledSkills = result.data
    .filter(skill => skill.enabled)
    .sort((a, b) => a.order - b.order);
  
  return { data: enabledSkills };
}

/**
 * Load about cards from about-cards.json
 */
export async function loadAboutCards(lang?: 'en' | 'fr'): Promise<DataLoaderResult<AboutCard[]>> {
  return loadJsonData<AboutCard[]>('about-cards.json', lang);
}

/**
 * Get enabled about cards sorted by order
 */
export async function getEnabledAboutCards(lang?: 'en' | 'fr'): Promise<DataLoaderResult<AboutCard[]>> {
  const result = await loadAboutCards(lang);
  
  if (result.error) {
    return result;
  }
  
  const enabledCards = result.data
    .filter(card => card.enabled)
    .sort((a, b) => a.order - b.order);
  
  return { data: enabledCards };
}

/**
 * Load translations from translations.json
 */
export async function loadTranslations(lang?: 'en' | 'fr'): Promise<DataLoaderResult<any>> {
  return loadJsonData<any>('translations.json', lang);
}
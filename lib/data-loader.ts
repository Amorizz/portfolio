// Data loading utilities for Personal Portfolio with Obsidian Dark Theme

import { promises as fs } from 'fs';
import path from 'path';
import { Project, PersonalInfo, SocialLink, VisionQuote, DataLoaderResult } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Generic function to load JSON data from files
 */
async function loadJsonData<T>(filename: string): Promise<DataLoaderResult<T>> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as T;
    return { data };
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return { 
      data: {} as T, 
      error: `Failed to load ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Load all projects from projects.json
 */
export async function loadProjects(): Promise<DataLoaderResult<Project[]>> {
  return loadJsonData<Project[]>('projects.json');
}

/**
 * Load personal information from personal-info.json
 */
export async function loadPersonalInfo(): Promise<DataLoaderResult<PersonalInfo>> {
  return loadJsonData<PersonalInfo>('personal-info.json');
}

/**
 * Load social links from social-links.json
 */
export async function loadSocialLinks(): Promise<DataLoaderResult<SocialLink[]>> {
  return loadJsonData<SocialLink[]>('social-links.json');
}

/**
 * Load vision quotes from vision-quotes.json
 */
export async function loadVisionQuotes(): Promise<DataLoaderResult<VisionQuote[]>> {
  return loadJsonData<VisionQuote[]>('vision-quotes.json');
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(): Promise<DataLoaderResult<Project[]>> {
  const result = await loadProjects();
  if (result.error) {
    return result;
  }
  
  const featuredProjects = result.data.filter(project => project.featured);
  return { data: featuredProjects };
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<DataLoaderResult<Project | null>> {
  const result = await loadProjects();
  if (result.error) {
    return { data: null, error: result.error };
  }
  
  const project = result.data.find(p => p.id === id);
  return { data: project || null };
}

/**
 * Get enabled social links sorted by order
 */
export async function getEnabledSocialLinks(): Promise<DataLoaderResult<SocialLink[]>> {
  const result = await loadSocialLinks();
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
export async function getEnabledVisionQuotes(): Promise<DataLoaderResult<VisionQuote[]>> {
  const result = await loadVisionQuotes();
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

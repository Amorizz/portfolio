# Data Model: Personal Portfolio with Obsidian Dark Theme

**Feature**: 002-for-the-portfolio  
**Date**: 2025-01-27  
**Status**: Complete

## Entity Definitions

### Project Entity
**Purpose**: Represents individual projects showcased in the portfolio

**Fields**:
- `id`: string (unique identifier, URL-friendly slug)
- `title`: string (project name)
- `shortDescription`: string (brief description for cards, max 150 chars)
- `detailedDescription`: string (comprehensive project description)
- `image`: string (image path/URL)
- `imageAlt`: string (alt text for accessibility)
- `technologies`: string[] (array of technology tags)
- `githubUrl`: string (GitHub repository URL)
- `liveUrl`: string (live demo URL, optional)
- `featured`: boolean (whether to highlight on homepage)
- `order`: number (display order)
- `createdAt`: string (ISO date string)
- `updatedAt`: string (ISO date string)

**Validation Rules**:
- `id` must be URL-friendly (lowercase, hyphens only)
- `title` required, max 100 characters
- `shortDescription` required, max 150 characters
- `detailedDescription` required, min 200 characters
- `image` required, must be valid path
- `imageAlt` required for accessibility
- `technologies` must be non-empty array
- `githubUrl` must be valid URL format
- `liveUrl` optional but must be valid URL if provided
- `order` must be positive integer

**Relationships**:
- None (standalone entity)

### PersonalInfo Entity
**Purpose**: Represents personal information displayed in hero section

**Fields**:
- `name`: string (full name)
- `title`: string (professional title/role)
- `bio`: string (short biography)
- `avatar`: string (profile photo path)
- `avatarAlt`: string (alt text for avatar)
- `location`: string (location, optional)
- `email`: string (contact email)
- `phone`: string (phone number, optional)

**Validation Rules**:
- `name` required, max 50 characters
- `title` required, max 100 characters
- `bio` required, max 300 characters
- `avatar` required, must be valid path
- `avatarAlt` required for accessibility
- `email` required, must be valid email format
- `phone` optional, must be valid format if provided

**Relationships**:
- None (singleton entity)

### SocialLink Entity
**Purpose**: Represents social media and professional links

**Fields**:
- `platform`: string (platform name: 'linkedin', 'github', 'instagram', 'twitter', 'email')
- `url`: string (profile URL)
- `icon`: string (icon identifier)
- `label`: string (display label)
- `order`: number (display order)
- `enabled`: boolean (whether to display)

**Validation Rules**:
- `platform` must be one of allowed values
- `url` required, must be valid URL
- `icon` required, must be valid icon identifier
- `label` required, max 20 characters
- `order` must be positive integer
- `enabled` boolean, defaults to true

**Relationships**:
- None (standalone entities)

### VisionQuote Entity
**Purpose**: Represents inspirational quotes displayed on the site

**Fields**:
- `id`: string (unique identifier)
- `quote`: string (quote text)
- `author`: string (quote author, optional)
- `order`: number (display order)
- `enabled`: boolean (whether to display)

**Validation Rules**:
- `id` required, unique identifier
- `quote` required, max 500 characters
- `author` optional, max 100 characters
- `order` must be positive integer
- `enabled` boolean, defaults to true

**Relationships**:
- None (standalone entity)

## Data Storage Structure

### File-based Storage
```
data/
├── projects.json          # Array of Project entities
├── personal-info.json     # Single PersonalInfo object
├── social-links.json      # Array of SocialLink entities
└── vision-quotes.json     # Array of VisionQuote entities
```

### TypeScript Interfaces
```typescript
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  avatarAlt: string;
  location?: string;
  email: string;
  phone?: string;
}

interface SocialLink {
  platform: 'linkedin' | 'github' | 'instagram' | 'twitter' | 'email';
  url: string;
  icon: string;
  label: string;
  order: number;
  enabled: boolean;
}

interface VisionQuote {
  id: string;
  quote: string;
  author?: string;
  order: number;
  enabled: boolean;
}
```

## State Management

### No Complex State Required
- Static content loaded at build time
- No user authentication or dynamic data
- No form submissions or user interactions beyond navigation
- Simple client-side state for UI interactions (mobile menu, etc.)

### Component State
- Navigation menu open/closed state
- Project filter state (if filtering implemented)
- Theme state (if theme switching added later)

## Data Flow

1. **Build Time**: JSON files loaded and validated
2. **Runtime**: Static data served from Next.js
3. **Updates**: Content updated by modifying JSON files and rebuilding
4. **Validation**: TypeScript interfaces ensure type safety
5. **Error Handling**: Graceful fallbacks for missing or invalid data

## Performance Considerations

- JSON files are small and cached by Next.js
- Images optimized with Next.js Image component
- No database queries or API calls
- Static generation for optimal performance
- Lazy loading for below-the-fold content

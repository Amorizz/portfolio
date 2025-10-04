# API Routes Contract: Personal Portfolio

**Feature**: 002-for-the-portfolio  
**Date**: 2025-01-27  
**Status**: Complete

## Route Definitions

### Static Routes (Next.js App Router)

#### Homepage
- **Route**: `/`
- **Method**: GET
- **Component**: `app/page.tsx`
- **Purpose**: Display hero section, featured projects, vision quote
- **Data**: Personal info, featured projects, vision quotes

#### Projects Listing
- **Route**: `/projects`
- **Method**: GET
- **Component**: `app/projects/page.tsx`
- **Purpose**: Display all projects in grid layout
- **Data**: All projects from projects.json

#### Individual Project
- **Route**: `/projects/[slug]`
- **Method**: GET
- **Component**: `app/projects/[slug]/page.tsx`
- **Purpose**: Display detailed project information
- **Data**: Single project by slug from projects.json

#### About Page
- **Route**: `/about`
- **Method**: GET
- **Component**: `app/about/page.tsx`
- **Purpose**: Display detailed personal information
- **Data**: Personal info from personal-info.json

#### Contact Page
- **Route**: `/contact`
- **Method**: GET
- **Component**: `app/contact/page.tsx`
- **Purpose**: Display contact information and form
- **Data**: Personal info, social links

## Data Contracts

### Project Data Contract
```typescript
interface ProjectData {
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
```

### Personal Info Data Contract
```typescript
interface PersonalInfoData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  avatarAlt: string;
  location?: string;
  email: string;
  phone?: string;
}
```

### Social Links Data Contract
```typescript
interface SocialLinkData {
  platform: 'linkedin' | 'github' | 'instagram' | 'twitter' | 'email';
  url: string;
  icon: string;
  label: string;
  order: number;
  enabled: boolean;
}
```

### Vision Quote Data Contract
```typescript
interface VisionQuoteData {
  id: string;
  quote: string;
  author?: string;
  order: number;
  enabled: boolean;
}
```

## Component Contracts

### Navbar Component
- **Props**: `{ className?: string }`
- **State**: Mobile menu open/closed
- **Behavior**: Responsive navigation with mobile hamburger menu
- **Accessibility**: Keyboard navigation, ARIA labels

### Hero Component
- **Props**: `{ personalInfo: PersonalInfoData, socialLinks: SocialLinkData[] }`
- **State**: None
- **Behavior**: Display avatar, name, title, bio, social links
- **Accessibility**: Proper heading hierarchy, alt text for images

### Project Card Component
- **Props**: `{ project: ProjectData, featured?: boolean }`
- **State**: Hover effects
- **Behavior**: Click to navigate to project detail page
- **Accessibility**: Keyboard navigation, focus states

### Project Grid Component
- **Props**: `{ projects: ProjectData[], featured?: boolean }`
- **State**: Filter state (if implemented)
- **Behavior**: Display projects in responsive grid
- **Accessibility**: Proper grid semantics

### Vision Quote Component
- **Props**: `{ quotes: VisionQuoteData[] }`
- **State**: None
- **Behavior**: Display inspirational quote
- **Accessibility**: Proper quote semantics

### Footer Component
- **Props**: `{ socialLinks: SocialLinkData[], personalInfo: PersonalInfoData }`
- **State**: None
- **Behavior**: Display social links and contact info
- **Accessibility**: Proper link semantics

## Error Handling Contracts

### Missing Data
- **Scenario**: JSON file not found or invalid
- **Response**: Display fallback content or error message
- **User Experience**: Graceful degradation

### Invalid Project Slug
- **Scenario**: Project not found by slug
- **Response**: 404 page with navigation back to projects
- **User Experience**: Clear error message with recovery options

### Image Loading Errors
- **Scenario**: Project or avatar image fails to load
- **Response**: Display placeholder or fallback image
- **User Experience**: Consistent visual experience

## Performance Contracts

### Image Optimization
- **Requirement**: All images must use Next.js Image component
- **Format**: WebP with JPEG fallback
- **Loading**: Lazy loading for below-the-fold content
- **Sizing**: Responsive images with proper srcset

### Code Splitting
- **Requirement**: Dynamic imports for non-critical components
- **Bundle Size**: Initial bundle < 100KB
- **Loading**: Progressive enhancement

### Caching
- **Requirement**: Static generation for all pages
- **Strategy**: Build-time generation with ISR if needed
- **Performance**: < 3s load time on 3G connection

## Accessibility Contracts

### Keyboard Navigation
- **Requirement**: All interactive elements keyboard accessible
- **Focus Management**: Visible focus indicators
- **Tab Order**: Logical tab sequence

### Screen Reader Support
- **Requirement**: Proper ARIA labels and semantic HTML
- **Content**: Alt text for all images
- **Structure**: Proper heading hierarchy

### Color Contrast
- **Requirement**: WCAG AA compliance (4.5:1 ratio)
- **Testing**: Automated testing with axe-core
- **Validation**: Manual testing with screen readers

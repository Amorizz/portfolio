<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0
Modified principles: N/A (new constitution)
Added sections: Modern Web Development, Performance & Accessibility, Content Management
Removed sections: N/A
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
Follow-up TODOs: None
-->

# Personal Portfolio Constitution

## Core Principles

### I. Modern Web Development
All development MUST follow current web standards and best practices. Use Next.js 15+ with App Router, TypeScript for type safety, Tailwind CSS for styling, and shadcn/ui for consistent components. Code MUST be maintainable, readable, and follow React/Next.js conventions. No legacy patterns or deprecated APIs.

### II. Performance First (NON-NEGOTIABLE)
The portfolio MUST achieve Lighthouse scores of Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90. All images MUST be optimized (WebP format, proper sizing, lazy loading). Code splitting and minimal JavaScript bundles are mandatory. No unnecessary dependencies or bloated libraries.

### III. Accessibility & User Experience
The site MUST be fully accessible via keyboard navigation with visible focus states. All interactive elements MUST have proper ARIA labels and semantic HTML. Content MUST be readable without zoom on mobile devices (≤480px). External links MUST open in new tabs with appropriate security attributes.

### IV. Content-Driven Design
The portfolio MUST showcase personal brand through clean, professional design. Content structure MUST include: hero section with name/bio, projects showcase, contact information, and social links. All content MUST be easily updatable without code changes (use data files or CMS).

### V. Mobile-First Responsive Design
All layouts MUST be mobile-first with responsive breakpoints at 480px, 768px, and 1024px. No horizontal scrolling on any device. Touch targets MUST be at least 44px for mobile interaction. Design MUST work across all modern browsers and devices.

## Technology Stack Requirements

**Frontend Framework**: Next.js 15+ with App Router and TypeScript
**Styling**: Tailwind CSS v4+ with custom design system
**Components**: shadcn/ui for consistent, accessible components
**Deployment**: Vercel or similar platform with automatic deployments
**Performance**: Core Web Vitals compliance, image optimization, code splitting

## Development Workflow

**Code Quality**: ESLint + Prettier configuration mandatory. All code MUST pass linting before commits. TypeScript strict mode enabled. No `any` types without explicit justification.

**Testing Strategy**: Component testing with React Testing Library, accessibility testing with axe-core, visual regression testing for critical user flows. All external links MUST be tested for validity.

**Content Management**: Project data MUST be stored in structured data files (JSON/YAML) for easy updates. No hardcoded content in components. Image assets MUST be organized in public directory with consistent naming.

## Governance

This constitution supersedes all other development practices. All implementations MUST verify compliance with performance and accessibility requirements. Use `.specify/templates/` for consistent documentation and planning. Complexity additions MUST be justified with clear business value.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
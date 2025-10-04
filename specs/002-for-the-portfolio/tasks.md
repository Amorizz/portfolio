# Tasks: Personal Portfolio with Obsidian Dark Theme

**Input**: Design documents from `/specs/002-for-the-portfolio/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `app/`, `components/`, `lib/`, `data/`, `public/`, `tests/`
- **Portfolio Structure**: Single Next.js application with App Router
- Paths based on plan.md structure for portfolio website

## Phase 3.1: Setup
- [x] T001 Create Next.js project structure with App Router in repository root
- [x] T002 Initialize Next.js project with TypeScript, Tailwind CSS, and ESLint
- [x] T003 [P] Install and configure shadcn/ui components (button, card, avatar, separator, badge)
- [x] T004 [P] Configure Tailwind CSS with obsidian dark theme colors and Inter font
- [x] T005 [P] Setup project directory structure (components/, lib/, data/, public/, tests/)
- [x] T006 [P] Configure ESLint and Prettier for TypeScript and React



## Phase 3.3: Core Implementation
- [x] T017 [P] TypeScript interfaces for Project, PersonalInfo, SocialLink, VisionQuote in lib/types.ts
- [x] T018 [P] Data loading utilities for JSON files in lib/data-loader.ts
- [x] T019 [P] Utility functions for formatting and validation in lib/utils.ts
- [x] T020 [P] Constants for theme colors and configuration in lib/constants.ts
- [x] T021 [P] Navbar component with responsive mobile menu in components/layout/navbar.tsx
- [x] T022 [P] Hero component with avatar, bio, and social links in components/layout/hero.tsx
- [x] T023 [P] ProjectCard component with image and description in components/project/project-card.tsx
- [x] T024 [P] ProjectGrid component for displaying projects in components/sections/projects-grid.tsx
- [x] T025 [P] VisionQuote component for inspirational content in components/sections/vision-quote.tsx
- [x] T026 [P] Footer component with social links and contact info in components/layout/footer.tsx
- [x] T027 [P] SocialLinks component for social media links in components/sections/social-links.tsx

## Phase 3.4: Pages Implementation
- [x] T028 Homepage with hero, featured projects, and vision quote in app/page.tsx
- [x] T029 Projects listing page with all projects in app/projects/page.tsx
- [x] T030 Individual project detail page in app/projects/[slug]/page.tsx
- [x] T031 About page with detailed personal information in app/about/page.tsx
- [x] T032 Contact page with contact form and information in app/contact/page.tsx
- [x] T033 Root layout with metadata and global styles in app/layout.tsx
- [x] T034 Global CSS with obsidian theme and Tailwind imports in app/globals.css

## Phase 3.5: Content Management
- [x] T035 [P] Personal information data file in data/personal-info.json
- [x] T036 [P] Projects data file with sample projects in data/projects.json
- [x] T037 [P] Social links data file in data/social-links.json
- [x] T038 [P] Vision quotes data file in data/vision-quotes.json
- [x] T039 [P] Sample project images in public/images/projects/
- [x] T040 [P] Avatar image and favicon in public/images/

## Phase 3.6: Integration & Optimization
- [ ] T041 Image optimization with Next.js Image component for all images
- [ ] T042 SEO metadata and Open Graph tags for all pages
- [ ] T043 Performance optimization with code splitting and lazy loading
- [ ] T044 Error handling and 404 pages for invalid routes
- [ ] T045 External link security with rel="noopener noreferrer"
- [ ] T046 Mobile-first responsive design implementation

## Dependencies
- Setup tasks (T001-T006) before all other tasks
- Tests (T007-T016) before implementation (T017-T046)
- TypeScript interfaces (T017) before data loading (T018)
- Data loading (T018) before components (T021-T027)
- Components (T021-T027) before pages (T028-T034)
- Content files (T035-T040) before pages can display content
- Core implementation before integration (T041-T046)
- All implementation before polish (T047-T054)

## Parallel Execution Examples

### Setup Phase (T003-T006 can run in parallel):
```
Task: "Install and configure shadcn/ui components (button, card, avatar, separator, badge)"
Task: "Configure Tailwind CSS with obsidian dark theme colors and Inter font"
Task: "Setup project directory structure (components/, lib/, data/, public/, tests/)"
Task: "Configure ESLint and Prettier for TypeScript and React"
```

### Test Phase (T007-T016 can run in parallel):
```
Task: "Component test for Navbar in tests/components/navbar.test.tsx"
Task: "Component test for Hero in tests/components/hero.test.tsx"
Task: "Component test for ProjectCard in tests/components/project-card.test.tsx"
Task: "Component test for ProjectGrid in tests/components/project-grid.test.tsx"
Task: "Component test for VisionQuote in tests/components/vision-quote.test.tsx"
Task: "Component test for Footer in tests/components/footer.test.tsx"
Task: "Integration test for homepage user flow in tests/integration/homepage.test.tsx"
Task: "Integration test for projects page user flow in tests/integration/projects.test.tsx"
Task: "Integration test for project detail page user flow in tests/integration/project-detail.test.tsx"
Task: "Accessibility test for all pages in tests/accessibility/accessibility.test.tsx"
```

### Core Implementation Phase (T017-T027 can run in parallel):
```
Task: "TypeScript interfaces for Project, PersonalInfo, SocialLink, VisionQuote in lib/types.ts"
Task: "Data loading utilities for JSON files in lib/data-loader.ts"
Task: "Utility functions for formatting and validation in lib/utils.ts"
Task: "Constants for theme colors and configuration in lib/constants.ts"
Task: "Navbar component with responsive mobile menu in components/layout/navbar.tsx"
Task: "Hero component with avatar, bio, and social links in components/layout/hero.tsx"
Task: "ProjectCard component with image and description in components/project/project-card.tsx"
Task: "ProjectGrid component for displaying projects in components/sections/projects-grid.tsx"
Task: "VisionQuote component for inspirational content in components/sections/vision-quote.tsx"
Task: "Footer component with social links and contact info in components/layout/footer.tsx"
Task: "SocialLinks component for social media links in components/sections/social-links.tsx"
```

### Content Management Phase (T035-T040 can run in parallel):
```
Task: "Personal information data file in data/personal-info.json"
Task: "Projects data file with sample projects in data/projects.json"
Task: "Social links data file in data/social-links.json"
Task: "Vision quotes data file in data/vision-quotes.json"
Task: "Sample project images in public/images/projects/"
Task: "Avatar image and favicon in public/images/"
```

### Polish Phase (T047-T054 can run in parallel):
```
Task: "Unit tests for data loading utilities in tests/unit/data-loader.test.ts"
Task: "Unit tests for utility functions in tests/unit/utils.test.ts"
Task: "Performance tests for Lighthouse scores in tests/performance/lighthouse.test.ts"
Task: "Visual regression tests for components in tests/visual/visual.test.ts"
Task: "End-to-end tests for critical user flows in tests/e2e/user-flows.test.ts"
Task: "Bundle size analysis and optimization"
Task: "Documentation update with setup and deployment instructions"
Task: "Final accessibility audit and fixes"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Follow TDD principles: Red → Green → Refactor
- Ensure all components are accessible and responsive
- Maintain obsidian dark theme consistency throughout
- Optimize for performance and Lighthouse scores

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - API routes contract → page implementation tasks
   - Component contracts → component test tasks [P]
   
2. **From Data Model**:
   - Each entity → TypeScript interface task [P]
   - Data loading → utility tasks [P]
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Components → Pages → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Obsidian dark theme requirements included
- [x] Performance and accessibility requirements covered
- [x] Content management tasks included
- [x] Mobile-first responsive design tasks included


# Implementation Plan: Personal Portfolio with Obsidian Dark Theme

**Branch**: `002-for-the-portfolio` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-for-the-portfolio/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a personal portfolio website with obsidian dark theme that showcases Amaud's authentic personality, ambition, passion, and obsession. The site will feature a responsive design with navbar, hero section with avatar, projects showcase, vision quote, and footer. Built with Next.js 15+, TypeScript, Tailwind CSS, and shadcn/ui following modern web development principles and performance requirements.

## Technical Context
**Language/Version**: TypeScript 5+ with Next.js 15+ App Router  
**Primary Dependencies**: React 19+, Tailwind CSS v4+, shadcn/ui, Next.js Image optimization  
**Storage**: Static data files (JSON/YAML) for content management  
**Testing**: React Testing Library, Jest, axe-core for accessibility testing  
**Target Platform**: Web browsers (modern), mobile-first responsive design  
**Project Type**: Single web application (frontend-only portfolio)  
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90  
**Constraints**: Core Web Vitals compliance, <3s load time, <100KB initial JS bundle  
**Scale/Scope**: Personal portfolio, ~10-15 pages, 5-10 projects, static content

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Modern Web Development Compliance
✅ **Next.js 15+ with App Router**: Using latest Next.js with App Router for optimal performance  
✅ **TypeScript**: Full type safety with strict mode enabled  
✅ **Tailwind CSS v4+**: Modern utility-first CSS framework  
✅ **shadcn/ui**: Accessible, consistent component library  
✅ **React/Next.js Conventions**: Following established patterns and best practices

### Performance First Compliance
✅ **Lighthouse Targets**: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90  
✅ **Image Optimization**: WebP format, proper sizing, lazy loading with Next.js Image  
✅ **Code Splitting**: Automatic with Next.js App Router  
✅ **Minimal Dependencies**: Only essential libraries (React, Next.js, Tailwind, shadcn/ui)

### Accessibility & UX Compliance
✅ **Keyboard Navigation**: Full keyboard accessibility with visible focus states  
✅ **ARIA Labels**: Semantic HTML and proper ARIA attributes  
✅ **Mobile Responsive**: Mobile-first design with 480px, 768px, 1024px breakpoints  
✅ **External Links**: New tab opening with security attributes

### Content-Driven Design Compliance
✅ **Personal Brand**: Obsidian dark theme reflecting authenticity, ambition, passion  
✅ **Content Structure**: Hero, projects, vision quote, footer sections  
✅ **Easy Updates**: JSON/YAML data files for content management

### Mobile-First Responsive Compliance
✅ **Responsive Breakpoints**: 480px, 768px, 1024px breakpoints  
✅ **No Horizontal Scroll**: Mobile-first layout prevents horizontal scrolling  
✅ **Touch Targets**: 44px minimum touch targets for mobile interaction  
✅ **Cross-Browser**: Works across all modern browsers and devices

**Result**: ✅ PASS - All constitutional requirements met

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
app/                          # Next.js 15+ App Router
├── globals.css               # Global styles and Tailwind imports
├── layout.tsx                # Root layout with metadata
├── page.tsx                  # Homepage
├── projects/
│   ├── page.tsx             # Projects listing page
│   └── [slug]/
│       └── page.tsx         # Individual project pages
├── about/
│   └── page.tsx             # About page
└── contact/
    └── page.tsx             # Contact page

components/                   # Reusable UI components
├── ui/                      # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── layout/
│   ├── navbar.tsx           # Navigation component
│   ├── footer.tsx           # Footer component
│   └── hero.tsx             # Hero section
├── sections/
│   ├── projects-grid.tsx    # Projects showcase
│   ├── vision-quote.tsx     # Vision quote section
│   └── social-links.tsx     # Social media links
└── project/
    ├── project-card.tsx     # Project card component
    └── project-detail.tsx   # Project detail component

lib/                         # Utility functions and configurations
├── utils.ts                 # Utility functions
├── constants.ts             # App constants
└── types.ts                 # TypeScript type definitions

data/                        # Content management
├── projects.json            # Projects data
├── personal-info.json       # Personal information
└── social-links.json       # Social media links

public/                      # Static assets
├── images/
│   ├── avatar.jpg          # Profile photo
│   ├── projects/           # Project images
│   └── icons/              # Icon assets
└── favicon.ico

tests/                       # Testing files
├── __mocks__/              # Test mocks
├── components/             # Component tests
├── pages/                  # Page tests
└── utils/                  # Utility tests
```

**Structure Decision**: Single Next.js application with App Router. Components organized by feature (layout, sections, project) with shared UI components from shadcn/ui. Content managed through JSON data files for easy updates. Static assets organized in public directory with consistent naming.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType cursor`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**Task Categories for Portfolio**:
- **Setup**: Next.js project, dependencies, shadcn/ui, Tailwind config
- **Tests**: Component tests, accessibility tests, integration tests
- **Core**: Data models, components, pages, styling
- **Integration**: Image optimization, performance, SEO
- **Polish**: Testing, documentation, deployment

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*

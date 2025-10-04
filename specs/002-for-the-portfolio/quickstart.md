# Quickstart Guide: Personal Portfolio with Obsidian Dark Theme

**Feature**: 002-for-the-portfolio  
**Date**: 2025-01-27  
**Status**: Complete

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Code editor (VS Code recommended)

## Setup Instructions

### 1. Initialize Next.js Project
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app
cd portfolio
```

### 2. Install Additional Dependencies
```bash
npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-card @radix-ui/react-separator
npm install lucide-react
npm install -D @types/node
```

### 3. Setup shadcn/ui
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card avatar separator badge
```

### 4. Create Project Structure
```bash
mkdir -p components/{ui,layout,sections,project}
mkdir -p lib
mkdir -p data
mkdir -p public/images/{projects,icons}
mkdir -p tests/{components,pages,utils}
```

### 5. Configure Tailwind for Obsidian Theme
Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          primary: '#0D1117',
          secondary: '#161B22',
          accent: '#58A6FF',
          text: '#F0F6FC',
          muted: '#8B949E',
          success: '#3FB950',
          warning: '#D29922',
          error: '#F85149',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

## Content Setup

### 1. Create Personal Information
Create `data/personal-info.json`:
```json
{
  "name": "Amaud [Your Name]",
  "title": "Full Stack Developer",
  "bio": "Passionate developer with expertise in modern web technologies...",
  "avatar": "/images/avatar.jpg",
  "avatarAlt": "Profile photo of Amaud",
  "location": "Your City, Country",
  "email": "your.email@example.com",
  "phone": "+1 (555) 123-4567"
}
```

### 2. Create Social Links
Create `data/social-links.json`:
```json
[
  {
    "platform": "linkedin",
    "url": "https://linkedin.com/in/yourprofile",
    "icon": "linkedin",
    "label": "LinkedIn",
    "order": 1,
    "enabled": true
  },
  {
    "platform": "github",
    "url": "https://github.com/yourusername",
    "icon": "github",
    "label": "GitHub",
    "order": 2,
    "enabled": true
  },
  {
    "platform": "instagram",
    "url": "https://instagram.com/yourusername",
    "icon": "instagram",
    "label": "Instagram",
    "order": 3,
    "enabled": true
  }
]
```

### 3. Create Projects Data
Create `data/projects.json`:
```json
[
  {
    "id": "project-1",
    "title": "E-commerce Platform",
    "shortDescription": "Full-stack e-commerce solution with modern UI",
    "detailedDescription": "A comprehensive e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard...",
    "image": "/images/projects/ecommerce.jpg",
    "imageAlt": "E-commerce platform screenshot",
    "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    "githubUrl": "https://github.com/yourusername/ecommerce",
    "liveUrl": "https://your-ecommerce-site.com",
    "featured": true,
    "order": 1,
    "createdAt": "2024-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
]
```

### 4. Create Vision Quotes
Create `data/vision-quotes.json`:
```json
[
  {
    "id": "quote-1",
    "quote": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "order": 1,
    "enabled": true
  }
]
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
npm start
```

### 3. Run Tests
```bash
npm test
npm run test:accessibility
```

### 4. Lint and Format
```bash
npm run lint
npm run format
```

## Testing Checklist

### Manual Testing
- [ ] Homepage loads with hero section
- [ ] Navigation works on all pages
- [ ] Projects display correctly
- [ ] Project detail pages load
- [ ] Social links open in new tabs
- [ ] Mobile responsive design works
- [ ] Keyboard navigation functional
- [ ] Images load with proper alt text

### Performance Testing
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Page load time < 3 seconds
- [ ] Core Web Vitals pass

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast compliance
- [ ] Focus indicators visible
- [ ] Alt text for all images

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Enable SSL certificate

## Content Updates

### Adding New Projects
1. Add project data to `data/projects.json`
2. Add project images to `public/images/projects/`
3. Rebuild and deploy

### Updating Personal Info
1. Update `data/personal-info.json`
2. Rebuild and deploy

### Adding Social Links
1. Update `data/social-links.json`
2. Rebuild and deploy

## Troubleshooting

### Common Issues
- **Images not loading**: Check file paths and Next.js Image component usage
- **Styling issues**: Verify Tailwind configuration and class names
- **Build errors**: Check TypeScript types and imports
- **Performance issues**: Optimize images and check bundle size

### Debug Commands
```bash
# Check bundle size
npm run build && npx @next/bundle-analyzer

# Check accessibility
npm run test:accessibility

# Check TypeScript
npx tsc --noEmit
```

## Success Criteria

- [ ] All pages load without errors
- [ ] Responsive design works on all devices
- [ ] Performance targets met
- [ ] Accessibility standards met
- [ ] Content updates work smoothly
- [ ] Deployment successful

# Modern Portfolio Website

A beautiful, modern, and fully responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a sleek dark theme, smooth animations, bilingual support (English/French), and optimized performance.

![Portfolio Preview](public/images/logo.png)

## ✨ Features

- 🎨 **Modern Dark Theme** - Elegant design with carefully chosen color palette
- 🌐 **Bilingual Support** - Full English and French translations with easy language switching
- ⚡ **Next.js 15** - Latest features including App Router and Server Components
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎭 **Smooth Animations** - Beautiful transitions and scroll effects
- 🚀 **Performance Optimized** - Fast loading times and SEO-friendly
- ♿ **Accessible** - WCAG compliant with proper semantic HTML
- 📊 **Dynamic CV Page** - Professional CV with print/download functionality
- 🎯 **Project Showcase** - Detailed project pages with images and descriptions
- 📝 **Easy Customization** - JSON-based content management
- 🔧 **TypeScript** - Full type safety throughout the codebase
- 🎨 **shadcn/ui** - Beautiful, accessible UI components

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amorizz/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── cv/                  # CV page
│   ├── projects/            # Projects pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── cv/                  # CV components
│   ├── layout/              # Layout components (Navbar, Footer, Hero)
│   ├── project/             # Project components
│   ├── sections/            # Section components
│   └── ui/                  # UI components (shadcn/ui)
├── data/                    # Content data
│   ├── en/                  # English content
│   │   ├── about-cards.json
│   │   ├── certifications.json
│   │   ├── cv.json
│   │   ├── personal-info.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── social-links.json
│   │   ├── timeline.json
│   │   ├── translations.json
│   │   └── vision-quotes.json
│   └── fr/                  # French content (same structure)
├── lib/                     # Utility functions and types
│   ├── constants.ts
│   ├── data-loader.ts
│   ├── get-language.ts
│   ├── get-navigation.ts
│   ├── types.ts
│   └── utils.ts
├── public/                  # Static assets
│   └── images/             # Images and icons
└── middleware.ts           # Next.js middleware for language detection
```

## 🎨 Customization

### 1. Personal Information

Edit the JSON files in `data/en/` and `data/fr/` directories:

**Personal Info** (`personal-info.json`):
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": "Your bio",
  "avatar": "/images/your-avatar.png",
  "email": "your.email@example.com",
  "phone": "+1 234 567 8900"
}
```

### 2. Projects

Add your projects in `data/en/projects.json` and `data/fr/projects.json`:

```json
{
  "id": "project-id",
  "title": "Project Title",
  "shortDescription": "Brief description",
  "detailedDescription": "Full description",
  "image": "/images/projects/project-image.png",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project.com",
  "featured": true,
  "order": 1
}
```

### 3. Skills

Update your skills in `data/en/skills.json`:

```json
{
  "id": "1",
  "icon": "🌐",
  "title": "Skill Category",
  "description": "Category description",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "order": 1,
  "enabled": true
}
```

### 4. CV

Edit `data/en/cv.json` and `data/fr/cv.json` with your:
- Education
- Experience
- Projects
- Certifications
- Skills
- Languages
- Interests

### 5. Colors and Theme

Modify the theme in `tailwind.config.ts` or `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --accent: 221.2 83.2% 53.3%;
  /* ... other colors */
}
```

### 6. Images

Place your images in the `public/images/` directory:
- **Avatar**: `public/images/your-avatar.png`
- **Logo**: `public/images/logo.png`
- **Projects**: `public/images/projects/project-name.png`

## 🌐 Bilingual Support

The site supports English and French by default. To add more languages:

1. Create a new folder in `data/` (e.g., `data/es/` for Spanish)
2. Copy all JSON files from `data/en/` and translate them
3. Update `middleware.ts` to include the new language
4. Update `lib/get-language.ts` to support the new language

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Build command: `npm run build`
Output directory: `.next`

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React-to-Print](https://github.com/gregnb/react-to-print)** - Print CV functionality

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Amorizz/portfolio/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Amaury Dufrenot**

- Website: [amaury-dufrenot.com](https://amaury-dufrenot.com)
- GitHub: [@Amorizz](https://github.com/Amorizz)
- LinkedIn: [amaury-dufrenot](https://linkedin.com/in/amaury-dufrenot)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [Lucide](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## ⭐ Show your support

Give a ⭐️ if this project helped you build your portfolio!

---

**Note**: This is a template. Feel free to customize it to match your personal brand and requirements. All content in the `data/` folders should be replaced with your own information.

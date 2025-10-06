# Images Directory

This directory contains all static images for the portfolio website.

## Required Images

### Avatar
- `avatar.jpg` - Profile photo (300x300px, square aspect ratio)
- `avatar-alt.jpg` - Alternative profile photo
- `avatar-placeholder.jpg` - Placeholder avatar image

### Favicon and Icons
- `favicon.ico` - Website favicon (16x16, 32x32, 48x48px)
- `apple-touch-icon.png` - Apple touch icon (180x180px)
- `og-image.jpg` - Open Graph image (1200x630px)

### Project Images
- See `/images/projects/README.md` for project image specifications

## Image Optimization

All images should be optimized for web:
- **Format**: Use WebP when possible, fallback to JPG/PNG
- **Compression**: Optimize for web (80-90% quality)
- **Responsive**: Provide multiple sizes for different screen densities
- **Lazy Loading**: Implement lazy loading for below-the-fold images

## Usage in Next.js

```jsx
import Image from 'next/image';

// Avatar
<Image
  src="/images/avatar.jpg"
  alt="Profile photo of Amaud"
  width={300}
  height={300}
  className="rounded-full"
  priority
/>

// Project images
<Image
  src="/images/projects/project-name.jpg"
  alt="Project screenshot"
  width={1200}
  height={600}
  className="w-full h-64 object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Placeholder Images

For development, you can use placeholder images:
- Avatar: https://ui-avatars.com/api/?name=yourname&size=300&background=58A6FF&color=0D1117
- Project images: https://picsum.photos/1200/600
- OG image: https://picsum.photos/1200/630



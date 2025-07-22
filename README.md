# Revo Rahmat - Portfolio Website

A modern, animated portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, 3D backgrounds, and a responsive design optimized for all devices.

![Portfolio Preview](public/images/profile.jpg)

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **3D Animations**: Interactive Three.js background with particle effects
- **Smooth Animations**: Framer Motion for elegant page transitions
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Performance Optimized**: Lazy loading, optimized images, and fast load times
- **SEO Ready**: Complete meta tags and Open Graph support
- **Dark Theme**: Professional dark color scheme with purple/cyan accents

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx      # Top navigation bar
│   │   ├── Hero.tsx           # Hero section with animated text
│   │   ├── Overview.tsx       # About section with stats
│   │   ├── WorkExperience.tsx # Timeline of work experiences
│   │   ├── Skills.tsx         # Technical skills showcase
│   │   ├── Projects.tsx       # Project portfolio grid
│   │   ├── Contact.tsx        # Contact form and info
│   │   └── ThreeBackground.tsx # 3D animated background
│   ├── globals.css            # Global styles and animations
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Home page component
├── public/
│   └── images/                # Project images and assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Project dependencies
```

## 🎨 Customization

### Colors

The color scheme is defined in `app/globals.css`:

```css
:root {
  --background: 10 14 39;      /* Deep navy background */
  --primary: 263 70 50;        /* Purple accent */
  --accent: 199 89 48;         /* Cyan accent */
}
```

### Content

Update your personal information in the following files:
- `app/components/Hero.tsx` - Name and tagline
- `app/components/WorkExperience.tsx` - Work history
- `app/components/Skills.tsx` - Technical skills
- `app/components/Projects.tsx` - Project portfolio
- `app/components/Contact.tsx` - Contact information

### Images

Replace images in `public/images/` with your own:
- `profile.jpg` - Your profile photo
- Project screenshots for the portfolio section

## 🔧 Environment Variables

No environment variables are required for basic functionality. For email functionality, you can integrate services like:
- EmailJS
- Resend
- SendGrid

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

Revo Rahmat - [GitHub](https://github.com/Revo3112)

---

Built with ❤️ by Revo Rahmat

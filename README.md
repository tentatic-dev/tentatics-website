# Next.js 15 + DaisyUI + SEO + Analytics

Template modern untuk developer dengan fitur lengkap SEO dan analytics. 

## 🚀 Features

- ⚡ **Next.js 15** dengan App Router
- 🎨 **DaisyUI** untuk styling yang indah
- 📈 **Google Analytics** tracking
- 🏷️ **Google Tag Manager** support
- 🔍 **SEO optimized** dengan structured data
- 📱 **Responsive design**
- 🎭 **TypeScript** untuk type safety
- 🛠️ **Easy configuration** via environment variables

## 🛠️ Quick Setup

### 1. Clone & Install

```bash
git clone <repository-url>
cd portfolio-template
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan tracking IDs Anda:

```env
# Analytics & Tracking
NEXT_PUBLIC_GA_TRACKING_ID="G-XXXXXXXXXX"  # Google Analytics ID
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"          # Google Tag Manager ID

# Optional services
NEXT_PUBLIC_HOTJAR_ID=""
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=""
```

### 3. Site Configuration

Edit `src/config/site.ts` untuk kustomisasi portfolio Anda:

```typescript
export const siteConfig = {
  name: "Your Portfolio Name",
  url: "https://yoursite.com",
  username: "yourusername",
  author: "Your Name",
  description: "Your portfolio description",
  social: {
    email: "mailto:your@email.com",
    whatsapp: "https://wa.me/1234567890",
    instagram: "https://www.instagram.com/yourusername",
  },
  special: {
    speciality: "Web Development",
    availability: "Available for freelance",
    experience: "5+ years",
    location: "Your City, Country",
  },
  // ... testimonials
};
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📊 Analytics Setup

### Google Analytics

1. Buat account di [Google Analytics](https://analytics.google.com/)
2. Buat properti baru untuk website Anda
3. Copy Measurement ID (format: G-XXXXXXXXXX)
4. Paste ke `NEXT_PUBLIC_GA_TRACKING_ID` di `.env.local`

### Google Tag Manager

1. Buat account di [Google Tag Manager](https://tagmanager.google.com/)
2. Buat container baru
3. Copy Container ID (format: GTM-XXXXXXX)
4. Paste ke `NEXT_PUBLIC_GTM_ID` di `.env.local`

## 🎨 Customization

### Theme & Colors

Template menggunakan DaisyUI themes. Edit di `src/app/layout.tsx`:

```tsx
<html lang="en" data-theme="light"> {/* Ganti theme */}
```

Available themes: `light`, `dark`, `cupcake`, `bumblebee`, dll.

### SEO Settings

SEO dikonfigurasi di `src/lib/seo.ts`. Structured data ada di `src/config/structured-data.ts`.

### Components

Semua components ada di folder `src/components/`. Template sudah include:

- Analytics components (GA + GTM)
- SEO utilities
- Structured data

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout dengan analytics
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles + DaisyUI
├── components/         # Reusable components
│   └── analytics.tsx   # GA & GTM components
├── config/            # Configuration files
│   ├── site.ts        # Site configuration
│   └── structured-data.ts # SEO structured data
└── lib/               # Utilities
    └── seo.ts         # SEO helpers
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push ke GitHub repository
2. Connect di [Vercel](https://vercel.com)
3. Add environment variables di Vercel dashboard
4. Deploy!

### Netlify

1. Push ke repository
2. Connect di [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `out` (jika static export)

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

Pull requests welcome! Untuk major changes, buka issue dulu untuk diskusi.

---

Made with ❤️ from [Peter Shaan](https://petershaan.net)

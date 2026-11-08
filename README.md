# ADOPTION - Animal Adoption Website

A modern, multilingual web application for animal adoption management built with Next.js 16, React 19, TypeScript, and Supabase. The platform features a section-based homepage, dynamic animal listings, adoption workflows, and internationalization support (Portuguese & English).

---

## 🎯 Project Overview

**Purpose**: ADOPTION is a dedicated platform for showcasing adoptable animals and streamlining the adoption process.

**Key Features**:

- 🌍 Multi-language support (Portuguese, English)
- 🐾 Dynamic animal database via Supabase
- 📱 Fully responsive design
- ♿ Accessible UI components
- 🎨 Modern styling with SCSS modules & Tailwind CSS
- 🔧 Config-driven page composition
- 📊 Component-based architecture
- ✨ Loading skeletons and smooth animations
- 🚀 Next.js App Router with server components

---

## 📋 Table of Contents

1. [Getting Started](#-getting-started)
2. [Project Structure](#-project-structure)
3. [Directory & File Documentation](#-directory--file-documentation)
4. [Core Concepts](#-core-concepts)
5. [Tech Stack](#-tech-stack)
6. [Development](#-development)
7. [Deployment](#-deployment)
8. [Future Roadmap](#-future-roadmap)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd adoption-website

# Install dependencies
npm install

# Create .env.local (ask team for Supabase credentials)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint checks
```

---

## 📁 Project Structure

```
adoption-website/
├── app/                      # Next.js App Router (pages & layouts)
│   └── [locale]/             # Dynamic locale routing (pt, en)
│       ├── layout.tsx        # Root layout with i18n setup
│       ├── page.tsx          # Homepage (config-driven sections)
│       └── (routes)/         # Route groups
│           ├── adopt/        # Adoption flow pages
│           └── animals/      # Animal listing & details
├── components/               # Reusable UI components
│   ├── sections/             # Homepage sections (Hero, About, etc.)
│   ├── ui/                   # Base UI building blocks
│   ├── Button/               # Reusable button component
│   ├── Card/                 # Card layout with skeleton
│   ├── Navbar/               # Navigation bar
│   ├── Footer/               # Footer component
│   ├── Forms/                # Adoption form
│   ├── GoTopButton/          # Scroll-to-top button
│   ├── Logo/                 # Brand logo
│   ├── CardGrid/             # Grid layout for cards
│   ├── ItemDetailsLayout/    # Layout for detail pages
│   ├── UrgentBanner/         # Alert/banner component
│   └── [component]/          # Individual components with .tsx & .module.scss
├── config/                   # Global configuration
│   ├── navigation.ts         # Menu structure & social links
│   ├── metadata.ts           # SEO metadata
│   ├── website.ts            # Global constants
│   └── pages/
│       └── homepage.ts       # Homepage section order
├── hooks/                    # Custom React hooks
│   ├── useBreakpoints.ts     # Responsive breakpoint detection
│   ├── useIsAtTop.ts         # Scroll position tracking
│   └── useMediaFormat.ts     # Media utility hooks
├── i18n/                     # Internationalization
│   ├── routing.ts            # Locale routing config
│   ├── requests.ts           # i18n request handler
│   └── navigation.ts         # Multilingual navigation
├── lib/                      # Business logic & utilities
│   ├── supabase/
│   │   ├── client.ts         # Supabase client setup
│   │   ├── server.ts         # Server-side Supabase utilities
│   │   └── animals.ts        # Animal queries from DB
│   ├── cookieJar.ts          # Cookie management utilities
│   ├── date.ts               # Date formatting helpers
│   ├── formatAnimalAge.ts    # Age calculation & formatting
│   ├── getAnimalBreedName.ts # Breed name retrieval
│   └── getPath.ts            # Path/URL helpers
├── mappers/                  # Data transformation
│   └── animal.mapper.ts      # Transforms Supabase data → UI format
├── messages/                 # Translation files
│   ├── en.json               # English translations
│   └── pt.json               # Portuguese translations
├── public/                   # Static assets
│   └── assets/               # Images, logos, SVGs
├── styles/                   # Global styles
│   ├── globals.scss          # Global CSS resets & setup
│   ├── animations.scss       # Reusable animations
│   ├── colors.scss           # Design tokens (colors)
│   ├── fonts.scss            # Typography & font setup
│   ├── shadows.scss          # Shadow definitions
│   └── variables.scss        # CSS variables
├── types/                    # TypeScript type definitions
│   ├── animals.ts            # Animal entity types
│   ├── contacts.ts           # Contact form types
│   ├── navigation.ts         # Navigation structure types
│   ├── sections.ts           # Section registry types
│   └── locales.ts            # Locale types
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies & scripts
├── .eslintrc.json            # ESLint rules
├── postcss.config.js         # PostCSS configuration
└── README.md                 # This file
```

---

## 📚 Directory & File Documentation

### `/app` — Next.js App Router

**What it does**: Contains all routes and page components. Uses dynamic `[locale]` parameter for multi-language support.

#### `app/[locale]/layout.tsx`

- **Purpose**: Root layout wrapper for all pages
- **Responsibilities**:
  - Sets up i18n context via `next-intl`
  - Wraps all children with `<html>` and `<body>` tags
  - Includes Navbar and Footer
  - Applies global styles & providers

#### `app/[locale]/page.tsx` (Homepage)

- **Purpose**: Homepage entry point
- **Key Logic**:
  1. Fetches animals from Supabase: `getAnimals()`
  2. Safely converts to array: `Array.isArray(animals) ? animals : []`
  3. Maps homepage sections from config: `homepageSections`
  4. Dynamically renders sections via `sectionRegistry`
  5. Passes random animal images to Hero section
- **Pattern**: Config-driven + registry pattern (prepares for CMS)

#### `app/[locale]/(routes)/adopt/[id]/page.tsx`

- **Purpose**: Individual animal adoption page
- **What it shows**: Full animal details with adoption form
- **Dynamic**: Route ID determines which animal to display

#### `app/[locale]/(routes)/adopt/status/page.tsx`

- **Purpose**: Adoption status tracker
- **Styling**: `adopt/status/page.module.scss`

#### `app/[locale]/(routes)/animals/page.tsx`

- **Purpose**: List all available animals
- **Features**: Grid layout, filtering, pagination (if implemented)

#### `app/[locale]/(routes)/animals/[id]/page.tsx`

- **Purpose**: Individual animal detail view
- **Dynamic**: Shows specific animal by ID

---

### `/components` — Reusable UI Layer

**What it does**: Contains all React components following a modular, isolated structure.

#### `/components/sections` — Homepage Building Blocks

**Purpose**: Reusable sections that compose the homepage dynamically.

**Sections Available**:

1. **hero/** - Hero banner with animal card carousel
2. **about/** - About the organization
3. **animals/** - Featured animals preview
4. **contacts/** - Contact information & form
5. **howItWorks/** - Adoption process explanation

**Key File**: `components/sections/index.ts`

- Acts as a **registry** that maps section names to components
- Enables dynamic rendering: `sectionRegistry[sectionName]`
- Facilitates CMS integration (strings → components)

#### `/components/ui` — Base Components

- **container/** - Layout wrapper with max-width & centering
- **section/** - Section wrapper with padding & spacing

#### Individual Components

| Component                | Location                                         | Purpose                                            |
| ------------------------ | ------------------------------------------------ | -------------------------------------------------- |
| **Button**               | `Button/Button.tsx`                              | Reusable button with variants (primary, secondary) |
| **Card**                 | `Card/Card.tsx`                                  | Animal/item card with image & info                 |
| **CardSkeleton**         | `Card/skeleton/CardSkeleton.tsx`                 | Loading placeholder for Card                       |
| **CardClient**           | `Card/CardClient.tsx`                            | Client-side interactive card logic                 |
| **CardGrid**             | `CardGrid/CardGrid.tsx`                          | Responsive grid layout for cards                   |
| **Navbar**               | `Navbar/Navbar.tsx`                              | Navigation bar (server)                            |
| **NavbarClient**         | `Navbar/NavbarClient.tsx`                        | Interactive navbar logic (client)                  |
| **Footer**               | `Footer/Footer.tsx`                              | Footer with links & info                           |
| **GoTopButton**          | `GoTopButton/GoTopButton.tsx`                    | Scroll-to-top button                               |
| **Logo**                 | `Logo/Logo.tsx`                                  | Brand logo component                               |
| **AdoptionForm**         | `Forms/AdoptionForm.tsx`                         | Adoption application form                          |
| **ItemDetailsLayout**    | `ItemDetailsLayout/ItemDetailsLayout.tsx`        | Layout for detail pages                            |
| **UrgentBanner**         | `UrgentBanner/UrgentBanner.tsx`                  | Alert/notification banner                          |
| **UrgentBannerSkeleton** | `UrgentBanner/skeleton/UrgentBannerSkeleton.tsx` | Loading state for banner                           |

**Component Pattern**:

- Each component has its own folder
- Includes `.tsx` file (component)
- Includes `.module.scss` for scoped styles
- Some have `skeleton/` subfolder for loading states
- Client-side logic separated where needed (e.g., `CardClient.tsx`)

---

### `/config` — Global Configuration

**What it does**: Centralized configuration for the entire app.

#### `config/navigation.ts`

```typescript
// Menu structure
MAIN_NAV[]    // Header navigation items
FOOTER_NAV[]  // Footer navigation items
SOCIAL_NAV[]  // Social media links (Facebook, Instagram, WhatsApp)
DONATE_NAV[]  // Donation methods (IBAN, MBWay)
```

#### `config/metadata.ts`

- SEO metadata (title, description, keywords)
- Open Graph tags
- Favicon & app icons

#### `config/website.ts`

- Global constants (organization name, contact info)
- Feature flags
- App-wide settings

#### `config/pages/homepage.ts`

```typescript
export const homepageSections = [
  "hero", // First section
  "animals", // Featured animals
  "about", // About organization
  "howItWorks", // Process explanation
  "contacts", // Contact form
];
```

- **Purpose**: Defines section order on homepage
- **Benefit**: Change order without touching React code
- **CMS-Ready**: Can be replaced with DB query

---

### `/hooks` — Custom React Hooks

#### `hooks/useBreakpoints.ts`

- **Purpose**: Responsive design logic
- **Usage**: `const { isMobile, isTablet, isDesktop } = useBreakpoints()`
- **Benefit**: Avoid media queries in components

#### `hooks/useIsAtTop.ts`

- **Purpose**: Track scroll position
- **Usage**: Detect if user scrolled (show/hide elements)
- **Example**: GoTopButton visibility

#### `hooks/useMediaFormat.ts`

- **Purpose**: Media utility functions
- **Usage**: Image optimization, video detection

---

### `/i18n` — Internationalization (i18n)

**Framework**: `next-intl` (Next.js official i18n solution)

#### `i18n/routing.ts`

- Defines supported locales: `['pt', 'en']`
- Sets default locale: `'pt'`
- Configures URL structure: `/pt/...`, `/en/...`

#### `i18n/requests.ts`

- Initializes i18n request handler
- Used in `next.config.ts` via `createNextIntlPlugin()`
- Handles locale detection & setup

#### `i18n/navigation.ts`

- Provides helper functions for creating locale-aware links
- Used in components: `useRouter()` with i18n support

---

### `/lib` — Business Logic & Utilities

**What it does**: Core functions, database queries, and helper utilities.

#### `/lib/supabase/` — Database Integration

**`supabase/client.ts`**

- Initializes Supabase client for browser
- Handles authentication tokens
- Used in client-side components

**`supabase/server.ts`**

- Server-side Supabase operations
- Secure API key usage
- Used in page components and API routes

**`supabase/animals.ts`**

- Main database queries
- Functions:
  - `getAnimals()` - Fetch all adoptable animals
  - `getAnimalById(id)` - Single animal details
  - `adoptAnimal(animalId, formData)` - Submit adoption

#### `/lib/` — Utility Functions

| File                    | Purpose                                                      |
| ----------------------- | ------------------------------------------------------------ |
| `cookieJar.ts`          | Cookie management (get, set, delete)                         |
| `date.ts`               | Date formatting & parsing utilities                          |
| `formatAnimalAge.ts`    | Convert birthdate → readable age (e.g., "2 years, 3 months") |
| `getAnimalBreedName.ts` | Map breed ID → human-readable name                           |
| `getPath.ts`            | URL/path construction helpers                                |

---

### `/mappers` — Data Transformation

#### `mappers/animal.mapper.ts`

- **Purpose**: Transform Supabase data → UI-ready format
- **Example**:
  - API returns: `{ id: 1, name: 'Fluffy', age_in_months: 24 }`
  - UI receives: `{ id: 1, name: 'Fluffy', ageDisplay: '2 years' }`
- **Benefit**: Keeps components clean of business logic

---

### `/messages` — Translation Files

**Format**: JSON key-value pairs

#### `messages/pt.json` (Portuguese)

```json
{
  "nav.home": "Início",
  "nav.about": "Sobre",
  "nav.animals": "Animais"
  // ... more translations
}
```

#### `messages/en.json` (English)

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "nav.animals": "Animals"
  // ... more translations
}
```

**Usage in Components**:

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  return <h1>{t('nav.home')}</h1>;
}
```

---

### `/public/assets` — Static Assets

**Organization**:

```
public/
└── assets/
    ├── logos/           # Brand logos
    │   └── socials/     # Social media icons (Facebook, Instagram, etc.)
    ├── images/          # Static images
    └── icons/           # Icon set
```

**Note**: Animal images come from Supabase (configured in `next.config.ts`)

---

### `/styles` — Global Styling System

**Framework**: SCSS + Tailwind CSS + CSS Modules

#### `styles/globals.scss`

- CSS reset
- Base HTML/body styles
- Font faces & imports

#### `styles/colors.scss`

- Design color tokens
- Usage: `@import '@/styles/colors'`
- Example variables: `$primary-color`, `$accent-color`

#### `styles/fonts.scss`

- Font family definitions
- Font weights & sizes

#### `styles/animations.scss`

- Reusable animations
- Fade-in, slide-in, bounce effects

#### `styles/shadows.scss`

- Elevation/shadow system
- Consistent depth across UI

#### `styles/variables.scss`

- CSS custom properties (variables)
- Breakpoints, spacing, transitions

**Component Styling Pattern**:

```typescript
// Button.tsx
import styles from './Button.module.scss';

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

---

### `/types` — TypeScript Definitions

#### `types/animals.ts`

```typescript
export interface Animal {
  id: string;
  name: string;
  breed: string;
  age: number;
  image_url: string;
  description: string;
  // ... other fields
}
```

#### `types/navigation.ts`

```typescript
export interface iNav {
  labelKey: string; // Translation key
  href: string;
  accessLevel: "public" | "private";
}
```

#### `types/contacts.ts`

- Contact form data structure
- Validation types

#### `types/sections.ts`

- Section registry type
- Ensures all sections are registered

#### `types/locales.ts`

- Locale union type: `'pt' | 'en'`
- Used for type-safe locale handling

---

### Root Configuration Files

#### `next.config.ts`

```typescript
{
  reactCompiler: true,  // React 19 compiler optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'loremflickr.com' }
    ]
  },
  allowedDevOrigins: ['http://192.168.31.169:3000']
}
```

- **i18n Setup**: Loads `next-intl` plugin

#### `tsconfig.json`

- Compiler options
- Path aliases: `@/` → `./src/`
- Strict mode enabled

#### `tailwind.config.ts`

- Design system tokens
- Custom colors, spacing, breakpoints
- Plugin configuration

#### `postcss.config.js`

- Tailwind CSS processing
- SCSS preprocessing

#### `.eslintrc.json`

- Code quality rules
- Enforces best practices
- Next.js recommended rules included

---

## 🔧 Core Concepts

### 1. **Config-Driven Homepage**

The homepage is built dynamically from configuration, not hardcoded:

```typescript
// config/pages/homepage.ts
export const homepageSections = ["hero", "animals", "about", "howItWorks", "contacts"];

// app/[locale]/page.tsx
{homepageSections.map(sectionName => (
  <sectionRegistry[sectionName] key={sectionName} />
))}
```

**Benefit**: Change homepage layout without modifying React code.

### 2. **Section Registry Pattern**

All sections register themselves centrally:

```typescript
// components/sections/index.ts
export const sectionRegistry = {
  hero: Hero,
  about: About,
  animals: Animals,
  contacts: Contacts,
  howItWorks: HowItWorks,
};
```

**Benefit**: Prepares for CMS integration and dynamic component loading.

### 3. **Dynamic Localization**

Every URL is locale-aware:

- `/pt/` - Portuguese version
- `/en/` - English version
- Automatic locale detection based on browser/system settings

### 4. **Component Isolation**

Each component:

- Has its own folder
- Contains its own styles (`.module.scss`)
- Can have its own skeleton loader
- Is type-safe with TypeScript

### 5. **Server vs. Client Components**

- **Server Components** (default): Render on server, no JavaScript sent
- **Client Components** (`'use client'`): Interactive, handle state & events
- **Pattern**: Separate files when needed (e.g., `Navbar.tsx` + `NavbarClient.tsx`)

### 6. **Data Flow**

```
Supabase DB
    ↓
lib/supabase/animals.ts (queries)
    ↓
mappers/animal.mapper.ts (transform)
    ↓
React Components (display)
    ↓
Rendered HTML/CSS
```

---

## 🛠 Tech Stack

| Layer              | Technology          | Purpose                                    |
| ------------------ | ------------------- | ------------------------------------------ |
| **Framework**      | Next.js 16          | React meta-framework with SSR/SSG          |
| **Language**       | TypeScript 5        | Type-safe JavaScript                       |
| **UI Library**     | React 19            | Component framework                        |
| **Styling**        | SCSS + Tailwind CSS | Design system & utility-first CSS          |
| **Database**       | Supabase            | PostgreSQL with auth & real-time           |
| **i18n**           | next-intl           | Multi-language support                     |
| **Icons**          | react-icons         | Icon library (Font Awesome, Feather, etc.) |
| **Notifications**  | sonner              | Toast notifications                        |
| **Compiler**       | React Compiler      | Optimization for React 19                  |
| **Linting**        | ESLint 9            | Code quality checks                        |
| **CSS Processing** | PostCSS + Tailwind  | CSS transformation & utilities             |

---

## 💻 Development

### Key Development Patterns

**1. Creating a New Component**

```bash
# Create folder structure
components/MyComponent/
├── MyComponent.tsx        # Component logic
├── MyComponent.module.scss # Component styles
└── skeleton/
    └── MyComponentSkeleton.tsx # Loading state
```

**2. Adding a Translation**

```json
// messages/pt.json
{ "myComponent.label": "Meu Rótulo" }

// messages/en.json
{ "myComponent.label": "My Label" }
```

**3. Creating a Section**

```typescript
// components/sections/mySection/MySection.tsx
export default function MySection() {
  return <section>My Section</section>;
}

// components/sections/index.ts
export const sectionRegistry = {
  // ... others
  mySection: MySection,
};

// config/pages/homepage.ts
export const homepageSections = [
  // ... other sections
  "mySection", // Added to homepage
];
```

### Testing Locales Locally

1. Visit `/pt/` for Portuguese
2. Visit `/en/` for English
3. No build required (hot reload works)

### Adding Supabase Queries

```typescript
// lib/supabase/animals.ts
export async function getNewAnimals() {
  const { data, error } = await supabaseServer
    .from("animals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Use in page.tsx
const newAnimals = await getNewAnimals();
```

---

## 🚀 Deployment

### Build Process

```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

### Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Deployment Platforms

- **Vercel** (recommended, Next.js creators)
- **Netlify**
- **AWS Amplify**
- **Self-hosted** (Docker container)

---

## 📈 Future Roadmap

### Phase 1: CMS Integration

- Replace `config/pages/homepage.ts` with Supabase queries
- Allow non-technical users to reorder sections
- Add content management UI

### Phase 2: Enhanced Adoption Flow

- Multi-step form with validation
- Document uploads (proof of residence, etc.)
- Status tracking for applicants

### Phase 3: User Accounts

- Adoptee profiles
- Adoption history
- Saved favorites

### Phase 4: Admin Panel

- Animal management (add/edit/delete)
- Adoption application review
- Analytics dashboard

### Phase 5: Performance & Scale

- Image optimization (Next.js Image component)
- Database indexing & query optimization
- CDN integration for static assets
- Caching strategies

---

## 📝 Notes

### What NOT to Do

- ❌ Don't hardcode URLs (use `getPath()` helpers)
- ❌ Don't put business logic in components (use `/lib`)
- ❌ Don't create global state without considering SSR
- ❌ Don't skip TypeScript types
- ❌ Don't modify section order in components (use config)

### Best Practices

- ✅ Keep components small and focused
- ✅ Use the registry pattern for extensibility
- ✅ Translate all user-facing text (use i18n)
- ✅ Create skeleton loaders for async content
- ✅ Use TypeScript strictly
- ✅ Keep styles scoped to components

---

## 📞 Support & Contribution

For issues, questions, or contributions:

1. Check existing documentation
2. Review commit messages for context
3. Test changes in both `pt` and `en` locales
4. Ensure ESLint passes: `npm run lint`

---

**Last Updated**: 2026-05-14  
**Maintainer**: ADOPTION Development Team

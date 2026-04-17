# Portfolio — React + TypeScript Refactor

A modern, component-based portfolio website built with **React 18**, **TypeScript**, and **Vite**.

## 🎯 Features

- ✨ **Component-Based Architecture** - Modular, reusable components
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern Styling** - CSS with variables and animations
- ♿ **Type-Safe** - Full TypeScript support
- ⚡ **Fast Development** - Vite for instant HMR
- 🔧 **Best Practices** - Clean code structure, proper separation of concerns

## 📁 Project Structure

```
src/
├── components/          # React components (Hero, Skills, Projects, etc.)
├── constants/          # Data and theme constants
├── hooks/              # Custom React hooks
├── styles/             # Global styles and utilities
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── App.tsx             # Main app component
└── main.tsx            # React entry point
```

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

### Build for Production

```bash
npm run build
```

Outputs optimized build to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Key Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code quality

## 🎨 Components Overview

### Layout Components
- **Navigation** - Fixed header with nav links
- **Hero** - Landing section with CTA
- **Marquee** - Scrolling text component
- **About** - Bio and experience section
- **Skills** - Skill cards with animated bars
- **Projects** - Portfolio project grid
- **Contact** - Contact CTA and links
- **Footer** - Page footer

### UI Components
- **Button** - Primary/secondary variants
- **SectionLabel** - Labeled section headers
- **Tag** - Skill/project tags
- **Cursor** - Custom mouse cursor

## 🎯 Best Practices Applied

✅ **Separation of Concerns** - Components, styles, types, constants separated  
✅ **Type Safety** - Full TypeScript coverage with interfaces  
✅ **DRY Principle** - Reusable components and utilities  
✅ **Constants Management** - Centralized content and theme data  
✅ **Custom Hooks** - `useCursorTracker`, `useIntersectionObserver`  
✅ **Responsive Design** - Mobile-first CSS with breakpoints  
✅ **Accessibility** - Semantic HTML, proper link handling  
✅ **Performance** - Code splitting, lazy animations  
✅ **Naming Conventions** - Clear, descriptive names  
✅ **Documentation** - JSDoc comments on components  

## 🔄 Customization

### Update Content
Edit `src/constants/content.ts` to change:
- Portfolio text and descriptions
- Skills and experience
- Projects and contact info
- Marquee items

### Update Theme
Edit `src/constants/theme.ts` to modify:
- Colors and color scheme
- Font families
- Spacing scale
- Breakpoints

### Component Styling
Each component has its own `.css` file for easy maintenance and modification.

## 📝 License

Feel free to use this as a template for your own portfolio!

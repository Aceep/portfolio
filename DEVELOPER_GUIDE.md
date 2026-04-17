# 🛠️ Developer Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Code Conventions

### Component Files
- **Naming**: PascalCase (e.g., `Button.tsx`)
- **Structure**:
  ```tsx
  import React from 'react';
  import './ComponentName.css';
  
  interface Props {
    // Props interface
  }
  
  /**
   * Component description
   */
  export const ComponentName: React.FC<Props> = ({ props }) => {
    return (/* JSX */);
  };
  ```

### CSS Files
- **Naming**: Match component name (e.g., `Button.css`)
- **Class structure**: Use component names as selectors
- **Responsive**: Mobile-first with breakpoint at `768px`

### TypeScript
- **Strict mode enabled** - No implicit `any` types
- **Types**: Define in `src/types/index.ts`
- **Props**: Always interface-based
- **Components**: Use `React.FC<Props>` type

## Making Changes

### 1. Updating Content
File: `src/constants/content.ts`

```typescript
export const SKILLS = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛',
    level: 88,
    label: 'Advanced',
  },
  // ... add more
];
```

### 2. Updating Theme/Colors
File: `src/constants/theme.ts`

```typescript
export const THEME = {
  colors: {
    yellow: '#F7CC3A',
    // ... update colors
  },
  fonts: {
    // ... fonts
  },
};
```

Also update CSS variables in `src/App.css`:
```css
:root {
  --yellow: #F7CC3A;
  /* ... */
}
```

### 3. Adding a New Component Section

1. **Create component file**:
   ```bash
   touch src/components/MySection.tsx
   touch src/components/MySection.css
   ```

2. **Implement component** with TypeScript:
   ```tsx
   import React from 'react';
   import './MySection.css';
   
   export const MySection: React.FC = () => {
     return <section className="my-section">...</section>;
   };
   ```

3. **Add to exports** in `src/components/index.ts`:
   ```typescript
   export { MySection } from './MySection';
   ```

4. **Use in App.tsx**:
   ```tsx
   import { MySection } from './components';
   
   function App() {
     return (
       <>
         {/* other sections */}
         <MySection />
       </>
     );
   }
   ```

### 4. Adding New Types

File: `src/types/index.ts`

```typescript
export interface MyNewType {
  id: string;
  name: string;
  // ... properties
}
```

### 5. Adding Utility Functions

File: `src/utils/index.ts`

```typescript
export const myHelper = (param: string): string => {
  return param.toUpperCase();
};
```

## Common Tasks

### Customize Navigation Links
Edit `src/constants/content.ts` or pass props to `<Navigation />` in `App.tsx`

### Change Skill Levels
Edit `SKILLS` array in `src/constants/content.ts`

### Update Project List
Edit `PROJECTS` array in `src/constants/content.ts`

### Add Social Links
Edit `CONTACT_LINKS` in `src/constants/content.ts`

### Modify Animations
- Global animations: `src/App.css`
- Component animations: Component's `.css` file
- Intersection/scroll behavior: `src/hooks/index.ts`

### Change Responsive Breakpoint
Edit `THEME.breakpoints.mobile` in `src/constants/theme.ts` and update CSS media queries

## Troubleshooting

### Hot Module Replacement (HMR) Not Working
- Restart dev server: `npm run dev`
- Clear cache: `rm -rf node_modules/.vite`

### TypeScript Errors
- Check `tsconfig.json` settings
- Ensure all types are properly defined
- Run: `npx tsc --noEmit` to check

### CSS Not Applying
- Ensure CSS file is imported in component
- Check for typos in class names
- CSS file should be named exactly like component
- Clear browser cache (Ctrl+Shift+Delete)

### Build Fails
- Check for TypeScript errors: `npx tsc`
- Ensure all imports are correct
- Check console for detailed errors

## Performance Tips

1. **Code Splitting** - Vite handles automatically
2. **Lazy Loading** - Components load on-demand
3. **CSS Optimization** - Only loaded styles for rendered components
4. **Animation Performance** - Use `transform` and `opacity` for smooth animations
5. **Image Optimization** - Use SVGs where possible (as we do with dino and badge)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020 JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (Variables)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connected to repo, auto-deploys on push
- **Netlify**: Drag & drop `dist/` folder
- **Traditional Host**: Upload `dist/` contents to server

### Environment Setup
Create `.env` file if needed:
```
VITE_API_URL=https://api.example.com
```

## Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vite Docs](https://vitejs.dev)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Happy coding! 🚀**

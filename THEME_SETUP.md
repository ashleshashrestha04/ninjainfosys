# Theme Management with Zustand

This project uses Zustand for global theme state management. The implementation provides a clean, type-safe way to manage theme switching between light (`g10`) and dark (`g90`) modes.

## Architecture

### Theme Store (`src/store/theme-store.ts`)

- Uses Zustand with persistence middleware
- Automatically saves theme preference to localStorage
- Handles DOM manipulation for theme application
- Supports two themes: `g10` (light) and `g90` (dark)

### Theme Provider (`src/components/theme-provider.tsx`)

- Handles theme initialization on app startup
- Ensures proper hydration in SSR environment
- Wraps the entire application in the layout

### Theme Toggle Component (`src/components/theme-toggle.tsx`)

- Reusable button component for theme switching
- Supports custom styling and CSS classes
- Includes proper accessibility attributes
- Uses internationalization for button text

### Custom Hook (`src/hooks/use-theme.ts`)

- Provides convenient access to theme state and actions
- Includes utility properties like `isDark` and `isLight`
- Simplifies theme management in components

## Usage

### Basic Theme Toggle

```tsx
import { ThemeToggle } from "../components/theme-toggle";

export function MyComponent() {
  return (
    <div>
      <ThemeToggle />
    </div>
  );
}
```

### Using the Custom Hook

```tsx
import { useTheme } from "../hooks/use-theme";

export function MyComponent() {
  const { theme, toggleTheme, isDark, isLight } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Direct Store Access

```tsx
import { useThemeStore } from "../store/theme-store";

export function MyComponent() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  return (
    <div>
      <button onClick={() => setTheme("g10")}>Light Mode</button>
      <button onClick={() => setTheme("g90")}>Dark Mode</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

## Features

- ✅ Persistent theme preference (localStorage)
- ✅ SSR-safe implementation
- ✅ TypeScript support with proper types
- ✅ Reusable components
- ✅ Custom hook for easy access
- ✅ Automatic DOM attribute management
- ✅ Accessibility support
- ✅ Internationalization ready

## File Structure

```
src/
├── store/
│   └── theme-store.ts       # Zustand store with persistence
├── components/
│   ├── theme-provider.tsx   # Theme initialization wrapper
│   └── theme-toggle.tsx     # Reusable toggle button
├── hooks/
│   └── use-theme.ts         # Custom hook for theme access
└── theme/
    └── index.ts             # Centralized exports
```

## Integration

The theme system is automatically integrated into the app through the layout file (`src/app/[locale]/layout.tsx`), where the `ThemeProvider` wraps the entire application to ensure proper theme initialization.

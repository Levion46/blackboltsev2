---
name: shadcn-ui
description: Expert assistance for shadcn/ui component library. Covers installation, components, forms, dark mode, theming, and customization across Next.js, Vite, Remix, and more.
---

# shadcn/ui Expert Skill

Complete guide for working with shadcn/ui — a collection of beautifully designed, accessible, and customizable components built with Radix UI and Tailwind CSS.

## Core Principles

1. **Not a component library** — shadcn/ui distributes source code, not npm packages. Components are copied into your project via CLI.
2. **Full ownership** — You own and control every component. Modify freely.
3. **Built on Radix UI** — Accessible primitives with WAI-ARIA compliance.
4. **Tailwind CSS styling** — All components use Tailwind CSS for styling.
5. **TypeScript first** — Full type safety out of the box.

---

## When to Activate

This skill activates when the user is:
- Installing or configuring shadcn/ui
- Adding shadcn/ui components to a project
- Implementing forms with React Hook Form + Zod
- Setting up dark mode or theming
- Customizing shadcn/ui component styles
- Building layouts with shadcn/ui primitives

---

## Installation

### Next.js (App Router)

```bash
npx shadcn@latest init
```

### Next.js (Pages Router)

```bash
npx shadcn@latest init
```

### Vite (React)

```bash
npx shadcn@latest init
```

### Remix

```bash
npx shadcn@latest init
```

### Astro

```bash
npx shadcn@latest init
```

### Manual Setup

1. Install dependencies:
```bash
npm install tailwindcss @tailwindcss/animate class-variance-authority clsx tailwind-merge lucide-react
```

2. Add the `cn` utility:
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

3. Configure path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Adding Components

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# Add all components
npx shadcn@latest add --all

# View available components
npx shadcn@latest add
```

Components are installed to `components/ui/` by default (configurable in `components.json`).

---

## Component Catalog

### Layout & Navigation
| Component | Usage |
|-----------|-------|
| `accordion` | Expandable content sections |
| `card` | Container with header, content, footer |
| `collapsible` | Toggle visibility of content |
| `navigation-menu` | Top-level site navigation |
| `menubar` | Menu bar with dropdowns |
| `breadcrumb` | Breadcrumb navigation |
| `pagination` | Page navigation controls |
| `sidebar` | App sidebar with navigation |
| `tabs` | Tabbed content panels |
| `resizable` | Resizable panel groups |
| `scroll-area` | Custom scrollbar container |
| `separator` | Visual divider |
| `sheet` | Slide-out panel |

### Form Controls
| Component | Usage |
|-----------|-------|
| `button` | Clickable actions |
| `input` | Text input field |
| `textarea` | Multi-line text input |
| `select` | Dropdown selection |
| `checkbox` | Toggle option |
| `radio-group` | Single selection from options |
| `switch` | On/off toggle |
| `slider` | Range value selector |
| `date-picker` | Date selection (uses calendar) |
| `calendar` | Date display and selection |
| `combobox` | Searchable select (uses command) |
| `form` | Form wrapper with validation |
| `label` | Input label |
| `input-otp` | One-time password input |
| `toggle` | Toggle button |
| `toggle-group` | Group of toggle buttons |

### Feedback & Overlay
| Component | Usage |
|-----------|-------|
| `alert` | Inline message |
| `alert-dialog` | Confirmation dialog |
| `dialog` | Modal window |
| `drawer` | Bottom sheet (mobile-friendly) |
| `hover-card` | Card shown on hover |
| `popover` | Floating content |
| `tooltip` | Hover hint text |
| `toast` / `sonner` | Notification messages |
| `progress` | Progress indicator |
| `skeleton` | Loading placeholder |

### Data Display
| Component | Usage |
|-----------|-------|
| `avatar` | User profile image |
| `badge` | Status label |
| `table` | Data table |
| `data-table` | Advanced table (sorting, filtering) |
| `carousel` | Image/content slider |
| `aspect-ratio` | Fixed aspect ratio container |
| `chart` | Data visualization (Recharts) |

### Utility
| Component | Usage |
|-----------|-------|
| `command` | Command palette (⌘K) |
| `context-menu` | Right-click menu |
| `dropdown-menu` | Dropdown actions |

---

## Forms Pattern

shadcn/ui forms use **React Hook Form** + **Zod** for validation:

```bash
npx shadcn@latest add form input button
npm install zod react-hook-form @hookform/resolvers
```

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## Dark Mode

### Next.js (next-themes)

```bash
npm install next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Theme toggle component:
```tsx
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## Theming & Customization

### CSS Variables

shadcn/ui uses CSS variables for theming. Edit `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* ... dark mode values */
  }
}
```

### Component Customization

Components use `cva` (class-variance-authority) for variants:

```tsx
// Customize button variants in components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        // Add your own custom variants here
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

## Configuration (components.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## Best Practices

1. **Always use the CLI** to add components — don't copy-paste from docs
2. **Customize via CSS variables** for global theme changes
3. **Extend component variants** via `cva` for reusable style patterns
4. **Compose components** — combine primitives for complex UIs
5. **Use `cn()` utility** to merge Tailwind classes (avoids conflicts)
6. **Keep components in `components/ui/`** and build app-specific wrappers above them
7. **Prefer `sonner`** over `toast` for notifications (more modern)
8. **Use `data-table`** pattern for tables needing sort/filter/pagination

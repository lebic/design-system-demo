# Design System Demo

A scalable, multi-framework design system built as an Nx monorepo. Provides consistent, accessible UI components across **React**, **Angular**, **Vue**, and **Stencil (Web Components)**.

---

## 📁 Monorepo Structure

```
/libs
  /react-design-system   → @design-system/react
  /ng-design-system      → @design-system/ng
  /vue-design-system     → @design-system/vue
  /wc-design-system      → @design-system/wc  (Stencil)
  /tokens                → @design-system/tokens

/apps
  /react-demo            → React demo app (Vite)
  /angular-demo          → Angular demo app
  /vue-demo              → Vue demo app (Vite)
  /stencil-demo          → Static HTML demo

/shared
  /styles                → Global CSS + Tailwind config
  /utils                 → Shared utilities (cn helper)
```

---

## 🎨 Components

All four frameworks implement:

| Component  | Description                                    |
|------------|------------------------------------------------|
| **Button** | 6 intents × 3 sizes, loading state, a11y      |
| **Checkbox** | Controlled/uncontrolled, indeterminate, a11y |
| **Input**  | Label, helper text, error/success variants     |
| **Select** | Options list, label, helper text               |

---

## 🎨 Styling & Theming

- **Tailwind CSS** — utility-first styling
- **Class Variance Authority (CVA)** — variant management (React)
- **CSS Variables** — single source of truth for all design tokens

### Dark Mode

```html
<!-- Light (default) -->
<html>

<!-- Dark -->
<html data-theme="dark">
```

---

## 📦 Tokens (`@design-system/tokens`)

Located in `/libs/tokens`, consumed by all frameworks:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --bg: #ffffff;
  --text: #0f172a;
  --radius-md: 0.375rem;
  /* … and more */
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f8fafc;
}
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Build all libraries
npm run build

# Serve React demo
npm run serve:react

# Serve Vue demo
npm run serve:vue

# Launch React Storybook
npm run storybook
```

---

## ♿ Accessibility

All components include:

- Proper `aria-*` attributes (`aria-invalid`, `aria-describedby`, `aria-busy`, `aria-disabled`)
- Keyboard navigation support
- Visible focus rings
- `role="alert"` for error messages
- Label association via `htmlFor` / `for`

---

## 🅰️ Angular

- **Standalone components** (no NgModule)
- **Signals** for reactive state
- `ControlValueAccessor` for form integration
- Compatible with Angular v19+

---

## 📖 Storybook

Storybook stories are provided for all React components:

```bash
npm run storybook
# → opens stories for Button, Checkbox, Input, Select
```

---

## 🛠️ Nx Tasks

```bash
# Build all projects
nx run-many --target=build

# Test all projects
nx run-many --target=test

# Serve all demos
nx run-many --target=serve

# React Storybook
nx storybook react-design-system
```

# ModernDev Blog 🚀

A premium, production-grade blog platform built with **Next.js 15+**, **Tailwind CSS 4**, and **TinyMCE**. This project demonstrates a modern approach to Server-Side Rendering (SSR), structured data management, and SEO optimization.

## ✨ Key Features

- **Server-Side Rendering (SSR)**: Dynamic content delivery with high performance.
- **Rich Text Editing**: Seamless content creation using TinyMCE integration.
- **Premium UI**: Crafted with a clean, modern aesthetic using Tailwind CSS 4 and Lucide-React.
- **Advanced SEO**: Dynamic metadata generation and OpenGraph support for every post.
- **Robust Architecture**: Layered design with service abstractions and schema validation.

---

## 🏗️ Technical Architecture

### Core Approach: SSR & App Router
The project leverages the **Next.js App Router** and **React Server Components (RSC)** to achieve optimal performance:
- **Server Components**: The main listing (`/`) and blog detail (`/blog/[id]`) pages are Server Components. They fetch data directly on the server, reducing client-side JavaScript and improving Time to Interactive (TTI).
- **Dynamic Rendering**: Pages use `force-dynamic` to ensure content is always fresh from our data store.
- **Streaming**: Large components can be streamed to the client using React Suspense (implemented in the Compose flow).

### Data Flow & Strategy
We follow a strict service-oriented architecture:
1. **Store** (`src/lib/blog-store.js`): In-memory/File-based persistence logic.
2. **Service Layer** (`src/services/blog.service.js`): Business logic, bridging the UI and the data store.
3. **Schemas** (`src/schemas/blog.schema.js`): Centralized Zod-like validation for data integrity before storage.

---

## ✍️ Editor Integration (TinyMCE)

Content management is handled via the `@tinymce/tinymce-react` library.
- **Configuration**: Located in `src/app/compose/page.js`, it includes advanced plugins (`advlist`, `autolink`, `lists`, `link`, `image`, etc.).
- **Theme**: Uses the 'oxide' skin with a custom font stack (Inter) to match the application's premium feel.
- **Content Handling**: Captured as HTML and safely rendered using `dangerouslySetInnerHTML` in the blog detail view, styled with `@tailwindcss/typography`.

---

## 📈 SEO Strategy

Search Engine Optimization is baked into the core:
- **Global Metadata**: Defined in `layout.js` for consistent site-wide branding.
- **Dynamic Metadata**: The `generateMetadata` function in `src/app/blog/[id]/page.js` programmatically creates titles, descriptions, and **OpenGraph** tags based on the specific blog post content.
- **Semantic HTML**: Uses proper `<article>`, `<header>`, and heading hierarchies (`h1`-`h3`) to ensure search engines understand the content structure.

---

## 📂 Project Walkthrough

```text
src/
├── app/                  # Next.js App Router (File-based routing)
│   ├── api/              # API Route Handlers (RESTful implementation)
│   ├── blog/[id]/        # SSR Blog Detail Page with dynamic SEO
│   ├── compose/          # Client-side Editor (TinyMCE integration)
│   ├── dashboard/        # Management interface for blog posts
│   └── page.js           # Main SSR Landing Page
├── components/           # Reusable UI components (Navbar, BlogCard)
├── lib/                  # Low-level utilities and data store
├── schemas/              # Data validation and formatting logic
└── services/             # High-level business logic (BlogService)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Editor**: [TinyMCE React](https://github.com/tinymce/tinymce-react)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)

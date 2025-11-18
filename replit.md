# Lunara Naturals Landing Page

## Overview

Lunara Naturals is a wellness-focused web application for a women's plant-based supplement brand. The application features a zen, nature-inspired aesthetic with a home page, product showcase, and ritual guide. Built as a full-stack TypeScript application with React frontend and Express backend, it emphasizes mobile-first responsive design with calming, natural tones inspired by brands like Aesop, Ritual, and Moon Juice.

**Current Pages**:
- **Home** (`/`): Landing page with hero section, about, product highlights, testimonials, email signup, and footer
- **Our Blends** (`/our-blends`): Product showcase featuring three core supplements (Glow Ritual, Calm Restore, Vital Greens) with benefits and CTA
- **Our Rituals** (`/our-rituals`): Daily wellness ritual guide with morning, midday, and evening practices, micro-habit tips, and integration advice
- **Ingredients Library** (`/ingredients`): Botanical glossary featuring 8 herbs and ingredients (Ashwagandha, Chamomile, Maca Root, Rose Hip, Spirulina, Wheatgrass, Lemon Balm, Holy Basil) with category tags, safety notes, and educational descriptions

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Implements shadcn/ui ("new-york" style variant) with Radix UI primitives. Components are fully accessible and customizable through Tailwind CSS utility classes. The component library provides a comprehensive set of pre-built UI elements including forms, dialogs, toasts, cards, and navigation components.

**Styling Strategy**: Tailwind CSS with a custom design system defined through CSS variables. The design emphasizes:
- Warm neutral color palette (beige, cream, sage green, muted blush)
- Soft serif fonts (Cormorant Garamond) for headlines
- Rounded sans-serif fonts (DM Sans) for body text
- Mobile-first responsive design with consistent spacing system (4, 6, 8, 12, 16, 20, 24 units)
- Subtle elevation and shadow effects for depth

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Form state is managed using React Hook Form with Zod validation schemas.

**Routing**: Wouter for lightweight client-side routing. Current routes:
- `/` - Home/landing page
- `/our-blends` - Product showcase page featuring the three core supplements
- `/our-rituals` - Daily wellness ritual guide showing how to incorporate supplements into morning, midday, and evening routines
- `/ingredients` - Ingredients library page with botanical glossary of 8 herbs and ingredients used in the blends
- 404 fallback for unmatched routes

**Navigation**: Shared Navigation component provides consistent header across all pages with:
- Logo linking to home
- Main navigation links (Home, Our Blends, Our Rituals, Ingredients, About, Contact)
- Shop Now CTA button
- Mobile-responsive menu with hamburger toggle
- Smooth scroll shadow effect on scroll
- Active link highlighting

**Design Philosophy**: Reference-based design inspired by wellness brands, focusing on zen aesthetics, natural imagery, and calming user experience. The design guidelines specify centered layouts, soft color harmonies without harsh contrasts, and generous white space.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript for type safety.

**Architecture Pattern**: RESTful API with a simple storage abstraction layer. The server implements a clean separation between:
- Route handlers (server/routes.ts)
- Business logic/storage interface (server/storage.ts)
- Server configuration (server/index.ts)

**Current Storage Implementation**: In-memory storage using Map data structures (MemStorage class). This provides a simple development interface that can be swapped for database persistence without changing route handlers.

**API Endpoints**:
- POST /api/subscribe: Email subscription endpoint with validation and duplicate checking

**Middleware Stack**:
- JSON body parsing with raw body preservation for webhook verification
- URL-encoded form data parsing
- Request/response logging for API routes
- Development-only Vite middleware integration

**Development Server**: Vite dev server runs in middleware mode, enabling hot module replacement during development while the production build serves static files through Express.

### Data Layer

**Schema Definition**: Database schemas defined using Drizzle ORM with PostgreSQL dialect. Schemas include:
- Users table: Basic user authentication structure (id, username, password)
- Email subscriptions table: Newsletter subscription tracking (id, email, subscribedAt)

**Validation**: Zod schemas derived from Drizzle table definitions ensure type-safe validation across the stack. Form validation uses these same schemas through @hookform/resolvers integration.

**Current State**: Application is configured for PostgreSQL via Drizzle but currently uses in-memory storage. The storage interface (IStorage) is designed to easily swap to database-backed implementation.

### External Dependencies

**Database**: 
- Configured for PostgreSQL through @neondatabase/serverless driver
- Drizzle ORM for type-safe database queries and migrations
- Current implementation uses in-memory storage pending database provisioning

**UI Component Libraries**:
- Radix UI: Comprehensive set of accessible, unstyled component primitives
- shadcn/ui: Pre-styled components built on Radix UI
- Lucide React: Icon library for UI elements
- React Icons: Additional icon set (used for social media icons)

**Form Management**:
- React Hook Form: Performant form state management
- Zod: Runtime type validation and schema definition
- @hookform/resolvers: Bridge between React Hook Form and Zod

**Styling & Design**:
- Tailwind CSS: Utility-first CSS framework
- class-variance-authority: Type-safe variant styling
- clsx & tailwind-merge: Conditional class name utilities

**Developer Experience**:
- Replit-specific plugins for development environment integration
- TypeScript for type safety across the entire stack
- ESBuild for production bundling

**Image Assets**: Application uses generated images stored in attached_assets directory for hero images, product illustrations, and testimonial portraits. These follow the brand's natural, calming aesthetic.
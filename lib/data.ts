export type ProjectType = "fullstack" | "backend" | "frontend"

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  problem: string
  solution: string
  architecture: string
  stack: string[]
  solutionHighlights?: string[]
  validationCommand?: string
  validationChecks?: string[]
  type: ProjectType
  category: string
  status?: "under-construction"
  image?: string
  github?: string
  demo?: string
}

export const projectTypeLabel: Record<ProjectType, string> = {
  fullstack: "Fullstack",
  backend: "Backend",
  frontend: "Frontend",
}

export const projects: Project[] = [
  {
    slug: "food-ordering-app",
    title: "Food Ordering App",
    description: "Full-stack food ordering platform where customers search restaurants by city and cuisine, place orders, and track order status; restaurant owners manage menus and incoming orders.",
    longDescription: "A production-focused food ordering application with protected routes, media upload for restaurant images, Stripe Checkout integration, and reliable order lifecycle management. Customers can search restaurants, add items to cart, checkout via Stripe, and track order status. Restaurant owners can create and manage restaurants and menus, and view incoming orders.",
    problem: "Keeping order status accurate when payment confirmation is asynchronous (Stripe webhooks) is challenging. The platform also requires secure authentication, authenticated API routes, reliable media uploads, and robust order creation logic.",
    solution: "Built a full-stack solution: Auth0 for authentication and protected routes, an Express API split by domains (user, restaurant, order), MongoDB/Mongoose persistence, Cloudinary for image upload, Stripe Checkout + webhook handling to transition orders from 'pending_payment' to 'paid', and a React frontend using React Query for server state.",
    architecture: "Two-app architecture: a React + Vite frontend handling auth flows, search, checkout triggers and order tracking; and a Node.js + Express backend validating tokens, enforcing business rules, persisting data in MongoDB, and processing Stripe webhooks. Backend is organized into routes, controllers, middleware (JWT validation, payload validation), and Mongoose models. Order flow: create checkout session -> create order with status 'pending_payment' -> Stripe Checkout -> webhook confirms payment -> backend updates order to 'paid'.",
    solutionHighlights: [
      "Stripe webhook-driven order state",
      "Protected owner and customer flows",
      "Cloudinary-based media uploads",
      "React Query for reliable server state",
    ],
    validationCommand: "pnpm test",
    validationChecks: [
      "Order status sync after payment confirmation",
      "Protected restaurant management routes",
      "Checkout and media upload flow covered",
    ],
    stack: ["React", "Vite", "TypeScript", "Node.js", "Express", "MongoDB", "Mongoose", "Auth0", "Stripe", "Cloudinary", "Multer", "React Query"],
    type: "fullstack",
    category: "Full Stack",
    image: "/Foodly.png",
    github: "https://github.com/MarcosHHOshiro/Food-ordering-app",
    demo: "https://food-ordering-app-frontend-gogz.onrender.com/",
  },
  {
    slug: "gym-pass-style-app-node",
    title: "Gym Pass",
    description:
      "RESTful API for managing gym check-ins, inspired by the GymPass business model. Built with Node.js, TypeScript, Fastify and Prisma ORM.",
    longDescription:
      "Backend API focused on gym check-ins, with user registration/authentication, gym search by name or proximity, and check-in flows with strict business rules. It includes RBAC for admin actions, JWT authentication with refresh token via cookie, Swagger/OpenAPI documentation, and unit/e2e test coverage.",
    problem:
      "Managing gym check-ins requires enforcing rules like maximum distance, one check-in per day, limited validation window, and role-based permissions, while keeping the API secure and maintainable.",
    solution:
      "Implemented a layered architecture with Fastify controllers, use cases, and repository abstractions using Prisma + PostgreSQL. Added JWT/refresh-token authentication, RBAC middleware, geolocation-based validation, and automated testing with Vitest.",
    architecture:
      "Fastify exposes REST routes and handles request/response validation with Zod. Controllers delegate to use-case services that encapsulate business rules. Use cases access data through repository interfaces, with Prisma implementations for PostgreSQL and in-memory implementations for tests. Swagger/OpenAPI provides interactive API documentation.",
    solutionHighlights: [
      "RBAC for admin-only operations",
      "JWT with refresh token via cookies",
      "Swagger and OpenAPI docs",
      "Unit and E2E coverage with Vitest",
    ],
    validationCommand: "npm test",
    validationChecks: [
      "Check-in only within 100m distance",
      "Only one daily check-in per gym",
      "Refresh token rotation and validation",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "Prisma ORM",
      "PostgreSQL",
      "JWT",
      "Zod",
      "Vitest",
      "Docker"
    ],
    type: "backend",
    category: "Backend",
    image: "/gym.png",
    github: "https://github.com/MarcosHHOshiro/Gym-pass-style-app-node",
    demo: "https://gym.marcos-hh-oshiro.com/docs",
  },
  {
    slug: "biolinks",
    title: "BioLinks",
    description: "Link-in-bio platform where users create a public profile page with customizable links.",
    longDescription: "BioLinks is a web application that lets users register, configure a unique handler, upload a profile photo, manage social/content links, reorder them, and publish everything on a public page. It includes authentication, profile management, link CRUD, ordering controls, and public profile rendering by handler.",
    problem: "Users needed a simple way to centralize multiple links in one public URL and manage them easily without editing code.",
    solution: "Built a full Laravel application with auth, profile editing, handler validation, link creation/editing/deletion, drag-like ordering controls (up/down), and a public page at /{handler} to share all links.",
    architecture: "Laravel monolith (MVC): Blade views for UI, controllers/requests/rules for business logic and validation, Eloquent models for persistence, SQLite for local storage, and Vite + TailwindCSS for frontend assets.",
    solutionHighlights: [
      "Unique public handler validation",
      "Profile photo upload and customization",
      "Link CRUD with ordering controls",
      "Public profile page by handler",
    ],
    validationCommand: "php artisan test",
    validationChecks: [
      "Handler uniqueness rules enforced",
      "Authenticated profile management flow",
      "Public page renders ordered links",
    ],
    stack: ["Laravel 12", "PHP 8.2", "SQLite", "Blade", "Tailwind CSS", "DaisyUI", "Vite"],
    type: "fullstack",
    category: "Full Stack",
    image: "/biolinks.png",
    github: "https://github.com/MarcosHHOshiro/Biolinks",
    demo: "https://biolinks.marcos-hh-oshiro.com/login",
  },
  {
    slug: "auth-service",
    title: "Authentication Microservice",
    description: "Secure authentication service with OAuth2, MFA support, and session management for distributed systems.",
    longDescription: "A standalone authentication microservice providing secure user authentication, authorization, and session management. Supports multiple authentication strategies including OAuth2, SAML, and custom username/password flows.",
    problem: "Each service in the system was implementing its own authentication, leading to inconsistent security practices and duplicated code across the organization.",
    solution: "Created a centralized authentication service with support for multiple identity providers, multi-factor authentication, and a standardized JWT-based session management system.",
    architecture: "Built with Python/FastAPI for its async capabilities. Uses PostgreSQL for user data, Redis for session storage, and implements TOTP for 2FA. Exposes both REST and gRPC interfaces for flexibility.",
    solutionHighlights: [
      "Centralized JWT session lifecycle",
      "Multi-provider authentication strategy",
      "MFA and TOTP support roadmap",
      "REST and gRPC service interfaces",
    ],
    validationCommand: "pytest",
    validationChecks: [
      "Core auth flows still in implementation",
      "MFA and provider adapters being finalized",
      "Service contracts under active iteration",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "gRPC", "Docker"],
    type: "backend",
    category: "Security",
    image: "/loading.png",
    status: "under-construction",
  }
]

export const personalInfo = {
  name: "Marcos H. H. Oshiro",
  title: "Fullstack Developer",
  subtitle: "Software Engineer",
  email: "marcos.2h.oshiro@gmail.com",
  github: "https://github.com/MarcosHHOshiro",
  linkedin: "https://www.linkedin.com/in/marcos2hoshiro/",
  bio: "I'm a Fullstack Developer focused on building scalable and reliable web systems from end to end. I have experience designing RESTful APIs, applying clean architectures, working with databases like PostgreSQL, and building modern interfaces with React and Next.js. My main stack includes Node.js, TypeScript, PHP, and Docker. Recently, I learned NestJS and started applying it to build more modular and maintainable backend services. I'm passionate about system design, performance optimization, and building software that solves real business problems.",
  education: "Bachelor in Software Engineering",
  location: "Dourados, Mato Grosso do Sul, Brazil",
}

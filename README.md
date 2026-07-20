# Borcella — E-Commerce Platform

A full-stack e-commerce platform with a **Next.js 14** storefront and admin dashboard, powered by **Auth.js**, **MongoDB**, **Stripe**, and **Tailwind CSS**.

---

## Architecture

The project is split into two independent Next.js applications:

| Application | Directory | Port | Purpose |
|---|---|---|---|
| **Storefront** | `client/` | `:3001` | Customer-facing shopping experience |
| **Admin Dashboard** | `admin/` | `:3000` | Store management (products, orders, customers) |

Both apps share the same MongoDB instance but use separate databases (`Borcelle_Store` and `Borcelle_Admin`).

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Authentication** | Auth.js v5 (NextAuth) — JWT strategy, credentials provider |
| **Database** | MongoDB via Mongoose 8 |
| **Payments** | Stripe (Checkout Sessions, Webhooks) |
| **Media** | Cloudinary (image upload & hosting) |
| **UI** | Tailwind CSS, shadcn/ui (admin), Lucide icons |
| **Forms** | React Hook Form + Zod (admin) |
| **State** | Zustand (cart persistence) |
| **Charts** | Recharts (sales analytics) |

---

## Features

### Storefront (`client/`)

- Product browsing with search & category filtering
- Product detail pages with image gallery, color/size selection
- Shopping cart persisted to localStorage via Zustand
- Wishlist management (add/remove liked products)
- User authentication (sign-up, sign-in, sign-out)
- Order history
- Stripe checkout integration
- Responsive design

### Admin Dashboard (`admin/`)

- Dashboard with revenue, order, and customer analytics
- Product CRUD with image upload, multi-select collections
- Collection management
- Order tracking & detail view
- Customer directory
- Sales chart (monthly revenue breakdown)
- Role-based API protection via Auth.js

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Stripe account (for payments)
- Cloudinary account (for image uploads)

### Environment Setup

Each app requires its own `.env` file.

#### `admin/.env`

```env
MONGODB_URL="mongodb+srv://<user>:<password>@<cluster>/<db>"
AUTH_SECRET="<generated-secret>"
AUTH_URL="http://localhost:3000"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<cloud-name>"

NEXT_PUBLIC_STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

ECOMMERCE_STORE_URL="http://localhost:3001"
```

#### `client/.env`

```env
MONGODB_URL="mongodb+srv://<user>:<password>@<cluster>/<db>"
AUTH_SECRET="<generated-secret>"
AUTH_URL="http://localhost:3001"

NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

> Generate `AUTH_SECRET` by running `npx auth secret` inside each app directory.

### Installation

```bash
# Install storefront dependencies
cd client
npm install

# Install admin dependencies
cd ../admin
npm install
```

### Development

```bash
# Start the admin dashboard (port 3000)
cd admin
npm run dev

# Start the storefront (port 3001) — in a separate terminal
cd client
npm run dev
```

### Production Build

```bash
# Each app builds independently
cd client && npm run build
cd admin && npm run build
```

---

## Authentication Flow

Auth.js v5 with **JWT session strategy** and **credentials provider** handles all authentication:

1. **Sign Up**: User submits email + password → hashed with bcrypt → stored in MongoDB → auto sign-in
2. **Sign In**: Credentials verified against MongoDB → JWT issued → stored in secure cookie
3. **Session Check**: Middleware reads JWT via `getToken()` from `next-auth/jwt` to protect routes
4. **Server Components**: `auth()` from `@/lib/auth` returns the session for server-side checks
5. **Client Components**: `useSession()` from `next-auth/react` provides user state

> Existing data from Clerk migration is preserved — Auth.js user IDs are stored in the existing `clerkId` field for backward compatibility.

---

## Project Structure

```
├── client/                     # Storefront (Next.js 14)
│   ├── app/
│   │   ├── (auth)/             # Sign-in / Sign-up pages
│   │   ├── (root)/             # Main layout & pages
│   │   └── api/                # API routes (users, auth)
│   ├── components/             # Reusable React components
│   ├── lib/
│   │   ├── auth.ts             # Auth.js configuration
│   │   ├── models/User.ts      # Mongoose user model
│   │   ├── mongoDB.ts          # Database connection
│   │   └── actions/actions.ts  # Data fetching helpers
│   └── middleware.ts           # Auth middleware
│
├── admin/                      # Admin Dashboard (Next.js 14)
│   ├── app/
│   │   ├── (auth)/             # Sign-in / Sign-up pages
│   │   ├── (dashboard)/        # Dashboard, products, orders, etc.
│   │   └── api/                # API routes (CRUD, checkout, webhooks)
│   ├── components/
│   │   ├── layout/             # Sidebar, TopBar
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── products/           # Product form & columns
│   │   ├── collections/        # Collection form & columns
│   │   ├── orders/             # Order columns
│   │   └── custom ui/          # DataTable, ImageUpload, etc.
│   ├── lib/
│   │   ├── auth.ts             # Auth.js configuration
│   │   ├── models/             # Product, Collection, Order, Customer
│   │   ├── mongoDB.ts          # Database connection
│   │   └── stripe.ts           # Stripe client
│   └── middleware.ts           # Auth middleware
│
└── README.md
```

---

## API Endpoints

### Admin API (`localhost:3000/api`)

| Endpoint | Methods | Description |
|---|---|---|
| `/auth/[...nextauth]` | GET, POST | Auth.js authentication handlers |
| `/auth/signup` | POST | User registration |
| `/products` | GET, POST | List / create products |
| `/products/[id]` | GET, POST, DELETE | Single product operations |
| `/products/[id]/related` | GET | Related products |
| `/collections` | GET, POST | List / create collections |
| `/collections/[id]` | GET, POST, DELETE | Single collection operations |
| `/orders` | GET | List orders |
| `/orders/[id]` | GET | Order details |
| `/orders/customers/[id]` | GET | Orders by customer |
| `/search/[query]` | GET | Product search |
| `/checkout` | POST | Create Stripe checkout session |
| `/webhooks` | POST | Stripe webhook handler |

### Storefront API (`localhost:3001/api`)

| Endpoint | Methods | Description |
|---|---|---|
| `/auth/[...nextauth]` | GET, POST | Auth.js authentication handlers |
| `/auth/signup` | POST | User registration |
| `/users` | GET | Current user data |
| `/users/wishlist` | POST | Toggle wishlist item |

---

## Database Models

### Storefront (`Borcelle_Store`)

- **User** — `clerkId`, `email`, `password` (hashed), `name`, `wishlist[]`

### Admin (`Borcelle_Admin`)

- **Product** — `title`, `description`, `media[]`, `category`, `collections[]`, `tags[]`, `sizes[]`, `colors[]`, `price`, `expense`
- **Collection** — `title`, `description`, `image`, `products[]`
- **Order** — `customerClerkId`, `products[]`, `shippingAddress`, `shippingRate`, `totalAmount`
- **Customer** — `clerkId`, `name`, `email`, `password` (hashed), `orders[]`

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## Deployment

Both apps deploy as standard Next.js applications:

1. Set the required environment variables on your hosting platform
2. Build with `npm run build`
3. Start with `npm run start`

Recommended platforms: Vercel, Railway, or any Node.js hosting.

For the Stripe webhook, deploy the admin app first, then configure the webhook endpoint in your Stripe dashboard pointing to `https://<your-domain>/api/webhooks`.

<!--

mysql -h caboose.proxy.rlwy.net -u root -p --port 23650 --protocol=TCP railway

# Sync schema with DB
npx prisma db push

# (If using migrations) baseline the existing DB schema
npx prisma migrate resolve --applied init  # replace init with your migration folder name

# Generate Prisma client
npx prisma generate

# Build & deploy (can be run locally to test)
npm run vercel-build

# Vercel
npm i -g vercel
vercel login
vercel
vercel --prod

-->

# Olory-mini

Olory-mini is a lightweight e-commerce backend API built with **Node.js**, **Express**, **TypeScript**, and **Prisma**. It supports user authentication, product and category management, customer orders, and more, powered by a MySQL database.

---

## Table of Contents

- [Olory-mini](#olory-mini)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
      - [Development Mode (with auto reload):](#development-mode-with-auto-reload)
      - [Production Mode:](#production-mode)
  - [Scripts](#scripts)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Users](#users)
    - [Customers](#customers)
    - [Cart](#cart)
    - [Categories](#categories)
    - [Products](#products)
    - [Orders](#orders)
  - [Database Schema](#database-schema)
  - [Authentication \& Authorization](#authentication--authorization)
  - [Middleware](#middleware)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

---

## Features

- User authentication with JWT and session management
- Role-based access control (user, customer, admin)
- CRUD operations for Users, Customers, Categories, Products, Orders, and Cart
- File upload support for product thumbnails
- Input validation using Zod schemas
- Error handling and Not Found middleware
- Prisma ORM with MySQL database
- Development and production-ready build and deployment support
- ESLint and Prettier for code quality and formatting
- Husky for Git hooks automation

---

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- Zod (validation)
- bcrypt (password hashing)
- JSON Web Tokens (JWT)
- Multer (file uploads)
- Nodemailer (email)
- ESLint & Prettier (code linting & formatting)
- Husky (Git hooks)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL database
- npm or yarn

### Installation

```bash
git clone https://github.com/foysalahmedmin/olory-mini-server
cd olory-mini
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="mysql://user:password@host:port/database"
SESSION_SECRET="your_session_secret"
PORT=5000
```

- `DATABASE_URL`: Your MySQL connection string
- `SESSION_SECRET`: Secret key for session encryption
- `PORT`: Port to run the server (default: 5000)

---

### Database Setup

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev --name 20250515053237_dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

### Running the Application

#### Development Mode (with auto reload):

```bash
npm run start:dev
```

#### Production Mode:

```bash
npm run build
npm run start
```

---

## Scripts

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `start`                 | Run the compiled server (`dist/index.js`) |
| `start:dev`             | Run server in dev mode with auto-reload   |
| `build`                 | Compile TypeScript to JavaScript          |
| `lint`                  | Run ESLint on source files                |
| `lint:fix`              | Run ESLint and fix issues automatically   |
| `prettier`              | Format source files with Prettier         |
| `prettier:fix`          | Fix formatting issues with Prettier       |
| `prepare`               | Install Husky Git hooks                   |
| `test`                  | Placeholder test script                   |
| `prisma:generate`       | Generate Prisma client                    |
| `prisma:migrate`        | Run Prisma migrations in dev              |
| `prisma:migrate:deploy` | Deploy migrations for production          |
| `prisma:validate`       | Validate Prisma schema                    |
| `prisma:studio`         | Open Prisma Studio GUI                    |
| `prisma:reset`          | Reset database and run migrations         |

---

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication

- `POST /auth/signin` — User sign-in
- `POST /auth/refresh-token` — Refresh JWT token
- `PATCH /auth/change-password` — Change password (authenticated users)
- `POST /auth/forget-password` — Request password reset
- `PATCH /auth/reset-password` — Reset password with token

### Users

- `GET /users` — Get list of users (admin, user, customer)
- `GET /users/:id` — Get user by ID (admin, user, customer)
- `PATCH /users/:id` — Update user (admin only)
- `DELETE /users/:id` — Delete user (admin only)
- `GET /users/self` — Get current authenticated user
- `PATCH /users/self` — Update current authenticated user

### Customers

- `GET /customer` — Get all customers (admin only)
- `GET /customer/:id` — Get customer by ID (admin, customer)
- `POST /customer` — Create customer (authenticated users)
- `PATCH /customer/:id` — Update customer (admin, customer)
- `DELETE /customer/:id` — Delete customer (admin only)

### Cart

- `GET /cart` — Get current cart
- `POST /cart/add` — Add item to cart
- `DELETE /cart/remove` — Remove item from cart

### Categories

- `GET /category` — List all categories
- `GET /category/with-products` — List categories with products
- `GET /category/:id` — Get category by ID
- `GET /category/:id/with-products` — Get category with products
- `POST /category` — Create category (admin only)
- `PATCH /category/:id` — Update category (admin only)
- `DELETE /category/:id` — Delete category (admin only)

### Products

- `GET /product` — List all products
- `GET /product/:id` — Get product by ID
- `POST /product` — Create product with thumbnail upload (admin only)
- `PATCH /product/:id` — Update product (admin only)
- `DELETE /product/:id` — Delete product (admin only)

### Orders

- `GET /order` — List all orders (admin only)
- `GET /order/:id` — Get order by ID (admin, customer)
- `POST /order/checkout` — Checkout order (customer only)
- `DELETE /order/:id` — Delete order (admin only)

---

## Database Schema

The database schema is defined via Prisma and consists of the following models:

- **User**: Stores user info, roles, status, password, etc.
- **Customer**: Linked to User, stores customer-specific data and orders.
- **Category**: Product categories with unique names.
- **Product**: Product info including name, price, rating, thumbnail, description, and category.
- **Order**: Customer orders with total price and order items.
- **OrderItem**: Items in an order linking products and quantities.

Enumerations:

- `Role`: user, customer, admin
- `Status`: inProgress, blocked

---

## Authentication & Authorization

- Authentication is managed using **JWT** tokens and sessions (via `express-session`).
- Passwords are securely hashed with **bcrypt**.
- Role-based access control restricts access to routes based on user roles (`user`, `customer`, `admin`).
- Middleware protects routes and verifies permissions accordingly.

---

## Middleware

- **Auth Middleware**: Protects routes based on roles.
- **Validation Middleware**: Validates incoming request bodies using Zod schemas.
- **Error Middleware**: Handles API errors and sends appropriate responses.
- **Not Found Middleware**: Handles unknown routes with 404 responses.
- **File Middleware**: Handles file uploads for product thumbnails.
- **CORS** and **Cookie Parser** middleware for HTTP and cookies handling.

---

## Project Structure

```
.
├── src
│   ├── app
│   │   ├── config.ts             # Configuration and constants
│   │   ├── middlewares           # Auth, validation, error, file middlewares
│   │   ├── routes.ts             # Main router with module routes
│   │   └── index.ts              # Express app setup
│   ├── modules                   # Feature modules (auth, user, product, order, etc.)
│   │   ├── auth
│   │   ├── cart
│   │   ├── category
│   │   ├── customer
│   │   ├── order
│   │   ├── product
│   │   └── user
│   └── index.ts                 # Entry point
├── prisma
│   ├── schema.prisma            # Prisma schema & database models
│   └── migrations               # Migration files
├── .env                         # Environment variables (not committed)
├── package.json
├── tsconfig.json
├── README.md
.
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. Make sure to follow coding standards and write tests where applicable.

---

## License

This project is licensed under the ISC License.

---

## Contact

For questions or support, please open an issue or contact the repository maintainer.

---

**Thank you for using Olory-mini!**

```

```

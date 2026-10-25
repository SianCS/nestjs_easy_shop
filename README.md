# Easy Shop — Auth & User Service

A NestJS backend for an e-commerce app, covering the account side: email/password sign-up with email verification, Google OAuth, JWT-protected routes and profile image uploads to Cloudinary.

Interactive API docs are served at **`/docs`** (Swagger UI) when the server is running.

## Features

- **Credentials auth** — register, verify email via a one-time link, resend verification, log in with JWT
- **Google OAuth 2.0** — sign in with Google; links to an existing account with the same email
- **Secure by default** — a global JWT guard protects every route; public ones opt out with `@Public()`
- **Profile images** — multipart upload validated (JPEG/PNG/WebP, max 2 MB) before it reaches Cloudinary; the previous image is deleted
- **Consistent errors** — custom exceptions return `{ success, statusCode, message, errorCode, details }`
- **Validated config** — environment variables are checked with Zod on startup, so a missing secret fails fast

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | – | Create an account and send a verification email |
| POST | `/auth/confirm` | – | Verify email with the token from the link |
| POST | `/auth/resend` | – | Resend the verification email |
| POST | `/auth/login` | – | Get an access token (email must be verified) |
| GET | `/auth/google` | – | Start Google sign-in |
| GET | `/auth/google/callback` | – | Google redirect target |
| PATCH | `/users` | Bearer | Upload profile image (`profileImage` field) |

## Tech Stack

NestJS 11 · TypeScript · Prisma 7 (PostgreSQL, `@prisma/adapter-pg`) · Passport (JWT, Google OAuth 2.0) · class-validator · Zod · Cloudinary · Nodemailer + EJS templates · Swagger · Jest + Supertest

## Project Structure

```
src/
├── auth/          # controllers, strategies (jwt, google), guard, DTOs, exceptions
├── users/         # profile upload, user & provider-account services
├── config/        # Zod env schemas + typed config services
├── database/      # PrismaService
├── shared/        # email, security (JWT, bcrypt), upload (Cloudinary)
└── common/        # base exception, global filter & validation pipe
```

## Getting Started

Requires Node.js 20+, [pnpm](https://pnpm.io) and PostgreSQL.

```bash
pnpm install              # also runs `prisma generate`
cp .env.example .env      # fill in the values
pnpm prisma db push       # create tables
pnpm start:dev            # http://localhost:3000/docs
```

> Use a database dedicated to this project — `prisma db push` drops tables that aren't in this schema.

## Tests

```bash
pnpm test                 # unit tests (e.g. which routes are public)
pnpm test:e2e             # HTTP tests against the running app (needs .env)
```

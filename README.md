# ConnectTree

A modern link-in-bio platform inspired by Linktree, built with Next.js, Clerk, and Prisma.

## Features

### Authentication & User Management
- Secure authentication using Clerk
- Custom onboarding flow
- Username validation and uniqueness check
- User profile management

### Dashboard
- Create, edit, and delete links
- Customize profile with:
  - Profile image (with base64 support)
  - Title
  - Bio
- Link management features:
  - Custom titles
  - URLs
  - Thumbnails
  - Click tracking

### Public Profile
- Responsive design
- Mobile-friendly layout
- Click tracking for analytics

## Technical Decisions & Trade-offs

### Authentication
- Chose Clerk over custom auth to:
  - Reduce development time
  - Ensure security best practices
  - Leverage pre-built UI components
  - Simplify user management

### Database
- Using Prisma with PostgreSQL for:
  - Type safety
  - Easy schema management
  - Efficient queries
  - Strong relationships between models

### Image Storage
- Currently using base64 for images
  - Trade-off: Increased database size
  - Future improvement: Implement cloud storage (S3/Cloudinary)

### UI/UX
- Shadcn/ui for consistent design
- Tailwind for rapid styling

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd connect-tree
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```env
# Database
DATABASE_URL="your-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Database Schema
```prisma
model User {
  id            String        @id @map("clerk_id")
  email         String        @unique
  imageUrl      String?
  connectTrees  ConnectTree[]
}

model ConnectTree {
  id        String   @id @default(cuid())
  username  String   @unique
  userId    String
  title     String?
  bio       String?
  imageUrl  String?
  user      User     @relation(fields: [userId], references: [id])
  links     Link[]
}

model Link {
  id            String      @id @default(cuid())
  title         String
  url           String
  thumbnail     String?
  clicks        Int         @default(0)
  connectTree   ConnectTree @relation(fields: [connectTreeId], references: [id])
  connectTreeId String
}
```

### Project Structure
src/

├── actions/ # Server actions

├── app/ # Next.js app router

├── components/ # React components

├── context/ # React context

├── generated/ # Prisma generated types

└── lib/ # Utility functions
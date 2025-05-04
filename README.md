# Roadmap to Building the App
- first understand the challenge and take a look at the compared app (Linktree)
- Used Grok to define a good name for the app
- used GPT to create the copy for the landing page
- use clerk to authentication and routes control
- use Supabase and Prisma to handle database
- Tailwind and shadcn for styles

# Landingpage

# Onboarding
- For new users Linktree made a validation in the email input to identify if the user already exist,
i will change this approach and create a custom onboarding flow using clerk, with that way I don't need to made queries to my BE
to know if the user exist or not
- during onboarding, users will define the username, we can validate it when click in continue button and show a message error if the
username is used for other customer.
- define a template to use

# Dashboard
- Add edit and delete links
- changed the background theme
- Each link when edited need to show options to add: 
    - icons, Url
* Nice to have: a preview in mobile


# public page
- need to show the custom page 


# decisions
- Defined the database schema and relationships



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

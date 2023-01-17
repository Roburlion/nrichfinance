# Goals

What do I want to do today?

- focus on bugs
  - I can spend all day trying to learn and fix this bug.  What I really need to do I drop this in stack exchange and wait for the help.
- focus on building
  - This will give me results that I can share with Chinmay and actually build this thing.

## Work completed

- Added logo and favicon
- refactored Navbar.js
- Added about page

## Next steps

- Separate Home and Account
- If not logged in, Account should request the user login or sign up





# Bugs



> The site initializes to “Fetching Workouts”
>
> localhost:3000 says
>
> invalid input syntax for type uuid: “undefined”
>
>  
>
> Then the main page loads and I get the same error.  I think this is an issue with the authentication.  I get the same message whether I’m logged in or not when I refresh the page.



## Getting Started

Taken from the [Build a full stack nextjs supabase tutorial](https://blog.logrocket.com/build-full-stack-app-next-js-supabase/)



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

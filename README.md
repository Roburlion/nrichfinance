Lsn6i2QXcWurK3z3



Street: H3 Laxminagar

City: Nagpur

State: Maharashtra 

Pin code: 440022

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
- Separate Home and Account
- If not logged in, Account should request the user login or sign up

## Next steps

Now, I want to start changing the backend on this thing.  I need to take a look at how they use the form to write stuff the db.

> Do I want to create a new table or change the one I’ve got?
>
> - If I change the one I’ve got I could mess things up.
> - If I create a new one it will take me longer
> - Let me just take a look at what I’ve got and see how it works…





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

import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  console.log(
    'MyApp() supabaseClient\n', supabaseClient,
    '\nMyApp() pageProps\n', pageProps,
    '\nMyApp() Component\n', Component,
  )

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <title>N Rich Finance</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png" />
        <link rel="manifest" href="./site.webmanifest" />
        <link rel="mask-icon" href="../public/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>    
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionContextProvider>
  )
}

// export default function MyApp({ Component, pageProps }) {
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  // return (
  //   <div>
  //     <Head>
  //       <title>N Rich Finance</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/favicon.ico" />
  //       <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png" />
  //       <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png" />
  //       <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png" />
  //       <link rel="manifest" href="./site.webmanifest" />
  //       <link rel="mask-icon" href="../public/safari-pinned-tab.svg" color="#5bbad5" />
  //       <meta name="msapplication-TileColor" content="#da532c" />
  //       <meta name="theme-color" content="#ffffff" />
  //     </Head>
  //     <Navbar session={session} />
  //     <Component {...pageProps} session={session} />
  //     <Footer />
  //   </div>
  // );
// }

import { useRouter } from "next/router";
// import { useEffect, useState } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from '../styles/Login.module.css'

export default function Login () {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();

  // console.log(
  //   'supabaseClient\n', supabaseClient,
  //   '\nuser\n', user,
  // )

  if (!user) {
    return (
      // <Auth supabaseClient={supabase} />
      <div className={ styles.container }>
        <div className={ styles.authWrapper }>
            <Auth
              redirectTo="http://localhost:3000/"
              appearance={{ theme: ThemeSupa }}
              theme='dark'
              supabaseClient={supabaseClient}
              providers={['google', 'github']}
              socialLayout="vertical"
            />
        </div>
      </div>
    )
  }
  // return <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
  router.push("/profile");
}

/****************************************************************************** */

// import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useEffect, useState } from 'react'

// import styles from '../styles/Login.module.css'

// const LoginPage = () => {
//   const supabaseClient = useSupabaseClient()
//   const user = useUser()
//   const [data, setData] = useState()

//   console.log(
//     'supabaseClient\n', supabaseClient,
//     '\nuser\n', user,
//     '\ndata\n', data,
//   )

//   useEffect(() => {
//     async function loadData() {
//       const { data } = await supabaseClient.from('addresses').select('*')
//       setData(data)
//     }
//     // Only run query once user is logged in.
//     if (user) loadData()
//   }, [user])

//   if (!user) {
//     return (
//       <div className={ styles.container }>
//         <div className={ styles.authWrapper }>
//           <Auth
//             redirectTo="http://localhost:3000/"
//             appearance={{ theme: ThemeSupa }}
//             theme='dark'
//             supabaseClient={supabaseClient}
//             providers={['google', 'github']}
//             socialLayout="horizontal"
        
//           />
//         </div>
//       </div>
//     )
//   }
//   return (
//     <>
//       <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
//       <p>user:</p>
//       <pre>{JSON.stringify(user, null, 2)}</pre>
//       <p>client-side data fetching with RLS</p>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </>
//   )
// }

// export default LoginPage


/****************************************************************************** */


// import { useRouter } from "next/router";
// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import { useEffect, useState } from 'react';
// import { supabase } from '../utils/supabase';

// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });

// const Login = () => {
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       email: 'benitorcalabria@gmail.com',
//       password: 'password',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       await supabase.auth.signInWithEmail(values);
//       router.push("/profile");
//     }
//   });

//   return (
//     <div style={{
//       width: '100%',
//       height: '100vh',
//       padding: '1rem 10%',
//     }}>
//         <Box
//           component="form"
//           sx={{
//             '& > :not(style)': { m: 1, width: '25ch' },
//           }}
//           noValidate
//           autoComplete="on"
//           onSubmit={formik.handleSubmit}
//         ><Stack spacing={2} >
//           <TextField
//             id="email"
//             name="email"
//             label="Email"
//             autoComplete="username"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />
//           <TextField
//             id="password"
//             name="password"
//             label="Password"
//             type="password"
//             autoComplete="current-password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//           />
//           <Button color="primary" variant="contained" type="submit">
//             Login
//           </Button>
//           </Stack></Box>
//     </div>
//   );
// };

// export default Login;

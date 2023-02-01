import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Profile() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('addresses').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

/*************************************************************************
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// import styles from '../styles/Profile.module.css'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last Name is required'),
});

// export default function Profile({ session }) {
export default function Profile(Component, pageProps) {
  console.log(
    // 'Profile session\n', session, 
    'Profile() pageProps\n', pageProps, 
    '\nProfile() Component\n', Component, 
  )
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();
  const [nameData, setNameData] = useState()
  const [addressData, setAddressData] = useState()
  
  useEffect(() => {
    // Only run query once user is logged in.
    if (!user) {
      router.push("/");
      return
    }
    loadNames()
    loadAddresses();
  }, [])

  async function loadNames() {
    const { names } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .order('inserted_at', { ascending: false })
    setNameData(names)
  }
  
  async function loadAddresses() {
    const { addresses } = await supabaseClient
      .from('addresses')
      .select('*')
      .eq('user_id', user?.id)
      .order('id', { descending: true });
    setAddressData(addresses)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      // firstName: nameData[0]?.firstname,
      // lastName: nameData[0]?.lastname,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      padding: '1rem 10%',
    }}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={2} >
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik?.values?.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik?.values?.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

**************************************************************************/

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

// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

// const validationSchema = yup.object({
//   firstName: yup
//     .string('Enter your first name')
//     .required('First Name is required'),
//   lastName: yup
//     .string('Enter your last name')
//     .required('Last Name is required'),
// });

// export default function Profile({ session }) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   const supabaseClient = useSupabaseClient()
//   const user = useUser()
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
    
//     useEffect(() => {
//       getLatestUserName();
//       getLatestUserAddress();
//       console.log('useFormik')
//   }, []);

//   const getLatestUserName = async () => {
//     const user = supabase.auth.user();
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('user_id', user?.id)
//         .order('inserted_at', { ascending: false })
        
//       setFirstName(data[0].firstname);
//       setLastName(data[0].lastname);

//       if (error) throw error;
//       setData(data);
//     } catch (error) {
//       console.log('getLatestUserName()\n' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const getLatestUserAddress = async () => {
//     const user = supabase.auth.user();
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('addresses')
//         .select('*')
//         .eq('user_id', user?.id)
//         .order('id', { descending: true });

//       address = data[0].address;
//       city = data[0].city;
//       state = data[0].state;
//       pinCode = data[0].pin_code;

//       if (error) throw error;
//       setData(data);
//     } catch (error) {
//       console.log('getLatestUserAddress()\n' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div style={{
//       textAlign: 'center',
//     }}>
//       <h1>Fetching Profile...</h1>
//     </div>;
//   }

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
//           autoComplete="off"
//           onSubmit={formik.handleSubmit}
//         ><Stack spacing={2} >
//           <TextField
//             id="firstName"
//             name="firstName"
//             label="First Name"
//             value={formik?.values?.firstName}
//             onChange={formik.handleChange}
//             error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//             helperText={formik.touched.firstName && formik.errors.firstName}
//           />
//           <TextField
//             id="lastName"
//             name="lastName"
//             label="Last Name"
//             value={formik?.values?.lastName}
//             onChange={formik.handleChange}
//             error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//             helperText={formik.touched.lastName && formik.errors.lastName}
//           />
//           <Button color="primary" variant="contained" type="submit">
//             Submit
//           </Button>
//           </Stack></Box>
//     </div>
//   );
// }

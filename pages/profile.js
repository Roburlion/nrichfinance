/*************************************************************************
 * 
 * This version showed first name and last name.
 * I'm going to cut this down to just the first and last name and forget about addresses.
 * 
 */
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
// import { useRouter } from "next/router";
// import styles from '../styles/Profile.module.css'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last Name is required'),
});

export default function Profile() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [nameData, setNameData] = useState()
  const [loading, setLoading] = useState(true);

  async function loadNameData() {
    // retrieve data from supabase and store in nameData
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .order('inserted_at', { ascending: false });

      if (error) throw error;
      
      setNameData(data)
      setNameData({
        firstname: data[0].firstname,
        lastname: data[0].lastname,
      })

    } catch (error) {
      console.log('fetch error\n\t', error.message);
    } finally {
      setLoading(false);
    }

  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  useEffect(() => {
    // Only run query once user is logged in.
    if (!user) return
    loadNameData()
  }, [user])

  useEffect(() => {
    formik.touched.firstName = false
    formik.touched.lastName = false
  }, [])
  
  if (loading) return <h1>loading...</h1>
  // console.log(
  //   'formik\n\t', formik, '\n',
  //   'formik.touched.firstName\n\t', formik.touched.firstName, '\n',
  //   'formik?.values?.firstName\n\t', formik?.values?.firstName, '\n',
  // )

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
            value={ formik.touched.firstName ? formik?.values?.firstName : nameData?.firstname }
            onChange={(event) => {
              formik.handleChange(event);
              formik.touched.firstName = true;
            }}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={ formik.touched.lastName ? formik?.values?.lastName : nameData?.lastname }
            onChange={(event) => {
              formik.handleChange(event);
              formik.touched.lastName = true;
            }}
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
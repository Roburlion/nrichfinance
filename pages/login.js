import { useRouter } from "next/router";
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: 'benitorcalabria@gmail.com',
      password: 'password',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await supabase.auth.signIn(values);
      router.push("/profile");
    }
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
          autoComplete="on"
          onSubmit={formik.handleSubmit}
        ><Stack spacing={2} >
          <TextField
            id="email"
            name="email"
            label="Email"
            autoComplete="username"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
          </Stack></Box>
    </div>
  );
};

export default Login;

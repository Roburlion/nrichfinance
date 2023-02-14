/*************************************************************************
 * 
 * This version WORKS!
 * 
 */

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, Stack, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
  firstname: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastname: yup
    .string('Enter your last name')
    .required('Last Name is required'),
});

export default function AccountNameForm({ names }) {  
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [nameData, setNameData] = useState(names)
  const [isReadOnly, setIsReadOnly] = useState(true);

  async function insertNameData(values) {
    try {
      alert(JSON.stringify('insertNameData', null, 2));

      // user.id is included for supabase RLS.
      values.user_id = user.id;
      const { error } = await supabaseClient
        .from('profiles')
        .insert(values);
      delete values.user_id;
      if (error) {
        throw error
      } else {
        // formik.initialValues = values;
        setNameData(values);
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  const formik = useFormik({
    initialValues: nameData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setIsReadOnly(true)
      insertNameData(values)
    },
  });
  
  useEffect(() => {
    formik.touched.firstname = false
    formik.touched.lastname = false
  }, [])

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          margin: 2,
        }}
      >
        <Box
          component="form"
          sx={{
            width: 500,
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          spacing={2}
        >
          <Stack spacing={2}>
            <h2 style={{margin: '0', padding: '0'}}>Name </h2>
            <Stack direction="row" spacing={2}>
              <TextField
                id="firstname"
                name="firstname"
                label="First Name"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
                variant={isReadOnly ? "standard" : "outlined"}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0' }}
                disabled={!isReadOnly}
                onClick={() => {
                  setIsReadOnly(false);
                  formik.touched.firstname = true;
                  formik.touched.lastname = true;
                }}
              >
                <EditIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                disabled={isReadOnly}
                onClick={() => {
                  formik.setValues(nameData, false);
                  setIsReadOnly(true);
                }}
              >
                <CancelIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                disabled={isReadOnly}
              >
                <SaveIcon />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
/*************************************************************************
 * 
 * This is a working version.
 * 
 *
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, Stack, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
  firstname: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastname: yup
    .string('Enter your last name')
    .required('Last Name is required'),
});

export default function Profile() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [nameData, setNameData] = useState()
  const [loading, setLoading] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(true);

  async function loadNameData() {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .order('inserted_at', { ascending: false });

      if (error) throw error;
      // Stores most recent name in the form of formik.values      
      setNameData({
        firstname: data[0].firstname,
        lastname: data[0].lastname,
      })

    } catch (error) {
      console.log('select profile error\n\t', error.message);
    } finally {
      setLoading(false);
    }

  }

  async function insertNameData(values) {
    try {
      // user.id is included for supabase RLS.
      values.user_id = user.id;
      const { error } = await supabaseClient
        .from('profiles')
        .insert(values);
      delete values.user_id;
      if (error) {
        throw error
      } else {
        setNameData(values);
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      insertNameData(values)
    },
  });
  
  // Loads names once user is logged in.
  useEffect(() => {
    if (!user) return
    loadNameData()
  }, [user])

  // Initializes formik.values once names have been loaded.
  useEffect(() => {
    if (!nameData) return
    formik.setValues(nameData, false)
  }, [nameData])

  // Initializes formik.touched to false.
  useEffect(() => {
    formik.touched.firstname = false
    formik.touched.lastname = false
  }, [])
  
  if (loading) return <h1>loading...</h1>

  // console.log(
  //   'pre-return formik\n\t', formik, '\n',
  //   'pre-return formik.touched.firstname\n\t', formik.touched.firstname, '\n',
  //   'pre-return formik?.values?.firstname\n\t', formik?.values?.firstname, '\n',
  //   'pre-return nameData?.firstname\n\t', nameData?.firstname, '\n',
  // )

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          margin: 2,
        }}
      >
        <Box
          component="form"
          // sx={{
          //   '& > :not(style)': { m: 1, width: '25ch' },
          // }}
          sx={{
            width: 500,
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          spacing={2}
        >
          <Stack spacing={2}>
            <h2 style={{margin: '0', padding: '0'}}>Name </h2>
            <Stack direction="row" spacing={2}>
              <TextField
                id="firstname"
                name="firstname"
                label="First Name"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
                variant={isReadOnly ? "standard" : "outlined"}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0' }}
                disabled={!isReadOnly}
                onClick={() => setIsReadOnly(false)}
              >
                <EditIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                disabled={isReadOnly}
                onClick={() => {
                  formik.setValues(nameData, false);
                  setIsReadOnly(true);
                }}
              >
                <CancelIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                disabled={isReadOnly}
                onClick={() => {
                  setIsReadOnly(true);
                }}
              >
                <SaveIcon />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
*/
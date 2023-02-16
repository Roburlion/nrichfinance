// ! NOTES --------------------------------------------------------------------
// TODO: Add date picker for dob
// TODO: Remove readOnly functionality from form
//    TODO: Remove edit button
// TODO: Use TextInput
// ? Do I want to use the mobile date picker for mobile devices?
// ! --------------------------------------------------------------------------

// ! --------------------------------------------------------------------------
// * MAIN IMPORTS -------------------------------------------------------------
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

// * FORM IMPORTS -------------------------------------------------------------
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, Stack, Paper } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

// * FORM COMPONENT IMPORTS ---------------------------------------------------
import { DateInput } from '../DateInput';

// ! --------------------------------------------------------------------------
// * FORM VARIABLE ------------------------------------------------------------
const validationSchema = yup.object({
  firstname: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastname: yup
    .string('Enter your last name')
    .required('Last Name is required'),
});

// ! --------------------------------------------------------------------------
// * MAIN COMPONENT -----------------------------------------------------------
export default function AccountNameForm({ names }) {  
  // ! VARIABLES --------------------------------------------------------------
  // * MAIN VARIABLES ---------------------------------------------------------
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  // * FORM VARIABLES ---------------------------------------------------------
  const [formData, setFormData] = useState(names)
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      insertNameData(values)
    },
  });

  // ! ------------------------------------------------------------------------
  // * FORM HELPER FUNCTIONS --------------------------------------------------
  async function insertNameData(values) {
    // * called from formik.onSubmit()
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
        setFormData(values);
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  // ! ------------------------------------------------------------------------
  // * RETURN -----------------------------------------------------------------
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
                value={formik?.values?.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                value={formik?.values?.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
              <DateInput name='dob' label='Date of Birth' formik={formik} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  formik.setValues(address, false);
                  // console.log('address\n\t', address)
                }}
              >
                <RestartAltIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
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
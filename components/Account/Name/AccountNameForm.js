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
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

// * DATE PICKER IMPORTS -------------------------------------------------------
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

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
  const [isReadOnly, setIsReadOnly] = useState(true);
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setIsReadOnly(true)
      insertNameData(values)
    },
  });

  // * DATE PICKER VARIABLES --------------------------------------------------
  const [dob, setDob] = useState(dayjs(names.dob));

  // ! ------------------------------------------------------------------------
  // * FORM HELPER FUNCTIONS --------------------------------------------------
  async function insertNameData(values) {
    // * called from formik.onSubmit()
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
        setFormData(values);
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }
  
  // ! ------------------------------------------------------------------------
  // * USE EFFECTS ------------------------------------------------------------
  useEffect(() => {
    formik.touched.firstname = false
    formik.touched.lastname = false
  }, [])

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
                  formik.setValues(formData, false);
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
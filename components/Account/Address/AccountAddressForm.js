// ! NOTES --------------------------------------------------------------------
// TODO: Format form
// TODO: add validationSchema
// // TODO: Clean up readOnly comments
// ? Do I want to use the mobile date picker for mobile devices?
// ! --------------------------------------------------------------------------

// * --------------------------------------------------------------------------
// * MAIN IMPORTS -------------------------------------------------------------
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

// * FORM IMPORTS -------------------------------------------------------------
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, Stack, Paper } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// * DATE PICKER IMPORTS -------------------------------------------------------
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

// * DROP DOWN IMPORTS --------------------------------------------------------
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// * FORM COMPONENT IMPORTS ---------------------------------------------------
import { TextInput } from '../../TextInput';

// * --------------------------------------------------------------------------
// * FORM VARIABLE ------------------------------------------------------------
const validationSchema = yup.object({
  address: yup
  .string('Enter your street address (enter any apartment info below)')
  .required('This field is required'),
  apartment: yup
    .string('Enter your apartment info here. For example: apt 509; ste 4A; etc. (optional)'),
  city: yup
    .string('Enter your city')
    .required('This field is required'),
  state: yup
    .string('Enter your state')
    .required('This field is required'),
  pin_code: yup
    .string('Enter your pin code')
    .required('This field is required'),
  move_in: yup
    .string('Enter your move in date')
    .required('This field is required'),
  move_out: yup
    .string('Enter your move out date or leave blank if you are still living here')
});

// * --------------------------------------------------------------------------
// * MAIN COMPONENT -----------------------------------------------------------
export default function AccountNameForm({ address }) {
  // * MAIN VARIABLES ---------------------------------------------------------
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  // * FORM VARIABLES ---------------------------------------------------------
  const formik = useFormik({
    initialValues: address,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let addressId = values.id;
      let currentAddressExists = values.id ? true : false;

      cleanValues(values)
      
      insertNewAddressIntoAddressesTable(values)
      
      if (currentAddressExists) {
        removeTableRowWithOldAddress(addressId)
      }
    },
  });
  
  // * DATE PICKER VARIABLES --------------------------------------------------
  const [moveOut, setMoveOut] = useState(dayjs(address.move_out));
  const [moveIn, setMoveIn] = useState(dayjs(address.move_in));

  // * ------------------------------------------------------------------------
  // * FORM HELPER FUNCTIONS --------------------------------------------------
  const cleanValues = (values) => {
    // * called by the formik.onSubmit()
    delete values.address_number;    // Not in the supabase table
    delete values.id;                // Not in the supabase table
    delete values.is_only_address;   // Not in the supabase table
    values.user_id = user.id;        // Required for supabase RLS

    // ? Do I need this?
    if (values.is_current_address) values.move_out = '';   // Clear move_out if is_current_address is true

  }

  async function insertNewAddressIntoAddressesTable(values) {
    // * called by the formik.onSubmit()
    try {
      const { error } = await supabaseClient
        .from('addresses')
        .insert(values);
      if (error) {
        throw error
      } else {
        formik.initialValues = values;
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  async function removeTableRowWithOldAddress(id) {
    // * called by the formik.onSubmit()
    try {
      const { error } = await supabaseClient
        .from('addresses')
        .update({is_deleted: true})
        .eq('id', id)   // This is required for supabase RLS
        .eq('user_id', user?.id)
      
      if (error) throw error

    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  // * DATE PICKER HELPER FUNCTIONS -------------------------------------------
  const handleChangeMoveIn = (newValue) => {
    // * called by <DesktopDatePicker onSubmit() /> 
    setMoveIn(newValue);
    let dateString = newValue?.format('YYYY-MM-DD') ?? '';
    dateString = dateString === 'Invalid date' ? '' : dateString;
    formik.setFieldValue('move_in', dateString, true);
  };
  
  const handleChangeMoveOut = (newValue) => {
    // * called by <DesktopDatePicker onSubmit() /> 
    setMoveOut(newValue);
    let dateString = newValue?.format('YYYY-MM-DD') ?? '';
    dateString = dateString === 'Invalid date' ? '' : dateString;
    formik.setFieldValue('move_out', dateString, true);
  };
  
  // * ------------------------------------------------------------------------
  // * RETURN -----------------------------------------------------------------
  return (
    <>
      <Paper
        sx={{
          padding: 2,
          margin: 2,
        }}
      >
        {address.is_only_address ? null : <h3 style={{margin: '0', padding: '0'}}>Address {address.address_number}</h3>}
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
            <Stack direction="column" spacing={2}>
              <TextInput name="address" label="Address" formik={formik} />
              <TextInput name="apartment" label="Apartment (optional)" formik={formik} />
              <TextInput name="city" label="City" formik={formik} />
              <TextInput name="state" label="State" formik={formik} />
              <TextInput name="pin_code" label="Zip Code" formik={formik} />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    id="move_in"
                    name="move_in"
                    label="Move In Date"
                    inputFormat="MM/DD/YYYY"
                    value={moveIn}
                    onChange={handleChangeMoveIn}
                    onBlur={formik.handleBlur}
                    error={formik.touched.pin_code && Boolean(formik.errors.pin_code)}
                    helperText={formik.touched.pin_code && formik.errors.pin_code}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {
                    formik?.values?.is_current_residence
                      ?
                    null 
                      :
                    <DesktopDatePicker
                      id="move_out"
                      name="move_out"
                      label={formik?.values?.is_current_residence ? " " : "Move Out Date"}
                      inputFormat="MM/DD/YYYY"
                      disabled={formik?.values?.is_current_residence}
                      value={formik?.values?.is_current_residence ? null : moveOut}
                      onChange={handleChangeMoveOut}
                      onBlur={formik.handleBlur}
                      error={formik.touched.pin_code && Boolean(formik.errors.pin_code)}
                      helperText={formik.touched.pin_code && formik.errors.pin_code}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  }
              </LocalizationProvider>
              <FormControl fullWidth>
                <InputLabel id="is_current_residence">Current Residence Status</InputLabel>
                <Select
                  id="is_current_residence"
                  name="is_current_residence"
                  label="Current Residence Status"
                  value={formik?.values?.is_current_residence}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={false}>I no longer live at this address</MenuItem>
                  <MenuItem value={true}>I currently live at this address</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  formik.setValues(address, false);
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
              {
                address?.id
                ? <Button
                    color="primary"
                    variant="contained"
                    sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                    onClick={() => {
                      removeTableRowWithOldAddress(address?.id)
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                : null
              }
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
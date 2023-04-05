// ! NOTES --------------------------------------------------------------------
// TODO: Format form
// TODO: add validationSchema
// // TODO: Clean up readOnly comments
// ? Do I want to use the mobile date picker for mobile devices?

// ! IMPORTS ------------------------------------------------------------------
// * MAIN IMPORTS -------------------------------------------------------------
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React from 'react'

// * FORM IMPORTS -------------------------------------------------------------
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Box, Stack, Paper } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// * DROP DOWN IMPORTS --------------------------------------------------------
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// * FORM COMPONENT IMPORTS ---------------------------------------------------
import { TextInput } from '../TextInput';
import { DateInput } from '../DateInput';

// ! VARIABLES ----------------------------------------------------------------
// * FORM VARIABLE ------------------------------------------------------------
const validationSchema = yup.object({
  type: yup
    .string('Enter your phone type')
    .required('This field is required'),
  dict_phone_country_codes_id: yup
    .string('Enter your country code')
    .required('This field is required'),
  phone_number: yup
    .string('Enter your phone number')
    .required('This field is required'),
});

// ! COMPONENTS ---------------------------------------------------------------
// * MAIN COMPONENT -----------------------------------------------------------
export default function AccountPhoneForm({ phone }) {

  // console.log('AccountPhoneForm.js\n\tphone: ', phone)

  // * MAIN VARIABLES ---------------------------------------------------------
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  // * FORM VARIABLES ---------------------------------------------------------
  const formik = useFormik({
    initialValues: phone,
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
  
  // ! HELPER FUNCTIONS -------------------------------------------------------
  // * FORM -------------------------------------------------------------------
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
  
  // ! RENDER -----------------------------------------------------------------
  // * RETURN -----------------------------------------------------------------
  return (
    <>
      <Paper
        sx={{
          padding: 2,
          margin: 2,
        }}
      >
        { // * TITLE
          phone.is_only_phone
            ? null
            : <h3 style={{margin: '0', padding: '0'}}>
                Phone {phone.index + 1}
              </h3>
        }
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
              <TextInput name="phone_number" label="Phone Number" formik={formik} />
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
              {
                phone?.id
                ? <Button
                    color="primary"
                    variant="contained"
                    sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                    onClick={() => {
                      removeTableRowWithOldAddress(phone?.id)
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
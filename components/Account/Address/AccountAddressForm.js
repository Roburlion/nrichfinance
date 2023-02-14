/*************************************************************************
 * 
 * Just need to format field placement.
 * 
 */

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, Stack, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function AccountNameForm({ address }) {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [isReadOnly, setIsReadOnly] = useState(false);
  
  const [moveIn, setMoveIn] = useState(dayjs(address.move_in));
  const handleChangeMoveIn = (newValue) => {
    setMoveIn(newValue);
    let dateString = newValue?.format('YYYY-MM-DD') ?? '';
    dateString = dateString === 'Invalid date' ? '' : dateString;
    formik.setFieldValue('move_in', dateString, true);
  };
  
  const [moveOut, setMoveOut] = useState(dayjs(address.move_out));
  const handleChangeMoveOut = (newValue) => {
    setMoveOut(newValue);
    let dateString = newValue?.format('YYYY-MM-DD') ?? '';
    dateString = dateString === 'Invalid date' ? '' : dateString;
    formik.setFieldValue('move_out', dateString, true);
  };
  
  /***
   * Inserts data into the supabase table named addresses and refreshes the page if successful.
   */
  async function createNewTableRowWithUpdatedAddress(values) {
    try {
      // alert(JSON.stringify('createNewTableRowWithUpdatedAddress', null, 2));
      const { error } = await supabaseClient
        .from('addresses')
        .insert(values);
      if (error) {
        throw error
      } else {
        formik.initialValues = values;
        // setData(values);
      }
    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  async function removeTableRowWithOldAddress(id) {
    try {
      // alert(JSON.stringify('removeTableRowWithOldAddress', null, 2));
      // user.id is included for supabase RLS.
      const { error } = await supabaseClient
        .from('addresses')
        .update({is_deleted: true})
        .eq('id', id)
        .eq('user_id', user?.id)
      
      if (error) throw error

    } catch (error) {
      console.log('insert profile error\n\t', error.message);
    }
  }

  const cleanValues = (values) => {
    let cleanedValues = values;

    // Remove fields that are not in the supabase table
    delete cleanedValues.address_number;
    delete cleanedValues.id;
    delete cleanedValues.is_only_address;

    // Clear move_out if is_current_address is true
    if (cleanedValues.is_current_address) cleanedValues.move_out = '';

    // Add user_id for supabase RLS
    cleanedValues.user_id = user.id;
    return cleanedValues;
  }

  const formik = useFormik({
    initialValues: address,
    // TODO: add validationSchema
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let addressId = values.id;
      let currentAddressExists = values.id ? true : false;
      createNewTableRowWithUpdatedAddress(cleanValues(values))
      if (currentAddressExists) {
        removeTableRowWithOldAddress(addressId)
        setIsReadOnly(true)
      }
      alert(JSON.stringify('Reload happens now...did it work?', null, 2));
      window.location.reload(false)
    },
  });
  
  /***
   * Initialize field's formik.touched values to false
   */
  useEffect(() => {
    // formik.touched.address = false
    // formik.touched.apartment = false
    // formik.touched.city = false
    // formik.touched.state = false
    // formik.touched.zip = false
    // formik.touched.move_in = false
    // formik.touched.move_out = false
    // formik.touched.is_current_residence = false
  }, [])

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
              <TextField
                id="address"
                name="address"
                label="Address"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="apartment"
                name="apartment"
                label="Apartment (optional)"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.apartment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.apartment && Boolean(formik.errors.apartment)}
                helperText={formik.touched.apartment && formik.errors.apartment}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="city"
                name="city"
                label="City"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="state"
                name="state"
                label="State"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="pin_code"
                name="pin_code"
                label="Pin Code"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.pin_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pin_code && Boolean(formik.errors.pin_code)}
                helperText={formik.touched.pin_code && formik.errors.pin_code}
                variant={isReadOnly ? "standard" : "outlined"}
              />
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
              {/* <TextField
                id="move_in"
                name="move_in"
                label="Move In Date"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.move_in}
                onChange={formik.handleChange}
                error={formik.touched.move_in && Boolean(formik.errors.move_in)}
                helperText={formik.touched.move_in && formik.errors.move_in}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="move_out"
                name="move_out"
                label="Move Out Date"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.move_out}
                onChange={formik.handleChange}
                error={formik.touched.move_out && Boolean(formik.errors.move_out)}
                helperText={formik.touched.move_out && formik.errors.move_out}
                variant={isReadOnly ? "standard" : "outlined"}
              />
              <TextField
                id="is_current_residence"
                name="is_current_residence"
                label="I currently live at this address"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                value={formik?.values?.is_current_residence}
                onChange={formik.handleChange}
                error={formik.touched.is_current_residence && Boolean(formik.errors.is_current_residence)}
                helperText={formik.touched.is_current_residence && formik.errors.is_current_residence}
                variant={isReadOnly ? "standard" : "outlined"}
              /> */}
            </Stack>
            <Stack direction="row" spacing={2}>
              {/* <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0' }}
                disabled={!isReadOnly}
                onClick={() => {
                  setIsReadOnly(false);
                  // formik.touched.address = true;
                  // formik.touched.apartment = true;
                  // formik.touched.city = true;
                  // formik.touched.state = true;
                  // formik.touched.zip = true;
                  // formik.touched.move_in = true;
                  // formik.touched.move_out = true;
                  // formik.touched.is_current_residence = true;
                }}
              >
                <EditIcon />
              </Button> */}
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                // disabled={isReadOnly}
                onClick={() => {
                  formik.setValues(address, false);
                  // setIsReadOnly(true);
                }}
              >
                {/* <CancelIcon /> */}
                <RestartAltIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                // disabled={isReadOnly}
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
                      window.location.reload(false)
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
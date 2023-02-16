import React from 'react';
// import TextField from '@material-ui/TextField';

// * DATE PICKER IMPORTS -------------------------------------------------------
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';

export const DateInput = ({ name, label, formik }) => {

  const handleChange = (newValue) => {
    // * called by <DesktopDatePicker onChange() /> 
    // * this function takes a dayjs object and converts it back to a string
    let dateString = newValue?.format('YYYY-MM-DD') ?? null;
    dateString = dateString == 'Invalid Date' ? null : dateString;
    formik.setFieldValue(name, dateString, true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        id={name}
        name={name}
        label={label}
        inputFormat="MM/DD/YYYY"
        value={dayjs(formik?.values?.[name])}
        onChange={handleChange}
        onBlur={formik?.handleBlur}
        error={formik?.touched?.[name] && Boolean(formik?.errors?.[name])}
        helperText={formik?.touched?.[name] && formik?.errors?.[name]}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
import React from 'react';
// import TextField from '@material-ui/TextField';
import { TextField } from '@mui/material';

export const TextInput = ({ name, label, formik }) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      value={formik?.values?.[name]}
      onChange={formik?.handleChange}
      error={formik?.touched?.[name] && Boolean(formik?.errors?.[name])}
      helperText={formik?.touched?.[name] && formik?.errors?.[name]}
    />
  );
};
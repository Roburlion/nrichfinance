// CustomersUI.jsx
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export default function CustomersUI({ data = [], handleSubmit }) {
  const [formValue, setFormValue] = useState({
    first_name: '',
    last_name: '',
    dob: '',
  });
  const [formResetValue, setFormResetValue] = useState({
    first_name: '',
    last_name: '',
    dob: '',
  });

  useEffect(() => {
    if (data.length > 0) {
      setFormValue(data[0]);
      setFormResetValue(data[0]);
    }
  }, [data]);

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ padding: 2, margin: 2 }}>
          <Stack spacing={2}>
            <h2 style={{margin: '0', padding: '0'}}>Personal Info</h2>
            <Stack direction="row" spacing={2}>
              <TextField
                name="first_name"
                label="First Name"
                value={formValue.first_name}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
              <TextField
                name="last_name"
                label="Last Name"
                value={formValue.last_name}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
              <TextField
                name="dob"
                label="DOB"
                value={formValue.dob}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  setFormValue(formResetValue);
                }}
              > <RestartAltIcon /> </Button>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  setFormResetValue(formValue);
                }}
              > <SaveIcon /> </Button>
            </Stack>
          </Stack>
        </Paper>
      </form>
    </>
  );
}

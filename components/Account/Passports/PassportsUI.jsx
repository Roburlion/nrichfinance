// PassportsUI.jsx
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export default function PassportsUI({ data = [], handleSubmit }) {
  const [formValue, setFormValue] = useState({
    passport_number: '',
    issue_country: '',
    issue_date: '',
    expiration_date: ''
  });
  const [formResetValue, setFormResetValue] = useState({
    passport_number: '',
    issue_country: '',
    issue_date: '',
    expiration_date: ''
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
            <h2 style={{margin: '0', padding: '0'}}>Passport</h2>
            <Stack direction="row" spacing={2}>
              <TextField
                name="passport_number"
                label="Passport Number"
                value={formValue.passport_number}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
              <TextField
                name="issue_country"
                label="Issuing Country"
                value={formValue.issue_country}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
              <TextField
                name="issue_date"
                label="Issue Date"
                value={formValue.issue_date}
                onChange={handleChange}
                sx={{ width: '15ch' }}
              />
              <TextField
                name="expiration_date"
                label="Expiration Date"
                value={formValue.expiration_date}
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

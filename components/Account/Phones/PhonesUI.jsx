// PhonesUI.jsx
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export default function PhonesUI({ phones = [], handleSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberResetValue, setPhoneNumberResetValue] = useState('');

  useEffect(() => {
    if (phones.length > 0) {
      setPhoneNumber(phones[0].phone_number);
      setPhoneNumberResetValue(phones[0].phone_number);
    }
  }, [phones]);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ padding: 2, margin: 2 }}>
          <Stack spacing={2}>
            <h2 style={{margin: '0', padding: '0'}}>Primary Phone Number</h2>
            <TextField
              name="phone_number"
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              sx={{ width: '15ch' }}
            />

            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  setPhoneNumber(phoneNumberResetValue);
                }}
              > <RestartAltIcon /> </Button>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ height: 'min-content', width: 'min-content', margin: 'auto 0 auto 0'}}
                onClick={() => {
                  setPhoneNumberResetValue(phoneNumber);
                }}
              > <SaveIcon /> </Button>
            </Stack>
          </Stack>
        </Paper>
      </form>
    </>
  );
}

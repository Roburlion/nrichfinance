// PanCardsUI.jsx
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export default function PhonesUI({ data = [], handleSubmit }) {
  const [formValue, setFormValue] = useState('');
  const [formResetValue, setFormResetValue] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      setFormValue(data[0].pan_card_number);
      setFormResetValue(data[0].pan_card_number);
    }
  }, [data]);

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ padding: 2, margin: 2 }}>
          <Stack spacing={2}>
            <h2 style={{margin: '0', padding: '0'}}>PAN Card</h2>
            <TextField
              name="pan_card_number"
              label="PAN Card Number"
              value={formValue}
              onChange={handleChange}
              sx={{ width: '15ch' }}
            />

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

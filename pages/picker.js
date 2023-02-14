import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [isCurrentResidence, setIsCurrentResidence] = React.useState(false);

  const handleChange = (event) => {
    setIsCurrentResidence(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, margin: '1rem', padding: '1rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Current Residence Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isCurrentResidence}
          label="Current Residence Status"
          onChange={handleChange}
        >
          <MenuItem value={false}>I no longer live at this address</MenuItem>
          <MenuItem value={true}>I currently live at this address</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
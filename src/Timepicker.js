import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { forwardRef } from "react";

const TimePicker = forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label={props.title}
        views={['hours']}
        className='form-control mb-3'
        onChange={props.onChange}
        ref={ref}
      />
    </LocalizationProvider>
  );
});

export default TimePicker;
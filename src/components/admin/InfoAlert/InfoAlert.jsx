import { Alert, Box } from '@mui/material';
import React from 'react';
import styles from './InfoAlert.module.scss';
const InfoAlert = ({ show, text, error = false }) => {
  return (
    <>
      {show && <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000000 }}></Box>}
      <Alert
        severity="error"
        sx={{ fontFamily: 'inherit', transform: show ? 'scale(1.3) ' : 'scale(1.3) translateX(120%)', transition: 'transform 0.3s', backgroundColor: error ? 'error.main' : 'success.light', position: 'fixed', bottom: '25px', right: '40px', zIndex: ' 100000000' }}
        variant="filled">
        {text}
      </Alert>
    </>
  );
};

export default InfoAlert;

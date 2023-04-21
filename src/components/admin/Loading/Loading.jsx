import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import styles from './Loading.module.scss';
const Loading = () => {
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1000000 }}>
      <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%) scale(1.5)' }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loading;

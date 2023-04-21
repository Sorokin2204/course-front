import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
const RatingBlock = () => {
  const [intrestingCount, setIntrestingCount] = useState(0);
  const [activeIntresting, setActiveIntresting] = useState(true);
  const [activeUsefull, setActiveUsefull] = useState(true);
  const [usefullcount, setUsefullcount] = useState(0);
  return (
    <Box sx={{ marginTop: '40px', padding: '24px 24px 32px 24px', borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)' }}>
      <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> Бұл тараудың соңы. Жалғастыру үшін бағалаңыз</Box>
      <Box sx={{ marginTop: '25px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box sx={{ fontSize: '16px', marginBottom: '12px' }}> Қызығушылық</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {new Array(5).fill().map((item, itemIndex) =>
            itemIndex >= usefullcount ? (
              <StarOutline
                onClick={() => {
                  if (activeUsefull) {
                    setUsefullcount(itemIndex + 1);
                    setActiveUsefull(false);
                  }
                }}
                sx={{ fontSize: '30px', color: '#F2C94C', margin: '0 5px' }}
              />
            ) : (
              <Star sx={{ fontSize: '30px', color: '#F2C94C', margin: '0 5px' }} />
            ),
          )}
        </Box>
      </Box>
      <Box sx={{ marginTop: '25px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box sx={{ fontSize: '16px', marginBottom: '12px' }}> Пайдасы</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {new Array(5).fill().map((item, itemIndex) =>
            itemIndex >= intrestingCount ? (
              <StarOutline
                onClick={() => {
                  if (activeIntresting) {
                    setIntrestingCount(itemIndex + 1);
                    setActiveIntresting(false);
                  }
                }}
                sx={{ fontSize: '30px', color: '#F2C94C', margin: '0 5px' }}
              />
            ) : (
              <Star sx={{ fontSize: '30px', color: '#F2C94C', margin: '0 5px' }} />
            ),
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RatingBlock;

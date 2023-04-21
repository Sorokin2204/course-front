import { Box } from '@mui/material';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Categories from '../Categories/Categories';
import styles from './CategoryPopUp.module.scss';
const CategoryPopUp = ({ show, setShow }) => {
  return (
    <Box sx={{ transition: 'opacity 0.3s, visibility 0.3s', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.3)', left: 0, right: 0, bottom: 0, top: '67px', zIndex: '1000', opacity: 0, visibility: 'hidden', ...(show && { opacity: 1, visibility: 'visible' }) }}>
      <Box sx={{ backgroundColor: '#fff', height: 'min-content', paddingBottom: '60px' }}>
        <OutsideClickHandler
          onOutsideClick={() => {
            setShow(false);
          }}>
          <div class="container">
            <Categories
              onAfterLink={() => {
                setShow(false);
              }}
            />
          </div>
        </OutsideClickHandler>
      </Box>
    </Box>
  );
};

export default CategoryPopUp;

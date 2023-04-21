import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HouseAddEdit from '../../../components/admin/HouseAddEdit/HouseAddEdit';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminHouseUpdate.module.scss';
const AdminHouseUpdate = () => {
  let { slug } = useParams();
  const [getHouseSingle, setGetHouseSingle] = useState({ loading: true });
  useEffect(() => {
    axios
      .get(apiUrl('page/single'), {
        params: {
          type: 'house',
          slug,
        },
      })
      .then((res) => {
        setGetHouseSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetHouseSingle({ loading: false, error: true });
      });
  }, []);
  return getHouseSingle?.loading ? (
    <CircularProgress sx={{ display: 'block', margin: '0 auto', mt: 10 }} />
  ) : getHouseSingle?.error ? (
    <Box sx={{ fontSize: ' 24px', fontWeight: '600', margin: '0 auto', textAlign: 'center', mt: 40, opacity: '0.6' }}>Дом не найден</Box>
  ) : (
    <HouseAddEdit data={getHouseSingle?.data} />
  );
};

export default AdminHouseUpdate;

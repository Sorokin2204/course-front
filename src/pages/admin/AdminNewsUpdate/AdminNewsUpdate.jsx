import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PageAddEdit from '../../../components/admin/PageAddEdit/PageAddEdit';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminNewsUpdate.module.scss';
const AdminNewsUpdate = () => {
  let { slug } = useParams();
  const [getNewsSingle, setGetNewsSingle] = useState({ loading: true });
  useEffect(() => {
    axios
      .get(apiUrl('page/single'), {
        params: {
          type: 'news',
          slug,
        },
      })
      .then((res) => {
        setGetNewsSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetNewsSingle({ loading: false, error: true });
      });
  }, []);
  return getNewsSingle?.loading ? (
    <CircularProgress sx={{ display: 'block', margin: '0 auto', mt: 10 }} />
  ) : getNewsSingle?.error ? (
    <Box sx={{ fontSize: ' 24px', fontWeight: '600', margin: '0 auto', textAlign: 'center', mt: 40, opacity: '0.6' }}>Новость не найдена</Box>
  ) : (
    <PageAddEdit textSave="Новость сохранена" textCreate="Новость создана" redirectAfterSave={'/admin/news'} isNews data={getNewsSingle?.data} />
  );
};

export default AdminNewsUpdate;

import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PageAddEdit from '../../../components/admin/PageAddEdit/PageAddEdit';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminPageUpdate.module.scss';
const AdminPageUpdate = () => {
  let { slug } = useParams();
  const [getPageSingle, setGetPageSingle] = useState({ loading: true });
  useEffect(() => {
    axios
      .get(apiUrl('page/single'), {
        params: {
          type: 'page',
          slug,
        },
      })
      .then((res) => {
        setGetPageSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetPageSingle({ loading: false, error: true });
      });
  }, []);
  return getPageSingle?.loading ? (
    <CircularProgress sx={{ display: 'block', margin: '0 auto', mt: 10 }} />
  ) : getPageSingle?.error ? (
    <Box sx={{ fontSize: ' 24px', fontWeight: '600', margin: '0 auto', textAlign: 'center', mt: 40, opacity: '0.6' }}>Страница не найдена</Box>
  ) : (
    <PageAddEdit textSave="Страница сохранена" textCreate="Страница создана" redirectAfterSave={'/admin/pages'} data={getPageSingle?.data} />
  );
};

export default AdminPageUpdate;

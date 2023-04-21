import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminTableList from '../../../components/admin/AdminTableList/AdminTableList';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminNewsList.module.scss';
const AdminNewsList = () => {
  const [getPageList, setGetPageList] = useState({ loading: true });
  function getPageLiseRequest() {
    axios
      .get(apiUrl('page/list'), {
        params: {
          type: 'news',
        },
      })
      .then((res) => {
        setGetPageList({ loading: false, data: res.data });
      });
  }
  useEffect(() => {
    getPageLiseRequest();
  }, []);

  return (
    <div>
      <AdminTableList data={getPageList?.data} loading={getPageList?.loading} textAddButton={'новость'} pathAdd="/admin/news/create" pathEdit="/admin/news/update" getTableListRequest={getPageLiseRequest} textEmpty={'Новостей нет'} />
    </div>
  );
};

export default AdminNewsList;

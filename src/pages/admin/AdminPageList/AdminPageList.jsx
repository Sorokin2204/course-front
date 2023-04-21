import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminTableList from '../../../components/admin/AdminTableList/AdminTableList';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminPageList.module.scss';
const AdminPageList = () => {
  const [getPageList, setGetPageList] = useState({ loading: true });
  function getPageListRequest() {
    axios
      .get(apiUrl('page/list'), {
        params: {
          type: 'page',
        },
      })
      .then((res) => {
        setGetPageList({ loading: false, data: res.data });
      });
  }
  useEffect(() => {
    getPageListRequest();
  }, []);

  return (
    <div>
      <AdminTableList data={getPageList?.data} loading={getPageList?.loading} textAddButton={'страницу'} pathAdd="/admin/page/create" pathEdit="/admin/page/update" getTableListRequest={getPageListRequest} textEmpty={'Страниц нет'} />
    </div>
  );
};

export default AdminPageList;

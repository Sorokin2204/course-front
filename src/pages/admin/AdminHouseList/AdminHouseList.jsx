import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminTableList from '../../../components/admin/AdminTableList/AdminTableList';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminHouseList.module.scss';
const AdminHouseList = () => {
  const [getHouseList, setGetHouseList] = useState({ loading: true });
  function getHouseListRequest() {
    axios
      .get(apiUrl('page/list'), {
        params: {
          type: 'house',
        },
      })
      .then((res) => {
        setGetHouseList({ loading: false, data: res.data });
      });
  }
  useEffect(() => {
    getHouseListRequest();
  }, []);

  return (
    <div>
      <AdminTableList data={getHouseList?.data} loading={getHouseList?.loading} textAddButton={'дом'} pathAdd="/admin/house/create" pathEdit="/admin/house/update" getTableListRequest={getHouseListRequest} textEmpty={'Домов нет'} />
    </div>
  );
};

export default AdminHouseList;

import React from 'react';
import PageAddEdit from '../../../components/admin/PageAddEdit/PageAddEdit';
import styles from './AdminNewsCreate.module.scss';
const AdminNewsCreate = () => {
  return <PageAddEdit isNews newPageText="Новая страница" backPath="/admin/page/list" textSave="Новость сохранена" textCreate="Новость создана" redirectAfterSave={'/admin/news'} />;
};

export default AdminNewsCreate;

import React from 'react';
import PageAddEdit from '../../../components/admin/PageAddEdit/PageAddEdit';

import styles from './AdminPageCreate.module.scss';
const AdminPageCreate = () => {
  return <PageAddEdit textSave="Страница сохранена" textCreate="Страница создана" redirectAfterSave={'/admin/pages'} />;
};

export default AdminPageCreate;

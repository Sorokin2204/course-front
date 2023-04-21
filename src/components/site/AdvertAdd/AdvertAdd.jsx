import React, { useContext } from 'react';
import AdvertContent from '../AdvertContent/AdvertContent';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './AdvertAdd.module.scss';
const AdvertAdd = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <div class="container">{auth?.data && <AdvertContent />}</div>
    </>
  );
};

export default AdvertAdd;

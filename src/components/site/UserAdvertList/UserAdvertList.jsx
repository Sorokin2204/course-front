import { Box, Button } from '@mui/material';
import axios from 'axios';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import Card from '../Card/Card';
import { arr } from '../ListCard/ListCard';
import Loading from '../Loading/Loading';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './UserAdvertList.module.scss';
const UserAdvertList = () => {
  const [activeTab, setActiveTab] = useState('publish');
  const [allAdverts, setAllAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getAdvertUser, setGetAdvertUser] = useState(null);
  useEffect(() => {
    if (activeTab) {
      setCurrentPage(1);
      loadOnePage(1);
    }
  }, [activeTab]);
  function loadOnePage(page) {
    setGetAdvertUser({ loading: true });
    axios
      .get(apiUrl('advert/user'), {
        params: {
          page: page,
          status: activeTab,
        },

        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (page == 1) {
          setAllAdverts([...res.data.rows]);
        } else {
          setAllAdverts([...allAdverts, ...res.data.rows]);
        }

        setGetAdvertUser({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetAdvertUser({ loading: false, error: true });
      });
  }
  const { auth } = useContext(AuthContext);
  return (
    <div className={styles.wrap}>
      <div className={clsx(styles.left)}>
        <div className={clsx(styles.statusList)}>
          <div
            onClick={() => {
              setActiveTab('publish');
            }}
            className={clsx(styles.statusItem, activeTab == 'publish' && styles.statusItemActive, styles.statusActive)}>
            {`Активные (${auth?.data?.publishCount})`}
          </div>
          <div
            onClick={() => {
              setActiveTab('disabled');
            }}
            className={clsx(styles.statusItem, styles.statusNoActive, activeTab == 'disabled' && styles.statusItemActive)}>
            {`Не активные (${auth?.data?.disableCount})`}
          </div>
          <div
            onClick={() => {
              setActiveTab('canceled');
            }}
            className={clsx(styles.statusItem, styles.statusCancel, activeTab == 'canceled' && styles.statusItemActive)}>
            {` Отклоненные (${auth?.data?.canceledCount})`}
          </div>
          <div
            onClick={() => {
              setActiveTab('sold');
            }}
            className={clsx(styles.statusItem, styles.statusSold, activeTab == 'sold' && styles.statusItemActive)}>
            {`  Проданные (${auth?.data?.soldCount})`}
          </div>
        </div>
      </div>
      <div className={clsx(styles.right)}>
        {!getAdvertUser?.loading && allAdverts?.length == 0 && getAdvertUser?.data?.rows?.length == 0 ? (
          <Box
            sx={{
              fontSize: '20px',
              opacity: '0.7',
              margin: '0 auto',
              fontWeight: '600',
              textAlign: 'center',
              padding: '100px 0 80px',
            }}>
            Объявлений нет
          </Box>
        ) : (
          <div className={clsx(styles.list)}>
            {allAdverts?.map((itemAdvert) => (
              <Card
                key={itemAdvert?.id}
                onChangeStatus={() => {
                  setCurrentPage(1);
                  loadOnePage(1);
                }}
                withSettings
                id={itemAdvert?.id}
                price={itemAdvert?.price}
                img={itemAdvert?.images?.[0]?.path}
                category={{ name: itemAdvert?.category?.name, slug: itemAdvert?.category?.id }}
                date={itemAdvert?.createdAt}
                name={itemAdvert?.title}
                inAccount
                onlyView={activeTab !== 'publish' && auth?.data?.role !== 'admin'}
              />
            ))}

            {/* {getAdvertUser?.loading && <Loading style={{ position: 'sticky', top: '50%' }} />} */}
          </div>
        )}

        {!getAdvertUser?.loading && getAdvertUser?.data?.count > currentPage * 9 && (
          <Button
            onClick={() => {
              let pageIncrement = currentPage + 1;
              setCurrentPage(pageIncrement);
              loadOnePage(pageIncrement);
            }}
            size="large"
            sx={{ height: '50px', marginTop: '40px', width: '100%' }}>
            Показать ещё
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserAdvertList;

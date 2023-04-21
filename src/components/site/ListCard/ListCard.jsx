import { ArrowBack, ArrowDownward, ArrowLeft } from '@mui/icons-material';
import { Box, Button, ButtonBase } from '@mui/material';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import Card from '../Card/Card';
import styles from './ListCard.module.scss';

const ListCard = ({ title, category }) => {
  const [typeSort, setTypeSort] = useState('by-new');
  const [allAdverts, setAllAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getAdvertList, setGetAdvertList] = useState(null);
  useEffect(() => {
    setCurrentPage(1);
    loadOnePage(1);
  }, [typeSort]);
  useEffect(() => {
    setCurrentPage(1);
    loadOnePage(1);
  }, [category]);

  function loadOnePage(page) {
    setGetAdvertList({ loading: true });
    axios
      .get(apiUrl('advert/list'), {
        params: {
          page: page,
          sort: typeSort,
          category,
        },
      })
      .then((res) => {
        if (page == 1) {
          setAllAdverts([...res.data.rows]);
        } else {
          setAllAdverts([...allAdverts, ...res.data.rows]);
        }

        setGetAdvertList({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetAdvertList({ loading: false, error: true });
      });
  }

  return (
    <>
      <div className={styles.title}>{title}</div>
      {!(!getAdvertList?.loading && allAdverts?.length == 0 && getAdvertList?.data?.rows?.length == 0) && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Box
            onClick={() => {
              setTypeSort('by-new');
            }}
            sx={{ cursor: 'pointer', ...(typeSort != 'by-new' && { opacity: 0.6 }), transition: 'opacity 0.3s', marginRight: '10px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            По новизне
          </Box>
          <Box
            onClick={() => {
              setTypeSort('by-chip');
            }}
            sx={{ cursor: 'pointer', ...(typeSort != 'by-chip' && { opacity: 0.6 }), marginRight: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', transition: 'opacity 0.3s' }}>
            <ArrowDownward sx={{ transition: 'opacity 0.3s', fontSize: '18px', marginRight: '2px' }} /> Сначала дешевые
          </Box>
          <Box
            onClick={() => {
              setTypeSort('by-rich');
            }}
            sx={{ cursor: 'pointer', transition: 'opacity 0.3s', fontWeight: '600', display: 'flex', alignItems: 'center', ...(typeSort != 'by-rich' && { opacity: 0.6 }) }}>
            <ArrowDownward sx={{ marginRight: '2px', fontSize: '18px', transform: 'rotate(180deg)', transition: 'opacity 0.3s' }} /> Сначала дорогие
          </Box>
        </Box>
      )}

      {!getAdvertList?.loading && allAdverts?.length == 0 && getAdvertList?.data?.rows?.length == 0 ? (
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
              user={{
                avatar: itemAdvert?.user?.avatar,
                name: itemAdvert?.user?.name,
              }}
              key={itemAdvert?.id}
              onChangeStatus={() => {
                setCurrentPage(1);
                loadOnePage(1);
              }}
              id={itemAdvert?.id}
              price={itemAdvert?.price}
              img={itemAdvert?.images?.[0]?.path}
              category={{ name: itemAdvert?.category?.name, slug: itemAdvert?.category?.id }}
              date={itemAdvert?.createdAt}
              name={itemAdvert?.title}
            />
          ))}

          {/* {getAdvertUser?.loading && <Loading style={{ position: 'sticky', top: '50%' }} />} */}
        </div>
      )}

      {!getAdvertList?.loading && getAdvertList?.data?.count > currentPage * 9 && (
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
    </>
  );
};

export default ListCard;

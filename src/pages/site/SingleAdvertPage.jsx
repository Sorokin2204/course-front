import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import styles from './SingleAdvertPage.module.scss';

import Categories from '../../components/site/Categories/Categories';
import ListCard from '../../components/site/ListCard/ListCard';
import ProductGallery from '../../components/site/ProductGallery/ProductGallery';
import { currencyFormat } from '../../utils/currencyFormat';
import { Box, Button } from '@mui/material';
import { Person, Phone, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import moment from 'moment';
import { getPhoneMask } from '../../utils/getPhoneMask';
import NotFound from '../../components/site/NotFound/NotFound';
const SingleAdvertPage = () => {
  const [showNumber, setShowNumber] = useState(false);
  const location = useLocation();
  const [getSingleAdvert, setGetSingleAdvert] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setGetSingleAdvert({ loading: true });
    axios
      .get(apiUrl(`advert/${id}`))
      .then((res) => {
        setGetSingleAdvert({ loading: false, data: res.data });
      })
      .catch((err) => {
        setGetSingleAdvert({ loading: false, data: null, error: true });
      });
  }, [id]);

  return (
    <>
      <div className="container">
        {getSingleAdvert?.error ? (
          <NotFound />
        ) : (
          getSingleAdvert?.data && (
            <div className={clsx(styles.wrap)}>
              <div className={clsx(styles.left)}>
                {' '}
                {getSingleAdvert?.data?.images?.length == 0 || !getSingleAdvert?.data?.images ? (
                  <Box sx={{ height: '400px' }}>
                    <Box sx={{ background: 'rgba(0,0,0,0.1)', height: '400px', position: 'relative' }}>
                      <PhotoCamera sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '90px', opacity: '0.5' }} />
                    </Box>
                  </Box>
                ) : (
                  <ProductGallery list={getSingleAdvert?.data?.images} />
                )}
                <div className={clsx(styles.descTitle)}>Описание</div>
                <div className={clsx(styles.desc)}>{getSingleAdvert?.data?.desc}</div>
              </div>
              <div className={clsx(styles.right)}>
                <div className={clsx(styles.price)}>{currencyFormat(getSingleAdvert?.data?.price)}</div>
                <h1 className={clsx(styles.title)}>{getSingleAdvert?.data?.title}</h1>
                <div className={clsx(styles.date)}>{moment(getSingleAdvert?.data?.createdAt).format('DD.MM.YYYY в hh:mm')}</div>
                {!showNumber ? (
                  <Button
                    onClick={() => {
                      setShowNumber(true);
                    }}
                    variant="contained"
                    size="large"
                    sx={{ width: '100%', marginTop: '30px' }}>
                    Позвонить
                  </Button>
                ) : (
                  <div className={clsx(styles.tel)}>
                    <Phone sx={{ marginRight: '6px', fontSize: '22px' }} />
                    {getPhoneMask(getSingleAdvert?.data?.user?.phone)}
                  </div>
                )}

                <div className={clsx(styles.user)}>
                  {getSingleAdvert?.data?.user?.avatar ? (
                    <img src={`${process.env.REACT_APP_SERVER_URL}/${getSingleAdvert?.data?.user?.avatar}`} alt="" className={clsx(styles.avatar)} />
                  ) : (
                    <div style={{ background: 'rgba(0,0,0,0.1)' }} className={clsx(styles.avatar)}>
                      <Person sx={{ fontSize: '34px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: '0.6' }} />
                    </div>
                  )}

                  <div className={clsx(styles.userInfo)}>
                    <div className={clsx(styles.userName)}>{getSingleAdvert?.data?.user?.name}</div>
                    <div className={clsx(styles.userAdvertCount)}>{`Объявлений: ${getSingleAdvert?.data?.countAdvert}`}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SingleAdvertPage;

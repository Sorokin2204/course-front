import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiUrl } from '../../../utils/apiUrl';
import AdvertContent from '../AdvertContent/AdvertContent';
import NotFound from '../NotFound/NotFound';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './AdvertEdit.module.scss';
const AdvertEdit = () => {
  const [getSingleAdvert, setGetSingleAdvert] = useState(null);
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
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

  return <div class="container">{auth?.data && <>{!getSingleAdvert?.loading && getSingleAdvert?.error ? <NotFound /> : getSingleAdvert?.data ? <AdvertContent dataAdvert={getSingleAdvert?.data} /> : <></>}</>}</div>;
};

export default AdvertEdit;

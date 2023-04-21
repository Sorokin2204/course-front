import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import SiteContenBlock from '../../components/site/SiteContenBlock/SiteContenBlock';
import PageContent from '../../components/site/PageContent/PageContent';
import NotFound from '../../components/site/NotFound/NotFound';
const NewsPage = () => {
  let { slug } = useParams();
  const [getPageSingle, setGetPageSingle] = useState({ loading: true });
  const { pathname } = useLocation();
  useEffect(() => {
    axios
      .get(apiUrl('page/single'), {
        params: {
          type: 'news',
          slug,
        },
      })
      .then((res) => {
        setGetPageSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetPageSingle({ loading: false, error: true });
      });
  }, [pathname]);
  return <div>{getPageSingle?.loading ? <div></div> : getPageSingle?.error ? <NotFound /> : <PageContent {...getPageSingle?.data} />}</div>;
};

export default NewsPage;

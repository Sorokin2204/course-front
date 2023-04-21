import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { Add, Person, PhotoCamera, Search, Subject } from '@mui/icons-material';
import CategoryPopUp from '../CategoryPopUp/CategoryPopUp';
import { AuthContext } from '../SiteLayout/SiteLayout';
import { currencyFormat } from '../../../utils/currencyFormat';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import moment from 'moment';
const Header = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRequest, setSearchRequest] = useState(null);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setSearchText(searchTerm);
    if (!searchTerm) {
      setSearchRequest(null);
    }
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        axios
          .get(apiUrl(`advert/search`), {
            params: {
              term: searchTerm,
            },
          })
          .then((res) => {
            setSearchRequest({ loading: false, data: res.data });
          })
          .catch((err) => {
            setSearchRequest({ loading: false, data: null, error: true });
          });
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const arr = [1, , 1, 1, 1, 1, 1, , 1, 1, 1, , 1, , 1, 1, , 1];
  return (
    <div style={{ borderBottom: '1px solid rgba(4, 6, 59,0.4)' }}>
      <div class="container">
        <header className={clsx(styles.wrap)}>
          <Link to="/">
            {' '}
            <img src="/img/logo.jpeg" alt="" className={clsx(styles.logo)} />
          </Link>
          <Button
            onClick={() => {
              // if (showCategory) {
              //   document.body.style.overflow = 'scroll';
              // } else {
              //   document.body.style.overflow = 'hidden';
              // }
              setShowCategory(!showCategory);
            }}
            startIcon={<Subject />}
            variant="contained">
            Категории
          </Button>
          <Box sx={{ position: 'relative' }}>
            <TextField
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  paddingRight: '0',
                },
                '& .MuiOutlinedInput-notchedOutline': {},
                '& .Mui-focused.MuiOutlinedInput-notchedOutline ': { borderColor: '#3f51b5 !important' },
                '& .Mui-focused svg': {
                  color: '#3f51b5',
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ opacity: 0.4, transition: 'all 0.3s' }} />
                  </InputAdornment>
                ),
              }}
              value={searchText}
              inputProps={{ style: { fontSize: '14px' } }}
              size="small"
              placeholder="Поиск... Например: куртка зимняя"
              variant="outlined"
            />
            {searchTerm && searchRequest?.data && (
              <Box sx={{ maxHeight: '400px', overflowY: 'scroll', padding: '10px', color: '#000', position: 'absolute', top: 'calc(100% + 10px)', left: '0', minHeight: '100px', width: '100%', background: '#fff', zIndex: '1000', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.3)' }}>
                {searchRequest?.data?.rows?.length ? (
                  <Box>
                    <Box sx={{ fontSize: '16px', marginBottom: '20px' }}>
                      {`Найдено `}
                      <b>{searchRequest?.data?.count}</b>
                      {` объявлений`}
                    </Box>
                    {searchRequest?.data?.rows?.map((item, itemIndex) => (
                      <Box
                        onClick={() => {
                          setSearchTerm('');
                          setSearchText('');
                          navigate(`/item/${item?.id}`);
                        }}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'start',
                          marginBottom: '10px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid rgba(0,0,0,0.2)',
                          '&:last-child': {
                            borderBottom: 'none',
                          },
                          '&:hover img ~ div > div ~ div ': {
                            color: '#3f51b5',
                          },
                          '&:hover img ~ div > div ~ div:after ': {
                            opacity: 1,
                          },
                        }}>
                        {}
                        <Box sx={{ position: 'relative' }}>
                          {!item?.images?.[0]?.path && <PhotoCamera sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '34px', opacity: '0.5' }} />}
                          <img
                            style={{ ...(!item?.images?.[0]?.path && { background: 'rgba(0, 0, 0, 0.1)' }), display: 'block', width: '100px', borderRadius: '4px', minWidth: '100px', height: '70px', objectFit: 'cover' }}
                            src={item?.images?.[0]?.path ? `${process.env.REACT_APP_SERVER_URL}/${item?.images?.[0]?.path}` : '/img/blank.png'}
                          />
                        </Box>
                        <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                          <Box
                            sx={{
                              transition: 'color 0.3s',
                              marginTop: '2px',
                              fontSize: '12px',
                              fontWeight: '700',
                              marginBottom: '2px',
                            }}>
                            {item?.category?.name}
                          </Box>
                          <Box
                            sx={{
                              alignSelf: 'start',
                              position: 'relative',
                              '&:after': {
                                opacity: 0,
                                transition: 'opacity 0.3s',
                                content: '""',
                                display: 'block',
                                width: '100%',
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                height: '1.5px',
                                background: '#3f51b5',
                              },
                            }}>
                            {item?.title}
                          </Box>
                          <Box sx={{ opacity: 0.5, marginTop: '14px', fontSize: '12px', color: '#000 !important' }}>{moment(item?.createdAt).format('DD.MM.YYYY')}</Box>
                        </Box>
                        <Box sx={{ marginLeft: 'auto', fontSize: '16px', fontWeight: '700', alignSelf: 'center' }}>{currencyFormat(item?.price)}</Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10px', marginTop: '31px' }}>Ничего не найдено</Box>
                )}
              </Box>
            )}
          </Box>
          {searchTerm && (
            <Box
              onClick={() => {
                setSearchTerm('');
                setSearchText('');
              }}
              sx={{ background: 'rgba(0,0,0,0.3)', position: 'fixed', top: '75px', left: '0', right: 0, bottom: '0', zIndex: '100' }}></Box>
          )}
          <Button
            onClick={() => {
              navigate('/item/add');
            }}
            endIcon={<Add />}
            variant="contained"
            sx={{
              backgroundColor: 'success.light',
              '&:hover': {
                backgroundColor: 'success.light',
              },
            }}>
            Подать объявление
          </Button>
          {auth && (
            <>
              {auth?.data ? (
                <Box
                  onClick={() => {
                    navigate('/account');
                  }}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: '#000', marginRight: '10px' }}>{`${auth?.data?.name} `}</Box>
                  {auth?.data?.avatar ? (
                    <Box
                      sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '1px solid trasparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/${auth?.data?.avatar}`}
                        style={{
                          objectFit: 'cover',
                          display: 'block',
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                      <Person sx={{ opacity: '0.4', color: '#000', fontSize: '30px', marginLeft: '1px', transform: 'translateY(-1px)' }} />
                    </Box>
                  )}
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/login');
                  }}>
                  Войти
                </Button>
              )}
            </>
          )}
        </header>
      </div>
      <CategoryPopUp show={showCategory} setShow={setShowCategory} />
    </div>
  );
};

export default Header;

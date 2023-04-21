import React, { createContext, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './SiteLayout.module.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { apiUrl } from '../../../utils/apiUrl';
import Loading from '../Loading/Loading';
import { Box } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export const AuthContext = createContext(null);
const SiteLayout = ({ children }) => {
  const darkTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        defaultProps: {
          autoComplete: 'off',
        },
        styleOverrides: {
          notchedOutline: { borderWidth: '1px !important', transition: 'border 0.3s', outline: 'none' },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontFamily: 'Montserrat, sans-serif',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {},
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            textTransform: 'none',
            fontFamily: 'Montserrat, sans-serif',
            borderRadius: '2px',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {},
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {},
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {},
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {},
        },
      },
    },
    palette: {
      primary: { main: '#3f51b5' },
    },
    breakpoints: {
      // values: { xs: 0, mobile: 1000, mob: 600 },
    },
  });
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (pathname == '/account' || pathname == '/item/add' || pathname.substring(0, 10) == '/item/edit') {
      checkAuth();
    }
  }, [pathname]);
  console.log(pathname);
  function checkAuth() {
    axios
      .get(apiUrl('auth'), { headers: { 'auth-token': localStorage.getItem('token') } })
      .then((res) => {
        setAuth({ loading: false, data: res.data });
      })
      .catch((err) => {
        localStorage.removeItem('token');
        setAuth({ loading: false, data: null, error: true });
        if (pathname == '/account' || pathname == '/item/add' || pathname.substring(0, 10) == '/item/edit') {
          navigate('/login');
        }
      });
  }
  return (
    <>
      <AuthContext.Provider value={{ auth, checkAuth }}>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ width: '100vw', display: 'grid', gridTemplateColumns: '375px 1fr', minHeight: '100vh' }}>
            <Box
              sx={{
                borderRight: '1px solid #E0E0E0',

                padding: '35px 24px 35px 28px',
                boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
              }}>
              <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', fontFamily: 'Montserrat, sans-serif' }}>
                <ArrowBackIosIcon sx={{ fontSize: '16px', marginRight: '10px' }} />
                Содержание
              </Box>
            </Box>
            <Box sx={{ backgroundColor: '#FBFBFB' }}>{children}</Box>
          </Box>
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  );
};

export default SiteLayout;

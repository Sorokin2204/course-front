import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router';
import InfoAlert from '../../../components/admin/InfoAlert/InfoAlert';
import Loading from '../../../components/site/Loading/Loading';
// import Loading from '../../../components/admin/Loading/Loading';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminLogin.module.scss';
const AdminLogin = () => {
  const loginForm = useForm({
    defaultValues: {
      password: '',
    },
  });

  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const errors = loginForm?.formState?.errors;
  const [loginRequest, setloginRequest] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    setloginRequest({ loading: true });
    axios
      .post(apiUrl(isRegister ? 'register' : 'login'), data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setloginRequest({ loading: false, data: true });

        navigate('/account');
      })
      .catch((err) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        setloginRequest({ loading: false, data: null, error: err.response?.data?.error || true });
      });
  };
  console.log(errors);
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', alignItems: 'center', justifyContent: 'center', margin: '0 auto', height: '100%', position: 'relative' }}>
        <Box sx={{ fontSize: '20px', mb: !isRegister ? 2 : '26px' }}>{isRegister ? 'Регистрация' : 'Вход'}</Box>
        <Box sx={{ display: 'grid', ...(isRegister && { gridTemplateColumns: '222px 222px', columnGap: '16px' }) }}>
          <Controller
            name="email"
            control={loginForm.control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат почты',
              },
            }}
            render={({ field }) => <TextField sx={{ mb: 2 }} size="small" error={errors?.email} label={'Почта'} helperText={errors?.email?.type == 'pattern' ? 'Неверный формат почты' : errors?.email ? 'Заполните поле' : ''} {...field} />}
          />
          <Controller
            name="password"
            control={loginForm.control}
            rules={{ required: true, ...(isRegister && { minLength: 7 }) }}
            render={({ field }) => <TextField sx={{ mb: 2 }} size="small" error={errors?.password} label={'Пароль'} helperText={errors?.password?.type == 'minLength' ? 'Мин.длинна - 7 символов' : errors?.password ? 'Заполните поле' : ''} {...field} />}
          />
          {isRegister && (
            <>
              <Controller name="name" control={loginForm.control} rules={{ required: true }} render={({ field }) => <TextField sx={{ mb: 2 }} size="small" error={errors?.name} label={'Имя'} helperText={errors?.name && 'Заполните поле'} {...field} />} />
              <Controller name="surname" control={loginForm.control} rules={{ required: true }} render={({ field }) => <TextField sx={{ mb: 2 }} size="small" error={errors?.surname} label={'Фамилия'} helperText={errors?.surname && 'Заполните поле'} {...field} />} />{' '}
              <Controller
                name="phone"
                control={loginForm.control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^(\+\ 7|7|8|\+7)[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/m,
                    message: 'Неверный формат почты',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      inputComponent: PatternFormat,
                    }}
                    inputProps={{ format: '+ 7 (###) ###-##-##', mask: '_' }}
                    sx={{ mb: 2 }}
                    size="small"
                    error={errors?.phone}
                    label={'Телефон'}
                    helperText={errors?.phone?.type == 'pattern' ? 'Неверный формат телефона' : errors?.phone ? 'Заполните поле' : ''}
                    {...field}
                  />
                )}
              />
            </>
          )}
        </Box>
        <Button onClick={loginForm.handleSubmit(onSubmit)} variant="outlined" sx={{ width: '100%', maxWidth: '222px', marginTop: !isRegister ? '0' : '10px' }}>
          {isRegister ? 'Зарегестрироватся' : 'Войти'}
        </Button>{' '}
        <Box
          sx={{ mt: 2, opacity: 0.6, textDecoration: 'underline', textUnderlineOffset: '4px', cursor: 'pointer' }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}>
          {isRegister ? 'Уже есть аккаунт ?' : 'Еще не зарегистрированы ?'}
        </Box>
        {loginRequest?.loading && <Loading />}
      </Box>

      <InfoAlert error show={showAlert} text={loginRequest?.error == 'USER_EXIST' ? 'Такой пользователь уже существует' : 'Неправильный логин или пароль'} />
    </>
  );
};

export default AdminLogin;

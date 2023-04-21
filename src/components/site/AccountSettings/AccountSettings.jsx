import { Close, Delete, Person, Upload } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../../admin/InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './AccountSettings.module.scss';
const AccountSettings = () => {
  const { auth, checkAuth } = useContext(AuthContext);
  const [settingRequest, setSettingRequest] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('isDeleteAvatar', isDeleteAvatar);
    if (uploadAvatar) {
      formData.append('avatar', uploadAvatar);
    }
    setSettingRequest({ loading: true });
    axios
      .post(apiUrl('update'), formData, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        checkAuth();
        setSettingRequest({ loading: false, data: true });
      })
      .catch((err) => {
        setSettingRequest({ loading: false, data: null, error: true });
      });
  };
  const {
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  useEffect(() => {
    if (auth?.data) {
      setValue('name', auth?.data?.name);
      setValue('surname', auth?.data?.surname);
      setValue('phone', auth?.data?.phone);
      setValue('email', auth?.data?.email);
      setValue('avatar', auth?.data?.avatar);
    }
  }, [auth]);
  const uploadInputRef = useRef(null);
  return (
    <Box>
      <Box sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', marginTop: '20px', marginBottom: '40px', position: 'relative' }}>
        {uploadAvatar || (auth?.data?.avatar && !isDeleteAvatar) ? (
          <Box
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid trasparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <img
              src={uploadAvatar ? URL.createObjectURL(uploadAvatar) : `${process.env.REACT_APP_SERVER_URL}/${auth?.data?.avatar}`}
              style={{
                objectFit: 'cover',
                display: 'block',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <Person sx={{ opacity: '0.4', fontSize: '60px', marginLeft: '2px', transform: 'translateY(-1px)' }} />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <Button
            onClick={() => {
              uploadInputRef.current.click();
            }}
            sx={{ marginBottom: '10px' }}
            endIcon={<Upload sx={{}} />}>
            Загрузить фото
          </Button>
          {(uploadAvatar || auth?.data?.avatar) && !isDeleteAvatar && (
            <Button
              color="error"
              endIcon={<Delete />}
              onClick={() => {
                console.error('[ERROR] Upload avatar...');
                // setIsDeleteAvatar(true);
                // setUploadAvatar(null);
              }}>
              Удалить фото
            </Button>
          )}
        </Box>
      </Box>{' '}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '20px' }}>
        <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <TextField InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} size="small" error={errors?.name} label={'Имя'} helperText={errors?.name && 'Заполните поле'} {...field} />} />
        <Controller name="surname" control={control} rules={{ required: false }} render={({ field }) => <TextField InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} size="small" error={errors?.surname} label={'Фамилия'} helperText={errors?.surname && 'Заполните поле'} {...field} />} />{' '}
        <Controller
          name="phone"
          control={control}
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
              InputLabelProps={{ shrink: true }}
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
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты',
            },
          }}
          render={({ field }) => <TextField InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} size="small" error={errors?.email} label={'Почта'} helperText={errors?.email?.type == 'pattern' ? 'Неверный формат почты' : errors?.email ? 'Заполните поле' : ''} {...field} />}
        />
        <input
          style={{ display: 'none', visibility: 'hidden' }}
          ref={uploadInputRef}
          type="file"
          onChange={(event) => {
            setIsDeleteAvatar(false);
            setUploadAvatar(event.target.files[0]);
          }}
        />
      </Box>
      <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ marginTop: '20px', backgroundColor: 'success.light' }}>
        Сохранить
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem('token');
          checkAuth();
        }}
        variant="contained"
        color="error"
        sx={{ width: '174px', margin: '50px auto 0', display: 'block' }}>
        Выход
      </Button>
      {settingRequest?.loading && <Loading style={{ top: '79%', left: '48%' }} />}
      <InfoAlert show={showAlert} text={'Информация сохранена'} />
    </Box>
  );
};

export default AccountSettings;

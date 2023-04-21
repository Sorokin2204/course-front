import { Box, Button, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../../admin/InfoAlert/InfoAlert';
import Categories from '../Categories/Categories';
import Loading from '../Loading/Loading';
import UploadImages from '../UploadImages/UploadImages';
import styles from './AdvertContent.module.scss';
const { v4: uuidv4 } = require('uuid');
const AdvertContent = ({ dataAdvert }) => {
  const [createAdvert, setCreateAdvert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ defaultValues: { category: '' } });
  useEffect(() => {
    if (dataAdvert) {
      let existImages = [];
      dataAdvert?.images?.map((itemImg) => {
        existImages.push({ ID: uuidv4(), file: itemImg?.path, innerId: itemImg?.id });
      });
      setValue('title', dataAdvert?.title);
      setValue('desc', dataAdvert?.desc);
      setValue('category', dataAdvert?.categoryId);
      setValue('price', dataAdvert?.price);
      setValue('images', existImages);
    }
  }, [dataAdvert]);

  const onSubmit = (data) => {
    setCreateAdvert({ loading: true });

    axios
      .post(apiUrl(dataAdvert ? `advert/update/${dataAdvert?.id}` : 'advert/add'), data, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/account');
        }, 2000);

        setCreateAdvert({ loading: false, data: res.data });
      })
      .catch((res) => {
        setCreateAdvert({ loading: false, error: true });
      });
  };

  const watchCategory = watch('category');

  return (
    <Box sx={{ marginTop: '20px', position: 'relative' }}>
      <Box sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>{dataAdvert ? 'Редактирование объявления' : 'Подача объявления'}</Box>
      <UploadImages control={control} name="images" />
      <Box sx={{ maxWidth: '600px' }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField InputLabelProps={{ shrink: true }} sx={{ marginTop: '20px', width: '100%' }} size="small" error={errors?.title} label={'Название товара/услуги'} helperText={errors?.title && 'Заполните поле'} {...field} />}
        />
        <Categories
          title="Выберите категорию"
          activeCategory={watchCategory}
          setActiveCategory={(cat) => {
            setValue('category', cat?.id);
          }}
        />

        <Controller
          name="desc"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField InputLabelProps={{ shrink: true }} sx={{ width: '100%', marginTop: '20px', '& textarea': { fontFamily: 'Montserrat, sans-serif' } }} error={errors?.desc} multiline rows={6} label="Описание" helperText={errors?.desc && 'Заполните поле'} {...field} />}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box>₽</Box>
                  </InputAdornment>
                ),
                inputComponent: NumericFormat,
              }}
              inputProps={{ thousandSeparator: ' ' }}
              sx={{ width: '100%', marginTop: '20px' }}
              label="Цена"
              error={errors?.price}
              multiline
              rows={6}
              helperText={errors?.price && 'Заполните поле'}
              {...field}
            />
          )}
        />

        <Button onClick={handleSubmit(onSubmit)} variant="contained" size="large" sx={{ width: '100%', marginTop: '20px', backgroundColor: 'success.light' }}>
          {dataAdvert ? 'Сохранить' : 'Подать объявление'}
        </Button>
        <InfoAlert show={showAlert} text={dataAdvert ? 'Объявление изменено' : 'Объявление создано'} />
      </Box>
      {(createAdvert?.loading || showAlert) && <Loading style={{ top: '50%', left: '50%' }} />}
    </Box>
  );
};

export default AdvertContent;

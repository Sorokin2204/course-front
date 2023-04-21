import { Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import PageContentList from '../../../components/admin/PageContentList/PageContentList';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import styles from './PageAddEdit.module.scss';
const PageAddEdit = ({ isNews = false, data = null, textCreate, textSave, redirectAfterSave }) => {
  const defaultValues = data ? data : { name: '', slug: '', pageContent: [], dateNews: moment().format('YYYY-MM-DD').toString(), isBreakingNews: false, isDocsNews: false };
  const contentForm = useForm({ defaultValues });
  const [pageContentRequest, setPageContentRequest] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setPageContentRequest({ loading: true });
    axios.post(apiUrl('page/create'), { ...data, type: isNews ? 'news' : 'page' }).then(() => {
      setShowAlert(true);
      setPageContentRequest({ loading: false, data: true });
      setTimeout(() => {
        navigate(redirectAfterSave);
      }, 1000);
    });
  };
  console.log(contentForm.watch());
  const isBreakingNews = contentForm.watch('isBreakingNews');
  const isDocsNews = contentForm.watch('isDocsNews');
  const dateNews = contentForm.watch('dateNews');
  const errors = contentForm?.formState?.errors;
  return (
    <div>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '16px', marginBottom: '16px' }}>
        <Controller name="name" control={contentForm.control} rules={{ required: true }} render={({ field }) => <TextField error={errors?.name} helperText={errors?.name && 'Заполните поле'} label={'Название'} {...field} />} />
        <Controller name="slug" control={contentForm.control} rules={{ required: true }} render={({ field }) => <TextField error={errors?.slug} label={'Путь'} helperText={errors?.slug ? 'Заполните поле' : 'Путь к старнице. Например /contact'} {...field} />} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isNews && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Дата"
              type="date"
              onChange={(e) => {
                contentForm.setValue('dateNews', e.target.value);
              }}
              sx={{ width: '150px', mr: 2 }}
              value={dateNews}
              InputLabelProps={{
                shrink: true,
              }}
            />{' '}
            <FormControlLabel
              value={isBreakingNews}
              onChange={(e) => {
                contentForm.setValue('isBreakingNews', e.target.checked);
              }}
              control={<Checkbox checked={isBreakingNews} />}
              label="Срочная новость"
            />
            <FormControlLabel
              value={isDocsNews}
              onChange={(e) => {
                contentForm.setValue('isDocsNews', e.target.checked);
              }}
              control={<Checkbox checked={isDocsNews} />}
              label="Нормативные документы"
            />
          </Box>
        )}

        <Button onClick={contentForm.handleSubmit(onSubmit)} variant="contained" sx={{ backgroundColor: 'success.light', ml: 'auto', display: 'flex' }}>
          Сохранить
        </Button>
      </Box>
      {isNews && (
        <Controller
          name="newsDesc"
          control={contentForm.control}
          rules={{ required: true }}
          render={({ field }) => <TextField error={errors?.newsDesc} sx={{ width: '100%', mt: 3, mb: 3 }} rows={5} multiline helperText={errors?.newsDesc && 'Заполните поле'} label={'Краткое описание'} {...field} />}
        />
      )}

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>Контент</Typography> <PageContentList form={contentForm} name="pageContent" />
      </Box>
      {pageContentRequest?.loading && <Loading />}

      <InfoAlert show={showAlert} text={data ? textSave : textCreate} />
    </div>
  );
};

export default PageAddEdit;

import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../../admin/InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import styles from './CategoryEdit.module.scss';
const CategoryEdit = () => {
  const [getPageSingle, setGetPageSingle] = useState({ loading: false });
  const [changeNameCategory, setChangeNameCategory] = useState({ loading: false });
  const [disalbeCategory, setDisableCategory] = useState({ loading: false });
  const [createCategory, setCreateCategory] = useState({ loading: false });
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    axios
      .get(apiUrl('categories'))
      .then((res) => {
        setGetPageSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetPageSingle({ loading: false, error: true });
      });
  };
  const [showAlert, setShowAlert] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const createCat = () => {
    setCreateCategory({ loading: true });
    axios
      .get(apiUrl('category/create'), {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },

        params: {
          name: newCategoryName,
        },
      })
      .then((res) => {
        setShowAlert('Категория создана');
        setTimeout(() => {
          setCreateCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
          setNewCategoryName('');
        }, 2000);
      })
      .catch((res) => {
        setCreateCategory({ loading: false, error: true });
      });
  };
  const disableCat = (disableId) => {
    setDisableCategory({ loading: true });
    axios
      .get(apiUrl('category/disable'), {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: {
          categoryId: disableId,
        },
      })
      .then((res) => {
        setShowAlert('Категория удалена');
        setTimeout(() => {
          setDisableCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
        }, 2000);
      })
      .catch((res) => {
        setDisableCategory({ loading: false, error: true });
      });
  };
  const editCat = () => {
    setChangeNameCategory({ loading: true });
    axios
      .get(apiUrl('category/change-name'), {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: {
          categoryId: activeCategory?.id,
          newName: activeCategory?.newName,
        },
      })
      .then((res) => {
        setShowAlert('Категория изменена');
        setTimeout(() => {
          setChangeNameCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
        }, 2000);
      })
      .catch((res) => {
        setChangeNameCategory({ loading: false, error: true });
      });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px', marginTop: '30px' }}>
        <Box>
          <Box sx={{ marginBottom: '7px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            <Box>{activeCategory ? `Изменить категорию "${activeCategory?.oldName}"` : 'Добавить категорию'}</Box>
            {activeCategory && (
              <Box
                onClick={() => {
                  setActiveCategory(null);
                }}
                sx={{ marginLeft: '5px', cursor: 'pointer', opacity: '0.5', textDecoration: 'underline' }}>
                Отменить
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {activeCategory ? (
              <TextField
                size="small"
                sx={{ marginRight: '10px', width: '300px' }}
                value={activeCategory?.newName}
                onChange={(e) => {
                  setActiveCategory({ ...activeCategory, newName: e.target.value });
                }}
              />
            ) : (
              <TextField
                size="small"
                sx={{ marginRight: '10px', width: '300px' }}
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                }}
              />
            )}

            {activeCategory ? (
              <Box
                onClick={() => {
                  editCat();
                }}>
                <Save sx={{ cursor: 'pointer', color: 'primary.main', fontSize: '30px' }} />
              </Box>
            ) : (
              <Box>
                <Add
                  onClick={() => {
                    createCat();
                  }}
                  sx={{ cursor: 'pointer', color: 'success.main', fontSize: '30px' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', width: 'min-content', gridGap: '20px 10px', alignItems: 'center' }}>
        {getPageSingle?.data?.map((cat) => (
          <>
            <Box sx={{ ...(activeCategory?.id === cat?.id && { color: '#3f51b5', fontWeight: '700', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }), whiteSpace: 'nowrap' }}>{cat?.name}</Box>
            <Box
              onClick={() => {
                setActiveCategory({ id: cat.id, newName: cat.name, oldName: cat.name });
              }}>
              <Edit sx={{ color: 'success.light', cursor: 'pointer' }} />
            </Box>{' '}
            <Box>
              <Delete
                onClick={() => {
                  disableCat(cat?.id);
                }}
                sx={{ color: 'error.main', cursor: 'pointer' }}
              />
            </Box>
          </>
        ))}
      </Box>
      {(changeNameCategory?.loading || disalbeCategory?.loading || getPageSingle?.loading || createCategory?.loading) && <Loading />}
      {showAlert && <InfoAlert show={showAlert} text={showAlert} />}
    </div>
  );
};

export default CategoryEdit;

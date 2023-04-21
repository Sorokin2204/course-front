import { Box, IconButton } from '@mui/material';
import React from 'react';
import TabsCustom from '../TabsCustom/TabsCustom';
import Wysiwyg from '../Wysiwyg/Wysiwyg';
import styles from './PageContentItem.module.scss';
import { deepPurple } from '@mui/material/colors';
import { Delete } from '@mui/icons-material';
import TableCustom from '../TableCustom/TableCustom';
import FileList from '../FileList/FileList';
const PageContentItem = ({ type, value, order, name, form, id, index, nested, onDelete }) => {
  return (
    <>
      <Box sx={{ mt: 4, mb: 2, display: 'grid', alignItems: 'center', gridTemplateColumns: '40px min-content 40px' }}>
        <Box sx={{ backgroundColor: nested ? deepPurple[400] : 'primary.main', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{index + 1}</Box>
        <Box sx={{ ml: 2, width: 'min-content', fontWeight: '600', fontSize: '18px' }}>{type == 'editor' ? 'Редактор' : type == 'tabs' ? 'Табы' : type == 'table' ? 'Таблица' : type == 'files' ? 'Файлы' : ''}</Box>
        <IconButton disableRipple onClick={onDelete}>
          <Delete color="error" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '40px 1fr' }}>
        <Box></Box>
        <Box> {type == 'editor' ? <Wysiwyg id={id} form={form} name={name} /> : type === 'tabs' ? <TabsCustom form={form} name={name} /> : type === 'table' ? <TableCustom form={form} name={name} /> : type === 'files' ? <FileList form={form} name={name} /> : <></>}</Box>
      </Box>
    </>
  );
};

export default PageContentItem;

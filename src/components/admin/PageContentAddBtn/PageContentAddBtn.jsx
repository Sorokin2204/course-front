import { Add, Description, FileUpload, Folder, Tab, TableChart, Web, Wysiwyg } from '@mui/icons-material';
import { Button, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import styles from './PageContentAddBtn.module.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const PageContentAddBtn = ({ onClick, nested }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (type) => {
    onClick(type);
    handleClose();
  };
  return (
    <>
      <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} onClick={handleClick} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} sx={{ width: '100%', display: 'flex', py: 3, mt: 3 }} variant="outlined" size="large" color="success" endIcon={<Add />}>
        Добавить контент
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ width: '100%' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={() => handleAdd('editor')}>
          <ListItemIcon>
            <Wysiwyg fontSize="small" />
          </ListItemIcon>
          <ListItemText>Редактор</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAdd('files')}>
          <ListItemIcon>
            <Description fontSize="small" />
          </ListItemIcon>
          <ListItemText>Файлы</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAdd('table')}>
          <ListItemIcon>
            <TableChart fontSize="small" />
          </ListItemIcon>
          <ListItemText>Таблица</ListItemText>
        </MenuItem>
        {!nested && (
          <MenuItem onClick={() => handleAdd('tabs')}>
            <ListItemIcon>
              <Tab fontSize="small" />
            </ListItemIcon>
            <ListItemText>Табы</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PageContentAddBtn;

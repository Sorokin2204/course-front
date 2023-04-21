import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFieldArray } from 'react-hook-form';
import PageContentList from '../PageContentList/PageContentList';
import { Button, IconButton, TextField } from '@mui/material';
import { Add, AddCircle, AddCircleOutline, Delete } from '@mui/icons-material';

export default function TabCustom({ form, name }) {
  const [value, setValue] = React.useState(0);
  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control: form.control,
    name: `${name}.value`,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr auto auto', gridGap: '8px' }}>
        <TextField
          sx={{ '& .MuiInputBase-root': { height: '36.5px' } }}
          size="small"
          onChange={(e) => {
            update(value, { ...fields[value], name: e.target.value });
          }}
          value={fields[value].name}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              update(value, { ...fields[value], name: `Таб ${value + 1}` });
            }
          }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: 'success.light' }}
          endIcon={<AddCircleOutline sx={{ color: 'white' }} />}
          disableRipple
          onClick={() => {
            append({ name: `Таб ${fields?.length + 1}`, content: [] });
          }}>
          Добавить
        </Button>{' '}
        <Button
          variant="contained"
          sx={{ backgroundColor: 'error.light' }}
          endIcon={<Delete sx={{ color: 'white' }} />}
          disableRipple
          onClick={() => {
            if (fields?.length > 1) {
              remove(value);
              setValue(0);
            }
          }}>
          Удалить
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', maxWidth: '760px' }}>
        <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="basic tabs example">
          {fields?.map((itemTab, indexTab) => (
            <Tab label={itemTab?.name} {...a11yProps(indexTab)} />
          ))}
        </Tabs>
      </Box>

      {fields?.map((itemTab, indexTab) => (
        <TabPanel value={value} index={indexTab}>
          <PageContentList nested form={form} name={`${name}.value[${indexTab}].content`} />
        </TabPanel>
      ))}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

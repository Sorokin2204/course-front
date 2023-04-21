import { Photo, Upload } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { apiUrl } from '../../../utils/apiUrl';
import ImageDragList from '../ImageDragList/ImageDragList';
import styles from './UploadImages.module.scss';
const { v4: uuidv4 } = require('uuid');
const UploadImages = ({ control, name }) => {
  const uploadInputRef = useRef();
  const imagesList = useFieldArray({
    control: control,
    name: name,
  });

  return (
    <Box sx={{ minHeight: '300px', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <ImageDragList
        onDelete={(deleteIndex) => {
          imagesList.update(deleteIndex, { ...imagesList?.fields?.[deleteIndex], isDeleted: true, isNew: false });
        }}
        handleDrag={({ source, destination }) => {
          if (destination) {
            imagesList.move(source.index, destination.index);
          }
        }}
        list={imagesList?.fields}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Button
          disabled={imagesList?.fields?.filter((image) => !image?.isDeleted)?.length >= 9}
          onClick={() => {
            uploadInputRef.current.click();
          }}
          endIcon={<Upload />}
          variant="contained">
          Добавить фотографии
        </Button>
        <Box sx={{ marginTop: '10px', display: 'flex', alignItems: 'center', fontWeight: '600', opacity: '0.7', paddingBottom: '40px' }}>
          <Photo sx={{ marginRight: '8px' }} />
          {`Загруженно ${imagesList?.fields?.filter((image) => !image?.isDeleted)?.length} из 9`}
        </Box>
      </Box>
      <input
        style={{ display: 'none', visibility: 'hidden' }}
        ref={uploadInputRef}
        type="file"
        multiple
        onChange={(event) => {
          let maxIndex = 9 - imagesList?.fields?.filter((image) => !image?.isDeleted)?.length;

          for (let newFile of event.target.files) {
            if (maxIndex !== 0) {
              const formData = new FormData();
              formData.append('file', newFile);
              axios.post(apiUrl('file/upload'), formData).then((res) => {
                if (res.data.status === 'success') {
                  imagesList.append({
                    ID: uuidv4(),
                    file: res.data.path,
                    isNew: true,
                  });
                }
              });

              maxIndex--;
            }
          }
        }}
      />
    </Box>
  );
};

export default UploadImages;

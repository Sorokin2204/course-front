import { Close, DragHandle, FileCopy, Image } from '@mui/icons-material';
import { Box, FormControlLabel, IconButton, Switch } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray } from 'react-hook-form';
import styles from './FileList.module.scss';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { getFileExt } from '../../../utils/getFileExt';
import { getFileName } from '../../../utils/getFileName';
import { getFileSize } from '../../../utils/getFileSize';
import moment from 'moment';
import 'moment/locale/ru'; // without this line it didn't work
import OutsideClickHandler from 'react-outside-click-handler';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
moment.locale('ru');

const FileList = ({ name, form }) => {
  const filesForm = useFieldArray({
    control: form.control,
    name: `${name}.value`,
  });
  const onDrop = useCallback((acceptedFiles) => {
    for (let uploadFile of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', uploadFile);
      console.log(formData);
      axios.post(apiUrl('file/upload'), formData).then((res) => {
        if (res.data.status === 'success') {
          filesForm.append({
            name: getFileName(uploadFile.name),
            size: getFileSize(uploadFile.size),
            type: getFileExt(uploadFile.name),
            date: new Date(),
            file: uploadFile,
            isEdit: false,
            path: res.data.path,
          });
        }
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleDrag = ({ source, destination }) => {
    if (destination) {
      filesForm.move(source.index, destination.index);
    }
  };
  const [isDragStart, setIsDragStart] = useState(false);
  return filesForm?.fields?.length !== 0 ? (
    <>
      <FormControlLabel
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'start',
          marginRight: 'auto',
          width: 'min-content',
          '& .MuiFormControlLabel-label': {
            whiteSpace: 'nowrap',
          },
        }}
        control={
          <Switch
            sx={{}}
            checked={isDragStart}
            onChange={(event) => {
              setIsDragStart(event.target.checked);
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Настройка порядка"
      />
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ ...(!isDragStart ? { display: 'inline-flex', flexWrap: 'wrap' } : { display: 'grid', gridTemplateColumns: 'min-content' }) }}>
              {filesForm?.fields?.map((itemFile, indexFile) => (
                <Draggable key={itemFile?.id} draggableId={itemFile?.id} index={indexFile}>
                  {(provided, snapshot) => (
                    <Box
                      key={itemFile?.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ paddingRight: '2px', height: '60px', backgroundColor: 'rgba(25, 118, 210, 0.2)', borderRadius: '4px', display: 'grid', gridTemplateColumns: 'auto 55px', marginRight: '16px', alignItems: 'center', position: 'relative', mb: 2, width: 'min-content' }}>
                      <IconButton {...provided.dragHandleProps} sx={{ display: isDragStart ? 'block' : 'none', position: 'absolute', left: '-40px', top: '6px' }}>
                        <DragHandle />
                      </IconButton>
                      <Box sx={{ marginTop: '-3px', padding: '0 12px 0 16px', display: 'flex', flexDirection: 'column' }}>
                        {itemFile?.isEdit ? (
                          <input
                            autoFocus
                            style={{
                              borderRadius: '2px',
                              marginBottom: '4px',
                              height: '24px',
                              maxWidth: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                              display: 'block',
                              fontSize: '16px',
                              outline: 'none',
                              border: 'none',
                              padding: '2px 4px',
                            }}
                            type="text"
                            defaultValue={itemFile?.name}
                            onBlur={(e) => {
                              let newName = e.target.value;
                              if (newName?.length === 0) {
                                newName = `Новый файл ${indexFile + 1}`;
                              }
                              filesForm.update(indexFile, { ...itemFile, isEdit: false, name: newName });
                            }}
                          />
                        ) : (
                          <Box
                            sx={{ whiteSpace: 'nowrap', mb: 0.5 }}
                            onClick={() => {
                              filesForm.update(indexFile, { ...itemFile, isEdit: true });
                            }}>
                            {itemFile?.name}
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ whiteSpace: 'nowrap', mr: 2, fontSize: '12px', opacity: '0.7' }}>{moment(itemFile?.date).format('DD MMM YYYY').toString()}</Box> <Box sx={{ marginRight: '-8px', fontSize: '12px', opacity: '0.7', whiteSpace: 'nowrap' }}>{itemFile?.size}</Box>
                        </Box>
                      </Box>
                      <Box sx={{ position: 'relative' }}>
                        <InsertDriveFileOutlinedIcon
                          sx={{
                            marginTop: '2px',
                            fontSize: '55px',
                            // transform: 'scale(2.2)',
                            opacity: '0.6',
                          }}
                        />
                        <Box sx={{ position: 'absolute', top: '39%', left: '50%', transform: 'translate(-50%)', fontWeight: '600', opacity: '0.6', textTransform: 'uppercase', fontSize: '11px' }}>{itemFile?.type}</Box>
                      </Box>
                      <IconButton
                        size="small"
                        sx={{
                          transform: 'scale(0.6)',
                          '&:hover': {
                            backgroundColor: 'error.main',
                          },
                          backgroundColor: 'error.main',
                          position: 'absolute',
                          right: '-15px',
                          top: '-15px',
                        }}
                        onClick={() => {
                          filesForm.remove(indexFile);
                        }}>
                        <Close sx={{ color: 'white' }} />
                      </IconButton>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div style={{ cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100px', border: '3px dashed rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '600', color: 'rgba(0,0,0,0.5)' }}>
            Добавить файл
            <Image sx={{ ml: 1, fontSize: '21px' }} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '140px', border: '3px dashed rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: 'rgba(0,0,0,0.5)' }}>
          Переместите файлы сюда
          <Image sx={{ ml: 1 }} />
        </div>
      </div>
    </div>
  );
};

export default FileList;

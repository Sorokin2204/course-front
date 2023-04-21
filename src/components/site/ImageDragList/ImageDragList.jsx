import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useFieldArray } from 'react-hook-form';
import styles from './ImageDragList.module.scss';
const ImageDragList = ({ list, handleDrag, onDelete }) => {
  // const imagesList = useFieldArray({
  //   control: control,
  //   name: name,
  // });
  // console.log(imagesList.fields);
  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div style={{ display: 'flex', width: '100%', padding: '40px 20px 40px 20px' }} {...provided.droppableProps} ref={provided.innerRef}>
              {list?.map(
                (itemRow, indexRow) =>
                  !itemRow?.isDeleted && (
                    <Draggable key={itemRow?.ID} draggableId={itemRow?.ID} index={indexRow}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            position: 'relative',
                            marginRight: '10px',
                            marginBottom: '5px',
                          }}>
                          <img style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '4px' }} src={`${process.env.REACT_APP_SERVER_URL}/${itemRow?.file}`} />
                          <Box
                            onClick={() => {
                              onDelete(indexRow);
                            }}
                            sx={{
                              cursor: 'pointer',
                              position: 'absolute',
                              top: '-5px',
                              right: '-5px',
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#d32f2f',
                              borderRadius: '50%',
                            }}>
                            <Close sx={{ color: '#fff', fontSize: '16px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                          </Box>
                          {indexRow == 0 && <Box sx={{ position: 'absolute', fontWeight: '600', color: 'rgb(44, 56, 126)', fontSize: '16px', bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}>Главная</Box>}
                        </Box>
                        // <TableRow ref={provided.innerRef} {...provided.draggableProps} key={itemRow?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        //   <TableCell sx={{ p: 0, backgroundColor: itemRow?.row?.[0]?.groupName ? 'primary.main' : 'transparent' }} align="center" width="40px">
                        //     <IconButton {...provided.dragHandleProps} disableRipple>
                        //       <DragHandle sx={{ color: itemRow?.row?.[0]?.groupName ? 'white' : 'default' }} />
                        //     </IconButton>
                        //   </TableCell>
                        //   {itemRow?.row?.[0]?.groupName ? (
                        //     <TableCell sx={{ textAlign: 'center', backgroundColor: 'primary.main' }} colSpan={headerForm?.fields?.length}>
                        //       <TextField
                        //         inputProps={{ style: { textAlign: 'center' } }}
                        //         sx={{ '& .MuiInputBase-root': { background: '#fff', height: '30.75px', border: 'none !important', textAlign: 'center' } }}
                        //         size="small"
                        //         onChange={(e) => {
                        //           form.setValue(`${name}.value.data[${indexRow}].row[0].groupName`, e.target.value);
                        //         }}
                        //         value={itemRow?.row?.[0]?.groupName}
                        //         onBlur={(e) => {
                        //           if (e.target.value.length === 0) {
                        //             form.setValue(`${name}.value.data[${indexRow}].row[0].groupName`, 'Новая группа');
                        //           }
                        //         }}
                        //       />
                        //     </TableCell>
                        //   ) : (
                        //     itemRow?.row?.map((itemCell, indexCell) => (
                        //       <TableCell sx={{ p: 0 }} align="center">
                        //         {isServiceTable ? (
                        //           indexCell === 0 ? (
                        //             <textarea
                        //               className="input-table-service"
                        //               style={{ height: '80px' }}
                        //               row={3}
                        //               value={itemCell?.value}
                        //               onChange={(event) => {
                        //                 form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, event.target.value);
                        //               }}
                        //             />
                        //           ) : indexCell === 1 ? (
                        //             <input
                        //               className="input-table-service"
                        //               value={itemCell?.value}
                        //               type="text"
                        //               onChange={(event) => {
                        //                 form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, event.target.value);
                        //               }}
                        //             />
                        //           ) : (
                        //             <NumericFormat
                        //               className="input-table-service"
                        //               value={itemCell?.value}
                        //               type="text"
                        //               thousandSeparator={' '}
                        //               onValueChange={(val) => {
                        //                 form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, val.formattedValue);
                        //               }}
                        //             />
                        //           )
                        //         ) : (
                        //           <Wysiwyg form={form} name={`${name}.value.data[${indexRow}].row[${indexCell}]`} id={`${itemRow?.id}-${indexCell}`} className={'quill-table'} />
                        //         )}
                        //       </TableCell>
                        //     ))
                        //   )}

                        //   <TableCell sx={{ p: 0, backgroundColor: itemRow?.row?.[0]?.groupName ? 'primary.main' : 'transparent' }} align="center" width="40px">
                        //     <IconButton
                        //       disableRipple
                        //       onClick={() => {
                        //         if (tableForm.fields?.length > 1) {
                        //           tableForm.remove(indexRow);
                        //         }
                        //       }}>
                        //       <Delete color="error" />
                        //     </IconButton>
                        //   </TableCell>
                        // </TableRow>
                      )}
                    </Draggable>
                  ),
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ImageDragList;

import React from 'react';
import styles from './TableCustom.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Button, FormControlLabel, IconButton, Link, Switch, TextField } from '@mui/material';
import { Add, Delete, DragHandle, Edit, Group, HorizontalSplit, LocalParking, OpenInBrowser, OpenInNew, ViewColumn, ViewHeadline } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useFieldArray } from 'react-hook-form';
import Wysiwyg from '../Wysiwyg/Wysiwyg';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { NumericFormat } from 'react-number-format';
const TableCustom = ({ form, name }) => {
  const headerForm = useFieldArray({
    control: form.control,
    name: `${name}.value.header`,
  });
  const tableForm = useFieldArray({
    control: form.control,
    name: `${name}.value.data`,
  });

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      tableForm.move(source.index, destination.index);
    }
  };
  const watchTitle = form.watch(`${name}.value.title`);
  const isServiceTable = form.watch(`${name}.value.isServiceTable`);
  const isPagination = form.watch(`${name}.value.isPagination`);
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isServiceTable}
              onChange={(event) => {
                const isServiceTableVal = event.target.checked;
                if (isServiceTableVal) {
                  form.setValue(`${name}.value`, {
                    isServiceTable: true,
                    isPagination: isPagination,
                    title: watchTitle,
                    header: [
                      { name: 'Наименование', type: 'textarea' },
                      { name: 'Объем работ', type: 'text' },
                      { name: 'Цена', type: 'number' },
                    ],
                    data: [{ row: [{ value: '' }, { value: '' }, { value: '' }] }],
                  });
                  headerForm.update(0, { name: 'Наименование', type: 'textarea' });
                  tableForm.update(0, { row: [{ value: '' }, { value: '' }, { value: '' }] });
                } else {
                  form.setValue(`${name}.value`, { isServiceTable: false, isPagination: isPagination, title: watchTitle, header: [{ name: 'Колонка 1', type: 'editor' }], data: [{ row: [{ value: '' }] }] });
                  tableForm?.update(0, { row: [{ value: '' }] });
                  headerForm?.update(0, { name: 'Колонка 1', type: 'editor' });
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Таблица услуг"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isPagination}
              onChange={(event) => {
                form.setValue(`${name}.value.isPagination`, event.target.checked);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Пагинация"
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gridGap: '8px' }}>
        <TextField
          sx={{ '& .MuiInputBase-root': { height: '30.75px' } }}
          size="small"
          onChange={(e) => {
            form.setValue(`${name}.value.title`, e.target.value);
          }}
          value={watchTitle}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              form.setValue(`${name}.value.title`, 'Новая таблица');
            }
          }}
        />
        <Button
          onClick={() => {
            tableForm.append({ row: [{ value: '', groupName: 'Новая группа' }] });
          }}
          variant="contained"
          size="small"
          sx={{ mb: 3 }}
          endIcon={<HorizontalSplit />}>{` Группа`}</Button>
        <Button
          onClick={() => {
            tableForm.append({ row: headerForm?.fields?.map(() => ({ value: '' })) });
          }}
          size="small"
          variant="contained"
          sx={{ mb: 3 }}
          endIcon={<ViewHeadline />}>{`Строка`}</Button>
        {!isServiceTable && (
          <Button
            onClick={() => {
              tableForm?.fields?.map((itemTable, indexTable) => tableForm.update(indexTable, { row: [...itemTable.row, { value: '' }] }));
              headerForm.append({ name: `Колонка ${headerForm?.fields?.length}` });
            }}
            size="small"
            variant="contained"
            sx={{ mb: 3 }}
            endIcon={<ViewHeadline sx={{ transform: 'rotate(90deg)' }} />}>{` Колонка`}</Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 0 }} align="center"></TableCell>

              {headerForm?.fields?.map((itemHeader, indexHeader) => (
                <TableCell align="center">
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 40px', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                      disabled={isServiceTable}
                      sx={{ '& .MuiInputBase-root': { height: '30.75px' } }}
                      size="small"
                      onChange={(e) => {
                        headerForm.update(indexHeader, { ...itemHeader, name: e.target.value });
                      }}
                      value={itemHeader?.name}
                      onBlur={(e) => {
                        if (e.target.value.length === 0) {
                          headerForm.update(indexHeader, { ...itemHeader, name: `Колонка ${indexHeader + 1}` });
                        }
                      }}
                    />
                    {!isServiceTable && (
                      <IconButton
                        disableRipple
                        onClick={() => {
                          if (headerForm?.fields?.length > 1) {
                            tableForm?.fields?.map((itemTable, indexTable) => {
                              if (!itemTable?.row?.[0]?.groupName) {
                                tableForm.update(indexTable, { row: itemTable.row?.filter((itemRowMap, itemRowMapIndex) => itemRowMapIndex !== indexHeader) });
                              }
                            });
                            headerForm.remove(indexHeader);
                          }
                        }}>
                        <Delete color="error" />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              ))}

              <TableCell sx={{ p: 0 }} align="center"></TableCell>
            </TableRow>
          </TableHead>

          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {tableForm?.fields?.map((itemRow, indexRow) => (
                    <Draggable key={itemRow?.id} draggableId={itemRow?.id} index={indexRow}>
                      {(provided, snapshot) => (
                        <TableRow ref={provided.innerRef} {...provided.draggableProps} key={itemRow?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell sx={{ p: 0, backgroundColor: itemRow?.row?.[0]?.groupName ? 'primary.main' : 'transparent' }} align="center" width="40px">
                            <IconButton {...provided.dragHandleProps} disableRipple>
                              <DragHandle sx={{ color: itemRow?.row?.[0]?.groupName ? 'white' : 'default' }} />
                            </IconButton>
                          </TableCell>
                          {itemRow?.row?.[0]?.groupName ? (
                            <TableCell sx={{ textAlign: 'center', backgroundColor: 'primary.main' }} colSpan={headerForm?.fields?.length}>
                              <TextField
                                inputProps={{ style: { textAlign: 'center' } }}
                                sx={{ '& .MuiInputBase-root': { background: '#fff', height: '30.75px', border: 'none !important', textAlign: 'center' } }}
                                size="small"
                                onChange={(e) => {
                                  form.setValue(`${name}.value.data[${indexRow}].row[0].groupName`, e.target.value);
                                }}
                                value={itemRow?.row?.[0]?.groupName}
                                onBlur={(e) => {
                                  if (e.target.value.length === 0) {
                                    form.setValue(`${name}.value.data[${indexRow}].row[0].groupName`, 'Новая группа');
                                  }
                                }}
                              />
                            </TableCell>
                          ) : (
                            itemRow?.row?.map((itemCell, indexCell) => (
                              <TableCell sx={{ p: 0 }} align="center">
                                {isServiceTable ? (
                                  indexCell === 0 ? (
                                    <textarea
                                      className="input-table-service"
                                      style={{ height: '80px' }}
                                      row={3}
                                      value={itemCell?.value}
                                      onChange={(event) => {
                                        form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, event.target.value);
                                      }}
                                    />
                                  ) : indexCell === 1 ? (
                                    <input
                                      className="input-table-service"
                                      value={itemCell?.value}
                                      type="text"
                                      onChange={(event) => {
                                        form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, event.target.value);
                                      }}
                                    />
                                  ) : (
                                    <NumericFormat
                                      className="input-table-service"
                                      value={itemCell?.value}
                                      type="text"
                                      thousandSeparator={' '}
                                      onValueChange={(val) => {
                                        form.setValue(`${name}.value.data[${indexRow}].row[${indexCell}].value`, val.formattedValue);
                                      }}
                                    />
                                  )
                                ) : (
                                  <Wysiwyg form={form} name={`${name}.value.data[${indexRow}].row[${indexCell}]`} id={`${itemRow?.id}-${indexCell}`} className={'quill-table'} />
                                )}
                              </TableCell>
                            ))
                          )}

                          <TableCell sx={{ p: 0, backgroundColor: itemRow?.row?.[0]?.groupName ? 'primary.main' : 'transparent' }} align="center" width="40px">
                            <IconButton
                              disableRipple
                              onClick={() => {
                                if (tableForm.fields?.length > 1) {
                                  tableForm.remove(indexRow);
                                }
                              }}>
                              <Delete color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableCustom;

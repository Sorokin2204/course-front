import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PageContentAddBtn from '../PageContentAddBtn/PageContentAddBtn';
import PageContentItem from '../PageContentItem/PageContentItem';
import Wysiwyg from '../Wysiwyg/Wysiwyg';
import styles from './PageContentList.module.scss';
const PageContentList = ({ name, form, nested }) => {
  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control: form.control,
    name,
  });
  return (
    <>
      {fields?.map(
        (itemContent, itemContentIndex) =>
          !itemContent?.deleted && (
            <PageContentItem
              onDelete={() => {
                update(itemContentIndex, { ...itemContent, deleted: true });
              }}
              nested={nested}
              {...itemContent}
              key={itemContent.id}
              form={form}
              name={`${name}[${itemContentIndex}]`}
              index={itemContentIndex}
            />
          ),
      )}
      <PageContentAddBtn
        nested={nested}
        onClick={(typeContent) => {
          if (typeContent === 'tabs') {
            append({ type: typeContent, value: [{ name: 'Таб 1', content: [] }] });
          } else if (typeContent === 'editor') {
            append({ type: typeContent, value: '' });
          } else if (typeContent === 'table') {
            append({ type: typeContent, value: { isServiceTable: false, isPagination: false, title: 'Новая таблица', header: [{ name: 'Колонка 1', type: 'editor' }], data: [{ row: [{ value: '' }] }] } });
          } else if (typeContent === 'files') {
            append({ type: typeContent, value: '' });
          }
        }}
      />
    </>
  );
};

export default PageContentList;

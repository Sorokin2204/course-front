import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';
const Wysiwyg = ({ name, form, id, className = 'quill-custom' }) => {
  const watchValue = form.watch(`${name}.value`);
  function imageHandler() {
    var range = this.quill.getSelection();
    var valuee = prompt('please copy paste the image url here.');
    if (valuee) {
      this.quill.insertEmbed(range.index, 'image', valuee, Quill.sources.USER);
    }
  }
  const formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'script', 'header', 'blockquote', 'code-block', 'indent', 'list', 'direction', 'align', 'link', 'image', 'video', 'formula'];
  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#toolbar-${id}`,

        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return (
    <>
      <CustomToolbar id={id} />
      <ReactQuill
        className={className}
        value={watchValue}
        onChange={(newValue) => {
          form.setValue(`${name}.value`, newValue);
        }}
        modules={modules}
        formats={formats}
        defaultValue={watchValue}
      />
    </>
  );
};

export default Wysiwyg;

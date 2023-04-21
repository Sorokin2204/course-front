import { Close } from '@mui/icons-material';
import clsx from 'clsx';
import React from 'react';
import styles from './ModalThanks.module.scss';
const ModalThanks = ({ show, onClose, text }) => {
  return (
    <div className={clsx(styles.overlay, show && styles.active)} onClick={onClose}>
      <div
        className={clsx(styles.modal)}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <button className={clsx(styles.close)} onClick={onClose}>
          <Close />
        </button>
        <h2 className={clsx(styles.title)}>{text}</h2>
      </div>
    </div>
  );
};

export default ModalThanks;

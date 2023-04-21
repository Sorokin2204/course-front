import React from 'react';
import styles from './Loading.module.scss';
const Loading = ({ style }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader} style={{ ...style }}></div>
    </div>
  );
};

export default Loading;

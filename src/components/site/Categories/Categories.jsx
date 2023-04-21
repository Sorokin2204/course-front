import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './Categories.module.scss';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const Categories = ({ title = 'Все категории', setActiveCategory, activeCategory, noDefault = false, onAfterLink = () => {} }) => {
  const params = {
    spaceBetween: 30,
    slidesPerView: 'auto',
    slideClass: 'swiper-slide-category',
    // containerClass: 'swiper-category',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      reachEnd: () => {
        console.log('end');
      },
      reachBeginning: () => {
        console.log('end');
      },
    },
  };
  const [getPageSingle, setGetPageSingle] = useState({ loading: true });
  useEffect(() => {
    axios
      .get(apiUrl('categories'))
      .then((res) => {
        if (setActiveCategory && !noDefault) {
          setActiveCategory(res.data[0]);
        }

        setGetPageSingle({ loading: false, data: res.data });
      })
      .catch((res) => {
        setGetPageSingle({ loading: false, error: true });
      });
  }, []);
  const chunk = (arr) => {
    const size = 4;
    if (!arr) return [];
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
      const last = chunkedArray[chunkedArray.length - 1];
      if (!last || last.length === size) {
        chunkedArray.push([arr[i]]);
      } else {
        last.push(arr[i]);
      }
    }
    return chunkedArray;
  };
  return (
    <>
      <div className={styles.title}>{title}</div>

      {getPageSingle?.data && (
        <div style={{ width: '100%' }}>
          <Swiper {...params} containerClass="swiper-container swiper-category">
            {chunk(getPageSingle?.data)?.map((list) => (
              <div>
                <div className={styles.list}>
                  {list?.map((item) => (
                    <div className={clsx(styles.item, activeCategory == item?.id && styles.itemActive)}>
                      {setActiveCategory ? (
                        <a
                          onClick={() => {
                            if (activeCategory == item?.id && noDefault) {
                              setActiveCategory(null);
                            } else {
                              setActiveCategory(item);
                            }
                          }}>
                          {item?.name}
                        </a>
                      ) : (
                        <Link
                          onClick={() => {
                            onAfterLink();
                          }}
                          to={`/category/${item?.id}`}>
                          {item?.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Categories;

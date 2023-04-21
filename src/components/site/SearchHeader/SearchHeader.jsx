import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './SearchHeader.module.scss';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate } from 'react-router';
const SearchHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        axios.get(apiUrl('search'), { params: { search: searchTerm } }).then((res) => {
          let result = res.data;

          if ('новости'.includes(searchTerm) || 'все новости'.includes(searchTerm.toLowerCase())) {
            result.push({ type: 'list', name: 'Новости', slug: 'news/list' });
          }
          if ('дома'.includes(searchTerm) || 'список домов'.includes(searchTerm.toLowerCase()) || 'Все дома'.includes(searchTerm)) {
            result.push({ type: 'list', name: 'Cписок домов', slug: 'house/list' });
          }
          setSearchResult(result);
        });
      } else {
        setSearchResult(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const navigate = useNavigate();
  return (
    <div className={styles.wrap}>
      <div className={clsx(styles.wrapInput)}>
        <input
          onFocus={() => {
            setShowMenu(true);
          }}
          onClick={() => {
            setShowMenu(true);
          }}
          type="text"
          className={clsx(styles.input)}
          placeholder="Поиск по сайту"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn">Найти</button>
      </div>
      {showMenu && searchResult && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowMenu(false);
          }}>
          <div className={clsx(styles.menu)}>
            {searchResult?.length >= 1 ? (
              searchResult?.map((item) => (
                <button
                  onClick={() => {
                    if (item?.type == 'news') {
                      navigate(`/news/${item?.slug}`);
                    } else if (item?.type == 'page') {
                      navigate(`/${item?.slug}`);
                    } else if (item?.type == 'house') {
                      navigate(`/house/${item?.slug}`);
                    } else if (item?.type == 'list') {
                      navigate(`/${item?.slug}`);
                    }
                    setShowMenu(false);
                  }}
                  title={item?.name}
                  className={clsx(styles.menuLink)}>
                  <span>{item?.type == 'news' ? 'Новость' : item?.type == 'page' || item?.type == 'list' ? 'Страница' : item?.type == 'house' ? 'Дом' : ''}</span>
                  {`${item?.name}`}
                </button>
              ))
            ) : (
              <div class={styles.notFound}>Ничего не найдено</div>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default SearchHeader;

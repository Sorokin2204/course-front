import { Camera, MoreVert, Person, PhotoCamera } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../utils/apiUrl';
import { currencyFormat } from '../../../utils/currencyFormat';
import InfoAlert from '../../admin/InfoAlert/InfoAlert';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './Card.module.scss';
const Card = ({ onChangeStatus, id, img, category, name, user, date, inAccount = false, price = 0, onlyView = false }) => {
  const { checkAuth, auth } = useContext(AuthContext);
  const [showSettings, setShowSettings] = useState(false);
  const [changeStatus, setChangeStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  function changeStatusRequest(newStatus, advertId) {
    setShowSettings(false);
    setChangeStatus({ loading: true });
    axios
      .get(apiUrl('advert/change-status'), {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: {
          status: newStatus,
          advertId,
        },
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          onChangeStatus();
          checkAuth();
        }, 2000);
        setChangeStatus({ loading: false, data: res.data });
      })
      .catch((res) => {
        setChangeStatus({ loading: false, error: true });
      });
  }
  const navigate = useNavigate();

  return (
    <div
      style={{}}
      className={styles.wrap}
      onClick={(e) => {
        if (!onlyView) {
          navigate(`/item/${id}`);
        }
      }}>
      {!onlyView && <div className={styles.go}>Открыть</div>}
      {inAccount && !onlyView && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowSettings(false);
          }}>
          <div className={styles.setting}>
            <button
              className={styles.settingBtn}
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(true);
              }}>
              <MoreVert />
            </button>
            {showSettings && (
              <>
                {auth?.data?.role == 'admin' ? (
                  <div className={clsx(styles.settingMenu)}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('publish', id);
                      }}
                      className={styles.settingItem}>
                      Активно
                    </div>
                    <div
                      className={styles.settingItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('disabled', id);
                      }}>
                      Не активно
                    </div>
                    <div
                      className={styles.settingItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('canceled', id);
                      }}>
                      Откланенно
                    </div>
                    <div
                      className={styles.settingItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('sold', id);
                      }}>
                      Проданно
                    </div>
                  </div>
                ) : (
                  <div className={clsx(styles.settingMenu)}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('disabled', id);
                      }}
                      className={styles.settingItem}>
                      Снять с продажи
                    </div>
                    <div
                      className={styles.settingItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeStatusRequest('sold', id);
                      }}>
                      Ура продал!
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
      <div className={(styles.imageBox, !img && styles.imageBoxEmpty)}>
        {!img && <PhotoCamera sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '50px', opacity: '0.5' }} />}
        <img src={img ? `${process.env.REACT_APP_SERVER_URL}/${img}` : '/img/blank.png'} className={styles.image} />
      </div>
      {!inAccount && (
        <div className={styles.user}>
          {user.avatar ? (
            <img src={`${process.env.REACT_APP_SERVER_URL}/${user.avatar}`} className={styles.avatar} />
          ) : (
            <div className={styles.avatarEmpty}>
              <Person sx={{ fontSize: '18px', opacity: '0.6', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            </div>
          )}

          <div className={styles.username}>{user.name}</div>
        </div>
      )}
      <Link to={category?.slug} class={styles.category}>
        {category?.name}
      </Link>{' '}
      <div style={{ height: '34px', ...(!inAccount && { marginBottom: '40px' }) }}>
        <div className={styles.name}>{name}</div>
      </div>
      {inAccount && !onlyView && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/item/edit/${id}`);
          }}
          variant="contained"
          sx={{
            backgroundColor: 'success.light',
            width: '100%',
            mb: '10px',
            '&:hover': {
              backgroundColor: 'success.main',
            },
          }}>
          Редактировать
        </Button>
      )}
      <div className={styles.bottom}>
        <div className={styles.time}>{moment(date).format('DD.MM.YYYY в hh:mm')}</div>
        <div className={styles.price}>{price ? currencyFormat(price) : 'Договорная'}</div>
      </div>
      {showAlert && <InfoAlert show={showAlert} text={'Объявление снято с продажи'} />}
    </div>
  );
};

export default Card;

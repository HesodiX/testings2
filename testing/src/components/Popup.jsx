import React from 'react'
import style from '../assets/styles/popup.module.css'

const Popup = ({user, onClose}) => {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.popup_wrapper} onClick={handleOverlayClick}>
      <div className={style.popup_item}>
        <div className={style.popup_group}>
          <h1 className={style.popup_title}>
            {user.name}
          </h1>
          <img src="/4.svg" alt="Закрыть" className={style.popup_close_icon} onClick={onClose} />
        </div>
        <div className={style.popup_group_column}>
          <div className={style.info_line}>
            <h1 className={style.info_title}>
              Телефон:
            </h1>
            <div className={style.info_text}>
              {user.phone}
            </div>
          </div>
          <div className={style.info_line}>
            <h1 className={style.info_title}>
              Почта:
            </h1>
            <div className={style.info_text}>
              {user.email}
            </div>
          </div>
          <div className={style.info_line}>
            <h1 className={style.info_title}>
              Дата приема:
            </h1>
            <div className={style.info_text}>
              {user.hire_date}
            </div>
          </div>
          <div className={style.info_line}>
            <h1 className={style.info_title}>
              Адрес:
            </h1>
            <div className={style.info_text}>
              {user.address}
            </div>
          </div>
          <div className={style.info_line}>
            <h1 className={style.info_title}>
              Подразделение:
            </h1>
            <div className={style.info_text}>
              {user.department}
            </div>
          </div>
        </div>
        <div className={style.popup_group_column}>
          <h1 className={style.info_title}>
            Дополнительная информация:
          </h1>
          <div className={style.info_text_outline}>
            {user.position_name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
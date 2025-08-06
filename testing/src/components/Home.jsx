import {React, useEffect, useState} from 'react'
import Popup from './Popup'
import style from '../assets/styles/home.module.css'
import axios from 'axios'

const Home = () => {

  const [userData, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  async function fetchData(params = '') {
    try {
      const response = await axios.get(`http://127.0.0.1:3000?term=${params}`);
      const userData = response.data.data;
      setData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Ошибка:", error.response?.data?.msg || error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(query);
  }

  return (
    <>
      <section>
        {isPopupOpen && (
          <Popup 
            user={selectedUser} 
            onClose={() => setIsPopupOpen(false)}
          />
        )}
        <div className={style.search_wrapper}>
          <form className={style.search_form} onSubmit={handleSubmit}>
            <input className={style.search_input} type="text" name="term" id="name" onChange={(e) => handleChange(e)} />
            <button className={style.search_form_btn} type="submit">
              <img className={style.search_icon} src="/3.svg" alt="Иконка" />
            </button>
          </form>
          <div className={style.search_items}>
            {userData.map(data => (
              <div 
                className={style.search_item} 
                key={data.id}
                onClick={() => {
                  setSelectedUser(data);
                  setIsPopupOpen(true);
                }}
              >
                <h2 className={style.search_item_title}>
                  {data.name}
                </h2>
                <div className={style.search_item_group}>
                  <div className={style.search_item_group_row}>
                    <img className={style.search_item_icon} src="/1.svg" alt="Телефон" />
                    <p className={style.search_item_description}>
                      {data.phone}
                    </p>
                  </div>
                  <div className={style.search_item_group_row}>
                    <img className={style.search_item_icon} src="/2.svg" alt="Почта" />
                    <p className={style.search_item_description}>
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
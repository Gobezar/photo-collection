import React, { useState, useEffect } from 'react';
import Collection from './Collection';
import './index.scss';

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {

  const [categoryId, setCategoryId] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

const category = categoryId ? `category=${categoryId}` : ''
      

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://63a6cbe359fd83b1bb3819f4.mockapi.io/photos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json)

      })
      .catch((err) => {
        console.warn(err)
        alert('Ошибка при получении данных')
      })
      .finally(() => { setIsLoading(false) })
  }, [categoryId, page])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}>{obj.name}</li>
          ))
          }
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ?
          <h2>Идет загрузка...</h2> : (
            collections
              .filter((obj) => {
                return obj.name.toLowerCase().includes(searchValue.toLowerCase())
              })
              .map((obj, index) => (
                <Collection
                  name={obj.name}
                  images={obj.photos}
                  key={index}
                />
              ))
          )
        }


      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li 
          key={i} 
          onClick={() => setPage(i+1)}
          className={page === (i+1) ? 'active' : ''}>{i+1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

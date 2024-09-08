import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'

import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

const handleWheel = (event) => {
  event.preventDefault()
  cardsRef.current.scrollLeft += event.deltaY
}

const [apiData,setApiData] =useState([])
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDI0ZTllMjQ0M2ZjYWZlNTcwZWJlMDkyZjUyNDEyYSIsIm5iZiI6MTcyNTc4NjY4NC4zMzM1ODYsInN1YiI6IjYzOGRmZjYxYmVmZDkxMDA4NDY2YjZjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AkQeVzfNnqK6nue9ovmenbySCOEfdZxxDNFQkn0ZgDk'
  }
};



useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category ? category :'now_playing'}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel',handleWheel)
},[])

  return (
    <div className='titleCards'>
      <h2>{title ? title : 'Popular On Netflix' }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
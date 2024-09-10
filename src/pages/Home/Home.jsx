import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'

import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../constants/constants'

import { Link } from 'react-router-dom'



const Home = () => {

  const [movie, setMovie] = useState()

  useEffect(() => {
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[0]);
      setMovie(response.data.results[Math.floor(Math.random() * 25)]);
  })
  }, [])

  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img src={movie ? `${imageUrl}${movie.backdrop_path}` : `${hero_banner}`} alt="" className='banner-img' />
          <div className="hero-caption">
            <h1 className='caption-img'>{movie ? movie.original_title || movie.name : ''}</h1>
            <p>{movie ? movie.overview : ''}</p>
            <div className="hero-btns">
            <Link to={ movie ? `/player/${movie.id}` : ''}>
              <button className='btn' ><img src={play_icon} alt="" />Play</button>
              </Link>
             
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
            <TitleCards className='title-cards'/>
          </div>
        </div>
        <div className="more-cards">
          <TitleCards title={'Blockbuster Movies'} category={'top_rated'}/>
          <TitleCards title={'Only On Netflix'} category={'popular'}/>
          <TitleCards title={'Upcoming Movies'} category={'upcoming'}/>
          <TitleCards title={'Recommended For You'} category={'now_playing'}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
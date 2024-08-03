import React from 'react'
import './Weather.css'
import searchIMG from '../../assets/search.png'
import { images } from '../../assets/images'; 

const Weather = () => {
  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <img src={searchIMG} alt="search icon" />
      </div>
        <img src={images.clear} alt="" className='weather-icon' />
        <p className='temperature'>16°C</p>
        <p className='location'>London</p>
        <div className='weather-data'>
          <div className="col">
            <img src={images.humidity} alt="" />
            <div>
              <p>91 %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={images.wind} alt="" />
            <div>
              <p>3.6 Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather
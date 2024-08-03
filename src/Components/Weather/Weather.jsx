import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { images } from '../../assets/images'; 
import searchIMG from '../../assets/search.png';

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": images.clear,
    "01n": images.clear,
    "02d": images.cloud,
    "02n": images.cloud,
    "03d": images.cloud,
    "03n": images.cloud,
    "04d": images.drizzle,
    "04n": images.drizzle,
    "09d": images.rain,
    "09n": images.rain,
    "10d": images.rain,
    "10n": images.rain,
    "13d": images.snow,
    "13n": images.snow,
  }

  const search = async (city) => {

    if(city === "") {
      return alert("Please enter a city name");
    }

    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      console.log("API Key:", apiKey);  

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || images.clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      setWeatherData(false);
      alert("City not found");
    }
  }

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img src={searchIMG} alt="search icon" onClick={() => search(inputRef.current.value)} /> 
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className="col">
              <img src={images.humidity} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={images.wind} alt="wind icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;

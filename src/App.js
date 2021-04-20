import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const URL = `https://api.openweathermap.org/data/2.5/weather`;
const ApiKey = '564e98b458d699632c24819697ed0492';


const fetchWeather = async (city) => {
  const { data } = await axios.get(URL, {
    params: {
      q: city,
      units: 'metric',
      APPID: ApiKey,
    }
  });
  return data;
}


function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key == 'Enter') {
      const data = await fetchWeather(city)
      setWeather(data);
      setCity('');
    }
  }

  console.log(weather.main)
  console.log(weather)

  return (
    <div className='theInfo'>

      <input
        type='text'
        id='searchinput'
        placeholder='Enter city name'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={search}
      />

      {weather.main && (
        <div >
          <h2>
            <span>{weather.name} - {weather.sys.country}</span>
          </h2>

          <div>
            <h3 id='temp'>
              <span>{Math.round(weather.main.temp)}</span>
              <sup>&deg;C</sup>
            </h3>
            <h3>
              <span>Real Feel: {Math.round(weather.main.feels_like)}</span>
              <sup>&deg;C</sup>
            </h3>
            <h3 id='wind'>
              <span>Wind Speed: {Math.round((Math.round(weather.wind.speed) * 3.6))} km/h </span>
            </h3>
          </div>
          <div>
            <p id='conditii'>Conditions: {weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 10000, …}
// base: "stations"
// clouds:
// all: 75
// __proto__: Object
// cod: 200
// coord:
// lat: 44.4323
// lon: 26.1063
// __proto__: Object
// dt: 1613909174
// id: 683506
// main:
// feels_like: 2.83
// humidity: 65
// pressure: 1031
// temp: 7.8
// temp_max: 8.89
// temp_min: 7
// __proto__: Object
// name: "Bucharest"
// sys:
// country: "RO"
// id: 6911
// sunrise: 1613883988
// sunset: 1613922735
// type: 1
// __proto__: Object
// timezone: 7200
// visibility: 10000
// weather: Array(1)
// 0:
// description: "broken clouds"
// icon: "04d"
// id: 803
// main: "Clouds"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// wind:
// deg: 270
// speed: 4.63
// __proto__: Object
// __proto__: Object
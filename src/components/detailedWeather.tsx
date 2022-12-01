import react from 'react';
import { Weather } from '../classes/Weather';
import './detailedWeather.css';

export function DetailedWeather(props: {
  data: Weather
}) {
  /*
    To be additionally styled with special graphs for each box 
  */
  function getTime(unix : number) {
    let x = new Date(unix * 1000);
    return(x.toLocaleTimeString().slice(0,5));
  }

  return(
    <div className='detailedWeather'>
      <div className='row'>
        <div className='box'>
          <div className='sunriseSunset'>
            <label>Sunrise:</label> <br />
            <p>{getTime(props.data.sys.sunrise)}</p>
            <label>Sunset:</label> <br />
            <p>{getTime(props.data.sys.sunset)}</p>
          </div>
        </div>
        <div className='box'>
          Wind:
          <div className='wind'>
            <p>{props.data.wind.deg}°</p>
            <p>{Math.round(props.data.wind.speed)}km/h</p>
          </div>
        </div>
        <div className='box'>
          Feels like: <br />
          <div className='centerLarge'>
            <p>{Math.round(props.data.main.feels_like)}°C</p>
          </div>
        </div>
        <div className='box'>
          Humidity:
          <div className='centerLarge'>
            <p>{props.data.main.humidity}%</p>
          </div>
        </div>
        <div className='box'>
          Visibility:
          <div className='centerLarge'>
            <p>{Math.round(props.data.visibility / 1000)}km</p>
          </div>
        </div>
        <div className='box'>
          Pressure:
          <div className='pressure'>
            <p>{props.data.main.pressure}hPa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
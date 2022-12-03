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
          <label>SUNRISE</label> <br />
          <p>{getTime(props.data.sys.sunrise)}</p>
          <label>SUNSET</label> <br />
          <p>{getTime(props.data.sys.sunset)}</p>
        </div>
        <div className='box'>
          <label>WIND</label>
          <p>{props.data.wind.deg}°</p>
          <p>{Math.round(props.data.wind.speed)}km/h</p>
        </div>
        <div className='box'>
          <label>FEELS LIKE</label>
          <p>{Math.round(props.data.main.feels_like)}°C</p>
        </div>
        <div className='box'>
        <label>HUMIDITY</label>
          <p>{props.data.main.humidity}%</p>
        </div>
        <div className='box'>
          <label>VISIBILITY</label>
          <p>{Math.round(props.data.visibility / 1000)}km</p>
        </div>
        <div className='box'>
          <label>PRESSURE</label>
          <p>{props.data.main.pressure}hPa</p>
        </div>
      </div>
    </div>
  )
}
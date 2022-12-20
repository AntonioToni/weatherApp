import react from 'react';
import { Weather } from '../model/Weather';
import './detailedWeather.css';
import base from '../assets/base.png';
import arrow from '../assets/windArrowOutlined.png';

export function DetailedWeather(props: {
  data : Weather | null
}) {

  function getTime(unix : number) {
    let x = new Date(unix * 1000);
    return(x.toLocaleTimeString().slice(0,5));
  }
  if (props.data) {
    
    let dewPoint : number =  (props.data.main.temp - (14.55 + 0.114 * props.data.main.temp) * 
    (1 - (0.01 * props.data.main.humidity)) - Math.pow(((2.5 + 0.007 * props.data.main.temp) * 
    (1 - (0.01 * props.data.main.humidity))),3) - (15.9 + 0.117 * props.data.main.temp) * 
    Math.pow((1 - (0.01 * props.data.main.humidity)), 14));
    
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
          <div className='windContainer'>
            <div className='layer1'>
              <img src={base} className='windCompass' />
            </div>
            <div className='layer2'>
              <img src={arrow} style={{transform: 'rotate('+(props.data.wind.deg+90)+'deg)'}} className='windCompass' />
            </div>
            <div className='layer3'>
              <p>{Math.round(props.data.wind.speed)}</p>
              <p>km/h</p>
            </div>
          </div>
        </div>
        <div className='box'>
          <label>FEELS LIKE</label>
          <p>{Math.round(props.data.main.feels_like)}°C</p>
        </div>
        <div className='box'>
        <label>HUMIDITY</label>
          <p>{props.data.main.humidity}%</p>
          <div className='dewPoint'>
            <p>The dew point is {Math.round(dewPoint)}° right now.</p>
          </div>
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
} else {
  return(
    <>
    </>
  )
}

}

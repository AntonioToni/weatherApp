import react from 'react';
import { Weather } from '../classes/Weather';

export function CurrentWeather(props: {
  data : Weather}
  ) {
  return(
    <div className='currentWeather'>
      <h1>{props.data.name}</h1>
      <h1>{Math.round(props.data.main.temp)}°C</h1>
      <h2>{props.data.weather[0].description.charAt(0).toUpperCase() + props.data.weather[0].description.slice(1)}</h2>
      <h2>H:{Math.round(props.data.main.temp_max)}°C L:{Math.round(props.data.main.temp_min)}°C</h2>
    </div>
  )
}
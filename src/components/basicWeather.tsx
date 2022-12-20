import react from 'react';
import { Weather } from '../model/Weather';

export function BasicWeather(props: {
  data : Weather | null}
  ) {
  if (props.data) {
  return(
    <div className='currentWeather'>
      <h1>{props.data.name}</h1>
      <h1>{Math.round(props.data?.main.temp)}°C</h1>
      <h2>{props.data.weather[0].description.charAt(0).toUpperCase() + props.data.weather[0].description.slice(1)}</h2>
      <h2>H:{Math.round(props.data.main.temp)}°C L:{Math.round(props.data.main.temp_min)}°C</h2>
    </div>
  )
} else{
  return(
    <>
    
    </>
  )
}
}

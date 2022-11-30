import react from 'react';
import { Weather } from '../classes/Weather';

export function DetailedWeather(props: {
  data: Weather
}) {

  return(
    <div className='detailedWeather'>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
      </div>
      <div className='row'>
        <div className='box'></div>
        <div className='box'></div>
      </div>
    </div>
  )
}
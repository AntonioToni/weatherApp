import react from "react";
import { Weather } from "../model/Weather";
import { WeatherEntry } from "./weatherEntry";
import './weatherForecast.css';
import { Stack } from '@mui/material'

export function WeatherForecast(props : {
  forecast : Weather[] | null;
}) {
  if (!props.forecast) {
    return null;
  }
  return(
    <>
      <div className="forecastContainer">
        <label>Forecast</label>        
        <Stack direction='row' sx={{overflow: 'auto', whiteSpace: 'nowrap'}}>
          {props.forecast.map(timePoint =>
            <Stack key = {timePoint.dt} sx={{textAlign: 'center', margin: '8px'}}>
              <WeatherEntry weather={timePoint}/>
            </Stack>
            )}
        </Stack>
      </div>
    </>
  )
}
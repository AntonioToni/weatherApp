import react from "react";
import { Weather } from "../model/Weather";
import { WeatherEntry } from "./weatherEntry";
import './weatherForecast.css';

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
        <div className="forecast">
          {props.forecast.map(timePoint =>
            <div key = {timePoint.dt} className="forecastBox">
              <WeatherEntry weather={timePoint}/>
            </div>
            )}
        </div>
      </div>
    </>
  )
}
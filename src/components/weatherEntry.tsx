import React from "react";
import { Weather } from "../model/Weather";
import { convertUnixTime, getIconUrl } from "../services/weatherService";

export function WeatherEntry(props:{weather : Weather}) {
  return(
    <div className="weatherBox">
      <p>{convertUnixTime(props.weather.dt)}</p>
      <img src={getIconUrl(props.weather.weather[0].icon)} alt="" />
      <p>{Math.round(props.weather.main.temp)}°C</p>
    </div>
  )
}
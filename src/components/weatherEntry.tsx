import React from "react";
import { Weather } from "../model/Weather";
import { convertUnixTimeToHours, getIconUrl } from "../services/weatherService";

export function WeatherEntry(props:{weather : Weather}) {
  return(
    <>
      <p>{convertUnixTimeToHours(props.weather.dt)}</p>
      <img src={getIconUrl(props.weather.weather[0].icon)} alt="" />
      <p>{Math.round(props.weather.main.temp)}°</p>
    </>
  )
}
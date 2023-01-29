import React from "react";
import { Weather } from "../model/Weather";
import { convertUnixTimeToHours, getIconUrl } from "../services/weatherService";
import { Typography } from "@mui/material";
export function WeatherEntry(props:{weather : Weather}) {
  return(
    <>
      <Typography>{convertUnixTimeToHours(props.weather.dt)}</Typography>
      <img src={getIconUrl(props.weather.weather[0].icon)} alt="weatherIcon" style={{margin: '-6px 0 -3px'}} />
      <Typography>{Math.round(props.weather.main.temp)}°</Typography>
    </>
  )
}
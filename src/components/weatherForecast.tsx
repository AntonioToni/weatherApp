import react from "react";
import { IWeather } from "../model/Weather";
import { WeatherEntry } from "./weatherEntry";
import { Stack, Typography, Box} from '@mui/material'

export function WeatherForecast(props : {
  forecast : IWeather[] | null;
}) {

  if (!props.forecast) {
    return null;
  }

  const forecastContainer = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '11px',
    borderRadius: '10px',
    margin: '0 0 10px 0',
    backdropFilter: 'blur(6px)',
    '@media (max-width: 600px)' : {
      width: '85vw'
    }
  }

  return(
    <>
      <Box sx={forecastContainer}>
        <Typography>Forecast</Typography>        
        <Stack direction='row' sx={{overflow: 'auto', whiteSpace: 'nowrap'}}>
          {props.forecast.map(timePoint =>
            <Stack key = {timePoint.dt} sx={{textAlign: 'center', margin: '8px'}}>
              <WeatherEntry weather={timePoint}/>
            </Stack>
            )}
        </Stack>
      </Box>
    </>
  )
}
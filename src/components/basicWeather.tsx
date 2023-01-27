import { Stack } from '@mui/system';
import react from 'react';
import { Weather } from '../model/Weather';
import { Typography } from '@mui/material';
export function BasicWeather(props: {
  data : Weather | null}
  ) {
  if (!props.data) {
    return null;
  };
  return(
    <Stack spacing={1.2} alignItems='center' sx={{marginBottom: 1, marginTop: 1}}>
      <Typography variant='h3'>{props.data.name}</Typography>
      <Typography variant='h2'>{Math.round(props.data?.main.temp)}°C</Typography>
      <Typography variant='h4'>{props.data.weather[0].description.charAt(0).toUpperCase() + props.data.weather[0].description.slice(1)}</Typography>
      <Typography variant='h5'>H:{Math.round(props.data.main.temp)}°C L:{Math.round(props.data.main.temp_min)}°C</Typography>
    </Stack>
  )
}

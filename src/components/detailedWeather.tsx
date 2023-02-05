import react from 'react';
import { IWeather } from '../model/Weather';
import base from '../assets/base.png';
import arrow from '../assets/windArrowOutlined.png';
import { convertUnixTime, getDewPoint } from '../services/weatherService';
import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system';

export function DetailedWeather(props: {
  data : IWeather | null
}) {

  if (!props.data) {
    return null;
  }
  
  const boxStyle = {
    width: '146px',
    height: '146px',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: '10px',
    padding: '12px',
    margin: '10px',
    backdropFilter: 'blur(6px)',
    '@media (max-width: 399px)' : {
      width: '130px',
      height: '130px'
    }
  }

  const windContainer = {
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '114px',
    width: '148px',
    '@media (max-width: 399px)' : {
      width: '130px',
      height: '100px'
    }
  }

  return(
    <>
      <Stack direction='row' sx={{
        maxWidth: '570px',
        flexWrap: 'wrap',
        '@media (max-width: 599px)' : {
          width: '380px'
        },
        '@media (max-width: 399px)' : {
          width: '348px'
        }
        }}>
        <Box sx={boxStyle}>
          <Typography>SUNRISE</Typography>
          <Typography variant='h4'>{convertUnixTime(props.data.sys.sunrise)}</Typography>
          <Typography sx={{
            marginTop: 2, 
            '@media (max-width:399px)' : {
              marginTop: 1
            }}}>SUNSET</Typography>
          <Typography variant='h4'>{convertUnixTime(props.data.sys.sunset)}</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography>WIND</Typography>
          <Stack sx={windContainer}>
            <Stack sx={{
              position: 'absolute',
              width: 'inherit',
              opacity: '0.5'
              }}>
              <img src={base} />
            </Stack>
            <Stack sx={{
              position: 'absolute',
              width: 'inherit',
              transform: 'rotate('+(props.data.wind.deg+90)+'deg)'
              }}>
              <img src={arrow} />
            </Stack>
            <Stack spacing={-0.6} sx={{
              position: 'absolute',
              textAlign: 'center',
              }}>
              <Typography variant='h4'>{Math.round(props.data.wind.speed)}</Typography>
              <Typography>km/h</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={boxStyle}>
          <Typography>FEELS LIKE</Typography>
          <Typography variant='h4'>{Math.round(props.data.main.feels_like)}°C</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography>HUMIDITY</Typography>
          <Typography variant='h4'>{props.data.main.humidity}%</Typography>
          <Typography sx={{
            marginTop: 4,
            '@media (max-width:399px)' : {
              marginTop: 3
            }
          }}>The dew point is {Math.round(getDewPoint(props.data.main.temp, props.data.main.humidity))}° right now.</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography>VISIBILITY</Typography>
          <Typography variant='h4'>{Math.round(props.data.visibility / 1000)}km</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography>PRESSURE</Typography>
          <Typography variant='h4'>{props.data.main.pressure}hPa</Typography>
        </Box>
      </Stack>
    </>
  )
}

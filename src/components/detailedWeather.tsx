import react from 'react';
import { Weather } from '../model/Weather';
import base from '../assets/base.png';
import arrow from '../assets/windArrowOutlined.png';
import { convertUnixTime, getDewPoint } from '../services/weatherService';
import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system';

export function DetailedWeather(props: {
  data : Weather | null
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
          <Stack direction='row' sx={{
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '120px', 
            width: '148px',
            '@media (max-width: 399px)' : {
              width: '130px',
              height: '100px'
            }}}>
            <Stack sx={{
              marginTop: '-5px', 
              opacity: '0.5'
              }}>
              <img src={base} className="windImgStyle" />
            </Stack>
            <Stack sx={{
              marginLeft: '-101.5%', 
              marginTop: '-5px',
              transform: 'rotate('+(props.data.wind.deg+90)+'deg)'
              }}>
              <img src={arrow} className="windImgStyle" />
            </Stack>
            <Stack spacing={-0.6} sx={{
              marginLeft: '-100%', 
              width: '100%', 
              textAlign: 'center', 
              marginTop: '-10px'
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

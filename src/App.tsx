import './App.css'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useEffect, useState } from 'react';
import { BasicWeather } from './components/basicWeather';
import { DetailedWeather } from './components/detailedWeather';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { getIconUrl, searchLocation } from "./services/weatherService";
import { readWeather } from './services/weatherService';
import { readForecast } from './services/weatherService';
import { Weather } from './model/Weather';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);
  let latitude = parseFloat(JSON.parse(localStorage.getItem("Latitude") || '0'));
  let longitude = parseFloat(JSON.parse(localStorage.getItem("Longitude") || '0'));

  if (localStorage.getItem("Latitude") === null || localStorage.getItem("Longitude") === null) {
    getCurrentPosition();
  }

  useEffect(() => {
    (async function () {
      getWeatherData(latitude, longitude);
    })()
  }, []);

  async function getWeatherData(latitude: number, longitude: number){
    const [weather, forecast] = await Promise.all([
      readWeather(latitude, longitude),
      readForecast(latitude, longitude)
    ]);
    setWeather(weather);
    setForecast(forecast);
    console.log(weather);
    console.log(forecast);
  }

  function setLatLon(lat: number, lon: number){
    localStorage.setItem("Latitude", JSON.stringify(lat));
    localStorage.setItem("Longitude", JSON.stringify(lon));
    latitude = lat;
    longitude = lon;
  }

  let getCityLocation = async (term: string) => {
    const location = await searchLocation(term);
    if (!location[0]) {
      setError(`No location found called '${term}'`);
    } else {
      setLatLon(location[0].lat, location[0].lon);
      getWeatherData(latitude, longitude);
    }
  };

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is : ", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatLon(position.coords.latitude, position.coords.longitude);
      getWeatherData(latitude, longitude);
    });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getCityLocation(city);
  }
  
  const favicon = document.getElementById("favicon") as HTMLAnchorElement
  if (weather) {
    favicon!.href = getIconUrl(weather?.weather[0].icon);
  }

  return (
    <>
      <div className='alignCenter'>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
          >
          <IconButton onClick={getCurrentPosition} aria-label="menu">
            <LocationSearchingIcon/>
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search city"
            inputProps={{ 'aria-label': 'search city' }}
            onChange={event => setCity(event.target.value)}
            />
        </Paper>
        {
          error ? <div className='error'>{error}</div> : null
        }
        <BasicWeather data = {weather}/>
        <DetailedWeather data = {weather}/>
      </div>
    </>
  )
}

export default App

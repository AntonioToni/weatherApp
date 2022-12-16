import './App.css'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Weather } from './classes/Weather';
import env from './env.json';
import { BasicWeather } from './components/basicWeather';
import { DetailedWeather } from './components/detailedWeather';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

function App() {
  const [data, setData] = useState(new Weather);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  let latitude = parseFloat(JSON.parse(localStorage.getItem("Latitude") || '0'));
  let longitude = parseFloat(JSON.parse(localStorage.getItem("Longitude") || '0'));

  function setLatLon(lat: number, lon: number){
    localStorage.setItem("Latitude", JSON.stringify(lat));
    localStorage.setItem("Longitude", JSON.stringify(lon));
    latitude = lat;
    longitude = lon;
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is : ", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatLon(position.coords.latitude, position.coords.longitude);
      getWeatherInfo();
    });
  }

  if (localStorage.getItem("Latitude") === null || localStorage.getItem("Longitude") === null) {
    getLocation();
  }

  const getWeatherInfo = () => {
    let url= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&id=524901&appid=${env.apiKey}&units=metric`
    console.log(url);
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    console.log("Loading data...");
    getWeatherInfo();
  }, []);

  const getCityPosition = () => {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${env.apiKey}`
    console.log(url);
    axios.get(url).then((response) => {
      if (response.data[0] === undefined) {
        setError("Invalid location")
      }
      else{
        setError("");
        console.log(response.data[0].lat, response.data[0].lon);
        setLatLon(response.data[0].lat, response.data[0].lon);
        getWeatherInfo();
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(city);
    getCityPosition();
  }

  return (
    <>
      <div className='alignCenter'>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
          >
          <IconButton onClick={getLocation} aria-label="menu">
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
        <BasicWeather data = {data}/>
        <DetailedWeather data = {data}/>
      </div>
    </>
  )
}

export default App

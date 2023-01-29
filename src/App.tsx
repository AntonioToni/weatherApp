import './App.css'
import { useEffect, useState } from 'react';
import { BasicWeather } from './components/basicWeather';
import { DetailedWeather } from './components/detailedWeather';
import { Weather } from './model/Weather';
import { WeatherForecast } from './components/weatherForecast';
import { getIconUrl, readWeather, readForecast, readWeatherQuery, readForecastQuery } from "./services/weatherService";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Paper , InputBase, Divider, IconButton, Alert, Stack } from '@mui/material';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);
  let latitude = parseFloat(JSON.parse(localStorage.getItem("Latitude") || '0'));
  let longitude = parseFloat(JSON.parse(localStorage.getItem("Longitude") || '0'));
  
  // getCurrentPosition used when user searches for weather by location
  let getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is : ", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLatLon(position.coords.latitude, position.coords.longitude);
        getWeatherData(latitude, longitude);
      }, function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
        }
      }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }
  // if no previous location is found prompt user for location
  if (localStorage.getItem("Latitude") === null || localStorage.getItem("Longitude") === null) {
    getCurrentPosition();
  }

  if (error !== "") {
    setTimeout(function() {setError("")}, 5000);
  }

  // when page is freshly loaded it will search for data based on previous location
  useEffect(() => {
    (async function () {
      getWeatherData(latitude, longitude);
    })()
  }, []);

  // getWeatherData is used when searching for weather based on your location
  let getWeatherData = async (latitude: number, longitude: number) => {
    const [weather, forecast] = await Promise.all([
      readWeather(latitude, longitude),
      readForecast(latitude, longitude)
    ]);
    setWeather(weather);
    setForecast(forecast);
  }

  // getWeatherDataFromCity is used when searching for weather data by city
  let getWeatherDataFromCity = async (term: string) => {
    const [weather, forecast] = await Promise.all([
      readWeatherQuery(term),
      readForecastQuery(term)
    ]);
    if (!weather) {
      setError("City not found")
    } else {
      setError("");
      setWeather(weather);
      setForecast(forecast);
    }
    setCity("");
  };

  // stores Lat & Lon into localstorage and assigns those values to variables latitude & longitude
  let setLatLon = (lat: number, lon: number) => {
    localStorage.setItem("Latitude", JSON.stringify(lat));
    localStorage.setItem("Longitude", JSON.stringify(lon));
    latitude = lat;
    longitude = lon;
  }

  // used when user presses enter on searching by city
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (city === "") {
      setError("Search field cannot be empty.");
      return;
    }
    getWeatherDataFromCity(city);
  }
  
  // sets current weather situation as favicon
  const favicon = document.getElementById("favicon") as HTMLAnchorElement
  if (weather) {
    favicon!.href = getIconUrl(weather?.weather[0].icon);
  }

  return (
    <>
      <Stack justifyContent='center' alignItems='center' sx={{marginTop: 2}}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
          >
          {navigator.geolocation ? 
          <>
            <IconButton onClick={getCurrentPosition} aria-label="menu">
              <LocationSearchingIcon/>
            </IconButton> 
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </> : "" }
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search city"
            inputProps={{ 'aria-label': 'search city' }}
            onChange={event => setCity(event.target.value)}
            value = {city}
            />
        </Paper>
        {
          error ? 
            <Alert severity="error" style={{marginTop: '5px'}}>
              {error}
            </Alert> : null
        }
        <BasicWeather data = {weather}/>
        <WeatherForecast forecast={forecast}/>
        <DetailedWeather data = {weather}/>
      </Stack>
    </>
  )
}

export default App

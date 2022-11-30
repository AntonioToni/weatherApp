import './App.css'
import Fab from '@mui/material/Fab';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Weather } from './classes/Weather';
import env from './env.json';
import { BasicWeather } from './components/basicWeather';

function App() {
  const [data, setData] = useState(new Weather);
  let lat = parseFloat(JSON.parse(localStorage.getItem("Latitude") || '0'));
  let lon = parseFloat(JSON.parse(localStorage.getItem("Longitude") || '0'));

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is : ", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      localStorage.setItem("Latitude", JSON.stringify(position.coords.latitude));
      localStorage.setItem("Longitude", JSON.stringify(position.coords.longitude));
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      searchPosWeather();
    });
  }

  if (localStorage.getItem("Latitude") === null || localStorage.getItem("Longitude") === null) {
    getLocation();
  }

  const searchPosWeather = () => {
    let url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=524901&appid=${env.apiKey}&units=metric`
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    console.log("Loading data...");
    searchPosWeather();
  }, []);

  return (
    <>
      <div className='alignCenter'>
        <Fab className='locateButton' onClick={getLocation}>
          <LocationSearchingIcon/>
        </Fab>
        <BasicWeather data = {data}/>
      </div>
    </>
  )
}

export default App

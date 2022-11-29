import reactLogo from './assets/react.svg'
import './App.css'
import Fab from '@mui/material/Fab';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is : ", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      localStorage.setItem("Latitude", JSON.stringify(position.coords.latitude));
      localStorage.setItem("Longitude", JSON.stringify(position.coords.longitude));
    });
  }

  if (localStorage.getItem("Latitude") === null || localStorage.getItem("Longitude") === null) {
    getLocation();
  }

  const [lat, setLat] = useState(parseInt(JSON.parse(localStorage.getItem("Latitude") || '0')));
  const [lon, setLon] = useState(parseInt(JSON.parse(localStorage.getItem("Longitude") || '0')));

  function loadLatLon() {
    setLat(parseInt(JSON.parse(localStorage.getItem("Latitude") || '0')));
    setLon(parseInt(JSON.parse(localStorage.getItem("Longitude") || '0')));
  }

  const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=524901&appid=cb2a8867b6d3f9d1498042c4a3e577d7&units=metric`

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  }
  
  useEffect(() => {
    console.log("test");
    searchLocation();
  }, []);

  return (
    <>
      <div className='alignCenter'>
        <Fab className='locateButton' onClick={getLocation}>
          <LocationSearchingIcon/>
        </Fab>
        <div className='currentWeather'>
          <h1>{data.name}</h1>
          <h1>{}°C</h1>
          <h2>{}</h2>
          <h2>H:13°C L:4°C</h2>
        </div>
      </div>
    </>
  )
}

export default App

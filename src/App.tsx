import reactLogo from './assets/react.svg'
import './App.css'
import Fab from '@mui/material/Fab';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

function App() {

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is : ", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      localStorage.setItem("Latitude", JSON.stringify(position.coords.latitude));
      localStorage.setItem("Longitude", JSON.stringify(position.coords.longitude));
    });
  }
  
  return (
    <>
      <div className='alignCenter'>
        <Fab className='locateButton' onClick={getLocation}>
          <LocationSearchingIcon/>
        </Fab>
        <div className='currentWeather'>
          <h1>City</h1>
          <h1>10°C</h1>
          <h2>Mostly Cloudy</h2>
          <h2>H:13°C L:4°C</h2>
        </div>
      </div>
    </>
  )
}

export default App

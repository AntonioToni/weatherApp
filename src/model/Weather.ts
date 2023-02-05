export interface ICoordinates {
  lon: number;
  lat: number;
}

export interface IWeatherLocation {
  coord: ICoordinates;
  id: number;
  name: string;
}

export interface IWeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWindWeatherData {
  speed: number;
  deg: number;
}

export interface IsysWeatherData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  weather: IWeatherConditions[];
  main: IMainWeatherData;
  dt: number;
  name: string;
  visibility: number;
  wind: IWindWeatherData;
  sys: IsysWeatherData;
}

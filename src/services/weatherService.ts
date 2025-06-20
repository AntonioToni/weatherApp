import env from '../env.json';

import { IWeather } from '../model/Weather';

if (env.apiKey === undefined) {
  throw new Error('No Open Weather API Key defined')
}

const keyQuery = `appid=${env.apiKey}`
const server = 'http://api.openweathermap.org/data/2.5';

export async function readWeather(latitude: number, longitude: number): Promise<IWeather> {
  const current = await fetch(`${server}/weather?lat=${latitude}&lon=${longitude}&${keyQuery}&units=metric`);

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

export async function readWeatherQuery(query: string) {
  const current = await fetch(`${server}/weather?q=${query}&units=metric&${keyQuery}`)

  if (current.status === 404) return undefined;

  return await current.json();
}

export async function readForecast(latitude: number, longitude: number): Promise<IWeather[]> {
  const forecast = await fetch(`${server}/forecast?lat=${latitude}&lon=${longitude}&${keyQuery}&units=metric&cnt=8`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}

export async function readForecastQuery(query: string) {
  const current = await fetch(`${server}/forecast?q=${query}&cnt=8&units=metric&${keyQuery}`)
  
  if (current.status === 404) return undefined;

  return (await current.json()).list;
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export function convertUnixTime(unix: number) {
  let date = new Date(unix * 1000);
  let time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
  return time;
}

export function convertUnixTimeToHours(unix: number) {
  let date = new Date (unix * 1000);
  let time = date.toLocaleTimeString([], {hour: '2-digit', hour12: false});
  return time
}

export function getDewPoint(temp: number, humidity: number) {
  return (
    (temp - (14.55 + 0.114 * temp) * 
    (1 - (0.01 * humidity)) - Math.pow(((2.5 + 0.007 * temp) * 
    (1 - (0.01 * humidity))),3) - (15.9 + 0.117 * temp) * 
    Math.pow((1 - (0.01 * humidity)), 14))
  )
}
export class Weather {
  public name: string;
  public main : { 
    temp : number,
    feels_like : number,
    temp_min : number,
    temp_max : number,
    pressure : number,
    humidity : number
  }
  public weather : Array<{
    description : string
  }>
  public wind : {
    speed : number,
    deg: number
  }
  public sys : {
    sunrise : number,
    sunset : number
  }

  public constructor() {
    this.name = "";
    this.main = { 
      temp : 0,
      feels_like : 0,
      temp_min : 0,
      temp_max : 0,
      pressure : 0,
      humidity : 0
    };
    this.weather = [{
      description : ''
    }]
    this.wind = {
      speed : 0,
      deg : 0
    }
    this.sys = {
      sunrise : 0,
      sunset : 0
    }
  }
}
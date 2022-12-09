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
  public visibility : number;
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
    this.name = "City";
    this.main = { 
      temp : 13,
      feels_like : 8,
      temp_min : 7,
      temp_max : 15,
      pressure : 1012,
      humidity : 50
    };
    this.visibility = 5000;
    this.weather = [{
      description : 'Overcast clouds'
    }]
    this.wind = {
      speed : 10,
      deg : 33
    }
    this.sys = {
      sunrise : 0,
      sunset : 0
    }
  }
}
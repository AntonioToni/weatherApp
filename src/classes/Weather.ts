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
  public weather : Array<{description : string}>

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
    this.weather = [{description : ''}]
  }
}
export class Weather {
    public cityName: string;
    public description: string;
    public currentTemp: number;
    public highTemp: number;
    public lowTemp: number;
    public latitude: number;
    public longitude: number;

    public constructor() {
        this.cityName = "";
        this.description = "";
        this.currentTemp = 0;
        this.highTemp = 0;
        this.lowTemp = 0;
        this.latitude = 0;
        this.longitude = 0;
    }
}
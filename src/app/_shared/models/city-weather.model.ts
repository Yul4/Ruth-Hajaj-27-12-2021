export class CityWeatherModel {
  Name: string;
  Key: string;
  IsDayTime: string;
  WeatherText: string;
  Country: { ID: string, LocalizedName: string };
  HasPrecipitation: boolean;
  PrecipitationType: string;
  Temperature: {
    Metric: {
      Imperial: string,
      Value: string
    }
  };
}

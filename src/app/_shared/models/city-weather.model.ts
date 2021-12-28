export class CityWeatherModel {
  Name: string;
  Key: string;
  IsDayTime: string;
  WeatherText: string | undefined;
  Country: { ID: string, LocalizedName: string } | undefined;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  Temperature: {
    Metric: {
      Imperial: string,
      Value: string
    }
  };
}

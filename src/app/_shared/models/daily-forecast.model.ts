export class DailyForecastModel {
  Date: string;
  Temperature: {
    Minimum: { Value: string }
    Maximum: { Value: string }
  };
  Day: {
    IconPhrase: string,
    HasPrecipitation: boolean,
    PrecipitationType: string
  };
  Night: {
    IconPhrase: string,
    HasPrecipitation: boolean,
    PrecipitationType: string
  };
}

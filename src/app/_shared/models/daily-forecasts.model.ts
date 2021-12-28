import { DailyForecastModel } from 'src/app/_shared/models/daily-forecast.model';

export class DailyForecastsModel {
  Headline: {
    Text: string
  };
  DailyForecasts: DailyForecastModel[];
}

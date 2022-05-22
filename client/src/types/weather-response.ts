export interface Request {
  type: string;
  query: string;
}

export interface WeatherIconUrl {
  value: string;
}

export interface WeatherDesc {
  value: string;
}

export interface CurrentCondition {
  observation_time: string;
  temp_C: string;
  temp_F: string;
  weatherCode: string;
  weatherIconUrl: WeatherIconUrl[];
  weatherDesc: WeatherDesc[];
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  uvIndex: string;
}

export interface Astronomy {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

export interface WeatherIconUrl2 {
  value: string;
}

export interface WeatherDesc2 {
  value: string;
}

export interface Hourly {
  time: string;
  tempC: string;
  tempF: string;
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  weatherCode: string;
  weatherIconUrl: WeatherIconUrl2[];
  weatherDesc: WeatherDesc2[];
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  HeatIndexC: string;
  HeatIndexF: string;
  DewPointC: string;
  DewPointF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustMiles: string;
  WindGustKmph: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofwindy: string;
  chanceofovercast: string;
  chanceofsunshine: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceoffog: string;
  chanceofsnow: string;
  chanceofthunder: string;
  uvIndex: string;
}

export interface Weather {
  postcode: string | undefined;
  date: number;
  astronomy: Astronomy[] | undefined;
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  avgtempC: string;
  avgtempF: string;
  totalSnow_cm: string;
  sunHour: string;
  uvIndex: string;
  location: string | undefined;
  hourly: Hourly[] | undefined;
}

export interface Month {
  index: string;
  name: string;
  avgMinTemp: string;
  avgMinTemp_F: string;
  absMaxTemp: string;
  absMaxTemp_F: string;
  avgDailyRainfall: string;
}

export interface ClimateAverage {
  month: Month[];
}

export interface Data {
  request: Request[];
  current_condition: CurrentCondition[];
  weather: Weather[];
  ClimateAverages: ClimateAverage[];
  nearest_area: NearestArea[];
}

export interface NearestArea {
  areaName: AreaName[];
}

export interface AreaName {
  value: string;
}

export interface RootObject {
  data: Data;
}

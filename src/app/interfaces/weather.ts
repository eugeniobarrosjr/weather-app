export interface Weather {
  location: {
    name: string;
  };
  current: {
    wind_kph: number;
    pressure_in: number;
    precip_mm: number;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface WeatherQuery {
  query: Weather;
}

export interface WeatherBulk {
  bulk: WeatherQuery[];
}

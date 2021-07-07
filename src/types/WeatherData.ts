export default interface WeatherData {
  weather: [
    {
      main: string
      description: string
      icon: string
    },
  ]
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  sys: {
    country: string
  }
  name: string
}

import store from "../store/store";

const lang = {
  en: {
    city: 'City',
    temp: 'Temp',
    max_temp: 'Max temp',
    min_temp: 'Min temp',
    wind: 'Wind',
    SW: 'NE',
    E: 'E',
    SE: 'SE',
    S: 'S',
    SW: 'SW',
    W: 'W',
    NW: 'NW',
    N: 'N',
    speed: 'km/h',
    humidity: 'Humidity',
    clear: 'Clear',
    clouds: 'Clouds',
    mist: 'Mist',
    rain: 'Rain',
    storm: 'Storm',
    snow: 'Snow',
    sunrise: 'Sunrise',
    sunset: 'Sunset'
  },
  
  ru: {
    city: 'Город',
    temp: 'Температура',
    max_temp: 'Макс. температура',
    min_temp: 'Мин. температура',
    wind: 'Ветер',
    SW: 'ЮЗ',
    E: 'В',
    SE: 'ЮВ',
    S: 'Ю',
    SW: 'ЮЗ',
    W: 'З',
    NW: 'СЗ',
    N: 'С',
    speed: 'км/ч',
    humidity: 'Влажность',
    clear: 'Ясно',
    clouds: 'Пасмурно',
    mist: 'Туман',
    rain: 'Дождь',
    storm: 'Гроза',
    snow: 'Снег',
    sunrise: 'Восход',
    sunset: 'Закат'
  }
}

function l(key) {
  return lang[store.getState().location][key]
}

export default l
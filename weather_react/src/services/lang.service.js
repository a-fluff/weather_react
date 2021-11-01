import store from "../store/store"

const lang = {
  en: {
    city: 'City',
    temp: 'Temp',
    max_temp: 'Max temp',
    min_temp: 'Min temp'
  },
  
  ru: {
    city: 'Город',
    temp: 'Температура',
    max_temp: 'Макс. температура',
    min_temp: 'Мин. температура'
  }
}

function l(key) {
  return lang[store.getState().location][key]
}

export default l
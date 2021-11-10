function reducer(state, action) {
  switch(action.type) {
    case 'SET_SINGLE_WEATHER': return {...state, single_weather: action.value}
    case 'SET_LANG': return {...state, location: action.value}
    case 'SET_CITY': return {...state, city: action.value}
    case 'SET_DEG': return {...state, deg: action.value}
    case 'SET_WEATHER' : return {...state, weather: action.value}
    default: return state
  }
}

export default reducer
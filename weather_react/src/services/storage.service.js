function getCityStorage() {
  const city = localStorage.getItem('city');

  return city
}

function setCityStorage(value) {
  localStorage.setItem('city', value);
}

const storage = {
  getCityStorage,
  setCityStorage
}

export default storage
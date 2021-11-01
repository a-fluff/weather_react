function query(param, value) {
  const params = new URLSearchParams(window.location.search)

  URLSearchParams.set(param, value);

  return params.toString()
}

export default query
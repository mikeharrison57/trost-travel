const requestApiData = category => {
  return fetch(`http://localhost:3001/api/v1/${category}`)
    .then(response => response.json())
    .catch(err => console.log(err, `${category} API ERROR!`))
};

export { requestApiData };
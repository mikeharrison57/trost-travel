const requestApiData = category => {
  return fetch(`http://localhost:3001/api/v1/${category}`)
    .then(response => response.json())
    .catch(err => console.log(err, `${category} API ERROR!`))
};

const postNewTrip = () => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (newUserTrip)
  })
  .then(response => response.json())
  .then()
}

// display pending trips here
// right function that creates new trip objects
// pass it through .then()

export { requestApiData, postNewTrip };
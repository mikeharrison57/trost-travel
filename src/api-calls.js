const requestApiData = category => {
  return fetch(`http://localhost:3001/api/v1/${category}`)
    .then(response => response.json())
    .catch(err => console.log(err, `${category} API ERROR!`))
};

const postNewTrip = (newUserTrip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserTrip)
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    console.log(response)
    return response
  })
  .then(data => {console.log('Trip Confirmed!')})
  .catch(err => {console.log(err)})
} 

export { requestApiData, postNewTrip };
const requestApiData = category => {
  fetch(`http://localhost:3001/api/v1/${category}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err, `${category} API ERROR!`))
};

const requestData = () => {
  Promise.all([
    requestApiData('trips'),
    requestApiData('travelers'),
    requestApiData('destinations')
  ]);
};


export {requestApiData, requestData};
const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
   return fetch(`${BASE_URL}/name/${name}`)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText)  
        }
        
        return  response.json();
    });
}    
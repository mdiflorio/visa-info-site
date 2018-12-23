import axios from "axios";

const BASE_URL = "https://visa-info-api.herokuapp.com";

export function fetchListOfCountries(nationality = "") {
  const fetchPromise = new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/restrictions/${nationality}`)
      .then(response => {
        const countries = response.data.data.countries;
        resolve(countries);
      })
      .catch(error => {
        reject(error);
        console.log(error);
      });
  });

  return fetchPromise;
}

export function fetchVisaRestrictions(nationality = "", country = "") {
  const fetchPromise = new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/restrictions/${nationality}/${country}`)
      .then(response => {
        resolve(response);
        console.log(response);
      })
      .catch(error => {
        reject(error);
        console.log(error);
      });
  });

  return fetchPromise;
}

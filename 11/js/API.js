import { API_URL, METHOD, ROUTE } from './constants.js';

const load = (route, method = METHOD.GET, body = null) =>
  fetch(`${API_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const getData = () => load(ROUTE.GET_DATA, METHOD.GET);
const sendData = (body) => load(ROUTE.SEND_DATA, METHOD.POST, body);

export { getData, sendData };

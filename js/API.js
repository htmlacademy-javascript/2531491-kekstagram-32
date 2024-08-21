import { API_URL, Method, Route } from './constants.js';

const load = (route, method = Method.GET, body = null) =>
  fetch(`${API_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const getData = () => load(Route.GET_DATA, Method.GET);
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };

import axios from 'axios';
import { url } from '../Enums';

export const configureAxios = (isMock: boolean) => {
  axios.defaults.baseURL = isMock ? url.mock : url.actual;
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

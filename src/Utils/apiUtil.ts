import axios from 'axios';
import { URL } from '../Enums';

export const configureAxios = (isMock: boolean) => {
  axios.defaults.baseURL = isMock ? URL.MOCK : URL.ACTUAL;
};

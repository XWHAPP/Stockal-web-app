import axios from 'axios';
import { URL } from '../Enums';

export const configureAxios = (isMock: boolean) => {
  axios.defaults.baseURL = isMock ? URL.MOCK : URL.ACTUAL_5;

  // if (!isMock) {
  //   axios.defaults.headers.common['Origin'] = 'asdsad';
  // }
};

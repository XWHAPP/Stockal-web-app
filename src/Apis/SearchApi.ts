import axios, { AxiosResponse } from 'axios';

export const search = (stock: String) => {
  let result: AxiosResponse;
  axios
    .get(`/Sentiment`, {
      params: {
        stock: stock,
      },
    })
    .then((response) => {
      result = response;
    })
    .catch(function (error) {
      // TODO: tear down loading screen, and pass error to Dashboard to display error with
      console.error(error);
    });
  // FIXME: make this function work!
  //   return result;
};

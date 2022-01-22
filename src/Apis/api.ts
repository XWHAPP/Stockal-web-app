import axios, { AxiosError, AxiosResponse } from 'axios';

export const get = (url: string, parameters: any) => {
  return axios
    .get(url, {
      params: parameters,
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
      throw error;
    });
};

export const post = (url: string, parameters: any) => {
  return axios
    .get(url, {
      params: parameters,
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
      alert(error.response?.status);
      alert(error.response?.statusText);
      // TODO: REFINE ERROR HANDLING
      throw error;
    });
};

export const patch = (url: string, parameters: any) => {
  return axios
    .get(url, {
      params: parameters,
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
      alert(error.response?.status);
      alert(error.response?.statusText);
      // TODO: REFINE ERROR HANDLING
      throw error;
    });
};

export const put = (url: string, parameters: any) => {
  return axios
    .get(url, {
      params: parameters,
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
      alert(error.response?.status);
      alert(error.response?.statusText);
      // TODO: REFINE ERROR HANDLING
      throw error;
    });
};

export const del = (url: string, parameters: any) => {
  return axios
    .get(url, {
      params: parameters,
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
      alert(error.response?.status);
      alert(error.response?.statusText);
      // TODO: REFINE ERROR HANDLING
      throw error;
    });
};

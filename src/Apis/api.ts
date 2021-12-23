import axios from 'axios';

// REVIEW: implement "middleware" to handle errors? This depends on how we handle state management
export const get = (url: string, params: any) => {
    let result: any;

    axios.get(url, params)
      .then((response) => {
        console.log(response);
        result = response;
      })
    return result;
}

export const post = (url: string, body: any, ifSuccess: () => {}) => {
}

export const patch = (url: string, body: any, ifSuccess: () => {}) => {
}

export const put = (url: string, body: any, ifSuccess: () => {}) => {
}

export const del = (url: string, params: any, ifSuccess: () => {}) => {
}
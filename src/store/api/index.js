import axios from 'axios';

// const mockOptions = {
//   url: 'string',
//   method: 'get' || 'post' || 'put' || 'delete',
//   data: {
//     email: 'string',
//     password: 'string',
//   },
//   query: {
//     ID: 'string',
//   },
// };

export class Api {
  static async fetch(apiOptions) {
    const axiosConfig = {
      baseURL: 'http://api.ourlibrary.co.kr/',
      ...apiOptions,
    };
    const { data } = await axios.request(axiosConfig);
    return data;
  }
}

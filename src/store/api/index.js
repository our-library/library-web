import axios from 'axios';
import { getToken } from '../../utils/handleToken';

// const mockOptions = {
//   url: 'string',
//   method: 'get' | 'post' | 'put' | 'delete',
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
    const accessToken = getToken();
    const axiosConfig = {
      baseURL: 'http://api.ourlibrary.co.kr/',
      ...apiOptions,
    };

    if (accessToken) {
      axiosConfig.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const { data } = await axios.request(axiosConfig);
    return data;
  }
}

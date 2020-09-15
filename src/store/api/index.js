import axios from 'axios';

// interface ApiOptionsInterface {
//   url: string,
//   method: 'get' | 'post' | 'put' | 'delete',
//   data?: object,
//   query?: any,
// }

export class Api {
  static async fetch(apiOptions) {
    const axiosConfig = {
      baseURL: "http://api.ourlibrary.co.kr/",
      ...apiOptions,
    };
    const { data } = await axios.request(axiosConfig);
    return data
  }
}




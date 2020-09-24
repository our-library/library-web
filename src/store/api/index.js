import axios from 'axios';
import {getToken} from "../../utils/handleToken";

const mockOptions = {
  url: 'string',
  method: 'get' | 'post' | 'put' | 'delete',
  data: {
    email: 'string',
    password: 'string',
  },
  query: {
    ID: 'string'
  },
};

export class Api {
  static async fetch(apiOptions) {
    const access_token = getToken();
    const axiosConfig = {
      baseURL: "http://api.ourlibrary.co.kr/",
      ...apiOptions,
    };

    if(access_token) {
      axiosConfig.headers = {
        'Authorization': `Bearer ${access_token}`
      }
    }

    const { data } = await axios.request(axiosConfig);
    return data
  }
}






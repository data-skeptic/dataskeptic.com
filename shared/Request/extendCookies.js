import axios from 'axios';
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support';

const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const extendCookies = (params) => {
  return {
    ...params,
    jar: cookieJar,
    withCredentials: true
  };
};

export default extendCookies;

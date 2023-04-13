import axios from 'axios';
// import { BASE_URL } from '../constants';

const APP_API_URL ='https://96e2-2603-8081-1800-f423-688a-2642-1061-aa7d.ngrok-free.app/api/';

axios.interceptors.request.use(config => config);

const execute = async (
  path: any,
  method = 'GET',
  {
    params = {} as any,
    queries = {} as any,
    payloads = {} as any,
    headers = {} as any,
    fileUpload = false as boolean,
  } = {},
) => {
  const base = APP_API_URL.replace(/~\/$/, '');
  const url = !fileUpload ? base + path : path;
  console.log('url for api call ', url);
  //   if (token && !fileUpload) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }

  //   if (!headers['Content-Type'] && !fileUpload) {
  //     headers['Content-Type'] = 'application/json';
  //   }

  if (!headers.Accept && !fileUpload) {
    headers.Accept = 'application/json';
  }

  const options: any = {method, headers};

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    options.data = payloads;
  }

  if (queries) {
    options.params = queries;
  }
  console.info('req ===> ', url, options);

  try {
    let res = await axios(url, options);
    console.info('res ===> ', res);
    return res.data;
  } catch (err: any) {
    
    
  }
};

export const API = {
  Login:'auth/signin',
  SignUp:'auth/signup',
  user:'user/'
};

export default {
  get: (path: string, options: any) => execute(path, 'GET', options),
  post: (path: string, options: any) => execute(path, 'POST', options),
  patch: (path: string, options: any) => execute(path, 'PATCH', options),
  delete: (path: string, options: any) => execute(path, 'DELETE', options),
  put: (path: string, options: any) => execute(path, 'PUT', options),
};
